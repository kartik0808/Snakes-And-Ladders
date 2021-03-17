//Default player names
let person1 = 'Tony Stark';
let person2 = 'Barney Stinson';

// To start game on loading of the page
window.onload = function(){
document.getElementById('game').style.display='block';
  document.getElementById('game-image').style.display='block';
  document.getElementById('turn-teller').innerHTML = 'Player1 turn:';
  document.getElementById('dice').style.display='flex';
  let i;
  for(i = 1; i <= 100; i++) {
    boxCreator();
  }

  // Used for creation of the grid
  function boxCreator() {
    let attributesForBoxes = document.createAttribute('class');
    attributesForBoxes.value = 'box-attributes';
    let box = document.createElement('div');
    box.id = `box${i}`;
    box.setAttributeNode(attributesForBoxes);
    document.getElementById('game').appendChild(box);
    document.getElementById('game').style.display = 'flex';
  }
  nameTaker();

  // Function for players to set names
  function nameTaker() {
    person1 = prompt('Player1 name', 'Tony Stark');
    person2 = prompt('Player2 name', 'Barney Stinson');
    if (person2 === person1)  {
      alert('If both players have same names, use nicknames');
      nameTaker();
    } else if(person2.length < 3 || person1.length < 3) {
      alert('Player Names must be atleast 3 characters long');
      nameTaker();
    }
    alert(`${person1} has the color blue and ${person2} has the color red`);
  }
  let playerButtons = document.getElementsByClassName('no-of-players');
  for(let i = 0; i < playerButtons.length; i++) {
    playerButtons[i].style.display = 'none';
  }
}
let playerTurn = 1;
let total1 = 0;
let total2 = 0;
let flag1 = 0;
let flag2 = 0;
let sixThreeTimesChecker = 0;
let tempPositionHolder = 0;

// Function for when dice is rolled
function diceRoll() {
  let diceNumber = Math.ceil(Math.random()*6);
  rollingDice();

  // Function to show animation of rotating dice 
  function rollingDice() {
    let img = document.getElementById('temp-image');
    img.src = 'dicer.gif';
  }
  setTimeout(diceImage,1000,diceNumber);

  // Function to fetch the Dice Image of the randomly generated number 
  function diceImage(number) {
    let img = document.getElementById('temp-image');
    img.src = `dice${number}.png`; 

  }
  setTimeout(pieceMover,1000);

  // Function to move the required piece
  function pieceMover() {
    if(diceNumber === 6 || flag1 === 1 || flag2 === 1) {
      if(playerTurn === 1 && diceNumber === 6) {
        flag1 = 1 ;
      } else if(diceNumber === 6) {
        flag2 = 1;
      }
      if(playerTurn === 1 && flag1 === 1) {
        if(total1 >= 1 && total1 + diceNumber <= 100) {
          total1 = total1 + diceNumber;
        } else if(total1 === 0) {
          total1 = 1;
        }
        document.getElementById(`box${total1}`).appendChild(document.getElementById('player-1'));
        if(diceNumber === 6) {
          if(sixThreeTimesChecker === 0) {
            tempPositionHolder = total1;
          }
          sixThreeTimesChecker+=1;
          if(sixThreeTimesChecker === 3) {
            total1 = tempPositionHolder;
            document.getElementById(`box${total1}`).appendChild(document.getElementById('player-1'));
            sixThreeTimesChecker = 0;
          } else {
            playerTurn = 2;
          }
        } else {
          document.getElementById(`box${total1}`).appendChild(document.getElementById('player-1'));
          setTimeout(snakeChecker, 700, total1, 1);
          setTimeout(ladderChecker, 700, total1, 1);
          sixThreeTimesChecker = 0;
        }
        if(total1 === 100) {
          document.getElementsByClassName('board')[0].style.display = 'none';
          document.getElementById('winner').innerHTML = `${person1} is the Winner <br> Click New Game to Play Again`;
        }
      } else if(playerTurn === 2 && flag2 === 1) {
        if(total2 >= 1 && total2 + diceNumber <= 100) {
          total2 = total2 + diceNumber;
        } else if(total2 === 0) {
          total2 = 1;
        }
        document.getElementById(`box${total2}`).appendChild(document.getElementById('player-2'));
        if(diceNumber === 6 && (total1 + diceNumber <= 100)) {
          if(sixThreeTimesChecker === 0) {
            tempPositionHolder = total2;
          }
          sixThreeTimesChecker += 1;
          if(sixThreeTimesChecker === 3) {
            total2 = tempPositionHolder; 
            document.getElementById(`box${total2}`).appendChild(document.getElementById('player-2'));
            sixThreeTimesChecker = 0;
          } else {
            playerTurn = 1;
          }
        } else {
          document.getElementById(`box${total2}`).appendChild(document.getElementById('player-2'));
          setTimeout(snakeChecker, 700, total2, 2);
          setTimeout(ladderChecker, 700, total2, 2);
          sixThreeTimesChecker = 0;
        }
        if(total2 === 100) {
          document.getElementsByClassName('board')[0].style.display = 'none';
          document.getElementById('winner').innerHTML = `${person2} is the Winner <br> Click New Game to Play Again`;
        }
      }
    }
    if(playerTurn === 1) {
      playerTurn = 2;
    } else {
      playerTurn = 1;
    }
    document.getElementById('turn-teller').innerHTML = `Player${playerTurn} turn:`;
  }

  // Function to check if the current player is at a ladder bottom
  function ladderChecker(x, playerNo) {
    if(x === 3) {
      document.getElementById('box51').appendChild(document.getElementById(`player-${playerNo}`));
      if(playerNo === 1) {
        total1 = 51;
      } else {     
        total2 = 51;
      }
    } else if(x === 6) {
      if(playerNo === 1) {
        total1 = 27;
      } else {    
        total2 = 27;
      }
      document.getElementById('box27').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 20) {
      if(playerNo === 1) {
        total1 = 70;
      } else {    
        total2 = 70;
      }
      document.getElementById('box70').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 36) {
      if(playerNo === 1) {
        total1 = 55;
      } else {    
        total2 = 55;
      }
      document.getElementById('box55').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 63) {
      if(playerNo === 1) {
        total1 = 95;
      } else {    
        total2 = 95;
      }
      document.getElementById('box95').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 68) {
      if(playerNo === 1) {
        total1 = 98;
      } else {    
        total2 = 98;
      }
      document.getElementById('box98').appendChild(document.getElementById(`player-${playerNo}`));
    }
  }

  // Function to check if the current player is at the head of a snake
  function snakeChecker(x, playerNo) {
    if(x === 99) {
      document.getElementById('box69').appendChild(document.getElementById(`player-${playerNo}`));
      if(playerNo === 1) {
        total1 = 69;
      } else {    
        total2 = 69;
      }
    } else if(x === 91) {
      if(playerNo === 1) {
        total1 = 61;
      } else {    
        total2 = 61;
      }
      document.getElementById('box61').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 87) {
      if(playerNo === 1) {
        total1 = 57;
      } else {    
        total2 = 57;
      }
      document.getElementById('box57').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 65) {
      if(playerNo === 1) {
        total1 = 52;
      } else {    
        total2 = 52;
      }
      document.getElementById('box52').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 47) {
      if(playerNo === 1) {
        total1 = 19;
      } else {
        total2 = 19;
      }
      document.getElementById('box19').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 34) {
      if(playerNo === 1) {
        total1 = 1;
      } else {    
        total2 = 1;
      }
      document.getElementById('box1').appendChild(document.getElementById(`player-${playerNo}`));
    } else if(x === 25) {
      if(playerNo === 1) {
        total1 = 5;
      } else {    
        total2 = 5;
      }
      document.getElementById('box5').appendChild(document.getElementById(`player-${playerNo}`));
    }
  }
}

// Function to start a new game by reloading the page
function newGame() {
  location.reload();
}