const canvas = document.getElementById('nauseaCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function drawSpiral() {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  for (let i = 0; i < 360; i += 5) {
    const x = Math.cos(i * Math.PI / 180) * i;
    const y = Math.sin(i * Math.PI / 180) * i;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
    ctx.fill();
  }
  ctx.restore();
}

function flickerFrame() {
  ctx.fillStyle = randomColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  flickerFrame();
  drawSpiral();
  angle += Math.random() * 0.2;
  requestAnimationFrame(draw);
}

draw();
