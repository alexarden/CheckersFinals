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
    let possibleMoves;
    let checker = gameData.getChecker(row, col)
    if(!checker) return
    
    if(checker.type === 'pawn'){
      possibleMoves = checker.getPossiblePawnMoves(gameData);
    }else if(checker.type === 'berserker'){
      possibleMoves = checker.getPossibleBerserkerMoves(gameData); 
    }
     
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
  };

  switchTurn() {

    if(gameData.turn === WHITE_PLAYER){
        
      gameData.turn = BLACK_PLAYER;
    }else if(gameData.turn === BLACK_PLAYER){
      
      gameData.turn = WHITE_PLAYER;
    };
  };

  checkForMovesEnd = (whiteMoves, blackMoves) => { 

    if(whiteMoves.length === 0){
      this.resetMarks();
      this.turn = GAME_OVER;
      winner = BLACK_PLAYER;
      document.body.appendChild(div);
      div.classList.add('winner');
      div.innerHTML = `Black player won! <br> Refresh to start new game`; 
    };
  
    if(blackMoves.length === 0){
      this.resetMarks();
      this.turn = GAME_OVER;
      winner = WHITE_PLAYER; 
      document.body.appendChild(div); 
      div.classList.add('winner');
      div.innerHTML = `White player won! <br> Refresh to start new game`;  
    }; 
  ;}

  checkForCheckersEnd = () => {

    let blackCheckers = [];
    let whiteCheckers = [];
  
    for(let checker of this.checkers){
      if(checker.player === BLACK_PLAYER){
       blackCheckers.push(checker); 
      }else{
        whiteCheckers.push(checker);
      };
    }
  
    if(blackCheckers.length === 0){
      gameData.resetMarks();
      gameData.turn = GAME_OVER;
      winner = WHITE_PLAYER; 
      document.body.appendChild(div);
      div.classList.add('winner');
      div.innerHTML = `White player won! <br> Refresh to start new game`; 
    };
  
    if(whiteCheckers.length === 0){
      gameData.resetMarks();
      gameData.turn = GAME_OVER;
      winner = BLACK_PLAYER;
      document.body.appendChild(div);
      div.classList.add('winner');
      div.innerHTML = `Black player won! <br> Refresh to start new game`; 
    };
  
  };

  tryBerserker = () => {
    if(!selectedChecker) return

    if(selectedChecker.type === 'pawn'){

      selectedChecker.getPossiblePawnMoves(gameData);

    }else if(selectedChecker.type === 'berserker'){

      selectedChecker.getPossibleBerserkerMoves(gameData);
    };

    if(selectedChecker.canEat = true){

      selectedChecker.type = 'berserker';
      selectedChecker.getPossibleBerserkerMoves(gameData);
      boardInit(); 
      return  
    };
  };

};