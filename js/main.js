/**
 * L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
   con difficoltà 1 => tra 1 e 100
   con difficoltà 2 => tra 1 e 81
   con difficoltà 3 => tra 1 e 49
   Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

*/

const gridWrapper = document.getElementById('my-grid');

const buttonPlay = document.querySelector('button');

// let difficoltyLevel = document.querySelector('select').value;


buttonPlay.addEventListener('click', function(){
   gridSquares ();
});



/**
 * FUNCTIONS
 * 
 */

function gridSquares (){

   gridWrapper.innerHTML = '';

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

         if(bombs.includes(i)){
            this.classList.add('bomb');
            playerPoint("game-results", `You hit a bomb, your score is ${points} `);
            

         } else {
            this.classList.add('active');
            points++;
            playerPoint("game-results", `Your score is ${points} `);
         }
         })
         gridWrapper.appendChild(currentSquare);
      }

      const bombs = bombListNumbers (16, squareNumber);
      console.log(bombs);
   }

function square(number){

      newSquare = document.createElement('div');
      newSquare.classList.add('my-square');
      newSquare.style.width = `calc(100% / ${cellsPerRow})` 
      newSquare.style.height = newSquare.style.width;
      newSquare.innerHTML = `<span>${number}</span> `;
      return newSquare;
}

function bombListNumbers (bombNumber, squareNumber){
   bombList =[];
   for (let x = 0; x < bombNumber; x++){
      bombList.push(isOnBlackList (bombList, 1, squareNumber));
   }
   return bombList;
}

function randomNumber (min, max){
   if (isNaN(parseInt(min)) || (isNaN(parseInt(min)))){
      console.log('min or max isn\'t a number');
   }
   return Math.floor(Math.random() * ((max +1) - min + min));
}

function isOnBlackList (generatedBombList, min, max){
   let check = false;
   let randomNum;

   randomNum = randomNumber(1, squareNumber);

   if (!generatedBombList.includes(randomNum)){
      check = true;
   }
   return randomNum;
}

function playerPoint (elementId, strg){
   document.getElementById(elementId).innerHTML = strg;

}

