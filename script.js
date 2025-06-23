const canvas = document.getElementById('nauseaCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;
let scale = 1;
let lastFrameTime = 0;

function randomColor() {
  return `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
}

function drawSpiralPattern(cx, cy, maxRadius, spacing) {
  for (let i = 0; i < maxRadius; i += spacing) {
    const x = cx + i * Math.cos(i);
    const y = cy + i * Math.sin(i);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255,255,255,0.1)`;
    ctx.fill();
  }
}

function drawMoiréEffect() {
  const spacing = 12;
  for (let i = 0; i < canvas.height; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
    ctx.stroke();
  }
}

function drawRGBOverlay() {
  ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.1)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(timestamp) {
  const elapsed = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  // Simulate FPS drop
  if (Math.random() < 0.05) {
    setTimeout(() => requestAnimationFrame(draw), Math.random() * 200);
    return;
  }

  ctx.save();

  // Rotate canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Background flicker
  ctx.fillStyle = randomColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Visual chaos
  drawSpiralPattern(canvas.width / 2, canvas.height / 2, 1000, 7);
  drawMoiréEffect();
  drawRGBOverlay();

  ctx.restore();

  // Jitter scale + rotation
  angle += Math.random() * 0.02;
  scale = 1 + Math.sin(timestamp / 200) * 0.03;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

