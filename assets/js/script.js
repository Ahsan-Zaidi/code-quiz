//nested array used to house quiz questions
var questions = [{
    Que: "Which operator represents 'not' in Javascript?",
    Cho: ["<", "!", "-", "||"],
    Ans: "!"
},
{
    Que: "Javascript is an ____ language?",
    Cho: ["Simple", "Object", "Object-Oriented", "None of the above"],
    Ans: "Object-Oriented"
},
{
    Que: "local storage can only save what type of input?",
    Cho: ["String", "Num", "symbol", "Special-Characters"],
    Ans: "String"
},
{
    Que: "Which method saves data to local storage?",
    Cho: ["getItem()", "nullItem()", "saveItem()", "setItem()"],
    Ans: "setItem()"
},
{
    Que: "When a function belongs to an object it is known as a ____.",
    Cho: ["Object-function", "Method", "Script", "None of the Above"],
    Ans: "Method"
}
]

//global variables to be used throughout the script
var grade = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//function to start the timer 
function start () {
    //clears the innerHtml to present questions
    document.getElementById("quizBody").innerHTML = "";
    //sets the value for timeLeft
    timeLeft = questions.length * 10;
    document.querySelector("#timeLeft").textContent = timeLeft;

    //creating the timer element 
    timer = setInterval(function (){
        timeLeft--;
        document.querySelector("#timeLeft").textContent = timeLeft;

        //if timeLeft ever reaches zero the quiz will be over console will clear all elements and stop the timer running the endgame function.
        if(timeLeft <= 0) {
            document.getElementById("quizBody").innerHTML = "";
            clearInterval(timer);
            endGame();
        }
    },1000)
    //if above "if" statment is not fufilled the function 'next' will be executed presenting the next question
    next()
}

//creating html elements through Javascript setting up the initial page layout.
var quizBody = document.createElement('div');
quizBody.setAttribute("id", "quizBody");
document.querySelector("#quiz").append(quizBody);
var h1 = document.createElement('h1');
h1.textContent = "Coding Quiz";
quizBody.append(h1);
var p = document.createElement('p');
p.textContent = "Javascript code quiz! Answer quick... Time is of the essance!";
quizBody.append(p);

//creating the start button and appending it to Body
var startBtn = document.createElement("Button");
startBtn.textContent = "Start Quiz";
quizBody.append(startBtn);

//adding event listener to button so that once it is clicked the start function will begin
startBtn.addEventListener("click", function (){
    start();
});

//function to penalize player for getting a question wrong
function incorrect() {
    timeLeft -= 15;
    document.getElementById("quizBody").innerHTML = " ";
    next();
}

//function to reward player for getting the question correct
function correct() {
    grade += 20;
    document.getElementById("quizBody").innerHTML = " ";
    next();
}

//create function to iterate through the questions array
function next () {
    //increment through the array
    currentQuestion++;
    //if current question becomes greater than [questions] then run endGame function
    if (currentQuestion > questions.length -1) {
        endGame();
        return;
    }
    else {
        //create quiz element to house quiz content
        var quizContent = document.getElementById("quizBody");
        //creates h2 element inside of quizContent to display [questions] with current question, then appends that element to quizContent
        var h2 = document.createElement("h2");
        h2.textContent = questions[currentQuestion].Que;
        quizContent.append(h2);
        //create ordered list element setting its Id and appending it also to quizContent
        var ol = document.createElement("ol");
        ol.setAttribute("id", "Choice");
        quizContent.append(ol);
        //creates div for answers
        var showAns = document.createElement('div');

        //for loop to create buttons for each choice available 
        for(var i = 0; i < questions[currentQuestion].Cho.length; i++) {
            //clearing the content inside of showAns
            showAns.textcontent = "";
            var buttonCode = "<button onclick=\"[Ans]\">[choice]</button>";
            //once the button choice is clicked it will replace the old questions choices with the next questions choices
            buttonCode = buttonCode.replace("[choice]", questions[currentQuestion].Cho[i]);

            //if the choice is equal to the answer then it will be correct if not it will be incorrect
            if(questions[currentQuestion].Cho[i] == questions[currentQuestion].Ans){
                buttonCode = buttonCode.replace("[Ans]", "correct()");
            }
            else {
                buttonCode = buttonCode.replace("[Ans]", "incorrect()");
            }
            
            //make list element to hold the button code variable we declared
            var li = document.createElement("li");
            li.innerHTML = buttonCode;
            //we then append the list to orered list which is then appended to quizContent all housed inside of the div
            ol.append(li);
            quizContent.append(ol);
            ol.append(showAns);
        }
    }
}

//function to call the end of the game
function endGame () {
    //stops the timer from running
    clearInterval(timer);

    //create elements inside quizbody to notify player game is over
    var quizEl = document.getElementById("quizBody");
    var h2El = document.createElement("h2");
    h2El.textcontent = "Game Over";
    quizEl.append(h2El)

    //establishing element and variable to display the score the user recieves
    var h3El = document.createElement("h3");
    h3El.textContent = "you got a " + grade + "/" + questions.length * 20;
    quizEl.append(h3El);
    var h3El2 = document.createElement("h3");
    h3El2.textcontent = "You got " + grade / 20 + "questions correct.";
    quizEl.append(h3El2);

    //creating + setting type and id of an input element to take users name for high scores
    var firstName = document.createElement("input");
    firstName.setAttribute("type", "text");
    firstName.setAttribute("id", "name");
    firstName.placeholder = "Enter your initials";
    quizEl.append(firstName);

    //creating button element to save user scores
    var scoreBtn = scoreBtn = document.createElement("button");
    scoreBtn.setAttribute("id", "setscore");
    scoreBtn.textContent = "Save your score!";
    quizEl.append(scoreBtn);

    //adding event listener to scoreBtn so that once clicked will activate the setScore function
    scoreBtn.addEventListener("click", function(){
        setScore();
    })
}

//function will set users score and store them into localstorage
function setScore() {
    localStorage.setItem("highscore", grade);
    localStorage.setItem("playername", document.getElementById('name').value);
    alert("Saved");
}

//function to get the scores of players who have played the game
function getScore () {
    //making of elements to display scores
    var quizBodyEl = document.getElementById("quizBody");
    var h2 = document.createElement("h2");
    h2.setAttribute("id", "getplayername");
    h2.textContent = localStorage.getItem("playername") + "'s high score is:";
    quizBodyEl.append(h2);

    //element to display highscores to users
    var h1 = document.createElement("h1");
    h1.setAttribute("id", "gethighscore");
    h1.textContent = localStorage.getItem("highscore");
    quizBodyEl.append(h1);

    //creating  button to clear localstorage so once its clicked it will used the function clearScore
    var clearStorage = document.createElement("button");
    clearStorage.textContent = "clear scores";
    quizBodyEl.append(clearStorage);
    clearStorage.addEventListener("click", function() {
    clearScore();
    });
}

//function to clear localstorage setting element ids to an empty string
function clearScore () {
    localStorage.setItem("highscore", "");
    localStorage.setItem("playername", "");
    document.getElementById("gethighscore").textContent = "";
    document.getElementById("getplayername").textcontent = "";
}


//creating anchor tag link in the nav bar to diplay highscores on the event click
var navLeft = document.createElement('div');
navLeft.setAttribute("class", "left")
document.querySelector("#nav").append(navLeft);
var a = document.createElement('a');
a.setAttribute("href", "#")
a.addEventListener("click", function () {
document.getElementById("quizBody").innerHTML = " ";
getScore();});

navLeft.append(a);
var h4 = document.createElement('h4');
h4.textContent = "High Scores";
a.append(h4);

//countdown timer displayed on navbar right
var navRight = document.createElement('div');
navRight.setAttribute("class", "right")
document.querySelector("#nav").append(navRight);
var h42 = document.createElement('h42');
h42.textContent = "Timer :";
navRight.append(h42);
var span = document.createElement('span');
span.setAttribute("id", "timeLeft")
span.textContent="0";
h42.append(span)
