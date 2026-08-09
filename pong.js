const PONG_WIN_SCORE = 5;

let pongCanvas = null;
let pongContext = null;

let pongAnimationFrame = null;
let pongRunning = false;
let pongGameActive = false;

let pongPlayerScore = 0;
let pongPcScore = 0;

const pongKeys = {
    up: false,
    down: false
};


/* =========================
   BALL
========================= */

const pongBall = {
    x: 0,
    y: 0,
    size: 24,
    speedX: 3,
    speedY: 2
};


/* =========================
   PLAYER
========================= */

const pongPlayer = {
    x: 12,
    y: 0,
    width: 8,
    height: 66,
    speed: 6
};


/* =========================
   PC
========================= */

const pongPc = {
    x: 0,
    y: 0,
    width: 8,
    height: 66,
    speed: 4
};


/* =========================
   PRESENT
========================= */

const pongPresent = new Image();

pongPresent.src = "present.png";


/* =========================
   OPEN PONG
========================= */

function openPong() {

    stopPong();

    pongGameActive = false;

    const gameWindow =
        document.getElementById("pongWindow");

    const startWindow =
        document.getElementById("pongStartWindow");

    const endWindow =
        document.getElementById("pongEndWindow");


    if (gameWindow) {
        gameWindow.style.display = "none";
    }

    if (endWindow) {
        endWindow.style.display = "none";
    }

    if (startWindow) {
        startWindow.style.display = "flex";
    }
}


/* =========================
   START GAME
========================= */

function startPongGame() {

    stopPong();

    const startWindow =
        document.getElementById("pongStartWindow");

    const gameWindow =
        document.getElementById("pongWindow");

    if (startWindow) {
        startWindow.style.display = "none";
    }

    if (gameWindow) {
        gameWindow.style.display = "flex";
    }

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

    pongGameActive = true;
    pongRunning = true;

    startPong();
}


/* =========================
   CLOSE PONG
========================= */

function closePong() {

    /*
     * This is important.
     * Closing Pong ALWAYS kills
     * the animation loop.
     */

    pongGameActive = false;

    stopPong();

    const gameWindow =
        document.getElementById("pongWindow");

    const startWindow =
        document.getElementById("pongStartWindow");

    const endWindow =
        document.getElementById("pongEndWindow");


    if (gameWindow) {
        gameWindow.style.display = "none";
    }

    if (startWindow) {
        startWindow.style.display = "none";
    }

    if (endWindow) {
        endWindow.style.display = "none";
    }
}


/* =========================
   START LOOP
========================= */

function startPong() {

    if (!pongGameActive) {
        return;
    }

    if (pongAnimationFrame !== null) {

        cancelAnimationFrame(
            pongAnimationFrame
        );

        pongAnimationFrame = null;
    }

    pongAnimationFrame =
        requestAnimationFrame(pongLoop);
}


/* =========================
   STOP LOOP
========================= */

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


/* =========================
   GAME LOOP
========================= */

function pongLoop() {

    /*
     * Double safety:
     * never update if game isn't active.
     */

    if (
        !pongRunning ||
        !pongGameActive
    ) {

        pongAnimationFrame = null;

        return;
    }


    updatePong();

    drawPong();


    pongAnimationFrame =
        requestAnimationFrame(
            pongLoop
        );
}


/* =========================
   RESET ROUND
========================= */

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


/* =========================
   UPDATE
========================= */

function updatePong() {

    updatePongPlayer();

    updatePongPc();

    updatePongBall();
}


/* =========================
   PLAYER
========================= */

function updatePongPlayer() {

    if (pongKeys.up) {
        pongPlayer.y -=
            pongPlayer.speed;
    }

    if (pongKeys.down) {
        pongPlayer.y +=
            pongPlayer.speed;
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


/* =========================
   PC AI
========================= */

function updatePongPc() {

    const target =
        pongBall.y +
        pongBall.size / 2;


    const paddleCenter =
        pongPc.y +
        pongPc.height / 2;


    const difference =
        target -
        paddleCenter;


    if (Math.abs(difference) > 5) {

        if (difference > 0) {

            pongPc.y +=
                pongPc.speed;

        } else {

            pongPc.y -=
                pongPc.speed;
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


/* =========================
   BALL
========================= */

function updatePongBall() {

    pongBall.x +=
        pongBall.speedX;

    pongBall.y +=
        pongBall.speedY;


    /*
     * TOP
     */

    if (pongBall.y <= 0) {

        pongBall.y = 0;

        pongBall.speedY *= -1;
    }


    /*
     * BOTTOM
     */

    if (
        pongBall.y +
        pongBall.size >=
        pongCanvas.height
    ) {

        pongBall.y =
            pongCanvas.height -
            pongBall.size;

        pongBall.speedY *= -1;
    }


    /*
     * PLAYER
     */

    if (
        pongBall.speedX < 0 &&
        pongBall.x <=
            pongPlayer.x +
            pongPlayer.width &&
        pongBall.x +
            pongBall.size >=
            pongPlayer.x &&
        pongBall.y +
            pongBall.size >=
            pongPlayer.y &&
        pongBall.y <=
            pongPlayer.y +
            pongPlayer.height
    ) {

        pongBall.x =
            pongPlayer.x +
            pongPlayer.width;

        pongBall.speedX =
            Math.abs(
                pongBall.speedX
            ) + 0.15;

        adjustPongBounce(
            pongPlayer
        );
    }


    /*
     * PC
     */

    if (
        pongBall.speedX > 0 &&
        pongBall.x +
            pongBall.size >=
            pongPc.x &&
        pongBall.x <=
            pongPc.x +
            pongPc.width &&
        pongBall.y +
            pongBall.size >=
            pongPc.y &&
        pongBall.y <=
            pongPc.y +
            pongPc.height
    ) {

        pongBall.x =
            pongPc.x -
            pongBall.size;

        pongBall.speedX =
            -Math.abs(
                pongBall.speedX
            ) - 0.15;

        adjustPongBounce(
            pongPc
        );
    }


    /*
     * PLAYER MISSED
     */

    if (
        pongBall.x +
        pongBall.size < 0
    ) {

        pongPcScore++;

        updatePongScore();

        if (
            pongPcScore >=
            PONG_WIN_SCORE
        ) {

            endPongGame(
                "THE PC WINS!"
            );

            return;
        }

        resetPongRound();

        return;
    }


    /*
     * PC MISSED
     */

    if (
        pongBall.x >
        pongCanvas.width
    ) {

        pongPlayerScore++;

        updatePongScore();

        if (
            pongPlayerScore >=
            PONG_WIN_SCORE
        ) {

            endPongGame(
                "YOU WIN!"
            );

            return;
        }

        resetPongRound();
    }
}


/* =========================
   BOUNCE
========================= */

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


/* =========================
   DRAW
========================= */

function drawPong() {

    const ctx =
        pongContext;


    ctx.clearRect(
        0,
        0,
        pongCanvas.width,
        pongCanvas.height
    );


    /*
     * BACKGROUND
     */

    ctx.fillStyle =
        "#20233d";

    ctx.fillRect(
        0,
        0,
        pongCanvas.width,
        pongCanvas.height
    );


    /*
     * CENTER LINE
     */

    ctx.fillStyle =
        "#59648f";


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


    /*
     * PADDLES
     */

    ctx.fillStyle =
        "#aeb8ee";


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


    /*
     * PRESENT
     */

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

        ctx.imageSmoothingEnabled =
            false;

        ctx.drawImage(
            pongPresent,
            Math.round(pongBall.x),
            Math.round(pongBall.y),
            pongBall.size,
            pongBall.size
        );

    } else {

        ctx.fillStyle =
            "#d8a0b8";

        ctx.fillRect(
            Math.round(pongBall.x),
            Math.round(pongBall.y),
            pongBall.size,
            pongBall.size
        );
    }


    ctx.restore();
}


/* =========================
   SCORE
========================= */

function updatePongScore() {

    const score =
        document.getElementById(
            "pongScore"
        );

    if (!score) {
        return;
    }


    score.textContent =
        `${String(pongPlayerScore).padStart(2, "0")}  ${String(pongPcScore).padStart(2, "0")}`;
}


/* =========================
   END GAME
========================= */

function endPongGame(message) {

    pongGameActive = false;

    stopPong();

    showPongEndWindow(message);
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


/* =========================
   CLOSE END WINDOW
========================= */

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


/* =========================
   KEYBOARD
========================= */

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