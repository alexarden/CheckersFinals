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
      let advanceDown = this.row + direction;
      let advanceDownTwice = this.row + direction * 2;

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

      addMoveOrEat(goRight, eatRight, advanceDown, advanceDownTwice);
      addMoveOrEat(goLeft, eatLeft, advanceDown, advanceDownTwice);    

      moves.forEach(move => {
        if(move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0){

        filteredMoves.push(move)
      };  
      });  
      
      // console.log('filtered moves: ', filteredMoves) 
      return filteredMoves
    };
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
      let advanceUpTwice = this.row - direction * 2;
      let advanceDownTwice = this.row + direction * 2;
      let eatLeft = this.col - direction * 2;
      let eatRight = this.col + direction * 2;
      
      const getBerserkerMoves = (possibleEnemy, rowDirection, eatDirection) => {
        if(possibleEnemy !== undefined && possibleEnemy.player !== this.player){
          if(gameData.getChecker(rowDirection, eatDirection) === undefined){
            moves.push([rowDirection, eatDirection]);
            if(table.rows[rowDirection] !== undefined){
              if(table.rows[rowDirection].cells[eatDirection] !== undefined){
              table.rows[rowDirection].cells[eatDirection].classList.add('eat');
              };
            };
          };
        };
      };

      getBerserkerMoves(possibleEnemyA,advanceDownTwice,eatRight); 
      getBerserkerMoves(possibleEnemyB,advanceDownTwice,eatLeft);
      getBerserkerMoves(possibleEnemyC,advanceUpTwice,eatRight);
      getBerserkerMoves(possibleEnemyD,advanceUpTwice,eatLeft);

      moves.forEach(move => {
        if(move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0){

        filteredMoves.push(move) 
      };  
      });  

      // console.log('berserker moves: ', moves) 

      return filteredMoves
    }; 
  };

  getPossibleQueenMoves(gameData){

    if(this.type === 'queen'){
      let moves = [];
      let filteredMoves = [];
      let direction = 1;

      if(this.player === BLACK_PLAYER){
        direction = -1;
      };

      for(let i = 0; i < boardSize; i++){

        if(gameData.getChecker(this.row + i, this.col + i) === undefined){
          moves.push([this.row + i, this.col + i]);
        }else{
          if(gameData.getChecker(this.row + i, this.col + i).player !== this.player){
            moves.push(this.row + i + 1, this.col + i + 1);
            if(table.rows[this.row + i + 1] !== undefined){
              if(table.rows[this.row + i + 1].cells[this.col + i + 1] !== undefined){
                if(gameData.getChecker(this.row + i + 1, this.col + i + 1) === undefined){
                  if(this.player === gameData.turn){
                    table.rows[this.row + i + 1].cells[this.col + i + 1].classList.add('eat');
                    this.canEat = true; 
                    break;
                  };
                };
              } 
            } 
          }
        }

        if(gameData.getChecker(this.row + i, this.col - i) === undefined){
          moves.push([this.row + i, this.col - i]);
        }else{
          if(gameData.getChecker(this.row + i, this.col - i).player !== this.player){
            moves.push(this.row + i + 1, this.col - i - 1);
            if(table.rows[this.row + i + 1] !== undefined){
              if(table.rows[this.row + i + 1].cells[this.col - i - 1] !== undefined){
                if(gameData.getChecker(this.row + i + 1, this.col - i - 1) === undefined){
                  if(this.player === gameData.turn){
                    table.rows[this.row + i + 1].cells[this.col - i - 1].classList.add('eat');
                    this.canEat = true;
                    break;
                  }
                }
              }
            }
          }
        }

        if(gameData.getChecker(this.row - i, this.col + i) === undefined){
          moves.push([this.row - i, this.col + i]);
        }else{
          if(gameData.getChecker(this.row - i, this.col + i).player !== this.player){
            moves.push(this.row - i - 1, this.col + i + 1);
            if(table.rows[this.row - i - 1] !== undefined){
              if(table.rows[this.row - i - 1].cells[this.col + i + 1] !== undefined){
                if(gameData.getChecker(this.row - i - 1, this.col + i + 1) === undefined){
                  if(this.player === gameData.turn){
                    table.rows[this.row - i - 1].cells[this.col + i + 1].classList.add('eat');
                    this.canEat = true; 
                    break;
                  }
                }
              }
            }
          }
        }

        if(gameData.getChecker(this.row - i, this.col - i) === undefined){
          moves.push([this.row - i, this.col - i]); 
        }else{
          if(gameData.getChecker(this.row - i, this.col - i).player !== this.player){
            moves.push(this.row - i - 1, this.col - i - 1);
            if(table.rows[this.row - i - 1] !== undefined){
              if(table.rows[this.row - i - 1].cells[this.col - i - 1] !== undefined){
                if(gameData.getChecker(this.row - i - 1, this.col - i - 1) === undefined){
                  if(this.player === gameData.turn){
                    table.rows[this.row - i - 1].cells[this.col - i - 1].classList.add('eat');
                    this.canEat = true;
                    break;
                  }
                } 
              }
            }
          }
        }
      }


      moves.forEach(move => {
        if(move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0){

        filteredMoves.push(move) 
      };  
      });  


      return filteredMoves
    };
  };

  getOpponent() {
    if(this.player === WHITE_PLAYER){
      return BLACK_PLAYER;
    }else {
      return WHITE_PLAYER;
    };
  };

};