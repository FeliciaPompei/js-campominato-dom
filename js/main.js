/**
 * L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
   con difficoltà 1 => tra 1 e 100
   con difficoltà 2 => tra 1 e 81
   con difficoltà 3 => tra 1 e 49
   Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

*/

// Variables & consts.
const gridWrapper = document.getElementById('my-grid');
const buttonPlay = document.querySelector('button');

// event listeners
buttonPlay.addEventListener('click', function(){
   gridSquares ();
});



/**
 * FUNCTIONS
 * 
 */

/**
 * gridSquares
 */
function gridSquares (){

   gridWrapper.innerHTML = '';

   let isGameOver = false;

   let difficoltyLevel = document.querySelector('select').value;
   console.log(difficoltyLevel);

   let points = 0;

   switch (difficoltyLevel){
      case 'Easy':
         default:
            squareNumber = 100;
            break;
      case 'Medium':
         squareNumber = 81;
         break;
      case 'Hard':
         squareNumber = 49;
         break;
   }

   cellsPerRow = Math.sqrt(squareNumber);

   for(let i= 1; i <= squareNumber; i++){
      const currentSquare = square(i, cellsPerRow);

      currentSquare.addEventListener('click', function(){

         if (!isGameOver){
            if(bombs.includes(i)){
               this.classList.add('bomb');
               playerPoint("game-results", `You hit a bomb, your score is ${points} `);
               isGameOver = true;
               explodeBombs(bombs, 'bomb');
   
            } else {
               this.classList.add('active');
               points++;
               playerPoint("game-results", `Your score is ${points} `);
               
            }
         }
         }, {once: true} )
         gridWrapper.appendChild(currentSquare);
      }

      const bombs = bombListNumbers (16, squareNumber);
      console.log(bombs);
   }

/**
 * 
 * @param number number 
 * @returns the correct number of squares for the difficolty level
 */

function square(number){

      newSquare = document.createElement('div');
      newSquare.classList.add('my-square');
      newSquare.style.width = `calc(100% / ${cellsPerRow})` 
      newSquare.style.height = newSquare.style.width;
      newSquare.innerHTML = `<span>${number}</span> `;
      return newSquare;
}
/**
 * 
 * @param number bombNumber 
 * @param number squareNumber 
 * @returns the number of bomb for the selected level
 */
function bombListNumbers (bombNumber, squareNumber){
   bombList =[];
   for (let x = 0; x < bombNumber; x++){
      bombList.push(isOnBlackList (bombList, 1, squareNumber));
   }
   return bombList;
}

/**
 * 
 * @param number min 
 * @param number max 
 * @returns a random number between min and max
 */
function randomNumber (min, max){
   if (isNaN(parseInt(min)) || (isNaN(parseInt(min)))){
      console.log('min or max isn\'t a number');
   }
   return Math.floor(Math.random() * ((max +1) - min + min));
}

/**
 * 
 * @param array generatedBombList 
 * @param number min 
 * @param number max 
 * @returns a random number that isn't existen in the given array
 */

function isOnBlackList (generatedBombList, min, max){
   let check = false;
   let randomNum;

   randomNum = randomNumber(1, squareNumber);

   if (!generatedBombList.includes(randomNum)){
      check = true;
   }
   return randomNum;
}

/**
 * 
 * @param number elementId 
 * @param string strg 
 */

function playerPoint (elementId, strg){
   document.getElementById(elementId).innerHTML = strg;

}

/**
 * 
 * @param array bombList 
 * @param string addClassName 
 */

function explodeBombs (bombList, addClassName){
   const cells = gridWrapper.children;
   for (let i = 0; i < cells.length; i++){
      if (bombList.includes(parseInt(cells[i].firstChild.innerHTML))){
         cells[i].classList.add(addClassName);
      }
   }

}
