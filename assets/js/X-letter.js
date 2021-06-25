let errorMsg = document.querySelector('.errorMsg')
let wordCount = document.querySelector('.wordCount')
let main = document.querySelector('.main')

const params = new URLSearchParams(window.location.search)
let serachValue = params.get('search')
let prefixValue = params.get('prefix')
let containsValue = params.get('contains')
let suffixValue = params.get('suffix')
let lengthValue = params.get('length')
let dictonary = params.get('dictonary')

let tab_container = document.querySelector('.tab_container')

let txtBox = document.querySelector('.txtBox')
txtBox.value = serachValue

var theSelect = document.getElementById('select_dropDown')
document.querySelector('.select_dropDown2').value = dictonary

const getData = async (serachValue) => {
  try {
    main.innerHTML = `<div class="loader">
    <img src='/assets/images/loading.gif'>
    </div>`
    const response = await fetch(
      `/.netlify/functions/getWords?name=${serachValue}`
    )
    const data = await response.json()
    main.innerHTML = ''
    x_with_letters(data)
  } catch (error) {
    console.log(error)
  }
}
// calling function
getData(serachValue.toLowerCase())

function x_with_letters(data) {
  if (typeof data === 'string') {
    errorMsg.innerHTML = 'No words found'
    wordCount.innerHTML = `<strong> 0 words with letters ${serachValue.split(
      ''
    )}</strong>`
  } else {
    let newWordsLength = 0
    let filterData = ''

    if (window.location.pathname == '/thirteen-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 13)
    } else if (
      window.location.pathname == '/twelve-letter-word-finder/result'
    ) {
      filterData = data.filter((item) => item.length == 12)
    } else if (
      window.location.pathname == '/eleven-letter-word-finder/result'
    ) {
      filterData = data.filter((item) => item.length == 11)
    } else if (window.location.pathname == '/ten-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 10)
    } else if (window.location.pathname == '/nine-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 9)
    } else if (window.location.pathname == '/eight-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 8)
    } else if (window.location.pathname == '/seven-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 7)
    } else if (window.location.pathname == '/six-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 6)
    } else if (window.location.pathname == '/five-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 5)
    } else if (window.location.pathname == '/four-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 4)
    } else if (window.location.pathname == '/three-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 3)
    } else if (window.location.pathname == '/two-letter-word-finder/result') {
      filterData = data.filter((item) => item.length == 2)
    }

    if (filterData.length === 0) {
      main.innerHTML += ''
      errorMsg.innerHTML = 'No words Found with this length'
    } else {
      newWordsLength += filterData.length
      let itemLength = ''
      const result = filterData.map((item) => {
        itemLength = item.length
        let ScrabbleLetterScore = ScrabbleScore()
        sum = 0
        item = item.toLowerCase()
        for (let i = 0; i < item.length; i++) {
          sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
        }
        return `<a class="anchor__style" title="Lookup python in Dictionary" target="_blank" href="/word-meaning?search=${item}">
        <li>${item}
          <span class="points" value="${sum}" style="position:relative; top:4px; font-size:12px"> ${sum}</span>
            </li></a>`
      })

      tab_container.innerHTML += `
      <a href="#${itemLength}">
      <input type="button" value="${itemLength} Letter" id="Tab${itemLength}" onclick="addFilter(${itemLength})"
      class="tab_link">
      </a>
      `
      let tabs = document.getElementsByClassName('tab_link')
      tabs[0] ? tabs[0].classList.add('active-tab') : ''

      main.innerHTML += `
        <div class="allGroupWords">
          <div class="wordListHeading">
          <h3 class="lead">${itemLength} Letter Words</h3>
           </div>
      <div class="wordList">
          <ul class="ul list-unstyled">
           ${result.join('')}
          </ul>
      </div>
  </div>
  `
    }
    wordCount.innerHTML = `<strong>${newWordsLength} words with letters ${serachValue.split(
      ''
    )}</strong>`
  }
}

// Implement Active class
const addFilter = () => {
  let tabs = document.getElementsByClassName('tab_link')
  tabs[0] ? tabs[0].classList.add('active-tab') : ''

  Array.from(tabs).map((item) => {
    item.classList.remove('active-tab')
  })
  main.innerHTML += ``
  let activeLetter = event.target
  // console.log(activeLetter)
  activeLetter.classList.add('active-tab')
}

// Scrabble Point Counts
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

  let wwfScore = {
    a: 1,
    b: 4,
    c: 4,
    d: 2,
    e: 1,
    f: 4,
    g: 3,
    h: 3,
    i: 1,
    j: 10,
    k: 5,
    l: 2,
    m: 4,
    n: 2,
    o: 1,
    p: 4,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 2,
    v: 5,
    w: 4,
    x: 8,
    y: 3,
    z: 10,
  }

  if (dictonary === 'wwf') {
    return wwfScore
  } else {
    return twl06_sowpods
  }
}
