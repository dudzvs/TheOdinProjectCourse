const Gameboard = (() => {
  const board = document.getElementById("board");
  const cellElements = document.querySelectorAll("[data-cell]");

  // return every cell Elements on the board
  function getCells() {
    return cellElements;
  }

  function setCellClass(cell, playerSymbol) {
    cell.classList.add(playerSymbol);
  }

  function setBoardHoverClass(currentPlayer) {
    board.classList.remove("x", "o");
    board.classList.add(currentPlayer);
  }

  function clearBoard() {
    cellElements.forEach((cell) => {
      cell.classList.remove("x", "o");
    });
  }

  return {
    getCells,
    setBoardHoverClass,
    setCellClass,
    clearBoard,
  };
})();

const Players = (() => {
  const player1 = { name: "Player 1", symbol: "x" };
  const player2 = { name: "Player 2", symbol: "o" };

  let currentPlayer = player1;

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function resetPlayer() {
    currentPlayer = player1;
  }

  return {
    getCurrentPlayer,
    resetPlayer,
    switchPlayer,
  };
})();

const Controller = (() => {
  const cells = Gameboard.getCells();
  const winningModal = document.getElementById("winningModal");
  const modalMessage = winningModal.querySelector("h4");
  const playersTurnMessage = document.querySelector("h1");
  const restartButton = winningModal.querySelector("button");

  function startGame() {
    updatePlayerTurnDisplay();
    cells.forEach((cell) => {
      cell.addEventListener("click", handleClick, { once: true });
    });
    restartButton.addEventListener("click", restartGame);
  }

  function updatePlayerTurnDisplay() {
    playersTurnMessage.innerText = `${Players.getCurrentPlayer().name}'s turn`;
  }

  function handleClick(e) {
    const cell = e.target;
    const currentPlayer = Players.getCurrentPlayer();
    Gameboard.setCellClass(cell, currentPlayer.symbol);

    if (checkWin(currentPlayer.symbol)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      Players.switchPlayer();
      Gameboard.setBoardHoverClass(Players.getCurrentPlayer().symbol);
      updatePlayerTurnDisplay();
    }
  }

  function endGame(draw) {
    if (draw) {
      modalMessage.innerText = "It's a draw!!";
    } else {
      modalMessage.innerText = `${Players.getCurrentPlayer().name} wins!!`;
    }

    winningModal.classList.remove("hidden");
  }

  function isDraw() {
    return [...cells].every((cell) => {
      return cell.classList.contains("x") || cell.classList.contains("o");
    });
  }

  function checkWin(currentPlayer) {
    const winningCombs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombs.some((combinations) => {
      return combinations.every((index) => {
        return cells[index].classList.contains(currentPlayer);
      });
    });
  }

  function restartGame() {
    Gameboard.clearBoard();
    winningModal.classList.add("hidden");
    Players.resetPlayer();
    Gameboard.setBoardHoverClass(Players.getCurrentPlayer().symbol);
    startGame();
    updatePlayerTurnDisplay();
  }

  return {
    startGame,
  };
})();

Controller.startGame();
