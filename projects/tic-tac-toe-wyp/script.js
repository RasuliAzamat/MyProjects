const area = document.getElementById('area')
const overlay = document.getElementById('overlay')
const contentPlace = document.getElementById('content')
const btnCLose = document.getElementById('btn-close')
const modalWrapper = document.getElementById('modal-wrapper')
let move = 0
let result = ''

const showResult = winner => {
    contentPlace.textContent = `The winner is - ${winner}`
    modalWrapper.style.display = 'block'

    btnCLose.onclick = overlay.onclick = () => {
        modalWrapper.style.display = 'none'
        location.reload()
    }
}

const check = () => {
    const boxes = document.querySelectorAll('.box')
    const variants = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // diagonal
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let index = 0; index < variants.length; index++) {
        const variant = variants[index]

        if (
            boxes[variant[0]].textContent === 'x' &&
            boxes[variant[1]].textContent === 'x' &&
            boxes[variant[2]].textContent === 'x'
        ) {
            result = 'X'
            showResult(result)
        } else if (
            boxes[variant[0]].textContent === 'o' &&
            boxes[variant[1]].textContent === 'o' &&
            boxes[variant[2]].textContent === 'o'
        ) {
            result = 'O'
            showResult(result)
        }
    }
}

area.addEventListener('click', event => {
    const target = event.target

    if (target.classList.contains('box')) {
        if (move % 2 === 0) {
            target.textContent = 'x'
        } else {
            target.textContent = 'o'
        }

        move++
        check()
    }
})
