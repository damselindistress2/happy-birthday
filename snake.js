
const snakeCanvas = document.getElementById("snakeCanvas");
const snakeCtx = snakeCanvas.getContext("2d");

const snakeGridSize = 18;
const snakeTileSize = 20;

let snake = [];
let snakeCake = {};
let snakeDirection = { x: 1, y: 0 };
let snakeNextDirection = { x: 1, y: 0 };

let snakeScore = 0;
let snakeCakes = 0;
let snakeTimer = null;
let snakeRunning = false;

function openSnake() {
    document.getElementById("snakeWindow").style.display = "flex";
    drawSnakeStartScreen();
}

function closeSnake() {
    document.getElementById("snakeWindow").style.display = "none";

    snakeRunning = false;

    if (snakeTimer) {
        clearInterval(snakeTimer);
        snakeTimer = null;
    }
}

function startSnake() {

    if (snakeTimer) {
        clearInterval(snakeTimer);
    }

    snake = [
        { x: 8, y: 9 },
        { x: 7, y: 9 },
        { x: 6, y: 9 }
    ];

    snakeDirection = { x: 1, y: 0 };
    snakeNextDirection = { x: 1, y: 0 };

    snakeScore = 0;
    snakeCakes = 0;

    updateSnakeScore();

    snakeCake = createSnakeCake();

    snakeRunning = true;

    document.getElementById("snakeMessage").textContent = "EAT THE CAKE!";

    drawSnake();

    snakeTimer = setInterval(updateSnake, 120);
}

function createSnakeCake() {

    let cake;

    do {
        cake = {
            x: Math.floor(Math.random() * snakeGridSize),
            y: Math.floor(Math.random() * snakeGridSize)
        };
    } while (
        snake.some(segment =>
            segment.x === cake.x &&
            segment.y === cake.y
        )
    );

    return cake;
}

function updateSnake() {

    if (!snakeRunning) {
        return;
    }

    snakeDirection = snakeNextDirection;

    const head = {
        x: snake[0].x + snakeDirection.x,
        y: snake[0].y + snakeDirection.y
    };

    if (
        head.x < 0 ||
        head.x >= snakeGridSize ||
        head.y < 0 ||
        head.y >= snakeGridSize
    ) {
        endSnake();
        return;
    }

    if (
        snake.some(segment =>
            segment.x === head.x &&
            segment.y === head.y
        )
    ) {
        endSnake();
        return;
    }

    snake.unshift(head);

    if (
        head.x === snakeCake.x &&
        head.y === snakeCake.y
    ) {

        snakeScore += 10;
        snakeCakes++;

        updateSnakeScore();

        snakeCake = createSnakeCake();

    } else {

        snake.pop();

    }

    drawSnake();
}

function drawSnake() {

    snakeCtx.clearRect(
        0,
        0,
        snakeCanvas.width,
        snakeCanvas.height
    );

    snakeCtx.fillStyle = "#20233d";

    snakeCtx.fillRect(
        0,
        0,
        snakeCanvas.width,
        snakeCanvas.height
    );

    snakeCtx.strokeStyle = "rgba(174,184,238,.08)";
    snakeCtx.lineWidth = 1;

    for (let i = 0; i <= snakeGridSize; i++) {

        snakeCtx.beginPath();

        snakeCtx.moveTo(
            i * snakeTileSize,
            0
        );

        snakeCtx.lineTo(
            i * snakeTileSize,
            snakeCanvas.height
        );

        snakeCtx.stroke();

        snakeCtx.beginPath();

        snakeCtx.moveTo(
            0,
            i * snakeTileSize
        );

        snakeCtx.lineTo(
            snakeCanvas.width,
            i * snakeTileSize
        );

        snakeCtx.stroke();
    }

    drawSnakeCake();

    snake.forEach((segment, index) => {

        snakeCtx.fillStyle =
            index === 0
                ? "#aeb8ee"
                : "#6D7ABD";

        snakeCtx.fillRect(
            segment.x * snakeTileSize + 2,
            segment.y * snakeTileSize + 2,
            snakeTileSize - 4,
            snakeTileSize - 4
        );

    });
}

function drawSnakeCake() {
    const x = snakeCake.x * snakeTileSize;
    const y = snakeCake.y * snakeTileSize;

    snakeCtx.fillStyle = "#f7faf8";

    snakeCtx.fillRect(x + 3, y + 8, 14, 8);

    snakeCtx.fillStyle = "#aeb8ee";
    snakeCtx.fillRect(x + 3, y + 6, 14, 3);
    snakeCtx.fillRect(x + 5, y + 9, 2, 2);
    snakeCtx.fillRect(x + 11, y + 9, 2, 2);

    snakeCtx.fillStyle = "#6D7ABD";
    snakeCtx.fillRect(x + 3, y + 12, 14, 2);

    snakeCtx.fillStyle = "#3f4975";
    snakeCtx.fillRect(x + 3, y + 15, 14, 2);

    snakeCtx.fillStyle = "#f7faf8";
    snakeCtx.fillRect(x + 9, y + 2, 2, 4);

    snakeCtx.fillStyle = "#aeb8ee";
    snakeCtx.fillRect(x + 9, y + 0, 2, 2);
}

function drawSnakeStartScreen() {

    snakeCtx.fillStyle = "#20233d";

    snakeCtx.fillRect(
        0,
        0,
        snakeCanvas.width,
        snakeCanvas.height
    );

    snakeCtx.fillStyle = "#aeb8ee";

    snakeCtx.font = "28px VT323";
    snakeCtx.textAlign = "center";

    snakeCtx.fillText(
        "SNAKE.EXE",
        snakeCanvas.width / 2,
        150
    );

    snakeCtx.font = "22px VT323";

    snakeCtx.fillText(
        "EAT THE CAKE",
        snakeCanvas.width / 2,
        190
    );

    snakeCtx.fillText(
        "PRESS START",
        snakeCanvas.width / 2,
        230
    );
}

function endSnake() {

    snakeRunning = false;

    if (snakeTimer) {
        clearInterval(snakeTimer);
        snakeTimer = null;
    }

    document.getElementById("snakeMessage").textContent =
        "GAME OVER";

    drawSnake();

    snakeCtx.fillStyle = "#ffffff";

    snakeCtx.font = "26px VT323";
    snakeCtx.textAlign = "center";

    snakeCtx.fillText(
        "GAME OVER",
        snakeCanvas.width / 2,
        170
    );

    snakeCtx.font = "20px VT323";

    snakeCtx.fillText(
        "CAKES EATEN: " + snakeCakes,
        snakeCanvas.width / 2,
        205
    );

    snakeCtx.fillText(
        "SCORE: " + snakeScore,
        snakeCanvas.width / 2,
        235
    );
}

function updateSnakeScore() {

    document.getElementById("snakeScore").textContent =
        snakeScore;

    document.getElementById("snakeCakes").textContent =
        snakeCakes;
}

document.addEventListener("keydown", function(event) {

    if (!snakeRunning) {
        return;
    }

    switch (event.key) {

        case "ArrowUp":

            if (snakeDirection.y === 0) {
                snakeNextDirection = {
                    x: 0,
                    y: -1
                };
            }

            event.preventDefault();

            break;

        case "ArrowDown":

            if (snakeDirection.y === 0) {
                snakeNextDirection = {
                    x: 0,
                    y: 1
                };
            }

            event.preventDefault();

            break;

        case "ArrowLeft":

            if (snakeDirection.x === 0) {
                snakeNextDirection = {
                    x: -1,
                    y: 0
                };
            }

            event.preventDefault();

            break;

        case "ArrowRight":

            if (snakeDirection.x === 0) {
                snakeNextDirection = {
                    x: 1,
                    y: 0
                };
            
                event.preventDefault();
            }

            break;
    }
});

