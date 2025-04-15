const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fullscreen responsive canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let groundY = canvas.height - 80;
let player = { x: 50, y: groundY, width: 40, height: 40, vy: 0, jumping: false };
let gravity = 1.2;
let enemies = [];
let frames = 0;
let score = 0;

const enemyData = [
  { name: 'Tanush', quote: 'Bro made more posters than ideas.' },
  { name: 'Irya', quote: 'Election or audition?' },
  { name: 'Khanak', quote: 'Manifesting clout one post at a time.' },
  { name: 'Divraaj', quote: 'Volume ≠ vision, bro.' },
  { name: 'Alliance Clone', quote: 'Synchronized? Strategic? Nah.' }
];

function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemy(enemy) {
  ctx.fillStyle = 'red';
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  ctx.fillStyle = 'white';
  ctx.font = '14px sans-serif';
  ctx.fillText(enemy.name, enemy.x, enemy.y - 10);
}

function generateEnemy() {
  let data = enemyData[Math.floor(Math.random() * enemyData.length)];
  enemies.push({
    x: canvas.width,
    y: groundY,
    width: 40,
    height: 40,
    name: data.name,
    quote: data.quote
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;

  if (frames % 100 === 0) generateEnemy();

  player.y += player.vy;
  player.vy += gravity;
  if (player.y >= groundY) {
    player.y = groundY;
    player.jumping = false;
  }

  enemies.forEach((e, i) => {
    e.x -= 5;
    drawEnemy(e);
    if (e.x < player.x + player.width && e.x + e.width > player.x &&
        e.y < player.y + player.height && e.y + e.height > player.y) {
      alert(`Defeated ${e.name}: ${e.quote}`);
      enemies.splice(i, 1);
      score += 10;
    }
  });

  drawPlayer();

  ctx.fillStyle = 'white';
  ctx.font = '18px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestAnimationFrame(update);
}

// Jump on space or tap
function jump() {
  if (!player.jumping) {
    player.vy = -18;
    player.jumping = true;
  }
}

window.addEventListener('keydown', e => {
  if (e.code === 'Space') jump();
});

canvas.addEventListener('touchstart', jump);

update();
