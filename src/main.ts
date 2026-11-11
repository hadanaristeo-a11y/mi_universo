import './style.css'
import { starMessages } from './data/mensajes'

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (!element) {
    throw new Error(`No se encontró el elemento necesario: ${selector}`)
  }
  return element
}

const starsCanvas = getRequiredElement<HTMLElement>('#stars-canvas')
const backgroundStars = getRequiredElement<HTMLElement>('#background-stars')
const modal = getRequiredElement<HTMLElement>('#message-modal')
const modalContent = getRequiredElement<HTMLElement>('#modal-content')
const modalText = getRequiredElement<HTMLElement>('#modal-text')
const closeButton = getRequiredElement<HTMLButtonElement>('#close-modal')

for (let i = 0; i < 70; i += 1) {
  const star = document.createElement('span')
  star.className = 'bg-star'
  star.style.left = `${Math.random() * 100}%`
  star.style.top = `${Math.random() * 100}%`
  star.style.width = `${Math.random() * 2 + 1}px`
  star.style.height = star.style.width
  star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`)
  backgroundStars.append(star)
}

let activeStar: HTMLButtonElement | null = null
let closeTimer: number | undefined

function closeMessage() {
  modal.classList.remove('visible')
  window.clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    if (!modal.classList.contains('visible')) {
      modal.classList.add('hidden')
      activeStar?.focus()
      activeStar = null
    }
  }, 300)
}

function showMessage(message: (typeof starMessages)[number], star: HTMLButtonElement) {
  window.clearTimeout(closeTimer)
  activeStar = star
  modalText.textContent = message.text
  modalContent.classList.toggle('highlight-modal', Boolean(message.isHighlight))
  modal.classList.remove('hidden')
  requestAnimationFrame(() => modal.classList.add('visible'))
  closeButton.focus()
}

for (const message of starMessages) {
  const star = document.createElement('button')
  star.type = 'button'
  star.className = `interactive-star ${message.isSpecial ? 'special' : 'normal'}`
  star.style.left = `${message.x}%`
  star.style.top = `${message.y}%`
  star.setAttribute('aria-label', `Mostrar mensaje ${message.id}`)
  star.addEventListener('click', () => showMessage(message, star))
  starsCanvas.append(star)
}

closeButton.addEventListener('click', closeMessage)
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeMessage()
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('visible')) closeMessage()
})
