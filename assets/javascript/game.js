var guessWord = "homework";
var guessedRight = [];
var wordLength = guessWord.length;
var guessesLeft = 13;
var lettersLeft = wordLength;
var lettersGuessed = [];
var textOutput;
var failMessage;
var correctMessage;
//var gameOver = false;

failMessage = "YOU FAILED!";
correctMessage = "YOU WIN";


var i = 0


console.log(wordLength);

document.getElementById("wordBox").innerHTML += '<p>Hello</p>';
initGame();


console.log("testing: " + lettersLeft);

while (!gameOver(guessesLeft,lettersLeft)){
    var inputLetter = prompt("Type in a letter to guess: ");
    textOutput = guessCheck(inputLetter);
    document.getElementById("wordBox").innerHTML += textOutput;
}


function resultOuput (){
    if (guessesLeft === 0){
        document.getElementById("status").innerHTML += failMessage;
    }

    else if(lettersLeft === 0){
        document.getElementById("status").innerHTML += correctMessage;
        document.getElementById("wordBox").innerHTML += textOutput;
    }
}


function gameOver(guessesLeft,lettersLeft){
    if (guessesLeft === 0 || lettersLeft === 0) {
        resultOuput();
        return true;
    }
    
}


function initGame(){
    for   (i; i < wordLength; i++){
        guessedRight[i] = '_';
    }
}


function guessCheck(inputLetter){
    var foundPosition = guessWord.indexOf(inputLetter)

    console.log("foundPosition: " + foundPosition)

    if (foundPosition === -1) {
        guessesLeft = guessesLeft -1;
        lettersGuessed.unshift(inputLetter);
        console.log("GuessLeft: " + lettersGuessed);
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

