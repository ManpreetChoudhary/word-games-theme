console.log("certain position");

let form = document.querySelector('[name=verify')
let greenLetters = document.querySelectorAll('.greenLetters')
let wordleSolverData = document.getElementById('wordleSolverData')
greenLetters[0].focus()
let wordleWordCount = document.querySelector('#wordleWordCount')
let wordleSolvererrorMsg = document.querySelector('#wordleSolvererrorMsg')
let wordlesolver_submit = document.getElementById('wordlesolver_submit')
let newWordsLength = 0
let errMessage = document.querySelector('.errMessage')

let spinner = document.querySelector('.spinner')
const wordleSolver = async (value, greenWithIndex,wordLength) => {

  let maxLength = Math.max.apply(null, wordLength);
  maxLength = maxLength + 1
  
  try {
    let result = ''
    document.querySelector('#updateTxt').innerHTML = ''
    spinner.classList.add('spinner-border')
    wordleWordCount.innerHTML = 'Finding words  in certain position...'
    let response = await fetch('http://127.0.0.1:9000/wordsInCertainPositions', {
      method: 'POST',
      body: JSON.stringify({
        greenLetters: value,
        greenWithIndex: greenWithIndex,
      }),
    })
    let  data = await response.json()
    data = data.slice(0,1500)
    document.querySelector('#updateTxt').innerHTML = 'Search'
    spinner.classList.remove('spinner-border')

    let ok = true

    for (let i = maxLength; i <= 15; i++) {
      let newdata = data.filter((item) => item.length === i)
      if (newdata.length === 0) {
        wordleSolverData.innerHTML += ''
      } else {
        newWordsLength += newdata.length
        const result = newdata.map((item) => {
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
            return `<a class="anchor__style" title="Lookup ${item} in Dictionary" target="_blank" href="/word-meaning?search=${item.toLowerCase()}">
            <li>${item}
          <span class="points" value="${sum}" style="position:relative; top:4px; font-size:12px"> ${sum}</span>
            </li></a>`
          }
        })
        if (ok) {
          wordleSolverData.innerHTML += `
          <div class="allfiveletterswords wordlistContainer">
              <div class="wordListHeading">
                  <h3 class="lead">${i} Letter words</h3>
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
    }

    if (newWordsLength === 0) {
      console.log(true)
      wordleSolvererrorMsg.classList.add('alert-danger')
      wordleSolvererrorMsg.innerHTML = 'Sorry!! No words found'
    } else {
      wordleWordCount.innerHTML = `<strong>There are <span style="color:#20a815">${newWordsLength}</span> 
      words that contain letters ${value} at position ${maxLength}</strong>`
    }
  } catch (error) {
    console.log(error)
  }
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
const getLength= (object) => {
  let index = []
  if (typeof object === 'string') {
    object = document.querySelectorAll(object)
  }
  for (let item of object) {
    if (item.value.trim().length === 1) {
      index.push(
        item.dataset.id)
    }
  }
  return index
}

function handleSubmit(e) {
  e.preventDefault()
  let greenLetter = getLetters('.greenLetters')
  let greenWithIndex = getIndexs('.greenWithIndex')

  let wordLength = getLength('.greenWithIndex')
  
  wordleSolver(greenLetter,greenWithIndex,wordLength)
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
