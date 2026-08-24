/* ===== 粒子网络 + 背景主题 ===== */

// 漫画风主题：保留原 key 名称（localStorage 兼容），统一为「黑色描边 + 鲜艳主色 + 半色调网点」
const THEMES = {
  sky: {
    name: "漫画红",
    bg: "#fff8eb",
    border: "#1a1a1a",
    borderSubtle: "#2a2a2a",
    text: "#1a1a1a",
    textDim: "#4a4a4a",
    muted: "#6e6e6e",
    particle: "255, 61, 84",
    particleLine: "26, 26, 26",
    glow1: "255, 61, 84",
    glow2: "67, 97, 238",
    glow3: "255, 204, 51",
  },
  mintLight: {
    name: "漫画薄荷",
    bg: "#f0fff8",
    border: "#1a1a1a",
    borderSubtle: "#2a2a2a",
    text: "#1a1a1a",
    textDim: "#4a4a4a",
    muted: "#6e6e6e",
    particle: "6, 214, 160",
    particleLine: "26, 26, 26",
    glow1: "6, 214, 160",
    glow2: "67, 97, 238",
    glow3: "255, 204, 51",
  },
  warmWhite: {
    name: "漫画黄",
    bg: "#fff9e8",
    border: "#1a1a1a",
    borderSubtle: "#2a2a2a",
    text: "#1a1a1a",
    textDim: "#4a4a4a",
    muted: "#6e6e6e",
    particle: "255, 150, 51",
    particleLine: "26, 26, 26",
    glow1: "255, 204, 51",
    glow2: "255, 61, 84",
    glow3: "6, 214, 160",
  },
  lavender: {
    name: "漫画紫",
    bg: "#f8f0ff",
    border: "#1a1a1a",
    borderSubtle: "#2a2a2a",
    text: "#1a1a1a",
    textDim: "#4a4a4a",
    muted: "#6e6e6e",
    particle: "155, 93, 229",
    particleLine: "26, 26, 26",
    glow1: "155, 93, 229",
    glow2: "67, 97, 238",
    glow3: "255, 61, 84",
  },
  slateGray: {
    name: "漫画蓝",
    bg: "#f0f4ff",
    border: "#1a1a1a",
    borderSubtle: "#2a2a2a",
    text: "#1a1a1a",
    textDim: "#4a4a4a",
    muted: "#6e6e6e",
    particle: "67, 97, 238",
    particleLine: "26, 26, 26",
    glow1: "67, 97, 238",
    glow2: "155, 93, 229",
    glow3: "6, 214, 160",
  },
  coral: {
    name: "漫画粉",
    bg: "#fff0f5",
    border: "#1a1a1a",
    borderSubtle: "#2a2a2a",
    text: "#1a1a1a",
    textDim: "#4a4a4a",
    muted: "#6e6e6e",
    particle: "255, 107, 181",
    particleLine: "26, 26, 26",
    glow1: "255, 107, 181",
    glow2: "155, 93, 229",
    glow3: "255, 61, 84",
  },
};

const THEME_KEY = "portfolio-theme";
let currentTheme = localStorage.getItem(THEME_KEY) || "sky";

// 粒子颜色变量 —— 提前声明，供 applyTheme() 和粒子循环共用
let particleRGB = (THEMES[currentTheme] || THEMES.sky).particle;
let lineRGB    = (THEMES[currentTheme] || THEMES.sky).particleLine;

function buildBgImage(t) {
  return [
    // 半色调网点（漫画标志）— 黑色细网点
    `radial-gradient(circle, rgba(26, 26, 26, 0.07) 1.5px, transparent 1.8px)`,
    // 彩色细网点
    `radial-gradient(circle, rgba(${t.glow1}, 0.05) 1px, transparent 1.5px)`,
    // 彩色光晕
    `radial-gradient(ellipse 800px 600px at 85% 0%, rgba(${t.glow1}, 0.10) 0%, transparent 60%)`,
    `radial-gradient(ellipse 600px 500px at 5% 100%, rgba(${t.glow2}, 0.08) 0%, transparent 60%)`,
    `radial-gradient(ellipse 500px 400px at 95% 85%, rgba(${t.glow3}, 0.12) 0%, transparent 60%)`,
  ].join(", ");
}

function applyTheme(id) {
  const t = THEMES[id] || THEMES.sky;
  currentTheme = id;
  localStorage.setItem(THEME_KEY, id);

  const root = document.documentElement;
  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--border", t.border);
  root.style.setProperty("--border-subtle", t.borderSubtle);
  root.style.setProperty("--text", t.text);
  root.style.setProperty("--text-dim", t.textDim);
  root.style.setProperty("--muted", t.muted);

  document.body.style.backgroundColor = t.bg;
  document.body.style.backgroundImage = buildBgImage(t);
  document.body.style.backgroundSize = "18px 18px, 36px 36px, 100% 100%, 100% 100%, 100% 100%";

  particleRGB  = t.particle;
  lineRGB     = t.particleLine;

  document.querySelectorAll(".swatch").forEach((el) => {
    el.classList.toggle("active", el.dataset.theme === id);
  });
}

function buildSwatches() {
  const container = document.getElementById("theme-swatches");
  container.innerHTML = Object.entries(THEMES)
    .map(([id, t]) =>
      `<button class="swatch${id === currentTheme ? " active" : ""}" data-theme="${id}" aria-label="${t.name}" title="${t.name}"><span style="background:${t.bg}"></span></button>`)
    .join("");

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".swatch");
    if (!btn) return;
    applyTheme(btn.dataset.theme);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildSwatches();
  applyTheme(currentTheme);

  const toggle = document.querySelector(".theme-toggle");
  const picker = document.querySelector(".theme-picker");
  if (toggle && picker) {
    toggle.addEventListener("click", () => picker.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (!picker.contains(e.target)) picker.classList.remove("open");
    });
  }
});

// ═══════════════ 粒子系统 ═══════════════
const canvas = document.getElementById("particle-canvas");
const ctx    = canvas.getContext("2d");

const PARTICLE_COUNT = 60;
const CONNECT_DIST   = 130;
const MOUSE_RADIUS   = 200;
const MOUSE_FORCE    = 0.028;

let particles = [];
let mouse     = { x: -9999, y: -9999 };

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}
window.addEventListener("resize", resize);
window.addEventListener("scroll", () => { canvas.height = document.body.scrollHeight; });

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY + window.scrollY;
});
document.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });
document.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY + window.scrollY;
}, { passive: true });
document.addEventListener("touchend", () => { mouse.x = -9999; mouse.y = -9999; });

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.8,
    opacity: Math.random() * 0.3 + 0.18,
  };
}

particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

(function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -30) p.x = canvas.width + 30;
    if (p.x > canvas.width + 30) p.x = -30;
    if (p.y < -30) p.y = canvas.height + 30;
    if (p.y > canvas.height + 30) p.y = -30;

    const dxm = p.x - mouse.x;
    const dym = p.y - mouse.y;
    const distM = Math.sqrt(dxm * dxm + dym * dym);
    if (distM < MOUSE_RADIUS && distM > 0) {
      const force = ((MOUSE_RADIUS - distM) / MOUSE_RADIUS) * MOUSE_FORCE;
      p.vx += (dxm / distM) * force;
      p.vy += (dym / distM) * force;
    }
    p.vx *= 0.999;
    p.vy *= 0.999;
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > 1.0) {
      p.vx = (p.vx / speed) * 1.0;
      p.vy = (p.vy / speed) * 1.0;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particleRGB}, ${p.opacity})`;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_DIST) {
        const alpha = (1 - dist / CONNECT_DIST) * 0.18;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }

  if (mouse.x > 0 && mouse.y > 0) {
    const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
    grd.addColorStop(0,   `rgba(${particleRGB}, 0.08)`);
    grd.addColorStop(0.5, `rgba(${particleRGB}, 0.03)`);
    grd.addColorStop(1,   `rgba(${particleRGB}, 0)`);
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  requestAnimationFrame(draw);
})();

resize();
