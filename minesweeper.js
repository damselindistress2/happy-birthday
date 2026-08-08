/* =====================================================
   MINESWEEPER
===================================================== */

const MINESWEEPER_SIZE = 9;
const MINESWEEPER_MINES = 10;

let minesweeperBoard = [];

let minesweeperGameOver = false;
let minesweeperStarted = false;

let minesweeperTimer = 0;
let minesweeperTimerInterval = null;

let minesweeperFlags = 0;


/* =====================================================
   OPEN / CLOSE
===================================================== */

function openMinesweeper() {

    const windowElement =
        document.getElementById("minesweeperWindow");

    if (!windowElement) {
        console.error("Minesweeper window not found.");
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


/* =====================================================
   RESET
===================================================== */

function resetMinesweeper() {

    stopMinesweeperTimer();

    minesweeperGameOver = false;
    minesweeperStarted = false;

    minesweeperTimer = 0;
    minesweeperFlags = 0;

    createMinesweeperBoard();

    updateMinesweeperCounter();
    updateMinesweeperTimer();

    hideMinesweeperWin();

    renderMinesweeperBoard();
}


/* =====================================================
   CREATE BOARD
===================================================== */

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


    /* -------------------------------------------------
       PLACE MINES
    ------------------------------------------------- */

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

            minesweeperBoard[row][col].mine =
                true;

            minesPlaced++;
        }
    }


    calculateMinesweeperNumbers();
}


/* =====================================================
   CALCULATE NUMBERS
===================================================== */

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

            const cell =
                minesweeperBoard[row][col];


            if (cell.mine) {
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
                        neighborRow < 0 ||
                        neighborRow >=
                            MINESWEEPER_SIZE ||
                        neighborCol < 0 ||
                        neighborCol >=
                            MINESWEEPER_SIZE
                    ) {
                        continue;
                    }


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


            cell.number = count;
        }
    }
}


/* =====================================================
   RENDER BOARD
===================================================== */

function renderMinesweeperBoard() {

    const board =
        document.getElementById(
            "minesweeperBoard"
        );


    if (!board) {
        console.error(
            "Minesweeper board not found."
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


            /* -----------------------------------------
               REVEALED
            ----------------------------------------- */

            if (cellData.revealed) {

                cell.classList.add(
                    "revealed"
                );


                if (cellData.mine) {
                    cell.innerHTML = `
                        <img
                            src="cake.png"
                            class="minesweeper-icon"
                            alt=""
                        >
                    `;

                }

                else if (
                    cellData.number > 0
                ) {

                    cell.textContent =
                        cellData.number;
                }
            }


            /* -----------------------------------------
               FLAGGED
            ----------------------------------------- */

            else if (cellData.flagged) {

                cell.classList.add("flagged");
            
                cell.innerHTML = `
                    <img
                        src="flag.png"
                        class="minesweeper-icon"
                        alt=""
                    >
                `;
            }


            /*
             * IMPORTANT
             *
             * pointerdown gives us event.button:
             *
             * 0 = left
             * 2 = right
             */

            cell.addEventListener(
                "pointerdown",
                handleMinesweeperPointer
            );


            board.appendChild(cell);
        }
    }
}


/* =====================================================
   CELL INPUT
===================================================== */

function handleMinesweeperPointer(event) {

    event.preventDefault();
    event.stopPropagation();


    const cell =
        event.currentTarget;


    const row =
        Number(cell.dataset.row);

    const col =
        Number(cell.dataset.col);


    /*
     * LEFT CLICK
     */

    if (event.button === 0) {

        revealMinesweeperCell(
            row,
            col
        );

        return;
    }


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
}


/* =====================================================
   PREVENT RIGHT-CLICK MENU
===================================================== */

function setupMinesweeperContextMenu() {

    const board =
        document.getElementById(
            "minesweeperBoard"
        );


    if (!board) {
        return;
    }


    board.addEventListener(
        "contextmenu",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

        }
    );
}


/* =====================================================
   REVEAL CELL
===================================================== */

function revealMinesweeperCell(
    row,
    col
) {

    if (minesweeperGameOver) {
        return;
    }


    const cell =
        minesweeperBoard[row][col];


    /*
     * Don't reveal revealed cells
     * or flagged cells.
     */

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
     * MINE
     */

    if (cell.mine) {

        cell.revealed = true;

        revealAllMines();

        minesweeperGameOver = true;

        stopMinesweeperTimer();

        renderMinesweeperBoard();

        return;
    }


    /*
     * SAFE CELL
     */

    revealMinesweeperArea(
        row,
        col
    );


    renderMinesweeperBoard();


    checkMinesweeperWin();
}


/* =====================================================
   REVEAL EMPTY AREA
===================================================== */

function revealMinesweeperArea(
    row,
    col
) {

    /*
     * Outside board
     */

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


    /*
     * Stop recursion.
     */

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
     * Expand to neighbours.
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


/* =====================================================
   FLAG
===================================================== */

function toggleMinesweeperFlag(
    row,
    col
) {

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
     * Don't allow more than 10 flags.
     */

    if (
        !cell.flagged &&
        minesweeperFlags >=
            MINESWEEPER_MINES
    ) {
        return;
    }


    cell.flagged =
        !cell.flagged;


    if (cell.flagged) {

        minesweeperFlags++;

    }

    else {

        minesweeperFlags--;
    }


    updateMinesweeperCounter();


    renderMinesweeperBoard();
}


/* =====================================================
   REVEAL ALL MINES
===================================================== */

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


/* =====================================================
   CHECK WIN
===================================================== */

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


    /*
     * Player has revealed
     * every safe cell.
     */

    minesweeperGameOver = true;

    stopMinesweeperTimer();

    showMinesweeperWin();
}


/* =====================================================
   TIMER
===================================================== */

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

        minesweeperTimerInterval = null;
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


/* =====================================================
   FLAG COUNTER
===================================================== */

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


/* =====================================================
   WIN WINDOW
===================================================== */

function showMinesweeperWin() {

    const winWindow =
        document.getElementById(
            "minesweeperWinWindow"
        );


    if (winWindow) {

        winWindow.style.display =
            "flex";
    }
}


function hideMinesweeperWin() {

    const winWindow =
        document.getElementById(
            "minesweeperWinWindow"
        );


    if (winWindow) {

        winWindow.style.display =
            "none";
    }
}


function closeMinesweeperWin() {

    hideMinesweeperWin();
}


/* =====================================================
   BUTTON SETUP
===================================================== */

function setupMinesweeperButtons() {

    const resetButton =
        document.getElementById(
            "minesweeperReset"
        );


    const closeButton =
        document.getElementById(
            "minesweeperClose"
        );


    const winCloseButton =
        document.getElementById(
            "minesweeperWinClose"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetMinesweeper
        );
    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeMinesweeper
        );
    }


    if (winCloseButton) {

        winCloseButton.addEventListener(
            "click",
            closeMinesweeperWin
        );
    }
}


/* =====================================================
   INITIALISE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupMinesweeperButtons();

        setupMinesweeperContextMenu();

    }
);