console.log('wordle solver ...')

let form = document.querySelector('[name=verify')

let greenLetters = document.querySelectorAll('#greenLetters')
let yellowLetters = document.querySelectorAll('#yellowLetters')
let greyLetters = document.querySelectorAll('#greyLetters')
let wordleSolverData = document.getElementById('wordleSolverData')

let wordleWordCount = document.querySelector('#wordleWordCount')
let wordleSolvererrorMsg = document.querySelector('#wordleSolvererrorMsg')
let wordlesolver_submit = document.getElementById('wordlesolver_submit')
let newWordsLength = 0

let errMessage = document.querySelector('.errMessage')
let wrapper = document.querySelector('.wrapper')
let addMore = document.querySelector('#addMore')

addMore.addEventListener('click', (e) => {
  e.preventDefault()
  let div = document.createElement('div')
  div.classList.add('d-flex')
  div.classList.add('mt-2')

  for (let i = 20; i <= 24; i++) {
    let input = document.createElement('input')
    input.type = 'text'
    input.setAttribute('maxlength', '1')
    input.setAttribute('autocomplete', 'off')
    if (i <= 24) {
      input.setAttribute('tabIndex', i)
    }
    let classes = ['wordleSolver-field', 'greyLetters', 'form-control', 'px-5']
    input.classList.add(...classes)
    input.id = 'greyLetters'
    div.append(input)
    wrapper.append(div)
  }
})

const wordleSolver = async (value, value2, value3, greenWithIndex) => {
  try {
    let result = ''
    wordleWordCount.innerHTML = 'Searching for best possible letters...'
    let response = await fetch('/.netlify/functions/wordleSolver', {
      method: 'POST',
      body: JSON.stringify({
        greenLetters: value,
        yellowLetters: value2,
        greyLetters: value3,
        greenWithIndex: greenWithIndex,
      }),
    })
    const data = await response.json()

    let ok = true
    if (data.length === 0) {
      newWordsLength = ''
      wordleSolverData.innerHTML = ''
      wordleSolvererrorMsg.classList.add('alert-danger')
      wordleSolvererrorMsg.innerHTML = 'Sorry!! No words found'
    } else {
      wordleSolvererrorMsg.classList.remove('alert-danger')
      wordleSolvererrorMsg.innerHTML = ''
      wordleSolverData.innerHTML = ''
      newWordsLength = ''
      newWordsLength += data.length
      result = data.map((item) => {
        if (item.length === 1) {
          ok = false
          newWordsLength = newWordsLength - 1
        } else {
          let ScrabbleLetterScore = ScrabbleScore()
          sum = 0
          item = item.toLowerCase()
          for (let i = 0; i < item.length; i++) {
            sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
          }
          return `
          <a class="anchor__style" title="Lookup python in Dictionary" target="_blank" href="/word-meaning?search=${item.toLowerCase()}">
          <li>
          ${item.toLowerCase()}
          <span class="points" value="${sum}" style="position:relative; top:4px; font-size:12px"> ${sum}</span>
          </li>
          </a>
          `
        }
      })
      if (ok) {
        wordleSolverData.innerHTML += `
            <div class="allfiveletterswords wordlistContainer">
                <div class="wordListHeading">
                    <h3 class="lead">All 5 Letter Words</h3>
                </div>
                <div class="wordList">
                    <ul class="ul list-unstyled">
                     ${result.join('')}
                    </ul>
                </div>
            </div>
            `
      }
    }
    if (newWordsLength === 0) {
      wordleSolvererrorMsg.classList.add('alert-danger')
      wordleSolvererrorMsg.innerHTML = 'Sorry!! No words found'
    } else {
      wordleWordCount.innerHTML = `<strong>${newWordsLength} Results</strong>`
    }
  } catch (error) {
    console.log(error)
  }
}

for (let g = 0; g < greenLetters.length; g++) {
  const elem = greenLetters[g]
  elem.addEventListener('input', (e) => {
    if (e.target.value) {
      e.target.classList.add('ws-fcs')
    } else {
      e.target.classList.remove('ws-fcs')
    }
  })
}
for (let y = 0; y < yellowLetters.length; y++) {
  const elem = yellowLetters[y]
  elem.addEventListener('input', (e) => {
    if (e.target.value) {
      e.target.classList.add('ws-fcs2')
    } else {
      e.target.classList.remove('ws-fcs2')
    }
  })
}
for (let e = 0; e < greyLetters.length; e++) {
  const elem = greyLetters[e]
  elem.addEventListener('input', (e) => {
    if (e.target.value) {
      e.target.classList.add('ws-fcs3')
    } else {
      e.target.classList.remove('ws-fcs3')
    }
  })
}

const getLetters = (object) => {
  let letters = []
  if (typeof object === 'string') {
    object = document.querySelectorAll(object)
  }
  for (let item of object) {
    if (item.value.trim().length === 1) {
      letters.push(item.value.toLowerCase())
    }
  }
  return letters
}
const getIndexs = (object) => {
  let index = []
  if (typeof object === 'string') {
    object = document.querySelectorAll(object)
  }
  for (let item of object) {
    if (item.value.trim().length === 1) {
      index.push({
        value: item.value.toLowerCase(),
        index: item.dataset.id,
      })
    }
  }
  return index
}

function handleSubmit(e) {
  e.preventDefault()
  let greenLetter = getLetters('.greenLetters')
  let yellowLetters = getLetters('.yellowLetters')
  let greyLetters = getLetters('.greyLetters')
  let greenWithIndex = getIndexs('.greenWithIndex')
  if (
    greenLetters[0].value !== '' ||
    greenLetters[1].value !== '' ||
    greenLetters[2].value !== '' ||
    greenLetters[3].value !== '' ||
    greenLetters[4].value !== ''
  ) {
    errMessage.innerHTML = ''
    errMessage.classList.remove('alert-danger')
    errMessage.style.display = 'none'
    wordleSolver(greenLetter, yellowLetters, greyLetters, greenWithIndex)
  } else {
    errMessage.innerHTML = 'You must enter at least 1 green letter'
    errMessage.classList.add('alert-danger')
    errMessage.style.display = 'block'
  }
}
form.addEventListener('submit', handleSubmit)

// Scrabble Point Array
const ScrabbleScore = () => {
  let twl06_sowpods = {
    a: 1,
    e: 1,
    i: 1,
    o: 1,
    u: 1,
    l: 1,
    n: 1,
    r: 1,
    s: 1,
    t: 1,
    d: 2,
    g: 2,
    b: 3,
    c: 3,
    m: 3,
    p: 3,
    f: 4,
    h: 4,
    v: 4,
    w: 4,
    y: 4,
    k: 5,
    j: 8,
    x: 8,
    q: 10,
    z: 10,
  }
  return twl06_sowpods
}
