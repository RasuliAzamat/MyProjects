const slides = document.querySelectorAll('.slide')
const dots = document.querySelectorAll('.dot')
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')

let index = 0

const activeSlide = index => {
    slides.forEach(slide => slide.classList.remove('active'))
    slides[index].classList.add('active')
}

const activeDot = index => {
    dots.forEach(dot => dot.classList.remove('active'))
    dots[index].classList.add('active')
}

const currentSlide = index => {
    activeSlide(index)
    activeDot(index)
}

const nextSlide = () => {
    if (index === slides.length - 1) {
        index = 0
        currentSlide(index)
    } else {
        index++
        currentSlide(index)
    }
}

const prevSlide = () => {
    if (index === 0) {
        index = slides.length - 1
        currentSlide(index)
    } else {
        index--
        currentSlide(index)
    }
}

dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
        index = dotIndex
        currentSlide(index)
    })
})

prevBtn.addEventListener('click', prevSlide)
nextBtn.addEventListener('click', nextSlide)

setInterval(nextSlide, 1500)
