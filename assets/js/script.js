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
var timeRem = 0;
var timer;

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

//function to start the timer 
function start () {
    //clears the innerHtml to present questions
    document.getElementById("quizBody").innerHTML = "";
    //sets the value for timeLeft
    timeleft = questions.length * 10;
    document.querySelector("#timeLeft").textcontent = timeleft;

    //creating the timer element 
    timer = setInterval(function (){
        timeleft--;
        document.querySelector("#timeLeft").textcontent = timeleft;

        //if timeLeft ever reaches zero the quiz will be over console will clear all elements and stop the timer running the endgame function.
        if(timeleft <= 0) {
            document.getElementById("quizBody").innerHTML = "";
            clearInterval(timer);
            endGame();
        }
    },1000)
    //if above "if" statment is not fufilled the function next will be executed presenting the next question
    next()
}


}