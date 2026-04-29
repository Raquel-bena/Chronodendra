// ===== I18N =====
const I18N = {
    gl: {
        subtitle: "Historia dos Aneis de Lume (2007–2025)",
        hero_copy: "Un arquivo vivo de incendios a través de aneis interactivos.",
        explore_title: "Explora o arquivo",
        explore_desc: "Pasa o rato polos aneis para explorar a historia dos incendios en Galicia, ano por ano. Cada anel representa un ano de 2007 a 2025.",
        click_desc: "Fai clic nun anel para fixar os datos daquel ano.",
        legend_title: "Lenda",
        legend_low: "Ano tranquilo · madeira sans",
        legend_high: "Ano grave · carbón",
        legend_hover: "Hover · brasa activa",
        legend_note: "O grosor de cada anel reflicte os hectáreas queimados.",
        ha_label: "ha queimadas",
        hf_label: "Causalidade humana",
        source_label: "Fonte",
        projected_label: "Proxección",
        timeline_label: "ANO",
        about_btn: "Acerca de",
        about_text: "CHRONODENDRA combina «chrono» (tempo) e «dendron» (árbore). Os aneis dun tronco son un arquivo de feridas e crecemento. Cada anel desta visualización representa un ano de incendios en Galicia entre 2007 e 2025. O grosor reflicte os hectáreas queimados. A cor escúrece a madeira en carbón cando a destrución supera o limiar. Preto do 98% dos incendios en Galicia teñen orixe humana."
    },
    es: {
        subtitle: "Historia de los Anillos de Fuego (2007–2025)",
        hero_copy: "Un archivo vivo de incendios a través de anillos interactivos.",
        explore_title: "Explora el archivo",
        explore_desc: "Pasa el ratón por los anillos para explorar la historia de los incendios en Galicia, año por año. Cada anillo representa un año de 2007 a 2025.",
        click_desc: "Haz clic en un anillo para fijar los datos de ese año.",
        legend_title: "Leyenda",
        legend_low: "Año tranquilo · madera sana",
        legend_high: "Año grave · carbón",
        legend_hover: "Hover · brasa activa",
        legend_note: "El grosor de cada anillo refleja las hectáreas quemadas.",
        ha_label: "ha quemadas",
        hf_label: "Causalidad humana",
        source_label: "Fuente",
        projected_label: "Proyección",
        timeline_label: "AÑO",
        about_btn: "Acerca de",
        about_text: "CHRONODENDRA combina «chrono» (tiempo) y «dendron» (árbol). Los anillos de un tronco son un archivo de heridas y crecimiento. Cada anillo de esta visualización representa un año de incendios en Galicia entre 2007 y 2025. El grosor refleja las hectáreas quemadas. El color oscurece la madera en carbón cuando la destrucción supera el umbral. Cerca del 98% de los incendios en Galicia tienen origen humano."
    },
    en: {
        subtitle: "Rings of Fire History (2007–2025)",
        hero_copy: "A living wildfire archive through interactive rings.",
        explore_title: "Explore the archive",
        explore_desc: "Hover over the rings to explore the history of wildfires in Galicia, year by year. Each ring represents one year from 2007 to 2025.",
        click_desc: "Click a ring to pin the data for that year.",
        legend_title: "Legend",
        legend_low: "Quiet year · healthy wood",
        legend_high: "Severe year · charcoal",
        legend_hover: "Hover · active ember",
        legend_note: "Ring thickness reflects hectares burned.",
        ha_label: "ha burned",
        hf_label: "Human causality",
        source_label: "Source",
        projected_label: "Projection",
        timeline_label: "YEAR",
        about_btn: "About",
        about_text: "CHRONODENDRA combines «chrono» (time) and «dendron» (tree). A trunk's rings are an archive of wounds and growth. Each ring in this visualization represents one year of wildfires in Galicia between 2007 and 2025. Thickness reflects hectares burned. Color darkens wood to charcoal when destruction exceeds the threshold. Nearly 98% of wildfires in Galicia have human causes."
    }
};

// ===== NOISE (multi-octave sine superposition, deterministic per ring) =====
function ringNoise(angle, seed, chaos) {
    const c = 0.4 + chaos * 0.6;
    return (
        Math.sin(angle * 5  + seed * 1.10) * 0.38 +
        Math.sin(angle * 11 + seed * 2.31) * 0.28 +
        Math.sin(angle * 3  + seed * 0.73) * 0.20 +
        Math.sin(angle * 17 + seed * 3.07) * 0.09 +
        Math.sin(angle * 23 + seed * 1.87) * 0.05
    ) * c;
}

// ===== COLOR =====
const HA_LOW  = 6000;
const HA_HIGH = 40000;

function interpolateHex(h1, h2, t) {
    const r1 = parseInt(h1.slice(1,3),16), g1 = parseInt(h1.slice(3,5),16), b1 = parseInt(h1.slice(5,7),16);
    const r2 = parseInt(h2.slice(1,3),16), g2 = parseInt(h2.slice(3,5),16), b2 = parseInt(h2.slice(5,7),16);
    const r = Math.round(r1+(r2-r1)*t), g = Math.round(g1+(g2-g1)*t), b = Math.round(b1+(b2-b1)*t);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function getRingColor(hectares) {
    const t = Math.max(0, Math.min(1, (hectares - HA_LOW) / (HA_HIGH - HA_LOW)));
    return interpolateHex('#D2B48C', '#3C3030', t);
}

function hexToRgba(hex, alpha) {
    const b = parseInt(hex.replace('#',''), 16);
    return `rgba(${(b>>16)&255},${(b>>8)&255},${b&255},${alpha})`;
}

// ===== STATE =====
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
let rings = [];
const CENTER = { x: 0, y: 0 };
let hoverYear = null;
let selectedYear = null;
let currentLang = localStorage.getItem('chrono_lang') || 'es';
let animationId = null;

const CONFIG = {
    baseRadius: 40,
    ringGap: 22,
    noiseAmplitude: 7,
    minThickness: 1.5,
    maxThickness: 14,
};

// ===== INIT =====
function init() {
    document.getElementById('mainPage').classList.remove('loaded');
    document.getElementById('bgVideo').classList.remove('loaded');

    applyLanguage(currentLang);
    buildTimeline();
    initCursor();
    initModal();

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    animateLoader(() => {
        resize();
        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('mouseleave', onCanvasLeave);
        startLoop();
    });
}

// ===== LOADER =====
function animateLoader(onComplete) {
    let progress = 0;
    const bar  = document.getElementById('loaderBar');
    const pct  = document.getElementById('loaderPercentage');
    const loader   = document.getElementById('loader');
    const mainPage = document.getElementById('mainPage');
    const bgVideo  = document.getElementById('bgVideo');

    const iv = setInterval(() => {
        progress += Math.random() * 4 + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(iv);
            bar.style.width  = '100%';
            pct.textContent  = '100%';
            setTimeout(() => {
                loader.classList.add('loaded');
                bgVideo.classList.add('loaded');
                mainPage.classList.add('loaded');
                if (onComplete) onComplete();
            }, 450);
        } else {
            bar.style.width  = `${progress}%`;
            pct.textContent  = `${Math.floor(progress)}%`;
        }
    }, 40);
}

// ===== RESIZE & DATA =====
function resize() {
    const parent = canvas.parentElement;
    canvas.width  = parent.clientWidth;
    canvas.height = parent.clientHeight;
    CENTER.x = canvas.width  / 2;
    CENTER.y = canvas.height / 2;

    const minDim = Math.min(canvas.width, canvas.height);
    const maxR   = (minDim / 2) - 30;
    const count  = Object.keys(FOREST_DATA).length;

    CONFIG.baseRadius = Math.max(20, minDim * 0.07);
    CONFIG.ringGap    = Math.max(7, (maxR - CONFIG.baseRadius) / count);

    processData();
}

function processData() {
    rings = Object.keys(FOREST_DATA)
        .map(y => parseInt(y, 10))
        .sort((a, b) => a - b)
        .map((year, index) => {
            const d = FOREST_DATA[year];
            const t = Math.max(0, Math.min(1, (d.hectares - HA_LOW) / (HA_HIGH - HA_LOW)));
            return {
                year,
                index,
                baseRadius: CONFIG.baseRadius + index * CONFIG.ringGap,
                color: getRingColor(d.hectares),
                thickness: CONFIG.minThickness + t * (CONFIG.maxThickness - CONFIG.minThickness),
                intensity: d.intensity,
                hectares: d.hectares,
                seed: (year * 137.508 + 42.0) % 100,
                data: d
            };
        });
}

// ===== RENDER LOOP =====
function startLoop() {
    if (animationId) cancelAnimationFrame(animationId);
    const loop = (time) => {
        draw(time);
        animationId = requestAnimationFrame(loop);
    };
    animationId = requestAnimationFrame(loop);
}

function draw(time = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rings.forEach(ring => drawRing(ring, time));
}

function drawRing(ring, time) {
    const isHovered  = hoverYear  === ring.year;
    const isSelected = selectedYear === ring.year;
    const isActive   = isHovered || isSelected;

    // Pulse effect for selected ring
    const pulse = isSelected
        ? 1 + Math.sin(time * 0.003) * 0.018
        : 1;

    const lineWidth = isSelected
        ? ring.thickness + 5
        : isHovered
        ? ring.thickness + 3
        : ring.thickness;

    ctx.lineWidth   = lineWidth;
    ctx.strokeStyle = isActive ? '#FF4500' : ring.color;

    if (isActive) {
        ctx.shadowBlur  = isSelected ? 22 : 14;
        ctx.shadowColor = '#FF4500';
    } else {
        ctx.shadowBlur  = ring.hectares > 15000 ? 4 : 2;
        ctx.shadowColor = hexToRgba(ring.color, 0.3);
    }

    const resolution = 128;
    ctx.beginPath();

    for (let i = 0; i <= resolution; i++) {
        const angle  = (i / resolution) * Math.PI * 2;
        const offset = ringNoise(angle, ring.seed, ring.intensity) * CONFIG.noiseAmplitude;
        const r      = (ring.baseRadius + offset) * pulse;
        const x      = CENTER.x + Math.cos(angle) * r;
        const y      = CENTER.y + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    ctx.closePath();

    if (isSelected) {
        ctx.fillStyle = hexToRgba('#FF4500', 0.07);
        ctx.fill();
    }

    ctx.stroke();
    ctx.shadowBlur = 0;
}

// ===== RAYCASTING (polar distance) =====
function getRingAtDistance(dist) {
    let best = null;
    let minDiff = Infinity;

    rings.forEach(ring => {
        const half = Math.max(ring.thickness / 2 + 4, CONFIG.ringGap * 0.45);
        const diff = Math.abs(dist - ring.baseRadius);
        if (diff < half && diff < minDiff) {
            minDiff = diff;
            best = ring;
        }
    });
    return best;
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - CENTER.x;
    const y = e.clientY - rect.top  - CENTER.y;
    const dist = Math.sqrt(x * x + y * y);

    const ring = getRingAtDistance(dist);

    // Update cursor state
    const cursor     = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    if (ring) {
        cursor.classList.add('on-ring');
        cursorRing.classList.add('on-ring');
    } else {
        cursor.classList.remove('on-ring');
        cursorRing.classList.remove('on-ring');
    }

    const tooltip = document.getElementById('tooltip');

    if (ring) {
        if (hoverYear !== ring.year) {
            hoverYear = ring.year;
            updateUI();
            updateTimeline();
        }
        tooltip.style.left = (e.clientX - rect.left) + 'px';
        tooltip.style.top  = (e.clientY - rect.top)  + 'px';
        tooltip.classList.remove('hidden');
        tooltip.querySelector('.tooltip-year').textContent = ring.year;
    } else {
        if (hoverYear !== null) {
            hoverYear = null;
            updateUI();
            updateTimeline();
        }
        tooltip.classList.add('hidden');
    }
}

function handleCanvasClick() {
    if (!hoverYear) return;
    selectedYear = (selectedYear === hoverYear) ? null : hoverYear;
    updateUI();
    updateTimeline();
}

function onCanvasLeave() {
    hoverYear = null;
    document.getElementById('tooltip').classList.add('hidden');
    document.getElementById('cursor').classList.remove('on-ring');
    document.getElementById('cursorRing').classList.remove('on-ring');
    updateUI();
    updateTimeline();
}

// ===== UI UPDATE =====
function updateUI() {
    const defaultState = document.querySelector('.default-state');
    const activeState  = document.querySelector('.active-state');
    const panel        = document.getElementById('infoPanel');
    const activeYear   = hoverYear ?? selectedYear;

    if (activeYear) {
        const d    = FOREST_DATA[activeYear];
        const ring = rings.find(r => r.year === activeYear);

        defaultState.classList.add('hidden');
        activeState.classList.remove('hidden');

        document.getElementById('yearTitle').textContent    = activeYear;
        document.getElementById('eventSummary').textContent = d.event_log[currentLang];
        document.getElementById('eventSource').href        = d.source;
        document.getElementById('eventSource').textContent = I18N[currentLang].source_label;

        const projected = document.getElementById('projectedTag');
        if (activeYear === 2025) {
            projected.classList.remove('hidden');
            projected.textContent = I18N[currentLang].projected_label;
        } else {
            projected.classList.add('hidden');
        }

        // Animated hectare counter
        animateCounter('hectaresCounter', d.hectares);

        // Human factor bar
        document.getElementById('hfValue').textContent = `${d.human_factor}%`;
        setTimeout(() => {
            document.getElementById('hfFill').style.width = `${d.human_factor}%`;
        }, 50);

        // Event image
        const img = document.getElementById('eventImage');
        if (d.image) {
            img.src    = d.image;
            img.onerror = () => img.classList.add('hidden');
            img.onload  = () => img.classList.remove('hidden');
        } else {
            img.classList.add('hidden');
        }

        panel.style.borderLeftColor = ring ? ring.color : 'rgba(255,255,255,0.08)';

    } else {
        defaultState.classList.remove('hidden');
        activeState.classList.add('hidden');
        document.getElementById('hfFill').style.width = '0%';
        panel.style.borderLeftColor = 'rgba(255,255,255,0.08)';
    }
}

// ===== ANIMATED COUNTER =====
let counterAnim = null;

function animateCounter(id, target) {
    const el  = document.getElementById(id);
    const dur = 600;
    const start = performance.now();
    const from  = parseInt(el.textContent.replace(/\D/g,'')) || 0;

    if (counterAnim) cancelAnimationFrame(counterAnim);

    const step = (now) => {
        const t   = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(from + (target - from) * ease).toLocaleString('es-ES');
        if (t < 1) counterAnim = requestAnimationFrame(step);
    };
    counterAnim = requestAnimationFrame(step);
}

// ===== TIMELINE =====
function buildTimeline() {
    const track = document.getElementById('timelineTrack');
    track.innerHTML = '';

    const years = Object.keys(FOREST_DATA).map(Number).sort((a,b) => a-b);
    const maxHA = Math.max(...years.map(y => FOREST_DATA[y].hectares));

    years.forEach(year => {
        const d = FOREST_DATA[year];
        const h = Math.max(4, Math.round((d.hectares / maxHA) * 28));
        const color = getRingColor(d.hectares);

        const item = document.createElement('div');
        item.className = 'timeline-year';
        item.dataset.year = year;

        const bar = document.createElement('div');
        bar.className = 'timeline-bar';
        bar.style.height = `${h}px`;
        bar.style.background = color;

        const label = document.createElement('span');
        label.className = 'timeline-yr-label';
        label.textContent = String(year).slice(2);

        item.appendChild(bar);
        item.appendChild(label);

        item.addEventListener('click', () => {
            selectedYear = selectedYear === year ? null : year;
            hoverYear = null;
            updateUI();
            updateTimeline();
        });

        track.appendChild(item);
    });
}

function updateTimeline() {
    const active = hoverYear ?? selectedYear;
    document.querySelectorAll('.timeline-year').forEach(el => {
        el.classList.toggle('active', parseInt(el.dataset.year) === active);
    });
}

// ===== LANGUAGE =====
function switchLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('chrono_lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
    });
    applyLanguage(lang);
    if (hoverYear || selectedYear) updateUI();
}

function applyLanguage(lang) {
    const t = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) el.textContent = t[key];
    });
    document.getElementById('aboutText').textContent = t.about_text;
    document.documentElement.lang = lang === 'gl' ? 'gl' : lang === 'en' ? 'en' : 'es';
}

// ===== CURSOR =====
function initCursor() {
    const dot  = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';
        // Ring follows with slight lag via lerp in rAF
        rx = e.clientX;
        ry = e.clientY;
    });

    let cx = 0, cy = 0;
    const lerpCursor = () => {
        cx += (rx - cx) * 0.18;
        cy += (ry - cy) * 0.18;
        ring.style.left = cx + 'px';
        ring.style.top  = cy + 'px';
        requestAnimationFrame(lerpCursor);
    };
    lerpCursor();
}

// ===== ABOUT MODAL =====
function initModal() {
    const btn     = document.getElementById('aboutBtn');
    const modal   = document.getElementById('aboutModal');
    const close   = document.getElementById('modalClose');
    const backdrop = document.getElementById('modalBackdrop');

    btn.addEventListener('click', () => modal.classList.remove('hidden'));
    close.addEventListener('click', () => modal.classList.add('hidden'));
    backdrop.addEventListener('click', () => modal.classList.add('hidden'));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.add('hidden');
    });
}

// ===== START =====
init();
