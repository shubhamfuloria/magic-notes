let addBtn = document.querySelector('.add-note-button')
showNotes()

addBtn.addEventListener('click', function () {
  let noteTxt = document.querySelector('.textarea').innerHTML;
  let noteString = localStorage.getItem('notes')
  let notesArray

  if (noteString == null || noteString == undefined) {
    notesArray = []
  } else {
    notesArray = JSON.parse(noteString)
  }
  if (noteTxt != '') {
    notesArray.push(noteTxt)
    localStorage.setItem('notes', JSON.stringify(notesArray))
    document.querySelector('.textarea').innerHTML = ''
    console.log(notesArray)
    showNotes()
  }
})

function showNotes () {
  let html = ''
  let noteString = localStorage.getItem('notes')
  if (noteString == null || noteString == undefined) {
    notesArray = []
  } else {
    notesArray = JSON.parse(localStorage.getItem('notes'))
  }
  notesArray.forEach(function (element, index) {
    html += `<div class="cards">
        <div class="card-text-content">
            <h3 class="note-no">Note ${index + 1}</h3>
            <hr>
            <p class="note-para">${element}</p>
        </div>
        <button onclick= 'deleteNote(this.id)' class='delete-note-button button' id='${index}'>Delete Note</button>

    </div>`
  })

  if (localStorage.getItem('notes') == null) {
    document.querySelector('.saved-notes-container').innerHTML =
      '<h1 class="saved-notes-heading" style ="text-align: center;">Nothing to Show here :( </h1>'
  } else {
    document.querySelector('.saved-notes-container').innerHTML = html
  }
}

function deleteNote (index) {
  notesArray = JSON.parse(localStorage.getItem('notes'))

  notesArray.splice(index, 1)

  localStorage.setItem('notes', JSON.stringify(notesArray))

  showNotes()
}

let search = document.querySelector('#search')

search.addEventListener('input', function () {
  let inputVal = search.value.toLowerCase()

  console.log(inputVal)
  let noteCards = document.getElementsByClassName('cards')

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName('p')[0].innerText

    if (cardTxt.includes(inputVal)) {
      element.style.display = 'flex'
    } else {
      element.style.display = 'none'
    }
  })
})

let heading = document
  .querySelector('.left-head')
  .addEventListener('click', function () {
    document.location.reload()
  })

let noteHead = document.querySelector('.home')
noteHead.addEventListener('click', function () {
  let savedNotes = document.querySelector('#saved')

  savedNotes.scrollIntoView()
})
