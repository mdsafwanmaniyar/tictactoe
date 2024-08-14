let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let player1 = '';
let player2 = '';

function startGame() {
  player1 = document.getElementById('player1-name').value || 'Player 1';
  player2 = document.getElementById('player2-name').value || 'Player 2';
  document.getElementById('name-input').style.display = 'none';
  document.getElementById('board').style.display = 'grid';
  document.getElementById('reset-button').style.display = 'inline-block';
}

function makeMove(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].textContent = currentPlayer;
    if (checkWinner()) {
      let winnerName = currentPlayer === 'X' ? player1 : player2;
      document.getElementById('winner-text').textContent = `${winnerName} wins!`;
      document.getElementById('winner-modal').style.display = 'block';
      highlightWinningCells();
    } else if (board.every(cell => cell !== '')) {
      document.getElementById('winner-text').textContent = "It's a draw!";
      document.getElementById('winner-modal').style.display = 'block';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      condition.forEach(index => document.getElementsByClassName('cell')[index].classList.add('winning'));
      return true;
    }
  }
  return false;
}

function highlightWinningCells() {
  const cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    if (cell.classList.contains('winning')) {
      cell.classList.add('winning');
    }
  }
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
  document.getElementById('winner-modal').style.display = 'none';
}

function closeModal() {
  document.getElementById('winner-modal').style.display = 'none';
}
