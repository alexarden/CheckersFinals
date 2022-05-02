let table;
let boardSize = 8;
let gameData; 
let selectedChecker;
let selectedCell; 
let winner;
let div = document.createElement('div');

const BLACK_PLAYER = 'black';
const WHITE_PLAYER = 'white';
const GAME_CHECKERS = [];
const TABLE_ID = 'table';
const GAME_OVER = 'game over';



class Checker {
  constructor(row, col, player,id){
    this.row = row;
    this.col = col;
    this.player = player;
    this.canEat = false;
    this.canMove = false;       
    this.id = id;
  };

  
  getPossibleMoves(gameData) {
    let moves = [];
    let filteredMoves = [];
    let direction = 1;

    if(this.player === BLACK_PLAYER){
      direction = -1;
    };

   
    if(gameData.getChecker(this.row + direction, this.col + direction) === undefined){
      moves.push([this.row + direction, this.col + direction]);
    } else {
      if(gameData.getChecker(this.row + direction, this.col + direction).player !== this.player){
        if(this.row + direction * 2 <= 7 && this.col + direction * 2 <= 7){
          if(gameData.getChecker(this.row + direction * 2, this.col + direction * 2) === undefined && this.player === gameData.turn){
            moves.push([this.row + direction * 2, this.col + direction * 2]);
            if(table.rows[this.row + direction * 2] !== undefined){
              if(table.rows[this.row + direction * 2].cells[this.col + direction * 2] !== undefined){
                table.rows[this.row + direction * 2].cells[this.col + direction * 2].classList.add('eat');
                this.canEat = true; 
              };
            };
          }else{
            this.canEat = false;
          };
        };
      };
    };
    
    if(gameData.getChecker(this.row + direction, this.col - direction) === undefined){
      moves.push([this.row + direction, this.col - direction]);
    }else {
      if(gameData.getChecker(this.row + direction, this.col - direction).player !== this.player){
        if(this.row + direction * 2 <= 7 && this.col - direction * 2 <= 7 ){   
          if(gameData.getChecker(this.row + direction * 2, this.col - direction * 2) === undefined && this.player === gameData.turn){  
            moves.push([this.row + direction * 2, this.col - direction * 2]);
            if(table.rows[this.row + direction * 2] !== undefined){
              if(table.rows[this.row + direction * 2].cells[this.col - direction * 2] !== undefined){
                table.rows[this.row + direction * 2].cells[this.col - direction * 2].classList.add('eat');
                this.canEat = true;
              };
            };
          }else{
            this.canEat = false;
          };
        };
      };
    };
    
    
    moves.forEach(move => {
      if(move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0){

       filteredMoves.push(move)
     };  
    }); 

    // console.log(filteredMoves) 
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
        table.rows[row].cells[col].classList.remove('eat');  
      } 
    }
  };

  showPossibleMoves = (row, col) => {

    let checker = gameData.getChecker(row, col)
    if(!checker) return
    
    let possibleMoves = checker.getPossibleMoves(gameData);
    for(let move of possibleMoves){

      if(checker.player === gameData.turn){

        if(gameData.getChecker(move[0], move[1]) === undefined){
          table.rows[move[0]].cells[move[1]].classList.add('movement');
        };
      };
    } 

    selectedCell = table.rows[checker.row].cells[checker.col];
    selectedCell.classList.add('selected')
    selectedChecker = checker; 
  };
  
  removeChecker(row, col) {

    for(let i = 0; i < this.checkers.length; i++){

      let checker = this.checkers[i]
      if(checker.row === row && checker.col === col){

        this.checkers.splice(i, 1);
      };
    }
  };
  
  tryMove(row, col) { 

    if(table.rows[row].cells[col].classList.contains('movement')){
  
      selectedChecker.row = row;
      selectedChecker.col = col; 
      return true;
    };
    return false;
  };

  tryEat(row, col) {

    if(table.rows[row].cells[col].classList.contains('eat')){
      if(selectedChecker !== undefined){
        let lastRowPosition = selectedChecker.row;
        let lastColPosition = selectedChecker.col;
        selectedChecker.row = row;
        selectedChecker.col = col; 
        gameData.removeChecker((lastRowPosition + selectedChecker.row) / 2, (lastColPosition + selectedChecker.col) / 2);
      };

      return true;
    };
   return false;
  }

  switchTurn() {

    if(gameData.turn === WHITE_PLAYER){
        
      gameData.turn = BLACK_PLAYER;
    }else if(gameData.turn === BLACK_PLAYER){
      
      gameData.turn = WHITE_PLAYER;
    };
  };
};

const checkForEats = () => {

  // As a defalut all chekckers are disabled.
  // if no eat can be made all checker can move.
  //if an eat is available only the one checker who can eat can move.

  const checkerCanEat = [];
  const whiteMoves = [];
  const blackMoves = []; 

  for(let checker of gameData.checkers){
    let result = checker.getPossibleMoves(gameData) 
    if(checker.player === WHITE_PLAYER && result.length !== 0){ 
      whiteMoves.push(result)
    }
    if(checker.player === BLACK_PLAYER && result.length !== 0){ 
      blackMoves.push(result)
    }
    if(checker.canEat === true){
    checkerCanEat.push(checker);
    }
  }
  
  checkForMovesEnd(whiteMoves, blackMoves);
 
  if(checkerCanEat.length === 0){
    for(let checker of gameData.checkers){
      checker.canMove = true;
    }
  }else{
    for(let checker of gameData.checkers){
      checker.canMove = false; 
    }
  }

  checkerCanEat.forEach(checker => {
    checker.canMove = true;
  }); 
};

const checkForMovesEnd = (whiteMoves, blackMoves) => { 

  if(whiteMoves.length === 0){
    gameData.resetMarks();
    gameData.turn = GAME_OVER;
    winner = BLACK_PLAYER;
    document.body.appendChild(div);
    div.classList.add('winner');
    div.innerHTML = `Black player won! <br> Fresh to restart`; 
  };

  if(blackMoves.length === 0){
    gameData.resetMarks();
    gameData.turn = GAME_OVER;
    winner = BLACK_PLAYER;
    document.body.appendChild(div); 
    div.classList.add('winner');
    div.innerHTML = `White player won! <br> Fresh to restart`; 
  }; 
;}

const checkForCheckersEnd = () => {

  let blackCheckers = [];
  let whiteCheckers = [];

  for(let checker of gameData.checkers){
    if(checker.player === BLACK_PLAYER){
     blackCheckers.push(checker); 
    }else{
      whiteCheckers.push(checker);
    };
  }

  if(blackCheckers.length === 0){
    gameData.resetMarks();
    gameData.turn = GAME_OVER;
    winner = BLACK_PLAYER;
    document.body.appendChild(div);
    div.classList.add('winner');
    div.innerHTML = `White player won! <br> Fresh to restart`; 
  };

  if(whiteCheckers.length === 0){
    gameData.resetMarks();
    gameData.turn = GAME_OVER;
    winner = BLACK_PLAYER;
    document.body.appendChild(div);
    div.classList.add('winner');
    div.innerHTML = `Black player won! <br> Fresh to restart`; 
  };

}

const removeMovmentWhenCanEat = () => {

  // remove movement when can eat.
  for(let i = 0; i < boardSize; i++){
    for(let j = 0; j < boardSize; j++){
      if(table.rows[i].cells[j].classList.contains('eat')){
        for(let i = 0; i < boardSize; i++){
          for(let j = 0; j < boardSize; j++){
            table.rows[i].cells[j].classList.remove('movement');
          }
        }
      };
    }
  }

};


const clickOnCell = (row, col) => {
  
  checkForEats(); 
  
 if(selectedChecker === undefined){

    gameData.resetMarks();
    gameData.showPossibleMoves(row, col);
    removeMovmentWhenCanEat();

  } else {
    
    if(selectedChecker.player === gameData.turn && selectedChecker.canMove === true){  

      if(gameData.tryMove(row, col)){
        gameData.switchTurn();
        selectedChecker = undefined;
      };
      
      if(gameData.tryEat(row, col)){
        gameData.switchTurn();
        selectedChecker = undefined; 
        for(let checker of gameData.checkers){
          checker.canEat = false;  
        }
      };
      
      checkForCheckersEnd();
      gameData.resetMarks(); 
      gameData.showPossibleMoves(row, col); 
      removeMovmentWhenCanEat()
      boardInit();  
      selectedChecker = undefined; 

    }else{

      selectedChecker = undefined;  
      gameData.resetMarks(); 
      gameData.showPossibleMoves(row, col);
      removeMovmentWhenCanEat();
      
    }; 
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

      if(row % 2 !== 0 && col % 2 === 0 && row > 4 ||  row === 6 && col % 2 !== 0){   

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



