/*  
 // Author: Emmanuel Zidafamor
 // http://github.com/e-zidaf
  
 // Feel free to copy, use or modify but 
 // kindly add a linkback to the original author.
*/

var randomNumber = Math.floor(Math.random() * 100) + 1;
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');
var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');
var guessCount = 1;
var resetButton;

function checkGuess() {
  var userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = ("Aha!!! The random number is " + randomNumber + "." + " Congratulations mate!");
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
    console.log('Timer stopped!');
    throw 'Timer stopped';
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
  resetButton.addEventListener('click', refreshPage);
}


var interval;
var minutes = 1;
var seconds = 10;
window.onload = function() {
  countdown('countdown');
}

function countdown(element) {
  interval = setInterval(function() {
    var el = document.getElementById(element);

    if (minutes >= 1) {
      el.style.backgroundColor = 'white'
    } else if (seconds > 30) {
      el.style.backgroundColor = 'yellow'
    } else {
      el.style.backgroundColor = 'red'
    }

    if (seconds == 0) {
      if (minutes == 0) {
        el.innerHTML = "Game over!!!";
        clearInterval(interval);
        setGameOver();
        return;
      } else {
        minutes--;
        seconds = 60;
      }
    }
    if (minutes > 0) {
      var minute_text = minutes + (minutes > 1 ? ' minutes' : ' minute');
    } else {
      var minute_text = '';
    }
    var second_text = seconds > 1 ? 'seconds' : 'second';
    el.innerHTML = minute_text + ' ' + seconds + ' ' + second_text + ' remaining';
    seconds--;
  }, 1000);
}

function refreshPage() {
  window.location.reload();
}


function resetGame() {
  guessCount = 1;

  var resetParas = document.querySelectorAll('.resultParas p');
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}