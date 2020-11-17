document.addEventListener('DOMContentLoaded', () => {
//all code goes here - make sure page is loaded before JS kicks in 

 const grid = document.querySelector('#grid');
 let width = 10;
 let squares = [];
    // let squares = new Array(100);
 let bombCount =37;
 let total = 0;
let flags = 0;
let flagsLeft = bombCount - flags;
 let isGameOver = false;
 let result = document.querySelector('.result');
 let gameisOver = document.querySelector('.game-over');
 let currentId = '';

 //function to create board

    function createBoard() {

      //add flags wth right clicks

      function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombCount)) {
          if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = ' 🚩'
            flags ++
            checkForWin(squares);
            // flagsLeft.innerHTML = bombCount- flags
          
          } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags --
            flagsLeft.innerHTML = bombCount- flags
          }
        }
      }

        //random array of bombs

        const bombArray = Array(bombCount).fill('bomb');
        const emptyArray = Array(width*width - bombCount).fill('valid');
        const gameArray = emptyArray.concat(bombArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5);

        console.log(bombArray);
        console.log(emptyArray);
        console.log(gameArray); 
        console.log(shuffledArray);
        //used to make sure everything is in order
        

    /////    these are the boxes in the grid
        for(let i = 0; i < width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square)

            // --------------event listeners -------------------//

            //normal click & control click
            square.addEventListener('click', (e) =>{
               

                if (window.event.ctrlKey){

                     
                        e.preventDefault()
                        addFlag(square)
                      
                  } else{
                     //invokes a fuction called 'click' which is yet to be made. 'square' will be passed into that function
                    click(square);
                  }
            });

            
        }



        //check the bombs in surrounding squares

        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width -1)
      
            if (squares[i].classList.contains('valid')) {
              if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
              if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
              if (i > 10 && squares[i -width].classList.contains('bomb')) total ++
              if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
              if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
              if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
              if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
              if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
              squares[i].setAttribute('data', total)
            }
          }
        }

    createBoard ();

    //click on suqre actions

    function click(square) {
        let currentId = square.id;
        //stop the game if game over
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;




        if(square.classList.contains('bomb')){
            gameOver(square, squares);
            console.log('Game Over!');
            // square.classList.add('show-bomb');
            square.innerHTML = '💣';
            square.style.backgroundColor = '#bd4831';
        } else {
            let squareTotal = square.getAttribute('data');
                if(squareTotal != 0){
                    square.classList.add('checked');
                    square.innerHTML = squareTotal;
                    return; // to break the cycle
                } 

                    //recurssion
                     checkSquare(square, currentId)
                }
                    square.classList.add('checked');
        }

    //function to check neibouring squares once a square is clicked

    
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width -1);
    
       
    setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1].id
          //const newId = parseInt(currentId) - 1   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 9 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 -width].id
          //const newId = parseInt(currentId) +1 -width   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 10) {
          const newId = squares[parseInt(currentId -width)].id
          //const newId = parseInt(currentId) -width   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 11 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 -width].id
          //const newId = parseInt(currentId) -1 -width   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 98 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1].id
          //const newId = parseInt(currentId) +1   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 90 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 +width].id
          //const newId = parseInt(currentId) -1 +width   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 88 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 +width].id
          //const newId = parseInt(currentId) +1 +width   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 89) {
          const newId = squares[parseInt(currentId) +width].id
          //const newId = parseInt(currentId) +width   ....refactor
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
      }, 10)

    }



    //gameOver function

function gameOver(square, squares) {

  //it was saying 'squares arrat wasnt defined so I mofified the function to pull it thorugh
  gameisOver.innerHTML = 'Game Over!'
  gameisOver.style.opacity = .6;
  console.log('Boom, game over');
  isGameOver = true;

  //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')){
                square.innerHTML = '💣';
                square.style.backgroundColor = '#	5BB1D5';
      }
      
    });

}

//check for win function 

function checkForWin(squares) {
  ///simplified win argument
let matches = 0;
let bombAmount = 20

  for (let i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
      matches ++
    }
    if (matches === bombCount) {
      result.innerHTML = 'YOU WIN!'
      result.style.opacity = 1;
     
      isGameOver = true
    }
  }
}


})

