let grid=[]; 
let finalGrid=[];
let empty = '';

//create the game
function create(){

    for(let i=0; i<9; i++){
        grid[i] = Array(9).fill(empty);
    }
    
    return makeUnique() && solver() && setGame();
    
} 


//makes a copy of the array
function copy(array1, array2){
    for(let i=0; i < array1.length; i++){
        array2[i] = [...array1[i]];
    }  
    return array2;  
}


//check for repeated values in row, column, and 3x3 subgrids
function isValid(row, col, number){
    return rowValid(col, number) && colValid(row, number) && boxValid(row, col, number);
}
  

//check for repeated values in rows
function rowValid(col, number){
    for(let i=0; i<9; i++){
        if(grid[i][col]===number){
            return false;
        }
    }
    return true
}


//check for repeated values in columns
function colValid(row, number){
    for(let j=0; j<9; j++){
        if(grid[row][j]===number){
            return false;
        }
    }
    return true
}


//check for repeated values in 3x3 subgrids
function boxValid(row, col, number){
    let boxRow = row - (row % 3);
    let boxCol = col - (col % 3);
    for(let i=boxRow; i<boxRow + 3; i++){
        for(let j=boxCol; j<boxCol + 3; j++){
            if(grid[i][j]===number){
                return false;
            }
        }
    }
    return true
}


//create a unique row for each game to make it unique 
function makeUnique(){
   
    for(let row=0; row<8; row++){
        let number = Math.floor(Math.random() * (9 - 1) + 1);
        while(!isValid(row, 0, number)){
            number = Math.floor(Math.random() * (9 - 1) + 1);
        }
        grid[row][0] = number;
    }
    
    return true;
}


//solve the puzle to start the game
function solver(){
    
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            if(grid[row][col] === empty){
                for(let number = 1; number <= 9; number++){ 
                    if(isValid(row, col, number)){
                        grid[row][col] = number; 
                        
                        if(solver()){

                            return true;
                        }

                        grid[row][col] = empty;
                    }
                }
                
                return false;
            }
        }
    }
    
    copy(grid, finalGrid);
    
    return true;
}


//insert random 0 along the grid based on dificulty
function setGame(){
     for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            
            let random = Math.floor(Math.random() * (81 - 1) + 1);

            if(random>21){
                grid[i][j] = empty;
            }
        }
    }
    
    return true;
}


//check if the game is complete
function isFull(){
    for(let row = 0; row < grid.length; row++){ 
        for(let col = 0; col < grid.length; col++){ 
            
            if(grid[row][col] === empty ){
                return false;
            }              
        } 
    } 
     
    return true;  
}


//compare the puzzle with the final solution
function checkSolution(){
    for(let row = 0; row < grid.length; row++){ 
        for(let col = 0; col < grid.length; col++){  
            if(grid[row][col] != finalGrid[row][col]){
                return false;
            }  
        } 
    }   
   
    return true;  
}


//check if the puzzle has been completed by the user
function win(){
    
    if(!isFull() || !checkSolution()){
        
        return false
    }

    let tile = document.querySelectorAll('.tile');

    for(let i=0; i<tile.length; i++){
        tile[i].classList.add("start-num");
    }
    
    selected.classList.remove("tile-selected");

    document.getElementById("game-status").innerText = 'YOU WIN'; 
    
    return true;
}


