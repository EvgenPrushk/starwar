const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 10,
    height: 10,
    speed: 100,
    angel: Math.PI / 4 + Math.random() * Math.PI / 2,
};
const platforma = {
    x: 10,
    y: canvas.height - 10,
    width: 200,
    height: 5,
    speed: 200,
};

const blocks = [{
        x: 50,
        y: 50,
        width: 100,
        height: 20
    },
    {
        x: 100,
        y: 50,
        width: 100,
        height: 20
    },
    {
        x: 150,
        y: 50,
        width: 100,
        height: 20
    },
    {
        x: 200,
        y: 50,
        width: 100,
        height: 20
    },
];


const limits = [];
requestAnimationFrame(loop);

let pTimestamp = 0;

function loop(timestamp) {

    requestAnimationFrame(loop);

    const dTimestamp = timestamp - pTimestamp;
    const secondPart = dTimestamp / 1000;
    pTimestamp = timestamp;

    clearCanvas();

    ball.x += secondPart * ball.speed * Math.cos(ball.angel);
    ball.y -= secondPart * ball.speed * Math.sin(ball.angel);
    
    for (const block of blocks) {
        if (isIntersection(block, ball)) {
            console.log(true);
            
        }
    }
    
   

    drawRect(ball);

    for (const block of blocks) {
        drawRect(block);
    }

   
}

function clearCanvas() {
    canvas.width |= 0;
}

// drawRect(ball);
// drawRect(platforma);

// for (const block of blocks) {
//     drawRect(block);
// }

function drawRect(param) {
    context.beginPath();
    context.rect(param.x, param.y, param.width, param.height);
    context.strokeStyle = 'red';
    context.stroke();
}

function isIntersection(blockA, blockB) {
    const pointsA = [
        {x: blockA.x, y: blockA.y},
        {x: blockA.x + blockA.width, y: blockA.y},
        {x: blockA.x, y: blockA.y + blockA.height},
        {x: blockA.x + blockA.width, y: blockA.y+ blockA.height},
    ];

    for (const pointA of pointsA) {
        if (blockB.x <= pointA.x && pointA.x <= blockB.x + blockB.width && blockB.y <=
            pointA.y && pointA.y <= blockB.y + blockB.height) {
            return true;
        }
    }

    const pointsB = [
        {x: blockB.x, y: blockB.y},
        {x: blockB.x + blockB.width, y: blockB.y},
        {x: blockB.x, y: blockB.y + blockB.height},
        {x: blockB.x + blockB.width, y: blockB.y+ blockB.height},
    ];

    for (const pointB of pointsB) {
        if (blockA.x <= pointB.x && pointB.x <= blockA.x + blockA.width && blockA.y <=
            pointB.y && pointB.y <= blockA.y + blockA.height) {
            return true;
        }
    }
    return false;
}