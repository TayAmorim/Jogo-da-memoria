const cards = document.querySelectorAll('.card')
const button = document.querySelector('button')
let hasFlippeCard = false
let firstCard, secondCard
let lockBoard = false
let result = document.querySelector('#pontuacao')

function flipCard() {
  if (lockBoard) return
  if (this === firstCard) return
  this.classList.add('flip')
  if (!hasFlippeCard) {
    hasFlippeCard = true
    firstCard = this
    return
  }
  secondCard = this
  hasFlippeCard = false
  checkForMatch()
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    result.textContent = 50 + Number(result.textContent)
    disableCards()
    return
  }
  result.textContent = Number(result.textContent) - 10
  unflipCards()
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard()
  }, 1500)
}

function resetBoard() {
  [hasFlippeCard, lockBoard] = [false, false][(firstCard, secondCard)] = [
    null,
    null
  ]
}

function btnActive() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12)
    card.style.order = randomPosition
    card.classList.remove('flip')
    result.textContent = 0
    card.removeEventListener('click', flipCard)
    card.addEventListener('click', flipCard)
  }) 
  
}
button.addEventListener('click', btnActive)
cards.forEach(card => {
  card.addEventListener('click', flipCard)
})
