const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "Kobe was drafted right out of high school in 1996 by what NBA team?",
    choice1: "Charlotte Hornets",
    choice2: "Los Angeles Lakers",
    choice3: "Los Angeles Clippers",
    choice4: "Boston Celtics",
    answer: 1
  },
  {
    question: "What high school did Kobe Bryant play for?",
    choice1: "Crenshaw",
    choice2: "Carver",
    choice3: "Lower Merion",
    choice4: "Hawthorne",
    answer: 3
  },
  {
    question: "Where was Kobe Bryant born?",
    choice1: "Los Angeles",
    choice2: "Italy",
    choice3: "Houston",
    choice4: "Philadelphia",
    answer: 4
  },
  {
    question: "What year did Kobe win an MVP (Most Valuable Player) trophy?",
    choice1: "2006",
    choice2: "2007",
    choice3: "2008",
    choice4: "2009",
    answer: 3
  },
  {
    question:
      "Kobe Bryant ended his 20 year career scoring 60 points against what team?",
    choice1: "San Antonio Spurs",
    choice2: "Utah Jazz",
    choice3: "Sacramento Kings",
    choice4: "Boston Celtics",
    answer: 2
  },
  {
    question:
      "How many points was Kobe's team winning or losing by at halftime during his famous 81 point performance?",
    choice1: "Winning by 8",
    choice2: "Losing by 14",
    choice3: "Winning by 12",
    choice4: "Losing by 5",
    answer: 2
  }
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Update Progress Bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
