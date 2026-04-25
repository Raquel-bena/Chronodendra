/**
 * Chronodendra Script
 * Renders tree rings based on fire data.
 */

const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

// State
let rings = [];
const CENTER = { x: 0, y: 0 };
let hoverYear = null;
let selectedYear = null;

// Configuration
const CONFIG = {
    startYear: 2007,
    endYear: 2025,
    baseRadius: 40,
    ringGap: 25,
    noiseAmplitude: 5,
    noiseFrequency: 0.05,
    colors: {
        low: '#707070',   // Ash/Grey
        med: '#a85d38',   // Charred brown/orange
        high: '#ff4500',  // Ember red
        bg: '#111111'
    },
    thickness: {
        low: 2,
        med: 4,
        high: 8
    }
};

// Simple pseudo-random noise function (Sine superposition)
function noise(angle, seed) {
    return Math.sin(angle * 7 + seed) * 0.5 +
        Math.sin(angle * 13 + seed * 2) * 0.25 +
        Math.sin(angle * 3 + seed * 3) * 0.25;
}

function init() {
    // Hide main page content initially
    document.getElementById('mainPage').classList.remove('loaded');
    document.getElementById('bgVideo').classList.remove('loaded');
    
    animateLoader(() => {
        resize();
        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('mouseleave', () => {
            hoverYear = null;
            updateUI();
            draw();
        });
        draw();
    });
}

function animateLoader(onComplete) {
    let progress = 0;
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercentage = document.getElementById('loaderPercentage');
    const loader = document.getElementById('loader');
    const mainPage = document.getElementById('mainPage');
    const bgVideo = document.getElementById('bgVideo');

    // Simulate loading progress
    const interval = setInterval(() => {
        // Random increment between 1 and 5
        progress += Math.random() * 5 + 1;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Update final visual state
            loaderBar.style.width = '100%';
            loaderPercentage.textContent = '100%';
            
            // Wait a brief moment before hiding loader to show 100%
            setTimeout(() => {
                loader.classList.add('loaded');
                bgVideo.classList.add('loaded');
                mainPage.classList.add('loaded');
                
                if (onComplete) onComplete();
            }, 500);
        } else {
            loaderBar.style.width = `${progress}%`;
            loaderPercentage.textContent = `${Math.floor(progress)}%`;
        }
    }, 40); // Fast interval for smooth simulation
}

function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    CENTER.x = canvas.width / 2;
    CENTER.y = canvas.height / 2;
    
    // Scale the rings to fit the container dynamically
    const minDimension = Math.min(canvas.width, canvas.height);
    const maxAllowedRadius = (minDimension / 2) - 30; // 30px padding for glow
    
    const yearsCount = Object.keys(EVENTS_DATA).length;
    
    CONFIG.baseRadius = Math.max(20, minDimension * 0.08);
    // Ensure ringGap is large enough
    CONFIG.ringGap = Math.max(8, (maxAllowedRadius - CONFIG.baseRadius) / yearsCount);

    processData();
    draw();
}

function processData() {
    rings = [];
    const years = Object.keys(EVENTS_DATA)
        .map(year => parseInt(year, 10))
        .sort((a, b) => a - b);

    years.forEach((year, index) => {
        const data = EVENTS_DATA[year];
        const severity = data.severity;

        let color = CONFIG.colors[severity];
        let thickness = CONFIG.thickness[severity];

        rings.push({
            year: year,
            index: index,
            baseRadius: CONFIG.baseRadius + (index * CONFIG.ringGap),
            color: color,
            thickness: thickness,
            severity: severity,
            seed: Math.random() * 100, // Random seed for ring shape variation
            data: data
        });
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

    ctx.lineWidth = isSelected ? ring.thickness + 4 : (isHovered ? ring.thickness + 2 : ring.thickness);
    ctx.strokeStyle = ring.color;

    if (isHovered || isSelected) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = ring.color;
    } else {
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
    }

    // Draw irregular circle
    const resolution = 120; // Segments
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
        ctx.fillStyle = hexToRgba(ring.color, 0.15);
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

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - CENTER.x;
    const y = e.clientY - rect.top - CENTER.y;
    const dist = Math.sqrt(x * x + y * y);

    // Find closest ring
    let closestRing = null;
    let minDiff = Infinity;

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

    const activeYear = getActiveYear();

    if (activeYear) {
        const data = EVENTS_DATA[activeYear];
        const ring = getRingByYear(activeYear);

        defaultState.classList.add('hidden');
        activeState.classList.remove('hidden');

        yearTitle.textContent = activeYear;
        eventTitle.textContent = data.event_title;
        eventSummary.textContent = data.summary;
        eventSource.href = data.source_link;
        eventSource.textContent = "Source / Fonte";

        if (data.image) {
            eventImage.src = data.image;
            eventImage.classList.remove('hidden');
        } else {
            eventImage.classList.add('hidden');
        }

        panel.style.borderLeftColor = ring ? ring.color : 'rgba(255, 255, 255, 0.1)';

    } else {
        defaultState.classList.remove('hidden');
        activeState.classList.add('hidden');
        panel.style.borderLeftColor = 'rgba(255, 255, 255, 0.1)';
    }
}

// Start
init();
