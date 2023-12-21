const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const FPS = 60;
const radius = 50;
let x = 200;
let y = 300;
let xSpeed = 0; // Set initial speeds to 0
let ySpeed = 0;

function clear() {
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "#92b3f0";
    context.fill();
}

function update() {
    x += xSpeed;
    y += ySpeed;

    const isCollidingWidthRightSide = x + radius >= canvas.width;
    const isCollidingWidthLeftSide = x - radius <= 0;
    const isCollidingUpside = y - radius <= 0;
    const isCollidingBottomside = y + radius >= canvas.height;

    if (isCollidingWidthRightSide || isCollidingWidthLeftSide) {
        xSpeed = -xSpeed;
    }

    if (isCollidingUpside || isCollidingBottomside) {
        ySpeed = -ySpeed;
    }
}

function animate() {
    clear();
    draw();
    update();
}

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    xSpeed = (clickX - x) / 20; // Adjust the division value for speed
    ySpeed = (clickY - y) / 20; // Adjust the division value for speed
});

window.setInterval(animate, 1000 / FPS);
