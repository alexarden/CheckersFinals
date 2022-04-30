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
      for(let j = 0; j < boardSize; j++){
        table.rows[row].cells[j].classList.remove('selected');
        table.rows[row].cells[j].classList.remove('movement'); 
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

  const markMoves = () => {

    let possibleMoves = selectedChecker.getPossibleMoves();
    for(let move of possibleMoves){

      if(gameData.getChecker(move[0], move[1]) === undefined){
      table.rows[move[0]].cells[move[1]].classList.add('movement');
      };
    } 

  }

  markMoves();

  console.log(selectedChecker.getPossibleMoves()); 
  };

  

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