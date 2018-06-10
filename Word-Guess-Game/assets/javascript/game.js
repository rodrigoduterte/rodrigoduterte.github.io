$(document).ready(function(){
    
})
var game = {
    audio: new Audio(),
    chancesToGuess: 12,
    country: ["",-1],
    countryIndicesSelected: [],
    lettersEntered: [],
    lettersToGuess: [],
    lettersOnTheWord: [null],
    playing: false,
    wins: [0,false],
    startGame: function() {
        $('.start').text('');
        // $('#wordToGuess').empty();
        document.getElementById("wordToGuess").innerHTML = null;
        document.getElementById("wordToGuess").innerText = 'Current Word:'
        // $('#lettersGuessed').empty();
        document.getElementById("lettersGuessed").innerHTML = null;
        document.getElementById("lettersGuessed").innerText = 'Letters Already Guessed:'
        // $('#s2').text(this.chancesToGuess);
        document.getElementById("s2").innerText = this.chancesToGuess;
        // $('#s1').text(this.wins[0]);
        document.getElementById("s1").innerText = this.wins[0];
        document.getElementById('anthemLyrics').innerHTML = null;
        this.playing = true;
        this.country = randomSelectCountry(this);
        this.audio.pause();
        changeFlag(this.country[0]);
        this.audio = changeMusic(this.country[0]);
        this.lettersToGuess = convertStringToArray(this.country[0]);
        this.chancesToGuess = 12;
        this.lettersOnTheWord = new Array(this.lettersToGuess.length).fill(null);
        putBlankDivElements(this);
    },
    displayGetStarted: function(getStarted) {
        $('.start').text('Press any key to get started!');
        this.chancesToGuess = 12;
        this.lettersOnTheWord = [null];
        this.playing = false;
    },
    findInLettersToGuess: function(char) {
        if (document.querySelector(".guesses[data-letter=\"" + char + "\"]")) {
        } else {
            if(this.lettersToGuess.indexOf(char) == -1){
                this.chancesToGuess--;
                $("#s2").text(this.chancesToGuess);
            } else {
                insertGuessedLetterOnBlank(this,char);
                $('.letters[data-letter=\"' + char + '\"]').text(char);
            }
            if (this.chancesToGuess === 0) {
                this.isWinner(false);
            } else if (this.lettersOnTheWord.indexOf(null) == -1) {
                this.isWinner(true);
            }
            var node = document.createElement('div');
            node.setAttribute("data-letter",char);
            node.setAttribute("class","guesses");
            node.innerText = char + ",";
            document.getElementById('lettersGuessed').appendChild(node);
        }
    },
    isWinner: function(cond) {
        if (cond) { 
            this.wins[0]++;
            this.wins[1] = cond;
            playAnthem(this);
            insertLyrics(this);
        } else {
            this.wins[1] = cond;
        }
        this.displayGetStarted(true);
        $('#s1').text(this.wins[0]);
    }
};

function changeFlag(country) {
    var picurl = modifyURL(country,"pic");
    $("#flagPic").attr("src",picurl);
}

function changeMusic(country) {
    var musicurl = modifyURL(country,"mp3");
    return new Audio(musicurl);
}

function modifyURL(country,filetype){
    if (filetype === 'pic') {
        return 'http://anthemworld.com/flags/' + country + '.gif';
    } else if (filetype === 'mp3') {
        return 'http://anthemworld.com/themesongs/' + country + '.mp3';
    }
}

function insertGuessedLetterOnBlank(obj,char) {
    obj.lettersToGuess.forEach(function(element,index,array){
        if (element === char) {
            obj.lettersOnTheWord[index] = char;
        }
    });
}

function convertStringToArray(country) {
    var charArray = country.toUpperCase().split("");
    return charArray;
}

function putBlankDivElements (obj) {
    obj.lettersToGuess.forEach(function(element,index,array) {
        var letterBtn = $("<div></div>");
        letterBtn.attr("data-letter",element);
        letterBtn.addClass("blanks");
        if (element === " ") {
            letterBtn.addClass("spaces");
            letterBtn.text(" ");
            obj.lettersOnTheWord[index] = element;
        } else {
            letterBtn.addClass("letters");
            letterBtn.text("__");
        }
        $("#wordToGuess").append(letterBtn);
    });
}

function randomSelectCountry(obj) {
    var randomIndex = -1;
    while (obj.countryIndicesSelected.indexOf(randomIndex) == -1) {
        randomIndex = Math.floor(Math.random() * countries.length);
        if (obj.countryIndicesSelected.indexOf(randomIndex) == -1) {
            obj.countryIndicesSelected.push(randomIndex);
        } else {
            randomIndex = -1;
        }
    }
    return [countries[randomIndex].country,randomIndex];
}

function insertLyrics(obj) {
    document.getElementById('anthemLyrics').innerHTML = countries[obj.country[1]].lyrics;
}

function playAnthem(obj) {
    obj.audio.play();
}

function isValidKey(k) {
    var validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return validKeys.indexOf(k) != -1;
}

document.onkeyup = function (e) {
    var CAPLETTER = e.key.toUpperCase();
    if ((game.chancesToGuess > 0) && (game.lettersOnTheWord.indexOf(null) >= 0)) {
        if (game.playing === false) {
            game.startGame(); 
        } else {
            if (isValidKey(CAPLETTER)) {
                game.findInLettersToGuess(CAPLETTER);
            }
        }
    } 
}
