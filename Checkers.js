//board
function renderBoard(){
const board = document.getElementById('board-container');
for(let row = 0;row<8;row++){
    for(let column = 0;column<(8);column++){
        const square = document.createElement('div');
        const cell = document.createElement('div');
        const checker = document.createElement('div');
        square.pocket = [];
        cell.id = 'grey';
        cell.className ='transparant';
        if(row%2===0){
            square.id = 'cell-'+row+'-'+column;
            square.className =  column%2===0?'white':'black';
        }else{
            square.id = 'cell-'+row+'-'+column;
            square.className = column%2===0?'black':'white';
        }
        if(row%2!==0 && column%2 ===0 || row%2===0 && column%2!==0){
            if(row < 3){
            checker.row = row;
            checker.column = column;
            checker.color = false;
            checker.isKing = false;
            checker.id = 'checker';
            checker.className = 'Black-peice'
            }else if(row>4){
            checker.row = row;
            checker.column = column;
            checker.isKing = false;
            checker.color = true;
            checker.id = 'checker';
            checker.className = 'white-peice'
            }else{
            checker.row = row;
            checker.column = column;
            checker.isKing = false;
            checker.color = undefined
            checker.id = 'placeHolderChecker';
            checker.className = 'transparant'
            }
        }
        board.appendChild(square);
        square.appendChild(checker);
        checker.appendChild(cell);
    }   
}
console.log('RENDER BOARD');
}
    
function massage(isWhite){
    const massage = document.getElementById('massage');
    if(isWhite){
    massage.innerHTML = 'White`s Turn'
    }else{
    massage.innerHTML = 'Black`s Turn'
    }
}

function pickApiece(isWhite,somthing){      
    const checkers = document.querySelectorAll('#checker');
    for(let checker of checkers){
        checker.addEventListener('click',function options(event){
            event.stopPropagation(); 
            removeMovingOptions();
            removeAllChoiecs();
            console.log(isWhite + ' this is the turn')
            if(isWhite === checker.color){   
                console.log('Here is the Problem ' + checker.color + ' ' + isWhite);
                checker.classList.add('chosen-peice');
                if(checkForJumpingOptions(isWhite)){
                    jumpingOpptionsWest(isWhite,checker);
                    jumpingOpptionsEast(isWhite,checker);
                    jumpingOpptionsSouthWest(isWhite,checker);
                    jumpingOpptionsSouthEast(isWhite,checker);
                }else{
                    moveOptions(isWhite,checker);
                }
            }else{
                console.log('No problem Here ' + checker.color + ' ' + isWhite);
                console.log('Problem Solved');
            }
        },true)
    }
    console.log('PICK A PIECE');
}

function removeAllChoiecs(){
    const checkers = document.querySelectorAll('#checker');
    for(let checker of checkers){
        checker.classList.remove('chosen-peice');
    }
    console.log('Remove All Choices');
}

function jumpingOpptionsWest(isWhite,checker){
    const redCells = document.querySelectorAll('.black');
    let westFlag = false;
    let redFlag = false;
    let saveCheckerToPocket;
    for(let i = redCells.length -1 ; i>=0; i--){
        if((checker.color === true||checker.isKing) && redCells[i].firstChild.row  === checker.row - 1 && redCells[i].firstChild.column  === checker.column - 1&& redCells[i].firstChild.color !== isWhite && redCells[i].firstChild.color !== undefined){
        westFlag = true;
        saveCheckerToPocket = (redCells[i].firstChild);
        }
    }

    for(let i = redCells.length -1 ; i>=0; i--){
    if(westFlag && redCells[i].firstChild.className === 'transparant' && checker.row - 2 === redCells[i].firstChild.row && checker.column - 2 === redCells[i].firstChild.column){
        westFlag = true;
        redFlag = true;
        redCells[i].firstChild.classList.remove('transparant');
        redCells[i].firstChild.classList.add('red');
        if(checker.isKing){
        redCells[i].firstChild.isKing = true;}
        redCells[i].firstChild.color = true;
        redCells[i].pocket.push(saveCheckerToPocket);
        for(let j = 0;j<checker.parentElement.pocket.length;j++){
            redCells[i].pocket.push(checker.parentElement.pocket[j]);
        }        
        jumpingOpptionsWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsEast(isWhite,redCells[i].firstChild);
        if(checker.isKing){
        jumpingOpptionsSouthWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsSouthEast(isWhite,redCells[i].firstChild);
        }
    }
    }   
    console.log('JNW');
return redFlag;
}

function jumpingOpptionsEast(isWhite,checker){
    const redCells = document.querySelectorAll('.black');
    let eastFlag = false;
    let redFlag = false;
    let saveCheckerToPocket;
    for(let i = redCells.length -1 ; i>=0; i--){
            if((checker.color === true||checker.isKing) &&redCells[i].firstChild.row  === checker.row - 1 && redCells[i].firstChild.column  === checker.column + 1 && redCells[i].firstChild.color !== isWhite && redCells[i].firstChild.color !== undefined){
            eastFlag = true;
            saveCheckerToPocket = (redCells[i].firstChild);
            }
    }

    for(let i = redCells.length -1 ; i>=0; i--){
    if(eastFlag && redCells[i].firstChild.className === 'transparant' && checker.row - 2 === redCells[i].firstChild.row && checker.column + 2 === redCells[i].firstChild.column){
        eastFlag = true;
        redFlag = true;
        redCells[i].firstChild.classList.remove('transparant');
        redCells[i].firstChild.classList.add('red');
        if(checker.isKing){
        redCells[i].firstChild.isKing = true;
        }
        redCells[i].firstChild.color = true;
        redCells[i].pocket.push(saveCheckerToPocket);
        for(let j = 0;j<checker.parentElement.pocket.length;j++){
            redCells[i].pocket.push(checker.parentElement.pocket[j]);
        }
        jumpingOpptionsWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsEast(isWhite,redCells[i].firstChild);
        if(checker.isKing){
        jumpingOpptionsSouthWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsSouthEast(isWhite,redCells[i].firstChild);
        }
       }
    }
    console.log('JNE');
return redFlag;
}

function jumpingOpptionsSouthWest(isWhite,checker){
    const redCells = document.querySelectorAll('.black');
    let westFlag = false;
    let redFlag = false;
    let saveCheckerToPocket;
    for(let i = redCells.length -1 ; i>=0; i--){
        console.log(checker.color + ' ' + checker.row + ' ' + checker.column);
        if((checker.color === false||checker.isKing) && redCells[i].firstChild.row  === checker.row + 1 && redCells[i].firstChild.column  === checker.column - 1&& redCells[i].firstChild.color !== isWhite && redCells[i].firstChild.color !== undefined){
        westFlag = true;
        saveCheckerToPocket = (redCells[i].firstChild);
        }
    }

    for(let i = redCells.length -1 ; i>=0; i--){
    if(westFlag && redCells[i].firstChild.className === 'transparant' && checker.row + 2 === redCells[i].firstChild.row && checker.column - 2 === redCells[i].firstChild.column){
        westFlag = true;
        redFlag = true;
        redCells[i].firstChild.classList.remove('transparant');
        redCells[i].firstChild.classList.add('red');
        if(checker.isKing)
        redCells[i].firstChild.isKing = true;
        redCells[i].firstChild.color = false;
        redCells[i].pocket.push(saveCheckerToPocket);
        for(let j = 0;j<checker.parentElement.pocket.length;j++){
            redCells[i].pocket.push(checker.parentElement.pocket[j]);
        }
        if(checker.isKing){        
        jumpingOpptionsWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsEast(isWhite,redCells[i].firstChild);
        }
        jumpingOpptionsSouthWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsSouthEast(isWhite,redCells[i].firstChild);
    }
    }   
    console.log('JSW');
return redFlag;
}

function jumpingOpptionsSouthEast(isWhite,checker){
    const redCells = document.querySelectorAll('.black');
    let eastFlag = false;
    let redFlag = false;
    let saveCheckerToPocket;
    for(let i = redCells.length -1 ; i>=0; i--){
        console.log(checker.color);
        if((checker.color === false||checker.isKing) && redCells[i].firstChild.row  === checker.row + 1 && redCells[i].firstChild.column  === checker.column + 1 && redCells[i].firstChild.color !== isWhite && redCells[i].firstChild.color !== undefined){
        eastFlag = true;
        saveCheckerToPocket = (redCells[i].firstChild);
        }
    }

    for(let i = redCells.length -1 ; i>=0; i--){
    if(eastFlag && redCells[i].firstChild.className === 'transparant' && checker.row + 2 === redCells[i].firstChild.row && checker.column + 2 === redCells[i].firstChild.column){
        eastFlag = true;
        redFlag = true;
        redCells[i].firstChild.classList.remove('transparant');
        redCells[i].firstChild.classList.add('red');
        if(checker.isKing)
        redCells[i].firstChild.isKing = true;
        redCells[i].firstChild.color = false;
        redCells[i].pocket.push(saveCheckerToPocket);
        for(let j = 0;j<checker.parentElement.pocket.length;j++){
            redCells[i].pocket.push(checker.parentElement.pocket[j]);
        }        
        if(checker.isKing){
        jumpingOpptionsWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsEast(isWhite,redCells[i].firstChild);
        }
        jumpingOpptionsSouthWest(isWhite,redCells[i].firstChild);
        jumpingOpptionsSouthEast(isWhite,redCells[i].firstChild);
    }
    }   
    console.log('JSE');
    return redFlag;
}

function moveOptions(isWhite,checker){
    const greenCells = document.querySelectorAll('#placeHolderChecker.transparant');
    for(let emptyCell of greenCells){
        if((isWhite||checker.isKing) && checker.row -1 === emptyCell.row && (checker.column - 1 === emptyCell.column || checker.column + 1 === emptyCell.column ) ){
            emptyCell.classList.remove('transparant');
            emptyCell.classList.add('green');
        }
        if((!isWhite||checker.isKing) && checker.row +1 === emptyCell.row && (checker.column - 1 === emptyCell.column || checker.column + 1 === emptyCell.column ) ){
            emptyCell.classList.remove('transparant');
            emptyCell.classList.add('green');
        }
    }
    console.log('move OPTIONS');
}

function movePiece(isWhite){
let flag = false;
let movingChecker = undefined;
    let greenCells = document.querySelectorAll('.black');
    for(let emptyCell of greenCells){
        // checkKing(isWhite); 
        emptyCell.addEventListener('click',(event)=>{
            if(emptyCell.firstChild.className === ('green')||emptyCell.firstChild.className === ('red')){
             movingChecker = document.querySelector('.chosen-peice');
                removeAllChoiecs();

                let spotFrom = document.getElementById(movingChecker.parentElement.id)
                let newPlaceHolder = document.createElement('div');
                const cell = document.createElement('div');
                cell.id = 'grey';
                cell.className ='transparant';
                newPlaceHolder.id = 'placeHolderChecker';
                newPlaceHolder.className = 'transparant';
                newPlaceHolder.color = undefined;
                newPlaceHolder.row = movingChecker.row;
                newPlaceHolder.column = movingChecker.column;
                newPlaceHolder.appendChild(cell);
                movingChecker.row = emptyCell.firstChild.row;
                movingChecker.column = emptyCell.firstChild.column;
                emptyCell.replaceChild(movingChecker,emptyCell.firstChild)
                spotFrom.appendChild(newPlaceHolder);

                isWhite = !isWhite;
                emptyPocket(emptyCell);
                removeMovingOptions();
                removeMark();
                removeClick();
                pickApiece(isWhite);
                checkGameOver();
                massage(isWhite);  
            }
        })
    }
    console.log('movepiece');
}

function emptyPocket(emptyCell){
    let allCells = document.querySelectorAll('.black');   
    if(emptyCell !== null)
    for(let i = 0 ;i<emptyCell.pocket.length;i++){
        if(emptyCell.pocket[i].parentElement === null){
            continue;
        }
        let newPlaceHolder = document.createElement('div');
        newPlaceHolder.id = 'placeHolderChecker';
        newPlaceHolder.className = 'transparant';
        newPlaceHolder.color = undefined;
        let cell = document.createElement('div');
        cell.id = 'grey';
        cell.className ='transparant';
        newPlaceHolder.appendChild(cell);
        newPlaceHolder.row = emptyCell.pocket[i].row;
        newPlaceHolder.column = emptyCell.pocket[i].column;
        emptyCell.pocket[i].parentElement.appendChild(newPlaceHolder);
        console.log(i + 'This is the I' + emptyCell.pocket[i].parentElement.id)
        emptyCell.pocket[i].parentElement.removeChild(emptyCell.pocket[i]);
    }
    for(let cell of allCells){
    cell.pocket=[];
    }
    console.log('emptyPocket');

}

function removeClick(){
    let checkers = document.querySelectorAll('#checker');
    for(let checker of checkers){
        let oldChecker = checker;
        let newChecker = oldChecker.cloneNode(true);
        newChecker.color = checker.color;
        newChecker.row = checker.row;
        newChecker.column = checker.column;
        newChecker.isKing = checker.isKing;
        oldChecker.parentElement.replaceChild(newChecker,oldChecker); 
    }
    console.log("Made it Removed Click")
}

function removeMovingOptions(){
    const greenCells = document.querySelectorAll('#placeHolderChecker');
    for(let emptyCell of greenCells){
            emptyCell.classList.add('transparant');
            emptyCell.classList.remove('green');
            emptyCell.classList.remove('red');
            emptyCell.color = undefined;
            emptyCell.isKing = false;
        }
        console.log('remove Options');

}

function checkKing(isWhite){
    const board = document.querySelectorAll('.black');
    if(isWhite){
        for(let squar of board){
            squar.addEventListener('click',()=>{
            if((squar.firstChild.isKing === false && squar.firstChild.row === 0 && squar.firstChild.color === true)||(squar.firstChild.isKing === false && squar.firstChild.row === 7 && squar.firstChild.color === false)){
            let king = document.createElement('img');
            king.src = 'crown3.png';
            king.id = 'grey';
            squar.firstChild.isKing = true;
            squar.firstChild.replaceChild(king,squar.firstChild.firstChild);
            }
        })
    }
    }
    console.log('checking KING');
}

function markJupingPiece(checker){
    if(checker.firstChild.classList.contains('yellow')){
    }else{    
    let mark = document.createElement('div');
    mark.classList.add('yellow');
    mark.appendChild(checker.firstChild);
    checker.appendChild(mark);
    }
}

function checkForJumpingOptions(isWhite){
    console.log('Enter Check For jumping Piece');
let whiteCheckers = document.querySelectorAll('.white-peice');
let blackCheckers = document.querySelectorAll('.Black-peice');
let flag = false;
if(isWhite){
    for(let checker of whiteCheckers){
       if(jumpingOpptionsEast(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
        if(jumpingOpptionsWest(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
        if(jumpingOpptionsSouthWest(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
        if(jumpingOpptionsSouthEast(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
    }
}
if(!isWhite){
    for(let checker of blackCheckers){
       if(jumpingOpptionsSouthEast(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
        if(jumpingOpptionsSouthWest(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
        if(jumpingOpptionsEast(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
        if(jumpingOpptionsWest(isWhite,checker)){
            flag = true;
            markJupingPiece(checker);
        }
    }
}
removeMovingOptions();
console.log('Check For jumping Piece');
return flag;
}

function removeMark(){
    const checkers = document.querySelectorAll('#checker')
    for(let checker of checkers){
        if(checker.firstChild.classList.contains('yellow')){
            let unmark = checker.firstChild.firstChild;
            checker.removeChild(checker.firstChild);
            checker.appendChild(unmark);
        }
    }
    console.log('Remove Mark');
}

function checkGameOver(){
    let whiteCheckers = document.querySelectorAll('.white-peice');
    let blackCheckers = document.querySelectorAll('.Black-peice');

    if(whiteCheckers.length === 0){
        alert("GAME OVER Black WON");
    }
    if(blackCheckers.length === 0){
        alert("GAME OVER white WON");
    }
}

let isWhite = true;
renderBoard();
massage(isWhite);   
movePiece(isWhite);
pickApiece(isWhite);
checkKing(isWhite); 
