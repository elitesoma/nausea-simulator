const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const clock = document.getElementById('clock');
const powerDisplay = document.getElementById('power');

let power = 100;
let hour = 0;
let seconds = 0;
let cameraActive = false;
let leftDoorClosed = false;
let rightDoorClosed = false;

function updateClock() {
  hour += 1;
  if (hour < 6) {
    clock.innerText = `${hour}:00 AM`;
  } else {
    clock.innerText = `6:00 AM`;
    alert("You survived Hoodie’s Dungeon!");
    clearInterval(gameLoop);
  }
}

function drawOffice() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#333";
  ctx.fillRect(0, 450, canvas.width, 150); // Desk

  if (leftDoorClosed) {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 50, canvas.height);
  }
  if (rightDoorClosed) {
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);
  }

  if (cameraActive) {
    ctx.fillStyle = "#004";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px monospace";
    ctx.fillText("CAM 1A - Dungeon Entrance", 20, 50);
  }
}

function drawPower() {
  power -= cameraActive || leftDoorClosed || rightDoorClosed ? 0.05 : 0.01;
  power = Math.max(0, power);
  powerDisplay.innerText = `${power.toFixed(0)}%`;

  if (power <= 0) {
    alert("Power Outage! Hoodie got you.");
    clearInterval(gameLoop);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'c') cameraActive = !cameraActive;
  if (e.key === 'a') leftDoorClosed = !leftDoorClosed;
  if (e.key === 'd') rightDoorClosed = !rightDoorClosed;
});

function render() {
  drawOffice();
  drawPower();
}

const gameLoop = setInterval(() => {
  seconds++;
  if (seconds % 10 === 0) updateClock(); // every 10 sec = 1 hour
  render();
}, 1000 / 30);
