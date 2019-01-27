var guessWord = "homework";
var guessedRight = [];
var wordLength = guessWord.length;
var guessesLeft = 13;
var lettersLeft = wordLength;
var lettersGuessed = [];
var textOutput;
var failMessage;
var correctMessage;
var inputLetter
//var gameOver = false;

failMessage = "YOU FAILED!";
correctMessage = "YOU WIN";


var i = 0

//guessWord = guessWord.toUpperCase();

console.log(wordLength);

document.getElementById("wordBox").innerHTML += '<p>Hello</p>';
initGame();


console.log("testing: " + lettersLeft);


document.body.onkeypress = function (event) {

    if (guessesLeft !== 0 && lettersLeft !== 0) {
        inputLetter = String.fromCharCode(event.keyCode);
        document.getElementById("kp").innerHTML = inputLetter;
        textOutput = guessCheck(inputLetter);
        document.getElementById("wordBox").innerHTML = textOutput;
        //var inputLetter = prompt("Type in a letter to guess: ");
        resultOuput();
    }

}


//while (!gameOver(guessesLeft,lettersLeft)){
//var inputLetter = prompt("Type in a letter to guess: ");
//   textOutput = guessCheck(inputLetter);
//   document.getElementById("wordBox").innerHTML += textOutput;
//}


function resultOuput() {
    if (guessesLeft === 0) {
        return document.getElementById("status").innerHTML = failMessage;
    }

    else if (lettersLeft === 0) {
        return document.getElementById("status").innerHTML = correctMessage;
        //document.getElementById("wordBox").innerHTML = textOutput;
    }
}


function gameOver(guessesLeft, lettersLeft) {
    if (guessesLeft === 0 || lettersLeft === 0) {
        return true;
    }

}


function initGame() {
    for (i; i < wordLength; i++) {
        guessedRight[i] = '_';
    }
}


function guessCheck(inputLetter) {
    console.log("guessCHeckInput: " + inputLetter);
    var foundPosition = guessWord.indexOf(inputLetter)

    console.log("foundPosition: " + foundPosition)

    if (foundPosition === -1) {
        guessesLeft = guessesLeft - 1;
        lettersGuessed.unshift(inputLetter);
        console.log("letterGuessed: " + lettersGuessed);
    }

    while (foundPosition != -1) {
        guessedRight[foundPosition] = inputLetter;
        foundPosition = guessWord.indexOf(inputLetter, foundPosition + 1)
        lettersLeft = lettersLeft - 1;
    }

    console.log(guessedRight.toString());
    console.log(lettersLeft);
    console.log("GuessLeft: " + guessesLeft);
    return "<p>" + guessedRight + "</p>";
}
