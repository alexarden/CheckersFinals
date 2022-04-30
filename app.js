console.log('Good luck, all working good');

let table = document.createElement('table');
document.body.appendChild(table); 

let boardSize = 8;


const boardInit = () => {

  for(let row = 0; row < boardSize; row++){

    const rowElement = table.insertRow();
    rowElement.id = row;

    for(let cell = 0; cell < boardSize; cell++){
  
      const cellElement = rowElement.insertCell();
      cellElement.id = `cell_${row}_${cell}`; 

      if(row % 2 !== 0 && cell % 2 === 0 || row % 2 === 0 && cell % 2 !== 0){
        cellElement.classList.add('dark-cell'); 
      };
    }
  }

};

boardInit();
