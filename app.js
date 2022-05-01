let table;


let boardSize = 8;
let gameData; 
let selectedChecker;

const BLACK_PLAYER = 'black';
const WHITE_PLAYER = 'white';
const GAME_CHECKERS = [];
const TABLE_ID = 'table';



class Checker {
  constructor(row, col, player,id){
    this.row = row;
    this.col = col;
    this.player = player;
    this.id = id;
    this.canEat = false;
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

    console.log(filteredMoves)
    return filteredMoves
  };

  getOpponent() {
    if(this.player === WHITE_PLAYER){
      return BLACK_PLAYER;
    }else {
      return WHITE_PLAYER;
    };
  };

};

class GameData {
  constructor(checkers, firstPlayer){
    this.checkers = checkers;
    this.turn = firstPlayer
  }

  getChecker(row, col) {

    for(let checker of this.checkers){
      if(checker.row === row && checker.col === col){
        return checker
      };
    }
  };

  resetMarks = () => {

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

      if(gameData.getChecker(move[0], move[1]) !== undefined){
        let checkerOpponent = gameData.getChecker(move[0], move[1]);
      
        if(checkerOpponent.player !== checker.player){

          if(checker.player === WHITE_PLAYER){

            if(checkerOpponent.col < checker.col && gameData.getChecker(move[0] + 1, move[1] - 1) === undefined){

              if(table.rows[move[0] + 1].cells[move[1] - 1] !== undefined){

               table.rows[move[0] + 1].cells[move[1] - 1].classList.add('eat');
               checker.canEat = true;
              }
            };

            if(checkerOpponent.col > checker.col && gameData.getChecker(move[0] + 1, move[1] + 1) === undefined){

              if(table.rows[move[0] + 1].cells[move[1] + 1] !== undefined){
               
               table.rows[move[0] + 1].cells[move[1] + 1].classList.add('eat');
               checker.canEat = true;
             }
            };
          };

          if(checker.player === BLACK_PLAYER){

            if(checkerOpponent.col < checker.col && gameData.getChecker(move[0] - 1, move[1] - 1) === undefined){
              if(table.rows[move[0] - 1].cells[move[1] - 1] !== undefined){

               table.rows[move[0] - 1].cells[move[1] - 1].classList.add('eat');
               checker.canEat = true;
              };
            };

            if(checkerOpponent.col > checker.col && gameData.getChecker(move[0] - 1, move[1] + 1) === undefined){

              if(table.rows[move[0] - 1].cells[move[1] + 1] !== undefined){

               table.rows[move[0] - 1].cells[move[1] + 1].classList.add('eat');
               checker.canEat = true;
              }

             
            }; 
          };
        };
      };

      if(gameData.getChecker(move[0], move[1]) === undefined){
        table.rows[move[0]].cells[move[1]].classList.add('movement');
      };
    

    }

    selectedChecker = checker;
    console.log(selectedChecker);
  };
  
  removeChecker(row, col) {

    for(let i = 0; i < this.checkers.length; i++){

      let checker = this.checkers[i]
      if(checker.row === row && checker.col === col){

        this.checkers.splice(i, 1);
      };
    }
  };

  switchTurn() {

    if(gameData.turn === WHITE_PLAYER){
        
      gameData.turn = BLACK_PLAYER;
    }else if(gameData.turn === BLACK_PLAYER){
      
      gameData.turn = WHITE_PLAYER;
    };
  };

  tryMove(row, col) { 
    if(table.rows[row].cells[col].classList.contains('movement')){
  
      selectedChecker.row = row;
      selectedChecker.col = col; 
      return true;
    };
    return false;
  };

};


const clickOnCell = (row, col) => {
  let table = document.getElementById('table');

  console.log('click happened on ', row, col);
  console.log(gameData.checkers);
  console.log(gameData.turn) 

  
    
  if(selectedChecker === undefined){

    gameData.resetMarks();
    gameData.showPossibleMoves(row, col);
    
  } else {

    if(selectedChecker.player === gameData.turn){

      console.log(selectedChecker);
      gameData.showPossibleMoves(row, col);

      // if(table.rows[row].cells[col].classList.contains('movement')){
  
      //   selectedChecker.row = row;
      //   selectedChecker.col = col; 
      // };
      gameData.tryMove(row, col);
     
        
      if(table.rows[row].cells[col].classList.contains('eat')){
        let lastRowPosition = selectedChecker.row;
        let lastColPosition = selectedChecker.col;
        selectedChecker.row = row;
        selectedChecker.col = col; 
        gameData.removeChecker((lastRowPosition + selectedChecker.row) / 2, (lastColPosition + selectedChecker.col) / 2);
      };

      gameData.resetMarks();
      gameData.switchTurn();
      boardInit();
      selectedChecker = undefined;

      console.log('checker defined');

    }else{

      selectedChecker = undefined;
    };
   
    
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
    checker.id = id;
    checker.canEat = false;
    id++; 
  }
  
};

const boardInit = () => {
  
  if(table !== undefined){
    table.remove();
  }
  
  table = document.createElement('table');
  table.id = TABLE_ID;
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
  gameData = new GameData(GAME_CHECKERS, WHITE_PLAYER);
  boardInit();
  
};

gameInit(); 



