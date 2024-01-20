const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Ou seja, ${performance}%</span>
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

const questions = [
  {
    question: "Qual o meu prato favorito?",
    answers: [
      { text: "Macarronada", correct: false },
      { text: "Lasanha", correct: false },
      { text: "Strogonoff", correct: true },
      { text: "Bife acebolado", correct: false }
    ]
  },
  {
    question: "O que você faria ao conquistar R$ 1.000.000,00?",
    answers: [
      { text: "Compraria uma casa para meus pais e irmãos", correct: true },
      { text: "Faria viagens para conhecer muitos lugares", correct: false },
      { text: "Investiria na educação e montar um negócio próprio", correct: false },
      { text: "Adquiriria prédios de apartamentos e locaria imóveis", correct: false }
    ]
  },
  {
    question: "Qual é o tipo de música que eu gosto de ouvir?",
    answers: [
      { text: 'Sertanejo universitário', correct: false },
      { text: 'Rock / Eletrônica', correct: false },
      { text: 'Pop / MPB', correct: false },
      { text: "Funk / Pagode", correct: true }
    ]
  },
  {
    question: 'Que tipo de passatempo ou hobby gosto de fazer?',
    answers: [
      { text: "Pescar com a família", correct: false },
      { text: "Viajar para novos lugares", correct: false },
      { text: "Ler bons livros", correct: true },
      { text: "Não fazer nada", correct: false }
    ]
  },
  {
    question: 'Quem é o meu melhor amigo?',
    answers: [
      { text: 'Fulano', correct: false },
      { text: 'Beltrano', correct: true },
      { text: 'Sicrano', correct: false },
      { text: 'Fiquei na dúvida', correct: false }
    ]
  },  
];

function exibeMenu() {
  let itens = document.getElementById('itens');

  if(itens.style.display == 'none') {
      itens.style.display = 'block';
  }
  else {
      itens.style.display = 'none';
  }    
}