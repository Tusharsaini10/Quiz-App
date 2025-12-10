const questions = [
    {
        question: "Who won IPL 2025?",
        answers: [
            { text: "Mumbai Indians", correct: false },
            { text: "Punjab Kings", correct: false },
            { text: "Royal Challengers Bangalore", correct: true },
            { text: "Chennai Super Kings", correct: false },
        ]
    },
    {
        question: "Who was the Runner-up for the Champions Trophy (2025) which India won?",
        answers: [
            { text: "South Africa", correct: false },
            { text: "New Zealand", correct: true },
            { text: "England", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Who has won the Orange Cap the most number of times in IPL?",
        answers: [
            { text: "Chris Gayle", correct: false },
            { text: "Ruturaj Gaikwad", correct: false },
            { text: "Virat Kohli", correct: true },
            { text: "David Warner", correct: false },
        ]
    },
    {
        question: "Which sportsperson has the most followers across the world?",
        answers: [
            { text: "Cristiano Ronaldo", correct: true },
            { text: "Lionel Messi", correct: false },
            { text: "Virat Kohli", correct: false },
            { text: "Michael Jordan", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
