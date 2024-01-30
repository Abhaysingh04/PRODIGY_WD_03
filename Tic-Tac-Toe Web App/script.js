const board = document.getElementById('game');
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        
        if (checkWinner()) {
            statusElement.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            statusElement.innerText = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.innerText = `Current Player: ${currentPlayer}`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinnerCells(pattern);
            return true;
        }
    }

    return false;
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusElement.innerText = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winner');
    });
}


function highlightWinnerCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => cells[index].classList.add('winner'));
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    handleClick(index);
}

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
}

initializeGame();
