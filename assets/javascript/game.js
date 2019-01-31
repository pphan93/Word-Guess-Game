var guessWord;
var guessedRight = [];
var wordLength;
var guessesLeft;
var lettersLeft;
var lettersGuessed = [];
var lettersGuessIncorrect = [];
var textOutput;
var failMessage;
var correctMessage;
var inputLetter
var randomnum;
var category;
var win = 0;
var loss = 0;

var i = 0

var hangman = {
    failMessage: "YOU FAILED!",
    correctMessage: "YOU WIN",
    correct: document.getElementById('myList'),
    lossSound: "https://d3qhmae9zx9eb.cloudfront.net/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01.mp3",
    winSound: "https://d3qhmae9zx9eb.cloudfront.net/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01.mp3",
    lossImage: "https://sayingimages.com/wp-content/uploads/good-fail-meme.png",
    countryName: [
        "Afghanistan",
        "Australia",
        "Bahamas",
        "Bulgaria",
        "Belgium",
        "Cambodia",
        "Canada",
        "China",
        "Costa-Rica",
        "Czech-Republic",
        "Denmark",
        "France",
        "Germany",
        "Italy",
        "India",
        "Japan",
        "Korea",
        "Liechtenstein",
        "Malaysia",
        "Norway",
        "Vietnam",
        "Thailand",
        "Singapore"],
    countryIso: [
        "af",
        "au",
        "bs",
        "bg",
        "be",
        "kh",
        "ca",
        "cn",
        "cr",
        "cz",
        "dk",
        "fr",
        "de",
        "it",
        "in",
        "jp",
        "kr",
        "li",
        "my",
        "no",
        "vn",
        "th",
        "sg"],
    initGame: function() {
        guessesLeft = 8;
        guessedRight = [];
        lettersGuessIncorrect = [];
        lettersGuessed = [];
        this.correct.innerHTML = '';
        document.getElementById("imageSRC").src = "assets/images/namesofcountries.jpg"
    
        this.getWord();
        wordLength = guessWord.length;
        this.wordReady(wordLength);
    
        var classClear = document.getElementsByClassName("clear");
        for (var i = 0; i < classClear.length; i++) {
            classClear[i].innerHTML = "";
            classClear[i].classList.remove("text-danger", "text-success")
        }
    
        console.log("initial: " + guessWord)
        console.log("initial: " + wordLength);
        //classClear.innerHTML = ""
        // document.body.innerHTML = "";
        //document.getElementById("wordBox").innerHTML = "";
    },
    getWord: function() {
        randomnum = Math.floor(Math.random() * this.countryName.length);
        category = this.countryIso[randomnum]
        guessWord = this.countryName[randomnum];
        console.log("Artist: " + guessWord + " Type: " + category)
        guessWord = guessWord.toUpperCase();
    },
    wordReady: function(wordLength) {
        //wordHolder = document.getElementById('hold');
    
    
        console.log("SPace: " + wordLength)
        lettersLeft = wordLength;
    
        for (i = 0; i < wordLength; i++) {
            //correct.setAttribute('id', 'my-word');
    
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (guessWord[i] === "-") {
                //guessedRight[i] = "-";
                guess.innerHTML = "-";
                lettersLeft = lettersLeft - 1;
            }
            else {
                //guessedRight[i] = '_';
                guess.innerHTML = "_";
            }
    
            guessedRight.push(guess);
            //wordHolder.appendChild(correct);
            this.correct.appendChild(guess);
        }
        console.log("guess INIT: " + guess);
        console.log(guessedRight);
        /*else {
            while (findSpace != -1) {
                guessedRight[findSpace] = " ";
                foundPosition = guessWord.indexOf(inputLetter, findSpace + 1)
                lettersLeft = lettersLeft - 1;
            }
        }*/
    },
    resultOuput: function () {
        if (guessesLeft === 0) {
            this.timer();
            loss = loss + 1;
            var idclass = document.getElementById("status");
            idclass.setAttribute('class', 'clear text-danger')
            document.getElementById("lossScore").innerHTML = "<h3>" + loss + "</h3>"
            document.getElementById("imageSRC").src = this.lossImage
            var audio = new Audio(this.lossSound);
            audio.play();
            return document.getElementById("status").innerHTML = this.failMessage;
    
        }
    
        else if (lettersLeft === 0) {
            this.timer();
            win = win + 1;
            var idclass = document.getElementById("status");
            idclass.setAttribute('class', 'clear text-success')
            document.getElementById("winScore").innerHTML = "<h3>" + win + "</h3>"
            document.getElementById("imageSRC").src = "http://flagpedia.net/data/flags/normal/" + this.countryIso[randomnum] +".png"
            var audio = new Audio(this.winSound);
            audio.play();
            return document.getElementById("status").innerHTML = this.correctMessage;
            //document.getElementById("wordBox").innerHTML = textOutput;
        }
    },
    
    gameOver: function (guessesLeft, lettersLeft) {
        if (guessesLeft === 0 || lettersLeft === 0) {
            return this.resultOuput();
        }
    },
    timer: function () {
        var timeleft = 3;
        var downloadTimer = setInterval(function () {
            document.getElementById("countdown").innerHTML = "Restarting in " + timeleft + " seconds remaining";
            timeleft -= 1;
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                hangman.initGame();
                //document.getElementById("countdown").innerHTML = "Finished"
            }
        }, 1000);
    }
    
}

//guessWord = guessWord.toUpperCase();

hangman.initGame();

console.log("testing: " + lettersLeft);

document.body.onkeyup = function (event) {

    if (guessesLeft !== 0 && lettersLeft !== 0) {
        inputLetter = event.key.toUpperCase(event.keyCode);
        textOutput = guessCheck(inputLetter);
        OutputStatus();
        //var inputLetter = prompt("Type in a letter to guess: ");
        hangman.gameOver(guessesLeft, lettersLeft);
    }

}


function OutputStatus() {
    //document.getElementById("kp").innerHTML = inputLetter;
    //document.getElementById("wordBox").innerHTML = textOutput;
    document.getElementById("guessedL").innerHTML = lettersGuessIncorrect;
    document.getElementById("guessRemaining").innerHTML = "You have " + guessesLeft + " lives.";
}


function guessCheck(inputLetter) {
    console.log("Guessed RIght While BEG: " + guessedRight);
    console.log("guessCHeckInput: " + inputLetter);
    var foundPosition = guessWord.indexOf(inputLetter)

    console.log("foundPosition: " + foundPosition)
    var foundPositionLGC = lettersGuessed.indexOf(inputLetter)

    if (foundPositionLGC === -1) {
        lettersGuessed.unshift(inputLetter);

        if (foundPosition === -1) {


            guessesLeft = guessesLeft - 1;
            lettersGuessIncorrect.unshift(inputLetter);
        }

        while (foundPosition != -1) {
            guessedRight[foundPosition].innerHTML = inputLetter;
            foundPosition = guessWord.indexOf(inputLetter, foundPosition + 1)
            lettersLeft = lettersLeft - 1;
            console.log("Guessed RIght While: " + guessedRight);
        }
    }

    console.log("letterGuessed: " + lettersGuessed);
    console.log("letterGuessedIncorrect: " + lettersGuessIncorrect);
    console.log(guessedRight.toString());
    console.log(lettersLeft);
    console.log("GuessLeft: " + guessesLeft);
    console.log(guessedRight);
    return guessedRight;
}
