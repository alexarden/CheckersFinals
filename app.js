let table;


let boardSize = 8;
let gameData; 
let selectedChecker;

const BLACK_PLAYER = 'black';
const WHITE_PLAYER = 'white';
const GAME_CHECKERS = [];



class Checker {
  constructor(row, col, player,id){
    this.row = row;
    this.col = col;
    this.player = player;
    this.id = id;
  };

  
  getPossibleMoves(gameData) {
    let moves = [];
    let filteredMoves = [];
    let direction = 1;

    if(this.player === BLACK_PLAYER){
      direction = -1;
    };

    moves.push([this.row + direction, this.col + direction], [this.row + direction, this.col - direction]);
    
    moves.forEach(move => {
     if(move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0){

      filteredMoves.push(move)
     };  
    }); 

    return filteredMoves
  };
};

class GameData {
  constructor(checkers){
    this.checkers = checkers;
  }

  getChecker(row, col) {

    for(let checker of this.checkers){
      if(checker.row === row && checker.col === col){
        return checker
      };
    }
  };

  resetCells = () => {

    for(let row = 0; row < boardSize; row++){
      for(let col = 0; col < boardSize; col++){
        table.rows[row].cells[col].classList.remove('selected');
        table.rows[row].cells[col].classList.remove('movement'); 
      } 
    }
  };

  showPossibleMoves = (row, col) => {

    let checker = gameData.getChecker(row, col)
    if(!checker) return

    table.rows[checker.row].cells[checker.col].classList.add('selected');
    let possibleMoves = checker.getPossibleMoves();
    for(let move of possibleMoves){

      if(gameData.getChecker(move[0], move[1]) === undefined){
      table.rows[move[0]].cells[move[1]].classList.add('movement');
      };
    } 

    selectedChecker = checker;
  };

};


const clickOnCell = (row, col) => {

  console.log('click happened on ', row, col);

  gameData.resetCells();
  
  if(selectedChecker === undefined){
    gameData.showPossibleMoves(row, col);
  } else {
    gameData.showPossibleMoves(row, col);
    selectedChecker.row = row;
    selectedChecker.col = col; 
    console.log('checker defined');
    boardInit();
    selectedChecker = undefined;
  }

};

const addImages = () => {

  for(let checker of gameData.checkers){
    let image = document.createElement('img');
    image.src = `./img/${checker.player}_checker.png`;
    table.rows[checker.row].cells[checker.col].appendChild(image);
  }

};

const getNewCheckers = () => {
  console.log('board init');

  for(let row = 0; row < boardSize; row++){

    for(let col = 0; col < boardSize; col++){

      if(row % 2 === 0 && col % 2 !== 0 && row < 3 || row === 1 && col % 2 === 0){ 
        
        GAME_CHECKERS.push(new Checker(row, col, WHITE_PLAYER)); 
      };

      if(row % 2 !== 0 && col % 2 === 0 && row > 4 || row === 6 && col % 2 !== 0){

        GAME_CHECKERS.push(new Checker(row, col, BLACK_PLAYER)); 
      };  
    }
  }
  
  let id = 0;
  for(let checker of GAME_CHECKERS){
    checker.id = id
    id++; 
  }
  
};

const boardInit = () => {
  console.log(1)

  if(table !== undefined){
    table.remove();
  }
  
  table = document.createElement('table');
  document.body.appendChild(table); 
  for(let row = 0; row < boardSize; row++){

    const rowElement = table.insertRow();
    rowElement.id = row;

    for(let col = 0; col < boardSize; col++){
  
      const cellElement = rowElement.insertCell();
      cellElement.id = `cell_${row}_${col}`; 
      cellElement.addEventListener('click', () => clickOnCell(row, col));

      if(row % 2 !== 0 && col % 2 === 0 || row % 2 === 0 && col % 2 !== 0){
        cellElement.classList.add('dark-cell'); 
      };

      if(row % 2 !== 0 && col % 2 !== 0 || row % 2 === 0 && col % 2 === 0){
        cellElement.classList.add('white-cell'); 
      }; 
    }
  }
  
  
  // if(!gameData) return; 
  addImages();


};

const gameInit = () => {
  
  getNewCheckers();
  gameData = new GameData(GAME_CHECKERS);
  boardInit();
  
};

gameInit(); 



