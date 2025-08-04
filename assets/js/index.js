document.querySelector('.theme-toggle').addEventListener('click', () => {
      document.body.classList.toggle('light');
    });

// Blog post sample data (replace with real data)
const blogPosts = [
    {
    title: "The Philosophy of Trust in Systems",
    excerpt: "Why trust isn’t optional and how it shapes our digital lives...",
    url: "#"
    },
    {
    title: "Cryptography: The Art and Science",
    excerpt: "Exploring the foundations of encryption and its future...",
    url: "#"
    },
    {
    title: "Sustainable Security Design",
    excerpt: "Building security solutions that stand the test of time...",
    url: "#"
    }
];

const postsContainer = document.getElementById('posts');
blogPosts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <h3 class="post-title">${post.title}</h3>
    <p class="post-excerpt">${post.excerpt}</p>
    `;
    postEl.addEventListener('click', () => {
    window.location.href = post.url;
    });
    postsContainer.appendChild(postEl);
});

// Matrix animation with 10-second run then 10-second skyline building
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const letters = "01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let animationId;
let phase = 'matrix'; // 'matrix', 'building', 'complete'
let startTime = Date.now();

// Skyline building variables
let skylineHeights = [];
let currentHeights = [];
let buildingSpeed = 0.15; // letters per frame

function initSkyline() {
    skylineHeights = [];
    currentHeights = [];
    for (let i = 0; i < columns; i++) {
    // Create varied skyline heights for a cool cityscape
    const baseHeight = Math.floor(canvas.height / fontSize * 0.15); // 15% of canvas
    const variation = Math.floor(Math.random() * (canvas.height / fontSize * 0.35)); // up to 35% more
    skylineHeights[i] = Math.min(baseHeight + variation, Math.floor(canvas.height / fontSize) - 2);
    currentHeights[i] = 0;
    }
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#89CFF0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
    }
    drops[i]++;
    }
}

function drawBuildingSkyline() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#89CFF0";
    ctx.font = fontSize + "px monospace";

    // Build skyline gradually
    for (let i = 0; i < columns; i++) {
    // Increase building height gradually
    if (currentHeights[i] < skylineHeights[i]) {
        currentHeights[i] += buildingSpeed;
    }
    
    let x = i * fontSize;
    let height = Math.floor(currentHeights[i]);
    
    // Draw the building column
    for (let j = 0; j < height; j++) {
        const y = canvas.height - (j * fontSize);
        const letter = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(letter, x, y);
    }
    }
}

function drawFinalSkyline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#89CFF0";
    ctx.font = fontSize + "px monospace";

    // Draw final static skyline
    for (let i = 0; i < columns; i++) {
    let x = i * fontSize;
    let height = skylineHeights[i];
    
    for (let j = 0; j < height; j++) {
        const y = canvas.height - (j * fontSize);
        const letter = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(letter, x, y);
    }
    }
}

function animate() {
    const elapsed = Date.now() - startTime;
    
    if (phase === 'matrix' && elapsed < 10000) {
    drawMatrix();
    animationId = requestAnimationFrame(animate);
    } else if (phase === 'matrix' && elapsed >= 10000) {
    // Transition to building phase
    phase = 'building';
    initSkyline();
    animationId = requestAnimationFrame(animate);
    } else if (phase === 'building' && elapsed < 20000) {
    drawBuildingSkyline();
    animationId = requestAnimationFrame(animate);
    } else if (phase === 'building' && elapsed >= 20000) {
    // Final phase - draw static skyline
    phase = 'complete';
    drawFinalSkyline();
    // Animation complete - no more frames needed
    }
}

animate();