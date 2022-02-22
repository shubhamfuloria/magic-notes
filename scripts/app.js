import {
  handleEnterKey,
  handleOnAddNote,
  deleteHandler,
  searchHandler,
  suggInputHandler,
} from './handlers.js'
import {
  addNoteBtn,
  inputEl,
  notesContainer,
  searchInputEl
} from './domElements.js'
import { fetchData } from './data.js'

const createCard = (content, index) => {
  const cardEl = document.createElement('div')
  cardEl.className = 'cards'
  cardEl.setAttribute('data-index', index)

  const cardTextContainer = document.createElement('div')
  cardTextContainer.className = 'card-text-content'

  const headingEl = document.createElement('h3')
  headingEl.className = 'note-no'
  headingEl.textContent = `Note ${index + 1}`

  const rowEl = document.createElement('hr')

  const paraEl = document.createElement('p')
  paraEl.className = 'note-para'
  paraEl.textContent = content

  cardTextContainer.append(headingEl, rowEl, paraEl)

  const buttonEl = document.createElement('button')
  buttonEl.className = 'delete-note-button button'
  buttonEl.textContent = 'Delete Note'
  buttonEl.onclick = deleteHandler

  cardEl.append(cardTextContainer, buttonEl)

  return cardEl
}

const renderNotes = _ => {
  let notesArray = localStorage.getItem('notes')
  if (notesArray == null) return

  notesContainer.textContent = ''
  notesArray = JSON.parse(notesArray)

  //generate a card for each note element
  notesArray.forEach((el, index) => {
    const cardEl = createCard(el, index)
    notesContainer.appendChild(cardEl)
  })
}

//listeners
addNoteBtn.onclick = handleOnAddNote
inputEl.onkeypress = handleEnterKey
searchInputEl.onkeyup = searchHandler
window.onload = renderNotes
window.addEventListener('load', fetchData)

inputEl.oninput = event => {
  const searchText = event.target.value
  if (searchText.indexOf(' ') == -1) {
    suggInputHandler(event.target.value)
  } else {
    const lastSpaceIndex = searchText.lastIndexOf(' ')
    suggInputHandler(searchText.slice(lastSpaceIndex + 1))
  }
}
export { renderNotes, createCard }
