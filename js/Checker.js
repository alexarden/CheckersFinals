class Checker {
  constructor(row, col, player, type, id){   
    this.row = row;
    this.col = col;
    this.player = player;
    this.type = type; 
    this.id = id;
    this.canEat = false;
    this.canMove = false;       
  };

  getPossiblePawnMoves(gameData) {

    if(this.type === 'pawn'){
    let moves = [];
    let filteredMoves = [];
    let direction = 1;

    if(this.player === BLACK_PLAYER){
      direction = -1;
    };

    let goLeft = this.col - direction;
    let goRight = this.col + direction;
    let eatLeft = this.col - direction * 2;
    let eatRight = this.col + direction * 2;
    let advanceRow = this.row + direction;
    let advanceTwoRows = this.row + direction * 2;

    const addMoveOrEat = (moveDirection, eatDirection, advanceRow, advanceTwoRows) => {

      if(gameData.getChecker(advanceRow, moveDirection) === undefined){

        moves.push([advanceRow, moveDirection]);
      } else {

        if(gameData.getChecker(advanceRow, moveDirection).player !== this.player){

          if(advanceTwoRows <= 7 && eatDirection <= 7){

            if(gameData.getChecker(this.row + direction * 2, eatDirection) === undefined && this.player === gameData.turn){

              moves.push([advanceTwoRows, eatDirection]);
              if(table.rows[advanceTwoRows] !== undefined){

                if(table.rows[advanceTwoRows].cells[eatDirection] !== undefined){

                  table.rows[advanceTwoRows].cells[eatDirection].classList.add('eat');
                  this.canEat = true; 
                };
              };
            }else{
              this.canEat = false;
            };
          };
        };
      }; 
    }; 

    addMoveOrEat(goRight, eatRight, advanceRow, advanceTwoRows);
    addMoveOrEat(goLeft, eatLeft, advanceRow, advanceTwoRows);    

    moves.forEach(move => {
      if(move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0){

       filteredMoves.push(move)
     };  
    });  
    
    // console.log('filtered moves: ', filteredMoves) 
    return filteredMoves
  }
  };

  getPossibleBerserkerMoves(gameData){
     
    if(this.type === 'berserker'){
    let moves = [];
    let filteredMoves = [];
    let direction = 1;

    if(this.player === BLACK_PLAYER){
      direction = -1;
    };
    
    let possibleEnemyA = gameData.getChecker(this.row + direction, this.col + direction);
    let possibleEnemyB = gameData.getChecker(this.row + direction, this.col - direction);
    let possibleEnemyC = gameData.getChecker(this.row - direction, this.col + direction);
    let possibleEnemyD = gameData.getChecker(this.row - direction, this.col - direction);

    if(possibleEnemyA !== undefined && possibleEnemyA.player !== this.player){
      if(gameData.getChecker(this.row + direction * 2, this.col + direction * 2) === undefined){
        moves.push([this.row + direction * 2, this.col + direction * 2]);
        if(table.rows[this.row + direction * 2] !== undefined){
          if(table.rows[this.row + direction * 2].cells[this.col + direction * 2] !== undefined){
           table.rows[this.row + direction * 2].cells[this.col + direction * 2].classList.add('eat');
          }
        }
      }
    } 

    if(possibleEnemyB !== undefined && possibleEnemyB.player !== this.player){
      if(gameData.getChecker(this.row + direction * 2, this.col - direction * 2) === undefined){
        moves.push([this.row + direction * 2, this.col - direction * 2]);
        if(table.rows[this.row + direction * 2] !== undefined){
          if(table.rows[this.row + direction * 2].cells[this.col - direction * 2] !== undefined){
           table.rows[this.row + direction * 2].cells[this.col - direction * 2].classList.add('eat');
          }
        }
      }
    }

    if(possibleEnemyC !== undefined && possibleEnemyC.player !== this.player){
      if(gameData.getChecker(this.row - direction * 2, this.col + direction * 2) === undefined){
        moves.push([this.row - direction * 2, this.col + direction * 2]);
        if(table.rows[this.row - direction * 2] !== undefined){
          if(table.rows[this.row - direction * 2].cells[this.col + direction * 2] !== undefined){
           table.rows[this.row - direction * 2].cells[this.col + direction * 2].classList.add('eat');
          }
        }
      }
    }

    if(possibleEnemyD !== undefined && possibleEnemyD.player !== this.player){
      if(gameData.getChecker(this.row - direction * 2, this.col - direction * 2) === undefined){
        moves.push([this.row - direction * 2, this.col - direction * 2]);
        if(table.rows[this.row - direction * 2] !== undefined){
          if(table.rows[this.row - direction * 2].cells[this.col - direction * 2] !== undefined){
            table.rows[this.row - direction * 2].cells[this.col - direction * 2].classList.add('eat');   
          }  
        }
      } 
    }

    moves.forEach(move => {
      if(move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0){

       filteredMoves.push(move) 
     };  
    });  

    // console.log('berserker moves: ', moves) 

    return filteredMoves
  } 
    







  };

  getOpponent() {
    if(this.player === WHITE_PLAYER){
      return BLACK_PLAYER;
    }else {
      return WHITE_PLAYER;
    };
  };

};