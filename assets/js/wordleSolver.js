console.log('wordle solver ...')

let greyLetters = document.querySelectorAll('#greyLetters')
let yellowLetters = document.getElementById('yellowLetters')
let greenLetters = document.getElementById('greenLetters')
let wordleSolverData = document.getElementById('wordleSolverData')
let wordlesolver_submit = document.getElementById('wordlesolver_submit')

const wordleSolver = async (value, value2, value3) => {
  try {
    let response = await fetch('http://127.0.0.1:9000/wordleSolver', {
      method: 'POST',
      body: JSON.stringify({
        greyLetters: value,
        yellowLetters: value2,
        greenLetters: value3,
      }),
    })
    const data = await response.json()
    wordleSolverData.innerHTML = ''

    let ok = true
    if (data.length === 0) {
      wordleSolverData.innerHTML += ''
    } else {
      const result = data.map((item) => {
        if (item.length === 1) {
          ok = false
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
            <div class="allGroupWords wordlistContainer">
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
  } catch (error) {
    console.log(error)
  }
}

function onSubmit() {
  for (let i = 0; i < greyLetters.length; i++) {
    greyLetters[i].addEventListener('change', function () {
      wordleSolver(
        greyLetters[i].value,
        yellowLetters.value,
        greenLetters.value
      )
      // console.log(greyLetters[i].value)
    })
  }
}

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
