const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameOver = false;

const gravity = 0.5;
let jumpPower = -12;

const player = {
  x: 50,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  yVelocity: 0,
  jump() {
    if (this.y >= canvas.height - 150) {
      this.yVelocity = jumpPower;
    }
  },
  update() {
    this.yVelocity += gravity;
    this.y += this.yVelocity;

    if (this.y > canvas.height - 150) {
      this.y = canvas.height - 150;
      this.yVelocity = 0;
    }
  },
  draw() {
    ctx.fillStyle = "blue"; // Replace with image later
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

const enemies = [];
const names = ["Tanush", "Divraaj", "Irya", "Khanak", "Enemy5", "Enemy6", "Enemy7", "Enemy8", "Enemy9", "Enemy10", "Enemy11"];

function spawnEnemy() {
  const name = names[Math.floor(Math.random() * names.length)];
  enemies.push({
    x: canvas.width,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    name,
    speed: 6
  });
}

function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].x -= enemies[i].speed;

    // Collision
    if (
      player.x < enemies[i].x + enemies[i].width &&
      player.x + player.width > enemies[i].x &&
      player.y < enemies[i].y + enemies[i].height &&
      player.y + player.height > enemies[i].y
    ) {
      gameOver = true;
    }

    if (enemies[i].x + enemies[i].width < 0) {
      enemies.splice(i, 1);
      score++;
      document.getElementById("score").textContent = `Score: ${score}`;
    }
  }
}

function drawEnemies() {
  enemies.forEach((enemy) => {
    ctx.fillStyle = "red"; // Replace with images
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillStyle = "white";
    ctx.fillText(enemy.name, enemy.x + 5, enemy.y + 30);
  });
}

function loop() {
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over! Vote wisely.", canvas.width / 2 - 150, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  player.draw();

  updateEnemies();
  drawEnemies();

  requestAnimationFrame(loop);
}

setInterval(spawnEnemy, 2000);
loop();

window.addEventListener("touchstart", () => {
  player.jump();
});
