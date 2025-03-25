const questions = [
    {
        question: "Javascript is an _______ language?",
        answers: [
            { text: "Object oriented", correct: true},
            { text: "Object Based", correct: false},
            { text: "Procedural", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            { text: "let", correct: false},
            { text: "var", correct: false},
            { text: "Both let and var", correct: true},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: [
            { text: "get ElementById()", correct: false},
            { text: "get ElementByClassName()", correct: false},
            { text: "Both ElementById() and ElementByClassName()", correct: true},
            { text: "None of the above", correct: false},
        ]
    }
]

const interviewQuestionElement= document.querySelector("#interviewQuestion");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    interviewQuestionElement.innerHTML = `${questionNo}  .  ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", function selectAnswer(e){
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if(isCorrect){
                selectedBtn.classList.add("correct");
                score++;
            }else{
                selectedBtn.classList.add("incorrect");
            }
            Array.from(answerButtons.children).forEach(button => {
                if(button.dataset.correct === "true"){
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.style.display = "block";
        });
    });
}
function showScore(){
    resetState();
    interviewQuestionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
