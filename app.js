console.log('Good luck, all working good');

let table = document.createElement('table');
document.body.appendChild(table); 

let boardSize = 8;
let gameData; 

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
};

class GameData {
  constructor(checkers){
    this.checkers = checkers;
  }
}


const clickOnCell = (row, col) => {

  console.log('click happened on ', row, col);

};

const getNewCheckers = () => {

  for(let row = 0; row < boardSize; row++){

    for(let col = 0; col < boardSize; col++){

      if(row % 2 === 0 && col % 2 !== 0 && row < 3 || row === 1 && col % 2 === 0){ 
        
        GAME_CHECKERS.push(new Checker(row, col, BLACK_PLAYER)); 
      };

      if(row % 2 !== 0 && col % 2 === 0 && row > 4 || row === 6 && col % 2 !== 0){

        GAME_CHECKERS.push(new Checker(row, col, WHITE_PLAYER));
      };
    }
  }
  
  let id = 0;
  for(let checker of GAME_CHECKERS){
    checker.id = id
    id++; 
  }
  console.log(GAME_CHECKERS);
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
    }
  }

  getNewCheckers();
  gameData = new GameData(GAME_CHECKERS);

};

boardInit();  
