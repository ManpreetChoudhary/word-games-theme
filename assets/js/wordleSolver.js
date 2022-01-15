console.log('wordle solver ...')

let form = document.querySelector('[name=verify')

let greenLetters = document.querySelectorAll('#greenLetters')
let yellowLetters = document.querySelectorAll('#yellowLetters')
let greyLetters = document.querySelectorAll('#greyLetters')
let wordleSolverData = document.getElementById('wordleSolverData')

let wordleWordCount = document.querySelector('#wordleWordCount')
let wordlesolver_submit = document.getElementById('wordlesolver_submit')
let newWordsLength = 0

const wordleSolver = async (value, value2, value3, greenWithIndex) => {
  try {
    wordleWordCount.innerHTML = 'Searching for best possible letters...'
    let response = await fetch('./netlify/functions/wordleSolver', {
      method: 'POST',
      body: JSON.stringify({
        greenLetters: value,
        yellowLetters: value2,
        greyLetters: value3,
        greenWithIndex: greenWithIndex,
      }),
    })
    const data = await response.json()
    wordleWordCount.innerHTML = ''
    wordleSolverData.innerHTML = ''

    let ok = true
    if (data.length === 0) {
      wordleSolverData.innerHTML += ''
    } else {
      newWordsLength += data.length
      const result = data.map((item) => {
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
      // errorMsg.innerHTML = 'no words found'
    } else {
      wordleWordCount.innerHTML = `<strong>${newWordsLength} Results</strong>`
    }
  } catch (error) {
    console.log(error)
  }
}

let arr = []
let greenWithIndex = []
for (let g = 0; g < greenLetters.length; g++) {
  const elem = greenLetters[g]
  elem.addEventListener('input', (e) => {
    e.target.classList.add('ws-fcs')
    arr.push(e.target.value)
    greenWithIndex.push({
      value: e.target.value,
      index: e.target.dataset.id,
    })
  })
}

let arr2 = []
for (let y = 0; y < yellowLetters.length; y++) {
  const elem = yellowLetters[y]
  elem.addEventListener('input', (e) => {
    e.target.classList.add('ws-fcs2')
    arr2.push(e.target.value)
  })
}

let arr3 = []
for (let e = 0; e < greyLetters.length; e++) {
  const elem = greyLetters[e]
  elem.addEventListener('input', (e) => {
    e.target.classList.add('ws-fcs3')
    arr3.push(e.target.value)
  })
}

function handleSubmit(e) {
  e.preventDefault()
  wordleSolver(arr, arr2, arr3, greenWithIndex)
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
