import Board from "./board.js";

// after HTML DOM and assets load
window.onload = (event) => {
    // create reference to HTML body
    const body = document.body;

    let siteContainerCreation = (siteContainer) => {
        siteContainer.className = ("site-container");
        body.appendChild(siteContainer);
    };

    let headerCreation = (mainHeader) => {
        mainHeader.innerText = ("Battleship");
        siteContainer.appendChild(mainHeader);
    };

    let resetCreation = (resetButton) => {
        resetButton.innerText = ("Reset Game");
        resetButton.className = ("reset-button");
        siteContainer.appendChild(resetButton);
    };

    let boardContainerCreation = (boardContainer) => {
        boardContainer.className = ("board-container");
        siteContainer.appendChild(boardContainer);
    };

    let boardCreation = () => {
        // creates a new game board
        let board = new Board();

        // create html cells for board grid array.
        // store row/column location of each array item in the respective html cell
        let boardGrid = board.grid;
        let gridCell;
        // Examine the grid of the game board in the browser console.
        console.log(board.grid);

        for (let i = 0; i < boardGrid.length; i++) {
            let boardRow = boardGrid[i];
            for (let j = 0; j < boardRow.length; j++) {
                gridCell = document.createElement("div");
                gridCell.className = ("grid-cell");
                // store row/column of the cell in HTML element
                gridCell.setAttribute("data-location", `${[i]}${[j]}`);
                // add element to HTML DOM
                boardContainer.appendChild(gridCell);
            }
        }

        return board;
    };

    let youWinCreation = () => {
        const youWin = document.createElement("h2");
        youWin.innerText = ("YOU WIN!");
        youWin.id = ("you-win");
        siteContainer.insertBefore(youWin, siteContainer.children[2]);
    };

    let youWinremoval = () => {
        let youWin = document.getElementById("you-win");
        if (youWin !== null) {
            youWin.remove();
        }
    };

    // create site container
    const siteContainer = document.createElement("div");
    siteContainerCreation(siteContainer);

    // create header
    const mainHeader = document.createElement("h1");
    headerCreation(mainHeader);

    // create reset button
    const resetButton = document.createElement("button");
    resetCreation(resetButton);

    // Create board container
    const boardContainer = document.createElement("div");
    boardContainerCreation(boardContainer);

    // create actual game board
    let board = boardCreation();

    // Create event listener for clicking on a square
    let clickEvent = event => {
        // use try/catch to avoid error when clicking the gap between grid boxes
        try {
            let rowCol = event.target.dataset.location;
            rowCol = rowCol.split("");

            let result = board.makeHit(...rowCol);
            // miss!
            if (result === null) {
                event.target.setAttribute("data-color", "red");
            }
            // hit!
            else {
                event.target.setAttribute("data-color", "green");
                // add number to grid
                event.target.innerText = (result);
                // check to see if game is over
                if (board.isGameOver()) {
                    youWinCreation();
                    boardContainer.removeEventListener("click", clickEvent);
                }
            }

            // console.log(board.makeHit(...rowCol));
            console.log(board.numRemaining);
            // console.log(event.target.dataset.color);
        }
        catch {
        }
    };

    // Create event listener for clicking on a square
    boardContainer.addEventListener("click", clickEvent);
    

    // Create event listener for reset button press
    let reset = () => {
        boardContainer.innerHTML = ("");
        youWinremoval();
        board = boardCreation();
        // Create event listener for clicking on a square
        boardContainer.addEventListener("click", clickEvent);
    };

    // Create event listener for reset button press
    resetButton.addEventListener("click", reset);
};