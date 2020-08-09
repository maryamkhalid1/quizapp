const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const score = 0;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the name of Capital of Pakistan?',
    answers: [
      { text: 'Islamabad', correct: true },
      { text: 'Karachi', correct: false },
      { text: 'Ghazi Khan', correct: false },
      { text: 'Lahore', correct: false}
    ]
  },
  {
    question: 'Who is the founder of Pakistan?',
    answers: [
      { text: 'Imran Khan', correct: false },
      { text: 'Quaid-E-Azam', correct: true },
      { text: 'Liaquat Ali Khan', correct: false },
      { text: 'Queen Elizabeth', correct: false }
    ]
  },
  {
    question: 'Under whose auspices water treaty was signed?',
    answers: [
      { text: 'UNO', correct: false },
      { text: 'World Bank', correct: true },
      { text: 'USA', correct: false },
      { text: 'Common Wealth', correct: false }
    ]
  },
  {
    question: 'India made a cowardly attrack on Lahore which resulted as war between two countries , when this war broken out?',
    answers: [
      { text: '8th sep 1966', correct: false },
      { text: '6th sep 1965', correct: true }
    ]
  },
  {
    question: 'When lucknow past came?',
    answers: [
      { text: '1918', correct: false },
      { text: '1916', correct: true },
      { text: '1919', correct: false },
      { text: '1915', correct: false }
    ]
  }
]