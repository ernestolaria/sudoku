let errase = document.getElementById('errase');
let solve = document.getElementById('solve');
let newG = document.getElementById('new-game');

let selected = false;

//start the game on load
window.onload = function(){
    create()
    setTable();
    keyPad();
    
}

//call the newGame method
newG.addEventListener('click', newGame);

//call the remove method
errase.addEventListener('click', remove);

//call the autoSolve method
solve.addEventListener('click', autoSolver);


//create the empty 9x9 grid 
function setTable(){
    for(let row=0; row<9; row++){
        for(let col=0; col<9; col++){
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = row + ' ' + col; 
            document.getElementById("board").append(tile);
            printValues(tile, row, col);
            if(row==0 && col==0){
                tile.classList.add("top-left-corner-tile");
            }
            if(row==0 && col==8){
                tile.classList.add("top-right-corner-tile");
            }
            if(row==8 && col==0){
                tile.classList.add("bottom-left-corner-tile");
            }
            if(row==8 && col==8){
                tile.classList.add("bottom-right-corner-tile");
            }
            if(row==2 || row==5){
                tile.classList.add("horizontal-line"); 
            }
            if(col==2 || col==5){
                tile.classList.add("vertical-line"); 
            }
            tile.addEventListener("click", selectTile);   
        }
    }         
}


//print the values inside the grid
function printValues(tile, row, col){

    if(grid[row][col] != empty){
        tile.innerText=grid[row][col];  
        tile.classList.add("start-num");                          
    }  
}


//create the 9 digits numpad
function keyPad(){

    let numbers=[
        "123",
        "456",
        "789"
    ]

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            let digit = document.createElement("div");
            digit.classList.add("digit");
            document.getElementById("keypad").append(digit);
            digit.id = numbers[i][j];
            digit.innerText = numbers[i][j];  
            digit.addEventListener("click", insertDigit); 
        }  
    }        
}


//select the tile
function selectTile(){

    if(selected != false){
        selected.classList.remove("tile-selected");
    }

    selected = this;

    if(!selected.classList.contains("start-num")){  
        selected.classList.add("tile-selected"); 
    }

}


//select the digigts to insert
function insertDigit(){
    
    let keyNumber = this;
    
    //number.classList.add("num-selected"); 
    if(keyNumber && selected != false && !selected.classList.contains("start-num")){
       
       selected.innerText = keyNumber.id;
       
       let coords = selected.id.split(' ');
       let row = coords[0];
       let col = coords[1];
       
       grid[row][col] = selected.innerText;
       
    }
    
    return win();
  
}


//delete items from board   
function remove(){
    
    if(selected.innerText != empty && selected != false && !selected.classList.contains("start-num")){
        
        selected.innerText = empty;

        let coords = selected.id.split(' ');
        let row = coords[0];
        let col = coords[1];
 
        grid[row][col] = selected.innerText;
    }

}


//automatic solve the puzzle
function autoSolver(){

    let tile = document.querySelectorAll('.tile');
    
    let solution = finalGrid.toString().split(',');

    for(let i=0; i<tile.length; i++){
        
        tile[i].innerText = [...solution[i]]

        tile[i].classList.add("start-num");  
  
    }

    document.getElementById("game-status").innerText = 'SOLVED'; 
    
    if(selected){
        selected.classList.remove("tile-selected");
    }  
}


function newGame(){

    let tile = document.querySelectorAll('.tile');

    create();

    let newGrid = grid.toString().split(',');

    for(let i=0; i<tile.length; i++){

        tile[i].innerText = empty;

        tile[i].classList.remove("start-num");

        tile[i].innerText = [...newGrid[i]]

        if(newGrid[i] != empty){
            tile[i].classList.add("start-num");                          
        }  

    }
    
    if(selected){
        selected.classList.remove("tile-selected");
    }  

    document.getElementById("game-status").innerText = 'GAME STARTED';

}




