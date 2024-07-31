
const gameSetup = (function () {
  const createPlayer = (name, number) => {
    const playerName = name;
    let playerNumber = number;
  
    const getPlayerNumber = () => playerNumber;
    const getPlayerName = () => playerName;
  
    return {
      getPlayerName,
      getPlayerNumber,
    }
  }
  

  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const player1 = createPlayer('Player1', 1);
  const player2 = createPlayer('Player2', 2);
  
  let players = [player1, player2]
  let activePlayer = players[0];
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

 const winConditions = [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]]
    ]
    const checkWin = (board, player) => {
      for (let win of winConditions) {
          if (win.every(([row, col]) => board[row][col] === player)) {
              return true;
            }
      } return false;
    
    }
    
    const checkDraw = (board) => {
      return board.every(row => {
        if (row.every((col) => col !== 0)) {
          return true;
        }
        return false;
      });
    }


    return {
      checkDraw,
      checkWin,
      getActivePlayer,
      switchPlayer,
      board
    }

})();

// const playGame = () => {
//   while (win.checkDraw(board) === false && win.checkWin(board, 1) === false && win.checkWin(board, 2) === false) {
//     let x = prompt(`${activePlayer.playerName} pick your row`);
//     let y = prompt(`${activePlayer.playerName} pick your column`);

//     if (isNaN(x) || isNaN(y) || x < 0 || x > 2 || y < 0 || y > 2) {
//       alert('Please input a valid position between 0 and 2');
//       continue;
//     }

//     console.log(x, y);
    
//     if (board[x][y] === 1 || board[x][y] === 2) {
//       alert("Move isn't allowed, marker there already");
//     } else {
//     board[x][y] = activePlayer.getPlayerNumber();
//     switchPlayer();
//     }
//     console.log(activePlayer.playerName);

//     console.table(board);

//   }

  // if (win.checkDraw(board) === true) {
  //   alert('Game is a draw');
  // } else if (win.checkWin(board, 1) === true) {
  //   alert("Player 1 wins");
  // } else alert("Player 2 wins");


// }
// })();


// function screenController() {
//   const game = playGame();
//   const turnDiv = document.querySelector('.turn');
//   const gameBoard = document.querySelector('.game');

//   const updateScreen = () => {

//     board.forEach(row => {
//       row.forEach((col) => {
//         const gameBox = document.createElement('div');
//         gameBoard.appendChild('gameBox');
//       })
//     })

//   updateScreen();
// }
// }

// screenController();

const gameBoard = document.querySelector('.game');
let board = gameSetup.board;
const turnHead = document.querySelector('.turn');
const resetBtn = document.querySelector('.reset');



board.forEach((row, i) => {
  row.forEach((col, j) => {
      const box = document.createElement('button');
      box.textContent = '';
      box.classList.add('box');
      box.setAttribute("row", i);
      box.setAttribute("col", j);
      box.addEventListener('click', () => clickHandle(box, i, j));
      gameBoard.appendChild(box);
  });
});

function clickHandle(box, row, col) {
  if (board[row][col] === 0) {
    board[row][col] = gameSetup.getActivePlayer().getPlayerNumber();
    if (board[row][col] === 1) {
      box.textContent = 'X';
    } else if(board[row][col] === 2) {
      box.textContent = 'O'
    }

  } 
  if (gameSetup.checkDraw(board) === true) {
    turnHead.textContent = 'Game is a draw';
  } else if (gameSetup.checkWin(board, gameSetup.getActivePlayer().getPlayerNumber()) === true) {
    turnHead.textContent = `Player ${gameSetup.getActivePlayer().getPlayerNumber()} wins`;
  } else gameSetup.switchPlayer();
  
}

resetBtn.addEventListener('click', () => {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  let box = document.querySelectorAll('.box');
  box.forEach(boxx => boxx.textContent = '');
});




