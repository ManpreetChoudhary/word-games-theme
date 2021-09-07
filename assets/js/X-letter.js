---
---
const getScript=document.currentScript
const letterLen = getScript.dataset.letter

let errorMsg = document.querySelector('.errorMsg')
let wordCount = document.querySelector('.wordCount')
let main = document.querySelector('.main')

const params = new URLSearchParams(window.location.search)
let serachValue = params.get('search')
let prefixValue = params.get('prefix')
let containsValue = params.get('contains')
let suffixValue = params.get('suffix')
let lengthValue = params.get('length')
let dictonary = params.get('dictionary')

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


    if (letterLen) {
      filterData = data.filter((item) => item.length == letterLen)
    }
  

    if (prefixValue) {
      filterData = filterData.filter((item2) =>
        item2.startsWith(prefixValue.toLowerCase())
      )
      startsWith.classList.add('tick')
      startsWith.value = prefixValue
    }
    if (containsValue) {
      filterData = filterData.filter((item) =>
        item.includes(containsValue.toLowerCase())
      )
      mustInclude.classList.add('tick')
      mustInclude.value = containsValue
    }
    if (suffixValue) {
      filterData = filterData.filter((item) =>
        item.endsWith(suffixValue.toLowerCase())
      )
      endsWith.classList.add('tick')
      endsWith.value = suffixValue
    }

    if (filterData.length === 0) {
      main.innerHTML += ''
      errorMsg.innerHTML = 'No words Found with this length'
    } else {
      // sort eventlistener
      theSelect.addEventListener('change', () => {
        sortValue = theSelect[theSelect.selectedIndex].text
        if (sortValue == 'Z-A') {
          sortBool = true
          sortby(sortBool, filterData, itemLength)
        } else {
          sortBool = false
          sortby(sortBool, filterData, itemLength)
        }
        if (sortValue == 'Points') {
          sortBool = true
          sortPointsby(sortBool, filterData, itemLength)
        }
      })

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
        wordLength.value = itemLength
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

//Handling of filter counter in advanced filter
function addFilterCount() {
  let filter_val = document.getElementsByClassName('filter_val')
  let filter = document.querySelector('.filter_count')
  let filter_count = 0

  filter_val[0].value = prefixValue
  filter_val[1].value = containsValue
  filter_val[2].value = suffixValue
  filter_val[3].value = lengthValue

  for (var i = 0; i < 4; i++) {
    if (filter_val[i].value != '') {
      filter_count += 1
    }
    if (filter_count === 0) {
      filter.style.display = 'none'
    } else {
      filter.style.display = 'inline-block'
    }

    filter.innerHTML = filter_count
  }
}
addFilterCount()

// sorting by points
function sortPointsby(sortValue, data, i) {
  if (sortValue) {
    main.innerHTML = ''
    let newArray = []
    data.map((item) => {
      let ScrabbleLetterScore = ScrabbleScore()
      let points = 0
      item = item.toLowerCase()
      for (let i = 0; i < item.length; i++) {
        points += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
      }
      const value = {
        words: item,
        points: points,
      }
      newArray.push(value)
      newArray.sort(function (a, b) {
        return b.points - a.points
      })
    })
    const result = newArray.map((item) => {
      return `<a class="anchor__style" title="Lookup python in Dictionary" target="_blank" href="/word-meaning?search=${item.words}">
      <li>${item.words}
    <span class="points" value="${item.points}" style="position:relative; top:4px; font-size:12px"> ${item.points}</span>
      </li></a>`
    })

    main.innerHTML += `
    <div class="allGroupWords wordlistContainer" id="alpha_${i}">
        <div class="wordListHeading">
            <h3 class="lead">${i} Letter Words</h3>
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

// sort by aplhabets
function sortby(sortBool, data, i) {
  if (sortBool) {
    main.innerHTML = ''
    data.reverse()
    const result = data.map((item) => {
      let ScrabbleLetterScore = ScrabbleScore()
      let sum = 0
      item = item.toLowerCase()
      for (let i = 0; i < item.length; i++) {
        sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
      }
      return `<a class="anchor__style" title="Lookup python in Dictionary" target="_blank" href="/word-meaning?search=${item}">
            <li>${item}
        <span class="points" value="${sum}" style="position:relative; top:4px; font-size:12px"> ${sum}</span>
          </li></a>`
    })

    main.innerHTML += `
        <div class="allGroupWords wordlistContainer" id="alpha_${i}">
            <div class="wordListHeading">
                <h3 class="lead">${i} Letter Words</h3>
            </div>
            <div class="wordList">
                <ul class="ul list-unstyled">
                 ${result.join('')}
                </ul>
            </div>
        </div>
     
        `
  } else {
    main.innerHTML = ''
    data.sort()
    const result = data.map((item) => {
      let ScrabbleLetterScore = ScrabbleScore()
      let sum = 0
      item = item.toLowerCase()
      for (let i = 0; i < item.length; i++) {
        sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
      }
      return `<a class="anchor__style" title="Lookup python in Dictionary" target="_blank" href="/word-meaning?search=${item}">
              <li>${item}
          <span class="points" value="${sum}" style="position:relative; top:4px; font-size:12px"> ${sum}</span>
            </li></a>`
    })

    main.innerHTML += `
          <div class="allGroupWords wordlistContainer" id="alpha_${i}">
              <div class="wordListHeading">
                  <h3 class="lead">${i} Letter Words</h3>
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
