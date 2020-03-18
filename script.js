const canvas = document.querySelector('canvas');
const context =canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 10,
    height: 10,
    speed: 100,
    angel: Math.PI / 2,
};
const platforma = {
    x: 10,
    y: canvas.height - 10,
    width: 200,
    height: 5,    
    speed: 200,
};

const blocks = [
    {x: 50, y: 50, width: 100, height: 20},
    {x: 100, y: 50, width: 100, height: 20},
    {x: 150, y: 50, width: 100, height: 20},
    {x: 200, y: 50, width: 100, height: 20},
];

requestAnimationFrame(loop);

function loop(timestamp) {
    requestAnimationFrame(loop);
    clearCanvas();

    ball.x += ball * Math.cos(ball.angel);

    drawRect(ball);
}

function clearCanvas() {
    canvas.width |= 0;
}

// drawRect(ball);
// drawRect(platforma);

// for (const block of blocks) {
//     drawRect(block);
// }

function drawRect (param) {
    context.beginPath();   
    context.rect(param.x, param.y, param.width, param.height);
    context.strokeStyle = 'red';
    context.stroke();
}


