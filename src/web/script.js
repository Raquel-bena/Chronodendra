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
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
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
    draw();
}

function processData() {
    rings = [];
    const years = Object.keys(EVENTS_DATA).sort();

    years.forEach((year, index) => {
        const data = EVENTS_DATA[year];
        const severity = analyzeSeverity(data.summary);

        let color;
        if (severity === 2) color = CONFIG.colors.high;
        else if (severity === 0) color = CONFIG.colors.low;
        else color = CONFIG.colors.med;

        rings.push({
            year: parseInt(year),
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
    ctx.lineWidth = isHovered ? 4 : 2;
    ctx.strokeStyle = ring.color;

    if (isHovered) {
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
    ctx.stroke();
    ctx.shadowBlur = 0; // Reset
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

function updateUI() {
    const defaultState = document.querySelector('.default-state');
    const activeState = document.querySelector('.active-state');
    const panel = document.getElementById('infoPanel');

    if (hoverYear) {
        const data = EVENTS_DATA[hoverYear];

        defaultState.classList.add('hidden');
        activeState.classList.remove('hidden');

        document.getElementById('yearTitle').textContent = hoverYear;
        document.getElementById('eventTitle').textContent = data.title;
        document.getElementById('eventSummary').textContent = data.summary;
        document.getElementById('eventSource').textContent = data.source;

        // Optional: dynamic border color for panel
        const severity = analyzeSeverity(data.summary);
        if (severity === 2) panel.style.borderLeftColor = CONFIG.colors.high;
        else if (severity === 0) panel.style.borderLeftColor = CONFIG.colors.low;
        else panel.style.borderLeftColor = CONFIG.colors.med;

    } else {
        defaultState.classList.remove('hidden');
        activeState.classList.add('hidden');
        panel.style.borderLeftColor = 'rgba(255, 255, 255, 0.1)';
    }
}

function animate() {
    // Optional: continuous minimal movement (e.g. "breathing" effect)
    // For now, static draw is fine, we redraw on interaction.
    // requestAnimationFrame(animate);
}

// Start
init();
