document.addEventListener('DOMContentLoaded', function() {
    console.log("Game JS loaded");

    const player1 = {
        name: localStorage.getItem('player1Name') || "Player 1",
        colour: "red",
        moves: [],
        wins: parseInt(localStorage.getItem('player1Wins')) || 0
    };

    const player2 = {
        name: localStorage.getItem('player2Name') || "Player 2",
        colour: "blue",
        moves: [],
        wins: parseInt(localStorage.getItem('player2Wins')) || 0
    };

    let currentPlayer = player1;
    let gameIsOver = false;

    function resetGame() {
        currentPlayer = player1;
        gameIsOver = false;
        player1.moves = [];
        player2.moves = [];
        // Reset wins to 0 and update localStorage
        player1.wins = 0;
        player2.wins = 0;
        localStorage.setItem('player1Wins', '0');
        localStorage.setItem('player2Wins', '0');

        initialiseGameBoard();
        updateScoreboard();
    }

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

    function updateScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = `
            <p>${player1.name}: ${player1.colour} - Wins: ${player1.wins}</p>
            <p>${player2.name}: ${player2.colour} - Wins: ${player2.wins}</p>
        `;
    }

    document.getElementById('gameBoard').addEventListener('click', function(event) {
        if (gameIsOver) return;

        const circle = event.target;
        if (circle.classList.contains('circle') && !circle.classList.contains('taken')) {
            let col = circle.dataset.col;
            const circlesInCol = Array.from(document.querySelectorAll(`.circle[data-col="${col}"]`)).reverse();

            for (let i = 0; i < circlesInCol.length; i++) {
                let currentCircle = circlesInCol[i];
                if (!currentCircle.classList.contains('taken')) {
                    currentCircle.classList.add('taken', currentPlayer.colour);
                    currentPlayer.moves.push({row: currentCircle.dataset.row, col: currentCircle.dataset.col});
                    checkWinConditions();
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    break;
                }
            }
        }
    });

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
                gameIsOver = true;
                currentPlayer.wins++;
                localStorage.setItem(currentPlayer === player1 ? 'player1Wins' : 'player2Wins', currentPlayer.wins);
                updateScoreboard();
                alert(`${currentPlayer.name} wins!`);
                resetGame();  // Optionally reset the game here
            }
        });
    }

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

    document.getElementById('resetBtn').addEventListener('click', resetGame);

    initialiseGameBoard();
    updateScoreboard();
});
