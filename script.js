const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

// Raquetes
const raqueteLargura = 10;
const raqueteAltura = 80;

let raquete1Y = canvas.height / 2 - raqueteAltura / 2;
let raquete2Y = canvas.height / 2 - raqueteAltura / 2;

// Bolinha
let bolaX = canvas.width / 2;
let bolaY = canvas.height / 2;
let bolaVelX = 4;
let bolaVelY = 4;
const bolaRaio = 8;

function desenhar() {
  // Limpa a tela
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha raquetes
  ctx.fillStyle = "#fff";
  ctx.fillRect(10, raquete1Y, raqueteLargura, raqueteAltura);
  ctx.fillRect(canvas.width - 20, raquete2Y, raqueteLargura, raqueteAltura);

  // Desenha bolinha
  ctx.beginPath();
  ctx.arc(bolaX, bolaY, bolaRaio, 0, Math.PI * 2);
  ctx.fill();
}

function atualizar() {
  bolaX += bolaVelX;
  bolaY += bolaVelY;

  // Rebate nas bordas de cima/baixo
  if (bolaY <= 0 || bolaY >= canvas.height) {
    bolaVelY *= -1;
  }

  // Rebate nas raquetes (simplificado)
  if (bolaX <= 20 && bolaY > raquete1Y && bolaY < raquete1Y + raqueteAltura) {
    bolaVelX *= -1;
  }
  if (bolaX >= canvas.width - 20 && bolaY > raquete2Y && bolaY < raquete2Y + raqueteAltura) {
    bolaVelX *= -1;
  }

  // Reinicia se sair da tela
  if (bolaX < 0 || bolaX > canvas.width) {
    bolaX = canvas.width / 2;
    bolaY = canvas.height / 2;
  }

  // Raquete 2 (bot simples, segue a bolinha)
  raquete2Y += (bolaY - (raquete2Y + raqueteAltura / 2)) * 0.05;
}

// Controla a raquete 1 com o mouse
canvas.addEventListener("mousemove", (evento) => {
  const retangulo = canvas.getBoundingClientRect();
  raquete1Y = evento.clientY - retangulo.top - raqueteAltura / 2;
});

function loop() {
  atualizar();
  desenhar();
  requestAnimationFrame(loop);
}

loop();
