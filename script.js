// script.js const canvas = document.getElementById("gameCanvas"); const ctx = canvas.getContext("2d"); canvas.width = window.innerWidth * 0.95; canvas.height = 300;

let score = 0; let player = { x: 50, y: canvas.height - 60, width: 40, height: 40, vy: 0, jumpPower: 15, gravity: 1, grounded: true };

let enemies = []; let enemyNames = ["Tanush", "Divraaj", "Irya", "Khanak"]; let enemySprites = ["pixel_dude.png", "pixel_dude2.png", "pixel_girl.png", "pixel_girl2.png"];

function drawPlayer() { ctx.fillStyle = "blue"; ctx.fillRect(player.x, player.y, player.width, player.height); }

function drawEnemies() { ctx.fillStyle = "red"; enemies.forEach(enemy => { ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height); }); }

function updatePlayer() { player.y += player.vy; if (player.y + player.height < canvas.height) { player.vy += player.gravity; player.grounded = false; } else { player.vy = 0; player.y = canvas.height - player.height; player.grounded = true; } }

function createEnemy() { const enemy = { x: canvas.width, y: canvas.height - 40, width: 40, height: 40, speed: 6 }; enemies.push(enemy); }

function updateEnemies() { enemies.forEach((enemy, index) => { enemy.x -= enemy.speed; if (enemy.x + enemy.width < 0) { enemies.splice(index, 1); score++; document.getElementById("score").innerText = Score: ${score}; }

if (
  player.x < enemy.x + enemy.width &&
  player.x + player.width > enemy.x &&
  player.y < enemy.y + enemy.height &&
  player.y + player.height > enemy.y
) {
  alert("Oops! You hit an alliance member! Refresh to try again.");
  document.location.reload();
}

}); }

function gameLoop() { ctx.clearRect(0, 0, canvas.width, canvas.height); drawPlayer(); drawEnemies(); updatePlayer(); updateEnemies(); requestAnimationFrame(gameLoop); }

setInterval(createEnemy, 2000); gameLoop();

document.addEventListener("keydown", e => { if ((e.key === " " || e.key === "ArrowUp") && player.grounded) { player.vy = -player.jumpPower; player.grounded = false; } });

