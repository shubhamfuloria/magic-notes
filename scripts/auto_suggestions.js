const textAreaEl = document.querySelector('.textarea')
let suggestionsData = []

//getting some most used word
async function getWords () {
  const response = await fetch('./assets/common_words.json')
  const data = await response.json()
  suggestionsData = data.commonWords
}

const inputBox = document.querySelector('.textarea')
let suggestionText = ''
//compares input with words database
const compareInput = (word, ip) => {
  for (let i = 0; i < ip.length; i++) {
    if (!ip[i] || !word[i]) {
      return false
    }
    if (ip[i].toUpperCase() != word[i].toUpperCase()) {
      return false
    }
  }
  return true
}

//search input when a key is pressed
const searchInput = target => {
  for (let word of suggestionsData) {
    if (compareInput(word, target)) {
      return word.slice(target.length)
    }
  }
  return ''
}

const spanEl = document.createElement('span')
spanEl.id = 'suggestion'
spanEl.contentEditable = false

const isInputAlphabet = value => {
  let regExp = /[a-zA-Z]/g
  return regExp.test(value)
}

const handleEnterPress = event => {
  event.preventDefault()
}

inputBox.onkeyup = event => {
  if (event.keyCode == 13) {
    handleEnterPress(event)
  }
  let inputText = event.target.textContent.trim()
  const spanText = spanEl.textContent

  inputText = inputText.slice(0, inputText.length - spanText.length)
  if (isInputAlphabet(inputText)) {
    value = searchInput(inputText)
    spanEl.textContent = value
    textAreaEl.appendChild(spanEl)
  } else {
    spanEl.textContent = ''
  }
  // suggestionBox.textContent = value
}

//events
spanEl.onclick = event => false
window.onload = getWords()
