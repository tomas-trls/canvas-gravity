const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

const mouse = {
  x: undefined,
  y: undefined,
};

let gravity = 1;
let friction = 0.99;
let amountOfBalls = 400;

let colorsArr = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

//Mouse Detection
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

//Responsiveness
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

const randomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

class Ball {
  constructor(x, y, dx, dy, rad, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color;

    this.update = () => {
      if (this.y + this.rad > canvas.height || this.y - this.rad < 0) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += 1;
      }

      if (this.x + this.rad > canvas.width || this.x - this.rad <= 0) {
        this.dx = -this.dx;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
      c.stroke();
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };
  }
}
let ball;
let ballArr = [];

const init = () => {
  ballArr = [];
  let radius = 30;
  for (let i = 0; i < amountOfBalls; i++) {
    let x = Math.random() * (canvas.width - radius * 4) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = Math.floor(Math.random() * (2 - -2 + 1) - 2);

    let color = randomColor(colorsArr);

    ballArr.push(new Ball(x, y, dx, gravity, radius, color));
  }
  console.log(ballArr);
};

const animate = () => {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);
  ballArr.forEach((ball) => {
    ball.update();
  });
};

addEventListener("click", () => {
  init();
});
init();
animate();
