const taskText = document.querySelector('#textInput')
const addButton = document.querySelector('#addButton')
const tasksWrapper = document.querySelector('.output-wrapper')
const deleteButton = document.querySelector('#deleteButton')

let tasks
if (localStorage.task) {
    tasks = JSON.parse(localStorage.getItem('task'))
} else {
    tasks = []
}

let allTasksElements

function Task(text) {
    this.text = text
    this.isComplate = false
}

addButton.addEventListener('click', () => {
    if (taskText.value !== '') {
        tasks.push(new Task(taskText.value))
        uptadeToLocalStorage()
        uptadeHTML()
        taskText.value = ''
    }
})

function uptadeToLocalStorage() {
    localStorage.setItem('task', JSON.stringify(tasks))
}

function uptadeHTML() {
    tasksWrapper.innerHTML = ''
    if (tasks.length > 0) {
        filterTasks()
        tasks.forEach((item, index) => {
            tasksWrapper.innerHTML += addTask(item, index)
            allTasksElements = document.querySelectorAll('.output-field')
        })
    }
}
uptadeHTML()

function addTask(item, index) {
    return `
        <div div class = "output-field ${item.isComplate ? 'complated' : ''}" >
            <p id="output-text">${item.text}</p>
            <div class="output-controls">
                <input onclick="chekTaskComplate(${index})" type="checkbox" id="checkbox" ${
        item.isComplate ? 'checked' : ''
    }>
                <button onclick="deleteTask(${index})" id="deleteButton" class="button">Delete</button>
            </div>
        </div>
    `
}

function chekTaskComplate(index) {
    tasks[index].isComplate = !tasks[index].isComplate
    if (tasks[index].isComplate) {
        allTasksElements[index].classList.add('complated')
    } else {
        allTasksElements[index].classList.remove('complated')
    }
    uptadeToLocalStorage()
    uptadeHTML()
}

function deleteTask(index) {
    allTasksElements[index].classList.add('deletion')
    setTimeout(() => {
        tasks.splice(index, 1)
        uptadeToLocalStorage()
        uptadeHTML()
    }, 500)
}

function filterTasks() {
    const complatedTasks =
        tasks.length && tasks.filter(item => item.isComplate === true)
    const activeTasks =
        tasks.length && tasks.filter(item => item.isComplate === false)
    tasks = [...activeTasks, ...complatedTasks]
}
