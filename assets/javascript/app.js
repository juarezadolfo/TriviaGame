// variables and objects (trivia questions; picture arrays; answered; time; etc...)

var triviaQuestions = [{
    question: "What does MOPAR stand for?",
    answerList: ["Muscle Or Performance Car", "Motor and Parts Division of the Fiat-Chrysler Corporation", "Motor City Parts", "None of the above"],
    answer: 1
}, {
    question: "Where did Plymouth get the Roadrunner's horn sound?",
    answerList: ["Warner Brothers' Coyote and Roadrunner Cartoons", "Keyboard Synthesizer", "Soundcloud.com", "Foley Artist"],
    answer: 0
}, {
    question: "How many different Challengers were used in the filming of the movie 'Vanishing Point?'",
    answerList: ["6", "10", "7", "5"],
    answer: 3
}, {
    question: "What popular 80's TV show featured a high flying MOPAR called 'The General Lee'?",
    answerList: ["The A-Team", "Knight Rider", "Miami Vice", "The Dukes of Hazzard"],
    answer: 3
}, {
    question: "What is the most popular MOPAR paint color?",
    answerList: ["Candy Apple Red", "Big Bad Orange", "Plum Crazy", "SL Silver"],
    answer: 2
}, {
    question: "What is currently the fastest production car in the world?",
    answerList: ["Bugati Veyron", "Tesla Model S", "Audi A8", "Dodge Challenger Demon"],
    answer: 3
}, {
    question: "What does 'HEMI' stand for?",
    answerList: ["The Shape of a Mopar's Cylinder Heads", "The Shape of the Steering Wheel", "A MOPAR Paint Color", "The Brake Caliper Size"],
    answer: 0
}, {
    question: "What is a 440 six-pack?",
    answerList: ["The price of beer back in 1970", "The size of a HEMI engine and its carburetor", "John and Horace Dodge's favorite cocktail", "None of the Above"],
    answer: 1
}, {
    question: "In which year was the convertible top first offered as an option for the Plymouth Roadrunner?",
    answerList: ["1968", "1969", "1970", "1971"],
    answer: 1
}, {
    question: "What car was featured in epic the car chase scenes2007 Quentin Taratino film 'Death Proof'?",
    answerList: ["1969 Dodge Charger", "1970 Dodge Challenger", "1970 Chevy Nova", "All of the Above"],
    answer: 3
}];
var jpgArray = ['question1', 'question2', 'question3','question4', 'question5', 'question6','question7', 'question8', 'question9', 'question10'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Yes, that's correct!",
    incorrect: "No, that's not correct.",
    endTime: "Ooops...ran out of time!",
    finished: "Let's see how you did."
}
// start game on click
$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});
// click to start over after game over/goes to 'new game' like start click
$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});
// function for new game/calls new question
function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}
// function for new question
function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#jpg').empty();
    answered = true;

    //new question and answer listings
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + ' of ' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();


    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}
//function for timer going down
function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}
// show timer countdown to user
function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}
//Clear questions page
function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#jpg').html('<img src = "assets/images/' + jpgArray[currentQuestion] + '.jpg" width = "400px">');

    //check to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}
// final functions and also names for CSS parameters, IDs etc...
function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#jpg').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}