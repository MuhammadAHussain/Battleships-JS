const prompt = require('prompt');

const Player = require('./player');
const Board = require('./board');
const Ship = require('./ship');
const players = [];

var turn;
var isWinnerFound = false;

const coordinatesSchema = {
  x: {
    description: 'Enter an x coordinate of the ship',
    pattern: /^([1-9]|10)$/,
    message: 'Enter a number between 1 and 10',
    required: true
  },
  y: {
    description: 'Enter an y coordinate of the ship',
    pattern: /^([1-9]|10)$/,
    message: 'Enter a number between 1 and 10',
    required: true
  }
}

const placeShipSchema = {
  properties: {
    ...coordinatesSchema,
    orientation: {
      description: 'Enter orientation of the ship. Default value is vertical',
      pattern: /^(horizontal|vertical)$/,
      message: 'Enter horizontal/vertical or leave blank.',
      default: 'vertical'
    }
  }
}

const shootTargetSchema = {
  properties: {
    ...coordinatesSchema
  }
}

const initilisePlayers = () => {
  players.push(new Player());
  players.push(new Player());
}

const initialiseGame = async () => {
  initilisePlayers();

  await setUpBoards();

  const playerTurn = players[turn];

  console.log(`${playerTurn.getName()} to go first \n`);

  setTimeout(async () => {
    await startGame(playerTurn);
  }, 1500);
}

const setUpBoards = async () => {
  turn = Math.round(Math.random());
  console.log('Welcome to battleship. This game is on a grid of 10 x 10.\n');
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      for (let i = 0; i < 2; i++) {
        await playerPlaceShip(turn);
        await switchTurns();
      }
      resolve();
    }, 2000)
  });
}

const switchTurns = async () => {
  Promise.resolve(turn = turn ? 0 : 1);
}

const playerPlaceShip = async (turn) => {
  let shipsPlaced = 0;

  prompt.start();

  const playerTurn = players[turn];

  let board = new Board(playerTurn);

  console.log(`${playerTurn.getName()} place your ships \n`);

  do {
    console.log(`${playerTurn.getName()} place ship ${shipsPlaced + 1} \n`);

    const { x, y, orientation } = await userInput(placeShipSchema);

    const { status, message } = board.placeShip(new Ship(), { x, y }, orientation);

    if (status) {
      shipsPlaced++;
    }

    console.log('\n' + message + '\n');

    board.getPlacementBoard().forEach(item => console.log(item));

    console.log('');
  } while (shipsPlaced < 3);

  turn ? players[0].setAssignedBoard(board) : players[1].setAssignedBoard(board);

  await clearScreen();
};

const userInput = async (schemaToUse) => {
  return new Promise((resolve, reject) => {
    prompt.get(schemaToUse, function (err, result) {
      resolve({
        x: result.x,
        y: result.y,
        orientation: result.orientation
      });
    });
  });
};

const startGame = async (playerTurn) => {
  let winner;
  let turnSwitched = false;

  do {
    if (turnSwitched) {
      console.log(`${playerTurn.getName()}'s turn`);
      turnSwitched = false;
    }
    console.log(`${playerTurn.getName()}: Choose coordinates to strike`);

    const board = playerTurn.getAssignedBoard();

    const { x, y } = await userInput(shootTargetSchema);

    const { status, message } = await board.shootShip({ x, y });

    console.log('\n' + message + '\n');

    board.getBoard().forEach(item => console.log(item));

    if (status) {
      await switchTurns();
      turnSwitched = true;
      playerTurn = players[turn];
      await clearScreen();
    }
    winner = await findWinner();
  } while (isWinnerFound === false);

  console.log(`${winner.getName()} has won!`);

  setTimeout(async () => {
    console.log("Thanks for playing!");
  }, 2000);

}

const findWinner = async () => {
  for (let i = 0; i < 2; i++) {
    const player = players[i];
    const board = player.getAssignedBoard();
    const hasPlayerWon = await board.getAllShipDestroyed();

    if (hasPlayerWon) {
      isWinnerFound = true;
      return Promise.resolve(player);
    }
  }
}

const clearScreen = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.clear();
      resolve();
    }, 1500);
  });
}

(async () => {
  await initialiseGame();
})();