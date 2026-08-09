const PONG_WIN_SCORE = 5;

let pongCanvas = null;
let pongContext = null;
let pongAnimationFrame = null;
let pongRunning = false;

let pongPlayerScore = 0;
let pongPcScore = 0;

const pongKeys = {
    up: false,
    down: false
};

const pongBall = {
    x: 0,
    y: 0,
    size: 24,
    speedX: 3,
    speedY: 2
};

const pongPlayer = {
    x: 12,
    y: 0,
    width: 6,
    height: 48,
    speed: 5
};

const pongPc = {
    x: 0,
    y: 0,
    width: 6,
    height: 48,
    speed: 3.5
};

const pongPresent = new Image();
pongPresent.src = "present.png";

function openPong() {

    const windowElement =
        document.getElementById("pongWindow");

    if (!windowElement) {
        return;
    }

    windowElement.style.display = "flex";

    setupPong();
}


function closePong() {

    const windowElement =
        document.getElementById("pongWindow");

    if (windowElement) {
        windowElement.style.display = "none";
    }

    stopPong();
}

function setupPong() {

    stopPong();

    pongCanvas =
        document.getElementById("pongCanvas");

    if (!pongCanvas) {
        return;
    }

    pongContext =
        pongCanvas.getContext("2d");

    pongPlayerScore = 0;
    pongPcScore = 0;

    pongPlayer.x = 12;

    pongPc.x =
        pongCanvas.width -
        pongPc.width -
        12;

    updatePongScore();

    resetPongRound();

    pongRunning = true;

    startPong();
}

function startPong() {

    if (!pongCanvas || !pongContext) {
        return;
    }

    if (pongAnimationFrame !== null) {
        cancelAnimationFrame(
            pongAnimationFrame
        );
    }

    pongAnimationFrame =
        requestAnimationFrame(pongLoop);
}


function stopPong() {

    pongRunning = false;

    if (pongAnimationFrame !== null) {

        cancelAnimationFrame(
            pongAnimationFrame
        );

        pongAnimationFrame = null;
    }

    pongKeys.up = false;
    pongKeys.down = false;
}

function resetPong() {

    if (!pongCanvas) {
        return;
    }

    stopPong();

    pongPlayerScore = 0;
    pongPcScore = 0;

    pongPlayer.x = 12;

    pongPc.x =
        pongCanvas.width -
        pongPc.width -
        12;

    updatePongScore();

    resetPongRound();

    pongRunning = true;

    startPong();
}

function resetPongRound() {

    if (!pongCanvas) {
        return;
    }

    pongPlayer.y =
        (pongCanvas.height -
            pongPlayer.height) / 2;

    pongPc.y =
        (pongCanvas.height -
            pongPc.height) / 2;

    pongBall.x =
        (pongCanvas.width -
            pongBall.size) / 2;

    pongBall.y =
        (pongCanvas.height -
            pongBall.size) / 2;

    const direction =
        Math.random() < 0.5
            ? -1
            : 1;

    pongBall.speedX =
        3 * direction;

    pongBall.speedY =
        (Math.random() * 2 + 1) *
        (
            Math.random() < 0.5
                ? -1
                : 1
        );
}

function pongLoop() {

    if (!pongRunning) {
        pongAnimationFrame = null;
        return;
    }

    updatePong();

    drawPong();

    pongAnimationFrame =
        requestAnimationFrame(pongLoop);
}

function updatePong() {

    updatePongPlayer();
    updatePongPc();
    updatePongBall();
}

function updatePongPlayer() {

    if (pongKeys.up) {
        pongPlayer.y -= pongPlayer.speed;
    }

    if (pongKeys.down) {
        pongPlayer.y += pongPlayer.speed;
    }

    if (pongPlayer.y < 0) {
        pongPlayer.y = 0;
    }

    if (
        pongPlayer.y +
        pongPlayer.height >
        pongCanvas.height
    ) {

        pongPlayer.y =
            pongCanvas.height -
            pongPlayer.height;
    }
}

function updatePongPc() {

    const target =
        pongBall.y +
        pongBall.size / 2;

    const paddleCenter =
        pongPc.y +
        pongPc.height / 2;

    const difference =
        target - paddleCenter;

    if (Math.abs(difference) > 5) {

        if (difference > 0) {
            pongPc.y += pongPc.speed;
        } else {
            pongPc.y -= pongPc.speed;
        }
    }

    if (pongPc.y < 0) {
        pongPc.y = 0;
    }

    if (
        pongPc.y +
        pongPc.height >
        pongCanvas.height
    ) {

        pongPc.y =
            pongCanvas.height -
            pongPc.height;
    }
}

function updatePongBall() {

    pongBall.x += pongBall.speedX;
    pongBall.y += pongBall.speedY;

    if (pongBall.y <= 0) {

        pongBall.y = 0;
        pongBall.speedY *= -1;
    }

    if (
        pongBall.y + pongBall.size >=
        pongCanvas.height
    ) {

        pongBall.y =
            pongCanvas.height - pongBall.size;

        pongBall.speedY *= -1;
    }

    if (
        pongBall.speedX < 0 &&
        pongBall.x <=
            pongPlayer.x +
            pongPlayer.width &&
        pongBall.x + pongBall.size >=
            pongPlayer.x &&
        pongBall.y + pongBall.size >=
            pongPlayer.y &&
        pongBall.y <=
            pongPlayer.y +
            pongPlayer.height
    ) {

        pongBall.x =
            pongPlayer.x +
            pongPlayer.width;

        pongBall.speedX =
            Math.abs(pongBall.speedX) + 0.15;

        adjustPongBounce(pongPlayer);
    }

    if (
        pongBall.speedX > 0 &&
        pongBall.x + pongBall.size >=
            pongPc.x &&
        pongBall.x <=
            pongPc.x +
            pongPc.width &&
        pongBall.y + pongBall.size >=
            pongPc.y &&
        pongBall.y <=
            pongPc.y +
            pongPc.height
    ) {

        pongBall.x =
            pongPc.x -
            pongBall.size;

        pongBall.speedX =
            -Math.abs(pongBall.speedX) - 0.15;

        adjustPongBounce(pongPc);
    }

    if (
        pongBall.x +
        pongBall.size < 0
    ) {

        pongPcScore++;

        updatePongScore();

        checkPongWinner();

        if (pongRunning) {
            resetPongRound();
        }

        return;
    }

    if (
        pongBall.x >
        pongCanvas.width
    ) {

        pongPlayerScore++;

        updatePongScore();

        checkPongWinner();

        if (pongRunning) {
            resetPongRound();
        }

        return;
    }
}

function adjustPongBounce(paddle) {

    const paddleCenter =
        paddle.y +
        paddle.height / 2;

    const ballCenter =
        pongBall.y +
        pongBall.size / 2;

    const difference =
        ballCenter -
        paddleCenter;

    const normalized =
        difference /
        (paddle.height / 2);

    pongBall.speedY =
        normalized * 4;
}

function drawPong() {

    const ctx = pongContext;

    ctx.clearRect(
        0,
        0,
        pongCanvas.width,
        pongCanvas.height
    );

    ctx.fillStyle = "#20233d";

    ctx.fillRect(
        0,
        0,
        pongCanvas.width,
        pongCanvas.height
    );

    ctx.fillStyle = "#59648f";

    for (
        let y = 0;
        y < pongCanvas.height;
        y += 12
    ) {

        ctx.fillRect(
            pongCanvas.width / 2 - 1,
            y,
            2,
            6
        );
    }

    ctx.fillStyle = "#aeb8ee";

    ctx.fillRect(
        pongPlayer.x,
        pongPlayer.y,
        pongPlayer.width,
        pongPlayer.height
    );

    ctx.fillRect(
        pongPc.x,
        pongPc.y,
        pongPc.width,
        pongPc.height
    );

    ctx.save();

    ctx.beginPath();

    ctx.rect(
        0,
        0,
        pongCanvas.width,
        pongCanvas.height
    );

    ctx.clip();

    if (
        pongPresent.complete &&
        pongPresent.naturalWidth > 0
    ) {

        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            pongPresent,
            Math.round(pongBall.x),
            Math.round(pongBall.y),
            pongBall.size,
            pongBall.size
        );

    } else {

        ctx.fillStyle = "#d8a0b8";

        ctx.fillRect(
            Math.round(pongBall.x),
            Math.round(pongBall.y),
            pongBall.size,
            pongBall.size
        );
    }

    ctx.restore();
}

function updatePongScore() {

    const score =
        document.getElementById("pongScore");

    if (!score) {
        return;
    }

    score.textContent =
        `${String(pongPlayerScore).padStart(2, "0")}  ${String(pongPcScore).padStart(2, "0")}`;
}

function checkPongWinner() {

    if (
        pongPlayerScore >=
        PONG_WIN_SCORE
    ) {

        pongRunning = false;

        showPongEndWindow(
            "YOU WIN!"
        );

        return;
    }

    if (
        pongPcScore >=
        PONG_WIN_SCORE
    ) {

        pongRunning = false;

        showPongEndWindow(
            "THE PC WINS!"
        );
    }
}


function showPongEndWindow(message) {

    const windowElement =
        document.getElementById(
            "pongEndWindow"
        );

    const messageElement =
        document.getElementById(
            "pongEndMessage"
        );

    if (messageElement) {
        messageElement.textContent =
            message;
    }

    if (windowElement) {
        windowElement.style.display =
            "flex";
    }
}


function closePongEnd() {

    const windowElement =
        document.getElementById(
            "pongEndWindow"
        );

    if (windowElement) {
        windowElement.style.display =
            "none";
    }
}

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "w" ||
            event.key === "W"
        ) {

            pongKeys.up = true;

            event.preventDefault();
        }

        if (
            event.key === "s" ||
            event.key === "S"
        ) {

            pongKeys.down = true;

            event.preventDefault();
        }
    }
);


document.addEventListener(
    "keyup",
    function(event) {

        if (
            event.key === "w" ||
            event.key === "W"
        ) {

            pongKeys.up = false;
        }

        if (
            event.key === "s" ||
            event.key === "S"
        ) {

            pongKeys.down = false;
        }
    }
);