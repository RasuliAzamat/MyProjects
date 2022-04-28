const options = document.querySelectorAll('.option')

const option1 = document.querySelector('.option1')
const option2 = document.querySelector('.option2')
const option3 = document.querySelector('.option3')
const option4 = document.querySelector('.option4')

const question = document.getElementById('question')
const numberOfQuestion = document.getElementById('number-of-question')
const numberOfAllQuestions = document.getElementById('number-of-all-questions')

const correctAnswer = document.getElementById('correct-answer')
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2')
const btnTryAgain = document.getElementById('btn-try-again')

const btnNext = document.getElementById('btn-next')
const answerTrackers = document.getElementById('answers-tracker')

let indexOfQuestion = indexOfPage = score = 0


const questions = [
    {
        question: 'What is JavaScript?',
        options: [
            'Food name',
            'Capital of Shompania',
            'Programming language',
            'Long version of Java',
        ],
        right: 3,
    },
    {
        question: 'Where do we usually use JavaScript?',
        options: [
            'In the kitchen',
            'On the holiday',
            'In the party',
            'In the browser',
        ],
        right: 4,
    },
    {
        question: 'How we can assign variable in JavaScript?',
        options: [
            'var, let', 
            'const, let, var', 
            'int, str', 
            'variable'
        ],
        right: 2,
    },
    {
        question: "What is server side JavaScript' name?",
        options: [
            'ServerJavaSctip.js', 
            'Node.js', 
            'Server.js', 
            'Hell.js'
        ],
        right: 2,
    },
    {
        question: 'How many editions has ECMAScript?',
        options: [
            'What is EcmaScript?', 
            '-50', 
            '42', 
            '12'
        ],
        right: 4,
    },
]

numberOfAllQuestions.textContent = questions.length

const load = () => {
    question.textContent = questions[indexOfQuestion].question

    option1.textContent = questions[indexOfQuestion].options[0]
    option2.textContent = questions[indexOfQuestion].options[1]
    option3.textContent = questions[indexOfQuestion].options[2]
    option4.textContent = questions[indexOfQuestion].options[3]

    numberOfQuestion.textContent = indexOfPage + 1
    
    indexOfPage++
}

let complatedAnswers = []

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length)
    let isDuplicate = false

    if (indexOfPage == questions.length) {
        gameOver()
    } else {
        if (complatedAnswers.length > 0) {
            complatedAnswers.forEach(answer => {
                if (answer == randomNumber) {
                    isDuplicate = true
                }
            })
            if (isDuplicate) {
                randomQuestion()
            } else {
                indexOfQuestion = randomNumber
                load()
            }
        }
        if (complatedAnswers == 0) {
            indexOfQuestion = randomNumber
            load()
        }
    }
    complatedAnswers.push(indexOfQuestion)
}

const checkAnswer = event => {
    if (event.target.dataset.id == questions[indexOfQuestion].right) {
        event.target.classList.add('correct')
        updateAnswerTracker('correct')
        score++
    } else {
        event.target.classList.add('wrong')
        updateAnswerTracker('wrong')
    }
    disableOptions()
}

const disableOptions = () => {
    options.forEach(option => {
        option.classList.add('disabled')

        if (option.dataset.id == questions[indexOfQuestion].right) {
            option.classList.add('correct')
        }
    })
}

const resetClasses = () => {
    options.forEach(option => {
        option.classList.remove('disabled', 'correct', 'wrong')
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div')
        answerTrackers.appendChild(div)
    })
}

const updateAnswerTracker = status => {
    answerTrackers.children[indexOfPage - 1].classList.add(status)
}

const validate = () => {
    if (options[0].classList.contains('disabled')) {
        resetClasses()
        randomQuestion()
    } else {
        alert('Choose 1 answer at list')
    }
}

btnNext.addEventListener('click', validate)

options.forEach(option => {
    option.addEventListener('click', event => checkAnswer(event))
})

const gameOver = () => {
    const modal = document.querySelector('.quiz-over-modal')
    modal.classList.add('active')

    correctAnswer.textContent = score
    numberOfAllQuestions2.textContent = questions.length
}

const tryAgain = () => window.location.reload()

btnTryAgain.addEventListener('click', tryAgain)

window.addEventListener('load', () => {
    randomQuestion()
    answerTracker()
})
