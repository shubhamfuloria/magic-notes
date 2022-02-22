import {
  inputEl,
  addNoteBtn,
  notesContainer,
  suggContainer
} from './domElements.js'
import { renderNotes, createCard } from './app.js'
import { data } from './data.js'

const handleOnAddNote = event => {
  let notesArray = localStorage.getItem('notes')
  const noteText = inputEl.value
  if (noteText.trim() == false) return
  //initialization in local storage (first time only)
  if (notesArray == null) {
    notesArray = []
    notesArray.push(noteText)
  } else {
    notesArray = JSON.parse(notesArray)
    notesArray.push(noteText)
  }
  //stringify before pushing array to local storage
  const notesString = JSON.stringify(notesArray)
  localStorage.setItem('notes', notesString)
  inputEl.value = ''
  renderNotes()
}

//enter key pressed when user focus is input box
const handleEnterKey = event => {
  if (event.keyCode == 13) {
    addNoteBtn.click()
  }
}

const deleteHandler = event => {
  const targetCard = event.target.closest('div')
  const targetIndex = targetCard.dataset.index
  let notesArray = localStorage.getItem('notes')
  notesArray = JSON.parse(notesArray)
  notesArray.splice(targetIndex, 1)
  const notesString = JSON.stringify(notesArray)
  localStorage.setItem('notes', notesString)
  renderNotes()
}

//case insensitive search handler
const searchHandler = event => {
  const searchValue = event.target.value
  let notesArray = localStorage.getItem('notes')
  notesArray = JSON.parse(notesArray)
  notesContainer.textContent = ''
  notesArray.forEach((el, index) => {
    if (el.toUpperCase().indexOf(searchValue.toUpperCase()) != -1) {
      const cardEl = createCard(el, index)
      notesContainer.appendChild(cardEl)
    }
  })
}

//auto suggetion feature
const suggInputHandler = searchText => {
  suggContainer.textContent = ''
  let matches = data.filter(el => {
    const regex = new RegExp(`^${searchText}`, 'gi')
    return el.match(regex)
  })
  if (searchText == 0) {
    matches = []
    suggContainer.textContent = ''
    return
  }
  if (matches.length > 5) {
    matches.splice(5)
  }
  renderHTML(matches)
}
const renderHTML = matches => {
  if (matches.length > 0) {
    matches.forEach(el => {
      const matchedItem = document.createElement('div')
      matchedItem.className = 'sugg__item'
      matchedItem.textContent = el
      matchedItem.onclick = searchItemClickHandler
      suggContainer.appendChild(matchedItem)
    })
  }
}

//on click of suggested items
const searchItemClickHandler = event => {
  const content = event.target.textContent
  suggContainer.textContent = ''
  const lastSpaceIndex = inputEl.value.lastIndexOf(' ')
  let currInput = inputEl.value;
  if(lastSpaceIndex != -1) {
    currInput = currInput.slice(0, lastSpaceIndex);
  }
  inputEl.value = currInput + ' ' + content;
}

export {
  handleOnAddNote,
  handleEnterKey,
  deleteHandler,
  searchHandler,
  suggInputHandler
}
