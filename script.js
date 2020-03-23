const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


canvas.width = 500;
canvas.height = 500;

let image = new Image();
image.src = "sprite.png";




const ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 10,
    height: 10,
    speed: 100,
    angle: Math.PI / 4 + Math.random() * Math.PI / 2,
};
const platforma = {
    x: 10,
    y: canvas.height - 30,
    width: 150,
    height: 20,
    speed: 200,
    leftKey: false,
    rightKey: false,
};

const blocks = [{
        x: 50,
        y: 50,
        width: 50,
        height: 20
    },
    {
        x: 100,
        y: 50,
        width: 50,
        height: 20
    },
    {
        x: 150,
        y: 50,
        width: 50,
        height: 20
    },
    {
        x: 200,
        y: 50,
        width: 50,
        height: 20
    },

];

const limits = [{
        x: 0,
        y: -20,
        width: canvas.width,
        height: 20,
    },
    {
        x: canvas.width,
        y: 0,
        width: 20,
        height: canvas.height,
    },
    {
        x: 0,
        y: canvas.height,
        width: canvas.width,
        height: 20,
    },
    {
        x: -20,
        y: 0,
        width: 20,
        height: canvas.height
    },
];

document.addEventListener("keydown", function (event) {
    if(event.key === 'ArrowLeft') {
        platforma.leftKey = true;
    }

    if(event.key === 'ArrowRight') {
        platforma.rightKey = true;
    }
    
});

document.addEventListener("keyup", function (event) {
    if(event.key === 'ArrowLeft') {
        platforma.leftKey = false;
    }

    if(event.key === 'ArrowRight') {
        platforma.rightKey = false;
    }
    
});

requestAnimationFrame(loop);

let pTimestamp = 0;

function loop(timestamp) {

    requestAnimationFrame(loop);

    const dTimestamp = Math.min(16.7, timestamp - pTimestamp);
    const secondPart = dTimestamp / 1000;
    pTimestamp = timestamp;

    clearCanvas();

    ball.x += secondPart * ball.speed * Math.cos(ball.angle);
    ball.y -= secondPart * ball.speed * Math.sin(ball.angle);

    if (platforma.leftKey) {
        platforma.x = Math.max(0, platforma.x - secondPart * platforma.speed);
    }
    if (platforma.rightKey) {
        platforma.x = Math.min(canvas.width - platforma.width, platforma.x + secondPart * platforma.speed);
    }

    for (const block of blocks) {
        if (isIntersection(block, ball)) {
            toggleItem(blocks, block);

            const ctrl1 = {
                x: block.x - 10,
                y: block.y - 10,
                width: 10 + block.width,
                height: 10,
            };

            const ctrl2 = {
                x: block.x + block.width,
                y: block.y - 10,
                width: 10,
                height: 10 + block.height,
            };

            const ctrl3 = {
                x: block.x,
                y: block.y + block.height,
                width: block.width + 10,
                height: 10,
            };

            const ctrl4 = {
                x: block.x - 10,
                y: block.y,
                width: 10,
                height: block.height + 10,
            };

            if (isIntersection(ctrl1, ball) || isIntersection(ctrl3, ball)) {
                ball.angle = Math.PI * 2 - ball.angle;
            } else if (isIntersection(ctrl2, ball) || isIntersection(ctrl4, ball)) {
                ball.angle = Math.PI - ball.angle;

            }
        }
    }

    if (isIntersection(limits[0], ball) || isIntersection(limits[2], ball)) {
        ball.angle = Math.PI * 2 - ball.angle;
    }

    if (isIntersection(limits[1], ball) || isIntersection(limits[3], ball)) {
        ball.angle = Math.PI - ball.angle;
    }

    if(isIntersection(platforma, ball)) {
        const x = ball.x + ball.width / 2;
        const percent = (x - platforma.x) / platforma.width;
        ball.angle = Math.PI  - Math.PI * 8 / 10 * (percent + 0.05);
    }

    drawBall(ball);

    for (const block of blocks) {
        drawRect(block);
    }

    drawRect(platforma);
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
    const pointsA = [{
            x: blockA.x,
            y: blockA.y
        },
        {
            x: blockA.x + blockA.width,
            y: blockA.y
        },
        {
            x: blockA.x,
            y: blockA.y + blockA.height
        },
        {
            x: blockA.x + blockA.width,
            y: blockA.y + blockA.height
        },
    ];

    for (const pointA of pointsA) {
        if (blockB.x <= pointA.x && pointA.x <= blockB.x + blockB.width && blockB.y <=
            pointA.y && pointA.y <= blockB.y + blockB.height) {
            return true;
        }
    }

    const pointsB = [{
            x: blockB.x,
            y: blockB.y
        },
        {
            x: blockB.x + blockB.width,
            y: blockB.y
        },
        {
            x: blockB.x,
            y: blockB.y + blockB.height
        },
        {
            x: blockB.x + blockB.width,
            y: blockB.y + blockB.height
        },
    ];

    for (const pointB of pointsB) {
        if (blockA.x <= pointB.x && pointB.x <= blockA.x + blockA.width && blockA.y <=
            pointB.y && pointB.y <= blockA.y + blockA.height) {
            return true;
        }
    }
    return false;
}

function toggleItem(array, item) {
    if (array.includes(item)) {
        const index = array.indexOf(item);
        array.splice(index, 1);
    } else {
        array.push(item);
    }
}

function drawBall (ball) {
    context.beginPath();
    context.drawImage(
        image,
        3, 587, 38, 38,        
        ball.x, ball.y, ball.width, ball.height,
    );
}