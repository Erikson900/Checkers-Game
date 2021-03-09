let isWhite = true;
// let flag = false;
//board
let boardData = [];
for(let i = 0 ; i<64 ; i++){
    if(Math.floor(i/8)%2!==0 && (i%8)%2 ===0 || Math.floor(i/8)%2===0 && (i%8)%2!==0){
        if(Math.floor(i/8) < 3){
            boardData[i] = {index: i,row: Math.floor(i/8),column: i%8,isWhitePiece
                : false,isKing: false,id: 'checker',className: 'Black-peice'};
        }else if(Math.floor(i/8)>4){
            boardData[i] = {index: i,row: Math.floor(i/8),column: i%8,isWhitePiece
                : true,isKing: false,id: 'checker',className: 'white-peice'};
        }else{
            boardData[i] = {index: i,row: Math.floor(i/8),column: i%8,isWhitePiece
                : undefined,isKing: false,id: 'placeHolderChecker',className: 'transparant'};
        }
    }
}

function renderBoard(){
const board2 = document.getElementById('board-container2');
let choosenPiece1 = false;
let choosenPiece = undefined;
for(let i =0 ; i < boardData.length ; i++ ){
const blackCell = document.createElement('div');
const greyMark = document.createElement('div');
blackCell.pocket = [];
greyMark.id = 'grey';
greyMark.className ='transparant';
if(Math.floor(i/8)%2===0){
blackCell.id = i;
blackCell.className =  (i%8)%2===0?'white':'black';
}else{
blackCell.id = i;
blackCell.className =  (i%8)%2===0?'black':'white';
}
if(Math.floor(i/8)%2!==0 && (i%8)%2 ===0 || Math.floor(i/8)%2===0 && (i%8)%2!==0){
const checker = document.createElement('div');
checker.row = boardData[i].row;
checker.column = boardData[i].column;
checker.index = boardData[i].index;
checker.isKing = boardData[i].isKing;
checker.isWhitePiece
 = boardData[i].isWhitePiece
;
checker.id = boardData[i].id;
checker.className = boardData[i].className;

checker.appendChild(greyMark);
blackCell.appendChild(checker);
}
board2.appendChild(blackCell);
}
}
        
    function massage(){
        const massage = document.getElementById('massage');
        if(isWhite){
        massage.innerHTML = 'White`s Turn'
        }else{
        massage.innerHTML = 'Black`s Turn'
        }
    }
    
    function pickApiece(){      
        const checkers = document.querySelectorAll('.black');
        for(let checker of checkers){
            checker.addEventListener('click',function options(){
                removeMovingOptions();
                removeAllChoiecs();
                console.log(isWhite + ' this is the turn')

                if(isWhite === boardData[checker.id].isWhitePiece ){   
                    checker.firstChild.classList.add('chosen-peice');
                    if(checkForJumpingOptions()){
                        jumpingOpptionsWest(checker.firstChild);
                        jumpingOpptionsEast(checker.firstChild);
                        jumpingOpptionsSouthWest(checker.firstChild);
                        jumpingOpptionsSouthEast(checker.firstChild);
                    }else{
                        moveOptions(boardData[checker.id]);
                    }
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
    
    function jumpingOpptionsWest(checker){
        const redCells = document.querySelectorAll('.black');
        let westFlag = false;
        let redFlag = false;
        let saveCheckerToPocket;
        for(let i = redCells.length -1 ; i>=0; i--){
            if((checker.isWhitePiece ||checker.isKing) && redCells[i].firstChild.row  === checker.row - 1 && redCells[i].firstChild.column  === checker.column - 1&& redCells[i].firstChild.isWhitePiece !== isWhite && redCells[i].firstChild.isWhitePiece !== undefined){
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
            redCells[i].firstChild.isWhitePiece = true;
            redCells[i].pocket.push(saveCheckerToPocket);
            for(let j = 0;j<checker.parentElement.pocket.length;j++){
                redCells[i].pocket.push(checker.parentElement.pocket[j]);
            }        
            jumpingOpptionsWest(redCells[i].firstChild);
            jumpingOpptionsEast(redCells[i].firstChild);
            if(checker.isKing){
            jumpingOpptionsSouthWest(redCells[i].firstChild);
            jumpingOpptionsSouthEast(redCells[i].firstChild);
            }
        }
        }   
        console.log('JNW');
    return redFlag;
    }
    
    function jumpingOpptionsEast(checker){
        const redCells = document.querySelectorAll('.black');
        let eastFlag = false;
        let redFlag = false;
        let saveCheckerToPocket;
        for(let i = redCells.length -1 ; i>=0; i--){
                if((checker.isWhitePiece
                     === true||checker.isKing) &&redCells[i].firstChild.row  === checker.row - 1 && redCells[i].firstChild.column  === checker.column + 1 && redCells[i].firstChild.isWhitePiece
                 !== isWhite && redCells[i].firstChild.isWhitePiece
                 !== undefined){
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
            redCells[i].firstChild.isWhitePiece
             = true;
            redCells[i].pocket.push(saveCheckerToPocket);
            for(let j = 0;j<checker.parentElement.pocket.length;j++){
                redCells[i].pocket.push(checker.parentElement.pocket[j]);
            }
            jumpingOpptionsWest(redCells[i].firstChild);
            jumpingOpptionsEast(redCells[i].firstChild);
            if(checker.isKing){
            jumpingOpptionsSouthWest(redCells[i].firstChild);
            jumpingOpptionsSouthEast(redCells[i].firstChild);
            }
           }
        }
        console.log('JNE');
    return redFlag;
    }
    
    function jumpingOpptionsSouthWest(checker){
        const redCells = document.querySelectorAll('.black');
        let westFlag = false;
        let redFlag = false;
        let saveCheckerToPocket;
        for(let i = redCells.length -1 ; i>=0; i--){
            console.log(checker.isWhitePiece
                 + ' ' + checker.row + ' ' + checker.column);
            if((checker.isWhitePiece
                 === false||checker.isKing) && redCells[i].firstChild.row  === checker.row + 1 && redCells[i].firstChild.column  === checker.column - 1&& redCells[i].firstChild.isWhitePiece
             !== isWhite && redCells[i].firstChild.isWhitePiece
             !== undefined){
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
            redCells[i].firstChild.isWhitePiece
             = false;
            redCells[i].pocket.push(saveCheckerToPocket);
            for(let j = 0;j<checker.parentElement.pocket.length;j++){
                redCells[i].pocket.push(checker.parentElement.pocket[j]);
            }
            if(checker.isKing){        
            jumpingOpptionsWest(redCells[i].firstChild);
            jumpingOpptionsEast(redCells[i].firstChild);
            }
            jumpingOpptionsSouthWest(redCells[i].firstChild);
            jumpingOpptionsSouthEast(redCells[i].firstChild);
        }
        }   
        console.log('JSW');
    return redFlag;
    }
    
    function jumpingOpptionsSouthEast(checker){
        const redCells = document.querySelectorAll('.black');
        let eastFlag = false;
        let redFlag = false;
        let saveCheckerToPocket;
        for(let i = redCells.length -1 ; i>=0; i--){
            console.log(checker.isWhitePiece
                );
            if((checker.isWhitePiece
                 === false||checker.isKing) && redCells[i].firstChild.row  === checker.row + 1 && redCells[i].firstChild.column  === checker.column + 1 && redCells[i].firstChild.isWhitePiece
             !== isWhite && redCells[i].firstChild.isWhitePiece
             !== undefined){
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
            redCells[i].firstChild.isWhitePiece
             = false;
            redCells[i].pocket.push(saveCheckerToPocket);
            for(let j = 0;j<checker.parentElement.pocket.length;j++){
                redCells[i].pocket.push(checker.parentElement.pocket[j]);
            }        
            if(checker.isKing){
            jumpingOpptionsWest(redCells[i].firstChild);
            jumpingOpptionsEast(redCells[i].firstChild);
            }
            jumpingOpptionsSouthWest(redCells[i].firstChild);
            jumpingOpptionsSouthEast(redCells[i].firstChild);
        }
        }   
        console.log('JSE');
        return redFlag;
    }
    
    function moveOptions(checker){
        const greenCells = document.querySelectorAll('.black');
        for(let emptyCell of greenCells){
            console.log(Math.floor(emptyCell.id));

            if((isWhite||checker.isKing) && checker.row - 1 === Math.floor(emptyCell.id/8) && (checker.column - 1 === emptyCell.id%8|| checker.column + 1 === emptyCell.id%8 ) ){
                emptyCell.firstChild.classList.remove('transparant');
                emptyCell.firstChild.classList.add('green');
            }
            if((!isWhite||checker.isKing) && checker.row + 1 === Math.floor(emptyCell.id/8) && (checker.column - 1 === emptyCell.id%8|| checker.column + 1 === emptyCell.id%8 ) ){
                emptyCell.firstChild.classList.remove('transparant');
                emptyCell.firstChild.classList.add('green');
            }
        }
        console.log('move OPTIONS');
    }
    
    function movePiece(){
    let flag = false;
    let movingChecker = undefined;
        let enptynCells = document.querySelectorAll('.black');
        for(let emptyCell of enptynCells){
            emptyCell.addEventListener('click',(event)=>{
                if(emptyCell.firstChild.className === ('green')||emptyCell.firstChild.className === ('red')){
                 movingChecker = document.querySelector('.chosen-peice');
                    event.stopPropagation();

                    boardData[emptyCell.firstChild.index].isWhitePiece = boardData[movingChecker.index].isWhitePiece;
                    boardData[emptyCell.firstChild.index].isKing = boardData[movingChecker.index].isKing;
                    boardData[emptyCell.firstChild.index].id = boardData[movingChecker.index].id;
                    boardData[emptyCell.firstChild.index].className =boardData[movingChecker.index].className;
                    boardData[movingChecker.index].isWhitePiece = undefined;
                    boardData[movingChecker.index].isKing = false;
                    boardData[movingChecker.index].id = 'placeHolderChecker';
                    boardData[movingChecker.index].className = 'transparant';

                    let spotFrom = document.getElementById(movingChecker.parentElement.id)
                    let newPlaceHolder = document.createElement('div');
                    const cell = document.createElement('div');
                    cell.id = 'grey';
                    cell.className ='transparant';
                    newPlaceHolder.index = movingChecker.index;
                    newPlaceHolder.id = 'placeHolderChecker';
                    newPlaceHolder.className = 'transparant';
                    newPlaceHolder.isWhitePiece = undefined;
                    newPlaceHolder.row = movingChecker.row;
                    newPlaceHolder.column = movingChecker.column;
                    newPlaceHolder.appendChild(cell);
                    movingChecker.index = emptyCell.firstChild.index;
                    movingChecker.row = emptyCell.firstChild.row;
                    movingChecker.column = emptyCell.firstChild.column;
                    emptyCell.replaceChild(movingChecker,emptyCell.firstChild)
                    spotFrom.appendChild(newPlaceHolder);
                   
                    isWhite = !isWhite;
                    removeAllChoiecs();
                    emptyPocket(emptyCell);
                    removeMovingOptions();
                    removeMark();
                    checkGameOver();
                    massage();
                    console.log(boardData);  
                }
            })
        }
        console.log('movepiece');
    }
    
    function emptyPocket(checker){
        let allCells = document.querySelectorAll('.black');   
        if(checker !== null)
        for(let i = 0 ;i<checker.pocket.length;i++){
            if(checker.pocket[i].parentElement === null){
                continue;
            }
            boardData[checker.pocket[i].index].isWhitePiece = undefined;
            boardData[checker.pocket[i].index].isKing = false;
            boardData[checker.pocket[i].index].className = 'transparant';
            boardData[checker.pocket[i].index].id = 'placeHolderChecker';

            let newPlaceHolder = document.createElement('div');
            newPlaceHolder.id = 'placeHolderChecker';
            newPlaceHolder.className = 'transparant';
            newPlaceHolder.isWhitePiece
             = undefined;
            let cell = document.createElement('div');
            cell.id = 'grey';
            cell.className ='transparant';
            newPlaceHolder.appendChild(cell);
            newPlaceHolder.index = checker.pocket[i].index;
            newPlaceHolder.row = checker.pocket[i].row;
            newPlaceHolder.column = checker.pocket[i].column;
            checker.pocket[i].parentElement.appendChild(newPlaceHolder);
            console.log(i + 'This is the I' + checker.pocket[i].parentElement.id)
            checker.pocket[i].parentElement.removeChild(checker.pocket[i]);
        }
        for(let cell of allCells){
        cell.pocket=[];
        }
        console.log('emptyPocket');
    
    }
    
    function removeMovingOptions(){
        const greenCells = document.querySelectorAll('#placeHolderChecker');
        for(let emptyCell of greenCells){
                emptyCell.classList.add('transparant');
                emptyCell.classList.remove('green');
                emptyCell.classList.remove('red');
                emptyCell.isWhitePiece = undefined;
                emptyCell.isKing = false;
            }
            console.log('remove Options');
    
    }
    
    function checkKing(){
        const board = document.querySelectorAll('.black');
            for(let squar of board){
                squar.addEventListener('click',()=>{
                if((squar.firstChild.isKing === false && squar.firstChild.row === 0 && squar.firstChild.isWhitePiece
                     === true)||(squar.firstChild.isKing === false && squar.firstChild.row === 7 && squar.firstChild.isWhitePiece
                     === false)){
                let king = document.createElement('img');
                king.src = 'crown3.png';
                king.id = 'grey';
                boardData[squar.firstChild.index].isKing = true;
                squar.firstChild.isKing = true;
                squar.firstChild.replaceChild(king,squar.firstChild.firstChild);
                }
            })
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
    
    function checkForJumpingOptions(){
        console.log('Enter Check For jumping Piece');
    let whiteCheckers = document.querySelectorAll('.white-peice');
    let blackCheckers = document.querySelectorAll('.Black-peice');
    let flag = false;
    if(isWhite){
        for(let checker of whiteCheckers){
           if(jumpingOpptionsEast(checker)){
                flag = true;
                markJupingPiece(checker);
            }
            if(jumpingOpptionsWest(checker)){
                flag = true;
                markJupingPiece(checker);
            }
            if(jumpingOpptionsSouthWest(checker)){
                flag = true;
                markJupingPiece(checker);
            }
            if(jumpingOpptionsSouthEast(checker)){
                flag = true;
                markJupingPiece(checker);
            }
        }
    }
    if(!isWhite){
        for(let checker of blackCheckers){
           if(jumpingOpptionsSouthEast(checker)){
                flag = true;
                markJupingPiece(checker);
            }
            if(jumpingOpptionsSouthWest(checker)){
                flag = true;
                markJupingPiece(checker);
            }
            if(jumpingOpptionsEast(checker)){
                flag = true;
                markJupingPiece(checker);
            }
            if(jumpingOpptionsWest(checker)){
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
    
    renderBoard();
    massage();   
    movePiece();
    pickApiece();
    checkKing(); 
    