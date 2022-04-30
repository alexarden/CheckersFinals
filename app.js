let table = document.createElement('table');
document.body.appendChild(table); 

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

  
  getPossibleMoves() {
    let moves = [];

    moves.push([[this.row+1, this.col +1],[this.row + 1, this.col - 1]]);
    return moves
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
      for(let j = 0; j < boardSize; j++){
        table.rows[row].cells[j].classList.remove('selected');
      } 
    }
  };

}


const clickOnCell = (row, col) => {

  console.log('click happened on ', row, col);
  selectedChecker = gameData.getChecker(row,col);

  gameData.resetCells();

  if(selectedChecker){

  table.rows[selectedChecker.row].cells[selectedChecker.col].classList.add('selected');
  };

  console.log(selectedChecker); 

};

const addImages = () => {

  for(let checker of gameData.checkers){
    let image = document.createElement('img');
    image.src = `./img/${checker.player}_checker.png`;
    table.rows[checker.row].cells[checker.col].appendChild(image);
  }

};

const getNewCheckers = () => {

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
  
  getNewCheckers();
  gameData = new GameData(GAME_CHECKERS);
  addImages();

};

boardInit();  

console.log(gameData.checkers);