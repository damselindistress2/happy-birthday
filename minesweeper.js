const MINESWEEPER_SIZE = 9;
const MINESWEEPER_MINES = 10;

let minesweeperBoard = [];
let minesweeperGameOver = false;
let minesweeperStarted = false;
let minesweeperTimer = 0;
let minesweeperTimerInterval = null;
let minesweeperFlags = 0;


/* =========================
   OPEN / CLOSE
========================= */

function openMinesweeper() {

    const windowElement =
        document.getElementById("minesweeperWindow");

    if (!windowElement) {
        console.error("minesweeperWindow not found");
        return;
    }

    windowElement.style.display = "flex";

    resetMinesweeper();
}


function closeMinesweeper() {

    const windowElement =
        document.getElementById("minesweeperWindow");

    if (windowElement) {
        windowElement.style.display = "none";
    }

    stopMinesweeperTimer();
}


/* =========================
   RESET
========================= */

function resetMinesweeper() {

    stopMinesweeperTimer();

    minesweeperGameOver = false;
    minesweeperStarted = false;
    minesweeperTimer = 0;
    minesweeperFlags = 0;

    const winWindow =
        document.getElementById("minesweeperWinWindow");

    if (winWindow) {
        winWindow.style.display = "none";
    }

    updateMinesweeperCounter();
    updateMinesweeperTimer();

    createMinesweeperBoard();
    renderMinesweeperBoard();
}


/* =========================
   CREATE BOARD
========================= */

function createMinesweeperBoard() {

    minesweeperBoard = [];

    for (
        let row = 0;
        row < MINESWEEPER_SIZE;
        row++
    ) {

        const boardRow = [];

        for (
            let col = 0;
            col < MINESWEEPER_SIZE;
            col++
        ) {

            boardRow.push({
                mine: false,
                revealed: false,
                flagged: false,
                number: 0
            });
        }

        minesweeperBoard.push(boardRow);
    }


    /* Place mines */

    let minesPlaced = 0;

    while (
        minesPlaced < MINESWEEPER_MINES
    ) {

        const row =
            Math.floor(
                Math.random() *
                MINESWEEPER_SIZE
            );

        const col =
            Math.floor(
                Math.random() *
                MINESWEEPER_SIZE
            );

        if (
            !minesweeperBoard[row][col].mine
        ) {

            minesweeperBoard[row][col].mine = true;

            minesPlaced++;
        }
    }


    calculateMinesweeperNumbers();
}


/* =========================
   CALCULATE NUMBERS
========================= */

function calculateMinesweeperNumbers() {

    for (
        let row = 0;
        row < MINESWEEPER_SIZE;
        row++
    ) {

        for (
            let col = 0;
            col < MINESWEEPER_SIZE;
            col++
        ) {

            if (
                minesweeperBoard[row][col].mine
            ) {
                continue;
            }

            let count = 0;

            for (let dr = -1; dr <= 1; dr++) {

                for (let dc = -1; dc <= 1; dc++) {

                    if (
                        dr === 0 &&
                        dc === 0
                    ) {
                        continue;
                    }

                    const neighborRow =
                        row + dr;

                    const neighborCol =
                        col + dc;

                    if (
                        neighborRow >= 0 &&
                        neighborRow < MINESWEEPER_SIZE &&
                        neighborCol >= 0 &&
                        neighborCol < MINESWEEPER_SIZE
                    ) {

                        if (
                            minesweeperBoard
                                [neighborRow]
                                [neighborCol]
                                .mine
                        ) {

                            count++;
                        }
                    }
                }
            }

            minesweeperBoard[row][col].number =
                count;
        }
    }
}


/* =========================
   RENDER BOARD
========================= */

function renderMinesweeperBoard() {

    const board =
        document.getElementById(
            "minesweeperBoard"
        );

    if (!board) {
        console.error(
            "minesweeperBoard not found"
        );
        return;
    }


    board.innerHTML = "";


    for (
        let row = 0;
        row < MINESWEEPER_SIZE;
        row++
    ) {

        for (
            let col = 0;
            col < MINESWEEPER_SIZE;
            col++
        ) {

            const cellData =
                minesweeperBoard[row][col];


            const cell =
                document.createElement("div");


            cell.className =
                "minesweeper-cell";


            cell.dataset.row = row;
            cell.dataset.col = col;


            /*
             * REVEALED
             */

            if (cellData.revealed) {

                cell.classList.add("revealed");


                if (cellData.mine) {

                    cell.classList.add("mine");

                    cell.textContent = "💣";

                } else if (
                    cellData.number > 0
                ) {

                    cell.textContent =
                        cellData.number;
                }
            }


            /*
             * FLAGGED
             */

            else if (cellData.flagged) {

                cell.classList.add("flagged");

                cell.innerHTML = `
                    <span class="pixel-flag">
                        <span class="flag-pole"></span>
                        <span class="flag-cloth"></span>
                    </span>
                `;
            }


            board.appendChild(cell);
        }
    }
}


/* =========================
   BOARD INPUT
========================= */

/*
 * IMPORTANT:
 *
 * This listener is attached ONCE.
 * It does not get recreated every
 * time the board renders.
 */

function setupMinesweeperInput() {

    const board =
        document.getElementById(
            "minesweeperBoard"
        );

    if (!board) {
        console.error(
            "Cannot setup Minesweeper input: board missing."
        );
        return;
    }


    /*
     * Prevent browser right-click menu.
     */

    board.addEventListener(
        "contextmenu",
        function(event) {

            event.preventDefault();
        }
    );


    /*
     * Handle both mouse buttons.
     */

    board.addEventListener(
        "pointerdown",
        function(event) {

            const cell =
                event.target.closest(
                    ".minesweeper-cell"
                );


            if (!cell) {
                return;
            }


            /*
             * Prevent the browser from
             * doing anything with the click.
             */

            event.preventDefault();


            const row =
                Number(cell.dataset.row);

            const col =
                Number(cell.dataset.col);


            /*
             * RIGHT CLICK
             */

            if (event.button === 2) {

                toggleMinesweeperFlag(
                    row,
                    col
                );

                return;
            }


            /*
             * LEFT CLICK
             */

            if (event.button === 0) {

                revealMinesweeperCell(
                    row,
                    col
                );
            }
        }
    );
}


/* =========================
   REVEAL CELL
========================= */

function revealMinesweeperCell(row, col) {

    if (minesweeperGameOver) {
        return;
    }


    const cell =
        minesweeperBoard[row][col];


    if (
        cell.revealed ||
        cell.flagged
    ) {
        return;
    }


    /*
     * Start timer.
     */

    if (!minesweeperStarted) {

        minesweeperStarted = true;

        startMinesweeperTimer();
    }


    /*
     * Mine!
     */

    if (cell.mine) {

        revealAllMines();

        minesweeperGameOver = true;

        stopMinesweeperTimer();

        renderMinesweeperBoard();

        return;
    }


    /*
     * Safe cell.
     */

    revealMinesweeperArea(
        row,
        col
    );


    renderMinesweeperBoard();

    checkMinesweeperWin();
}


/* =========================
   REVEAL EMPTY AREA
========================= */

function revealMinesweeperArea(row, col) {

    if (
        row < 0 ||
        row >= MINESWEEPER_SIZE ||
        col < 0 ||
        col >= MINESWEEPER_SIZE
    ) {
        return;
    }


    const cell =
        minesweeperBoard[row][col];


    if (
        cell.revealed ||
        cell.flagged ||
        cell.mine
    ) {
        return;
    }


    cell.revealed = true;


    /*
     * Numbered cells don't expand.
     */

    if (cell.number !== 0) {
        return;
    }


    /*
     * Expand into neighbors.
     */

    for (let dr = -1; dr <= 1; dr++) {

        for (let dc = -1; dc <= 1; dc++) {

            if (
                dr === 0 &&
                dc === 0
            ) {
                continue;
            }


            revealMinesweeperArea(
                row + dr,
                col + dc
            );
        }
    }
}


/* =========================
   FLAG CELL
========================= */

function toggleMinesweeperFlag(row, col) {

    if (minesweeperGameOver) {
        return;
    }


    const cell =
        minesweeperBoard[row][col];


    /*
     * Can't flag revealed cells.
     */

    if (cell.revealed) {
        return;
    }


    /*
     * Maximum 10 flags.
     */

    if (
        !cell.flagged &&
        minesweeperFlags >=
            MINESWEEPER_MINES
    ) {

        return;
    }


    /*
     * Toggle flag.
     */

    cell.flagged =
        !cell.flagged;


    minesweeperFlags +=
        cell.flagged
            ? 1
            : -1;


    updateMinesweeperCounter();

    renderMinesweeperBoard();
}


/* =========================
   REVEAL ALL MINES
========================= */

function revealAllMines() {

    for (
        let row = 0;
        row < MINESWEEPER_SIZE;
        row++
    ) {

        for (
            let col = 0;
            col < MINESWEEPER_SIZE;
            col++
        ) {

            if (
                minesweeperBoard[row][col].mine
            ) {

                minesweeperBoard[row][col]
                    .revealed = true;
            }
        }
    }
}


/* =========================
   CHECK WIN
========================= */

function checkMinesweeperWin() {

    for (
        let row = 0;
        row < MINESWEEPER_SIZE;
        row++
    ) {

        for (
            let col = 0;
            col < MINESWEEPER_SIZE;
            col++
        ) {

            const cell =
                minesweeperBoard[row][col];


            if (
                !cell.mine &&
                !cell.revealed
            ) {

                return;
            }
        }
    }


    minesweeperGameOver = true;

    stopMinesweeperTimer();


    const winWindow =
        document.getElementById(
            "minesweeperWinWindow"
        );


    if (winWindow) {

        winWindow.style.display =
            "flex";
    }
}


/* =========================
   TIMER
========================= */

function startMinesweeperTimer() {

    stopMinesweeperTimer();


    minesweeperTimerInterval =
        setInterval(
            function() {

                minesweeperTimer++;

                updateMinesweeperTimer();

            },
            1000
        );
}


function stopMinesweeperTimer() {

    if (
        minesweeperTimerInterval !== null
    ) {

        clearInterval(
            minesweeperTimerInterval
        );

        minesweeperTimerInterval =
            null;
    }
}


function updateMinesweeperTimer() {

    const timer =
        document.getElementById(
            "mineTimer"
        );


    if (!timer) {
        return;
    }


    timer.textContent =
        String(minesweeperTimer)
            .padStart(3, "0");
}


/* =========================
   FLAG COUNTER
========================= */

function updateMinesweeperCounter() {

    const counter =
        document.getElementById(
            "mineCounter"
        );


    if (!counter) {
        return;
    }


    const remaining =
        MINESWEEPER_MINES -
        minesweeperFlags;


    counter.textContent =
        String(remaining)
            .padStart(3, "0");
}


/* =========================
   WIN WINDOW
========================= */

function closeMinesweeperWin() {

    const winWindow =
        document.getElementById(
            "minesweeperWinWindow"
        );


    if (winWindow) {

        winWindow.style.display =
            "none";
    }
}


/* =========================
   INITIALIZE INPUT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupMinesweeperInput();

    }
);