/**
 * Chronodendra Script
 * Renders tree rings based on fire data.
 */

const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

// State
let rings = [];
const CENTER = { x: 0, y: 0 };
let MAX_RADIUS = 0;
let hoverYear = null;
let selectedYear = null;
let thumbButtons = [];

const FALLBACK_REFERENCES = [
    {
        text_en: 'European Forest Fire Information System',
        text_gl: 'Sistema Europeo de Informacion sobre Incendios Forestais',
        url: 'https://forest-fire.emergency.copernicus.eu/'
    },
    {
        text_en: 'Xunta de Galicia - Forest Fires',
        text_gl: 'Xunta de Galicia - Incendios Forestais',
        url: 'https://www.xunta.gal'
    },
    {
        text_en: 'Spain Wildfire Statistics (MITECO)',
        text_gl: 'Estatisticas de incendios en Espana (MITECO)',
        url: 'https://www.miteco.gob.es/es/biodiversidad/temas/incendios-forestales/'
    },
    {
        text_en: 'Copernicus Climate Change Service',
        text_gl: 'Servizo Copernicus de Cambio Climatico',
        url: 'https://climate.copernicus.eu/'
    }
];

const LOCAL_IMAGE_BY_YEAR = {};

// Configuration
const CONFIG = {
    startYear: 2007,
    endYear: 2025,
    baseRadius: 40,
    ringGap: 25,
    noiseAmplitude: 5,
    noiseFrequency: 0.05,
    colors: {
        low: '#6b8e23',   // Olive
        med: '#d2691e',   // Chocolate
        high: '#b22222',  // Firebrick
        wood: '#8b5a2b',
        bg: '#252522'
    }
};

// Simple pseudo-random noise function (Sine superposition)
function noise(angle, seed) {
    return Math.sin(angle * 7 + seed) * 0.5 +
        Math.sin(angle * 13 + seed * 2) * 0.25 +
        Math.sin(angle * 3 + seed * 3) * 0.25;
}

// Analyze text to determine severity level (0: Low, 1: Med, 2: High)
function analyzeSeverity(summary) {
    const s = summary.toLowerCase();
    const highKeywords = ['grave', 'miles', 'aumento', 'peor', 'trágico', 'muertos', 'fallecidos', 'alarma', 'extremo', 'riesgo elevado'];
    const lowKeywords = ['menos', 'descenso', 'favorable', 'baja', 'moderado', 'estable', 'suave', 'lluvias'];

    if (highKeywords.some(k => s.includes(k))) return 2;
    if (lowKeywords.some(k => s.includes(k))) return 0;
    return 1;
}

function init() {
    resize();
    processData();
    renderThumbRing();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mouseleave', () => {
        hoverYear = null;
        updateUI();
        draw();
    });

    // Animation loop
    requestAnimationFrame(animate);
}

function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    CENTER.x = canvas.width / 2;
    CENTER.y = canvas.height / 2;
    layoutThumbRing();
    draw();
}

function processData() {
    rings = [];
    const years = Object.keys(EVENTS_DATA)
        .map(year => parseInt(year, 10))
        .sort((a, b) => a - b);

    years.forEach((year, index) => {
        const data = EVENTS_DATA[year];
        const severity = analyzeSeverity(data.summary);

        let color;
        if (severity === 2) color = CONFIG.colors.high;
        else if (severity === 0) color = CONFIG.colors.low;
        else color = CONFIG.colors.med;

        rings.push({
            year: year,
            index: index,
            baseRadius: CONFIG.baseRadius + (index * CONFIG.ringGap),
            color: color,
            severity: severity,
            seed: Math.random() * 100, // Random seed for ring shape variation
            data: data
        });
    });

    MAX_RADIUS = CONFIG.baseRadius + (years.length * CONFIG.ringGap);
}

function renderThumbRing() {
    const thumbRing = document.getElementById('thumbRing');
    thumbRing.innerHTML = '';
    thumbButtons = [];

    rings.forEach(ring => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'thumb-item';
        button.setAttribute('aria-label', `Seleccionar anillo ${ring.year}`);
        button.title = `${ring.year}`;
        button.dataset.year = String(ring.year);

        const img = document.createElement('img');
        const fallback = ring.data && ring.data.image ? ring.data.image : '';
        img.src = getImageForYear(ring.year, fallback);
        img.alt = `Miniatura ${ring.year}`;
        img.loading = 'lazy';
        img.onerror = () => {
            if (fallback) img.src = fallback;
        };

        button.appendChild(img);
        button.addEventListener('mouseenter', () => {
            hoverYear = ring.year;
            updateUI();
            draw();
        });
        button.addEventListener('mouseleave', () => {
            hoverYear = null;
            updateUI();
            draw();
        });
        button.addEventListener('click', () => {
            selectedYear = ring.year;
            hoverYear = ring.year;
            updateUI();
            draw();
        });

        thumbRing.appendChild(button);
        thumbButtons.push(button);
    });

    layoutThumbRing();
}

function layoutThumbRing() {
    if (!thumbButtons.length) return;

    const thumbRadius = MAX_RADIUS + 36;
    const total = thumbButtons.length;
    const startAngle = -Math.PI / 2;

    thumbButtons.forEach((button, index) => {
        const angle = startAngle + (index / total) * Math.PI * 2;
        const x = CENTER.x + Math.cos(angle) * thumbRadius;
        const y = CENTER.y + Math.sin(angle) * thumbRadius;
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    });
}

function syncThumbSelection() {
    const activeYear = getActiveYear();
    thumbButtons.forEach(button => {
        const year = parseInt(button.dataset.year, 10);
        if (year === activeYear) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rings
    rings.forEach(ring => {
        drawRing(ring);
    });
}

function drawRing(ring) {
    ctx.beginPath();

    // Highlight effect
    const isHovered = (hoverYear === ring.year);
    const isSelected = (selectedYear === ring.year);

    ctx.lineWidth = isSelected ? 5 : (isHovered ? 4 : 2);
    ctx.strokeStyle = ring.color;

    if (isHovered || isSelected) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = ring.color;
    } else {
        ctx.shadowBlur = 0;
    }

    // Draw irregular circle
    const resolution = 100; // Segments
    for (let i = 0; i <= resolution; i++) {
        const angle = (i / resolution) * Math.PI * 2;
        // Add noise to radius
        const offset = noise(angle, ring.seed) * CONFIG.noiseAmplitude;
        const r = ring.baseRadius + offset;

        const x = CENTER.x + Math.cos(angle) * r;
        const y = CENTER.y + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.closePath();
    if (isSelected) {
        ctx.fillStyle = hexToRgba(ring.color, 0.12);
        ctx.fill();
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // Reset
}

function hexToRgba(hex, alpha) {
    const parsed = hex.replace('#', '');
    const bigint = parseInt(parsed, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getRingByYear(year) {
    return rings.find(ring => ring.year === year) || null;
}

function getActiveYear() {
    return hoverYear ?? selectedYear;
}

function getImageForYear(year, fallback) {
    return LOCAL_IMAGE_BY_YEAR[year] || fallback;
}

function buildBilingualContent(year, data) {
    const severity = analyzeSeverity(data.summary || '');

    let intensityEn = 'moderate pressure';
    let intensityGl = 'presion moderada';

    if (severity === 2) {
        intensityEn = 'high wildfire pressure';
        intensityGl = 'alta presion de incendios';
    } else if (severity === 0) {
        intensityEn = 'lower wildfire pressure';
        intensityGl = 'menor presion de incendios';
    }

    return {
        title: `Wildfire Chronicle ${year} / Cronica de incendios ${year}`,
        summary: `This year recorded ${intensityEn} across Galicia, combining ecological impact, emergency response and territorial vulnerability. / Este ano rexistrou ${intensityGl} en Galicia, combinando impacto ecologico, resposta de emerxencia e vulnerabilidade territorial.`,
        source: `Source / Fonte: ${data.source || 'Chronodendra dataset'}`
    };
}

function getResolvedLinks(year, data) {
    const usableLinks = Array.isArray(data.links)
        ? data.links.filter(link => link && link.url && link.url !== '#')
        : [];

    if (usableLinks.length > 0) {
        return usableLinks.map(link => ({
            url: link.url,
            text: `${link.text} / Ligazon`
        }));
    }

    const a = FALLBACK_REFERENCES[year % FALLBACK_REFERENCES.length];
    const b = FALLBACK_REFERENCES[(year + 1) % FALLBACK_REFERENCES.length];

    return [a, b].map(link => ({
        url: link.url,
        text: `${link.text_en} / ${link.text_gl}`
    }));
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - CENTER.x;
    const y = e.clientY - rect.top - CENTER.y;
    const dist = Math.sqrt(x * x + y * y);

    // Find closest ring
    let closestRing = null;
    let minDiff = Infinity;

    // We check distance against the base radius of each ring
    // This is an approximation; for exact collision with irregular rings we'd need more math,
    // but for UI interactions checks against base radius are usually sufficient and detailed enough.
    rings.forEach(ring => {
        const diff = Math.abs(dist - ring.baseRadius);
        if (diff < (CONFIG.ringGap / 2)) {
            if (diff < minDiff) {
                minDiff = diff;
                closestRing = ring;
            }
        }
    });

    if (closestRing) {
        if (hoverYear !== closestRing.year) {
            hoverYear = closestRing.year;
            updateUI();
            draw();
        }

        // Update tooltip pos
        const tooltip = document.getElementById('tooltip');
        tooltip.style.left = (e.clientX - rect.left) + 'px';
        tooltip.style.top = (e.clientY - rect.top) + 'px';
        tooltip.classList.remove('hidden');
        tooltip.querySelector('.tooltip-year').textContent = hoverYear;

    } else {
        if (hoverYear !== null) {
            hoverYear = null;
            updateUI();
            draw();
        }
        document.getElementById('tooltip').classList.add('hidden');
    }
}

function handleCanvasClick() {
    if (!hoverYear) return;

    selectedYear = hoverYear;
    updateUI();
    draw();
}

function updateUI() {
    const defaultState = document.querySelector('.default-state');
    const activeState = document.querySelector('.active-state');
    const panel = document.getElementById('infoPanel');
    const yearTitle = document.getElementById('yearTitle');
    const eventTitle = document.getElementById('eventTitle');
    const eventSummary = document.getElementById('eventSummary');
    const eventSource = document.getElementById('eventSource');
    const eventImage = document.getElementById('eventImage');
    const linksContainer = document.getElementById('linksContainer');
    const linkList = document.getElementById('linkList');

    const activeYear = getActiveYear();

    if (activeYear) {
        const data = EVENTS_DATA[activeYear];
        const ring = getRingByYear(activeYear);
        const bilingual = buildBilingualContent(activeYear, data);
        const resolvedLinks = getResolvedLinks(activeYear, data);

        defaultState.classList.add('hidden');
        activeState.classList.remove('hidden');

        yearTitle.textContent = activeYear;
        eventTitle.textContent = bilingual.title;
        eventSummary.textContent = bilingual.summary;
        eventSource.textContent = bilingual.source;

        eventImage.src = getImageForYear(activeYear, data.image);
        eventImage.alt = `Imagen del anillo ${activeYear}`;
        eventImage.classList.remove('hidden');
        eventImage.onerror = () => {
            eventImage.src = data.image;
        };

        linkList.innerHTML = '';
        resolvedLinks.forEach(link => {
            const li = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            anchor.textContent = link.text;
            li.appendChild(anchor);
            linkList.appendChild(li);
        });
        linksContainer.classList.remove('hidden');

        panel.style.borderLeftColor = ring ? hexToRgba(ring.color, 0.6) : 'rgba(255, 255, 255, 0.1)';
        syncThumbSelection();

    } else {
        defaultState.classList.remove('hidden');
        activeState.classList.add('hidden');
        panel.style.borderLeftColor = 'rgba(255, 255, 255, 0.1)';
        syncThumbSelection();
    }
}

function animate() {
    // Optional: continuous minimal movement (e.g. "breathing" effect)
    // For now, static draw is fine, we redraw on interaction.
    // requestAnimationFrame(animate);
}

// Start
init();
