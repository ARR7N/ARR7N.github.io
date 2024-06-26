document.addEventListener('DOMContentLoaded', function() {
    console.log("Game JS loaded");

    //player 1 - local st
    const player1 = {
        name: localStorage.getItem('player1Name') || "Player 1",
        colour: "red",
        moves: [],
        wins: parseInt(localStorage.getItem('player1Wins')) || 0
    };
    //player 2 - local st
    const player2 = {
        name: localStorage.getItem('player2Name') || "Player 2",
        colour: "blue",
        moves: [],
        wins: parseInt(localStorage.getItem('player2Wins')) || 0
    };
    //start as p1
    let currentPlayer = player1;
    let gameIsOver = false;
    //reset board - keep score
    function resetGame() {
        currentPlayer = player1;
        gameIsOver = false;
        player1.moves = [];
        player2.moves = [];
        initialiseGameBoard(); 
    }
    //gameboard cells
    function initialiseGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const circle = document.createElement('div');
                circle.className = 'circle';
                circle.dataset.row = row;
                circle.dataset.col = col;
                gameBoard.appendChild(circle);
            }
        }
    }
    //updates scoreboard
    function updateScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = `
            <p>${player1.name}: ${player1.colour} - Wins: ${player1.wins}</p>
            <p>${player2.name}: ${player2.colour} - Wins: ${player2.wins}</p>
        `;
    }
    //handle game logic
    document.getElementById('gameBoard').addEventListener('click', function(event) {
        if (gameIsOver) {
            console.log("Game over. No moves allowed.");
            return;
        }

        const circle = event.target.closest('.circle');
        if (!circle || circle.classList.contains('taken')) {
            console.log("Invalid move or circle is already taken.");
            return;
        }

        let col = circle.dataset.col;
        const circlesInCol = Array.from(document.querySelectorAll(`.circle[data-col="${col}"]`)).reverse();
        for (let i = 0; i < circlesInCol.length; i++) {
            let currentCircle = circlesInCol[i];
            if (!currentCircle.classList.contains('taken')) {
                currentCircle.classList.add('taken', currentPlayer.colour);
                currentPlayer.moves.push({row: currentCircle.dataset.row, col: currentCircle.dataset.col});
                if (!gameIsOver) {
                    checkWinConditions();
                    if (!gameIsOver) {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                    }
                }
                console.log(`Move made by ${currentPlayer.name} at row ${currentCircle.dataset.row}, col ${currentCircle.dataset.col}`);
                break;
            }
        }
    });
    //checks for winner after move
    function checkWinConditions() {
        currentPlayer.moves.forEach(move => {
            const row = parseInt(move.row);
            const col = parseInt(move.col);
            if (
                countConsecutive(row, col, 0, 1) + countConsecutive(row, col, 0, -1) >= 3 ||
                countConsecutive(row, col, 1, 0) + countConsecutive(row, col, -1, 0) >= 3 ||
                countConsecutive(row, col, 1, 1) + countConsecutive(row, col, -1, -1) >= 3 ||
                countConsecutive(row, col, 1, -1) + countConsecutive(row, col, -1, 1) >= 3
            ) {
                if (!gameIsOver) {
                    gameIsOver = true;
                    currentPlayer.wins++;
                    localStorage.setItem(currentPlayer === player1 ? 'player1Wins' : 'player2Wins', currentPlayer.wins.toString());
                    alert(`${currentPlayer.name} wins!`);
                    updateScoreboard();
                    setTimeout(resetGame, 2000); // Reset board
                }
            }
        });
    }
    //counts tokens
    function countConsecutive(row, col, dRow, dCol) {
        let count = 0;
        let r = row + dRow;
        let c = col + dCol;
        const targetClass = currentPlayer.colour;
        while (
            r >= 0 && r < 6 && c >= 0 && c < 7 &&
            document.querySelector(`.circle[data-row="${r}"][data-col="${c}"]`).classList.contains(targetClass)
        ) {
            count++;
            r += dRow;
            c += dCol;
        }
        return count;
    }
    //reset button
    document.getElementById('resetBtn').addEventListener('click', resetGame);

    initialiseGameBoard(); //prepares board
    updateScoreboard(); // Display new or load previous score
});
