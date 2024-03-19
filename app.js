document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameStatus = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    cells.forEach(cell => cell.addEventListener('click', handleClick));

    function handleClick() {
        const index = parseInt(this.id.split('-')[1]);
        if (gameOver || gameStatus[index] !== '') return;
        
        this.textContent = currentPlayer;
        gameStatus[index] = currentPlayer;

        if (checkWin(currentPlayer)) {
            gameOver = true;
            alert(currentPlayer + ' wins!');
            return;
        }

        if (checkDraw()) {
            gameOver = true;
            alert('It\'s a draw!');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin(player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winConditions.some(condition => 
            condition.every(index => gameStatus[index] === player)
        );
    }

    function checkDraw() {
        return gameStatus.every(cell => cell !== '');
    }
});
