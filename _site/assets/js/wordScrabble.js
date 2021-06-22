// grab some html elements
let form = document.querySelector('#form')
let wordCount = document.querySelector('.wordCount')
let main = document.querySelector('.main')
let errorMsg = document.querySelector('.errorMsg')

// getqueryUrl from form
const params = new URLSearchParams(window.location.search)
let serachValue = params.get('search')
let prefixValue = params.get('prefix')
let containsValue = params.get('contains')
let suffixValue = params.get('suffix')
let lengthValue = params.get('length')
let dictonary = params.get('dictonary')

let ok = true

let tab_container = document.querySelector('.tab_container')

var sortValue
var sortBool = false
var theSelect = document.getElementById('select_dropDown')

// getWords define...
const getData = async (serachValue) => {
  try {
    main.innerHTML = `<div class="loader">
    <img src='/assets/images/loading.gif'>
    </div>`
    /// loader
    const response = await fetch(
      `/.netlify/functions/getWords?name=${serachValue}`
    )
    const data = await response.json()
    main.innerHTML = ''
    getWords(data)
    //getWords calling...
  } catch (error) {
    console.log(error)
  }
}
//getData calling...
if (lengthValue === '1') {
  errorMsg.innerHTML = 'words length should be more than 1'
} else {
  getData(serachValue.toLowerCase())
}

// getWords function define...
function getWords(data) {
  if (typeof data === 'string') {
    errorMsg.innerHTML = 'no words found'
    wordCount.innerHTML = `<strong> 0 words with letters ${serachValue.split(
      ''
    )}</strong>`
  } else {
    let newWordsLength = 0

    // sort eventlistener
    theSelect.addEventListener('change', () => {
      sortValue = theSelect[theSelect.selectedIndex].text
      if (sortValue == 'Z-A') {
        sortBool = true
        sortby(sortBool, data)
      } else {
        sortBool = false
        sortby(sortBool, data)
      }
    })

    for (let i = serachValue.length; i >= 1; i--) {
      let newdata = data.filter((item) => item.length === i)
      if (prefixValue) {
        newdata = newdata.filter((item2) =>
          item2.startsWith(prefixValue.toLowerCase())
        )
      }
      if (containsValue) {
        newdata = newdata.filter((item) =>
          item.includes(containsValue.toLowerCase())
        )
      }
      if (suffixValue) {
        newdata = newdata.filter((item) =>
          item.endsWith(suffixValue.toLowerCase())
        )
      }
      if (lengthValue) {
        newdata = newdata.filter((item) => item.length == lengthValue)
      }
      if (newdata.length === 0) {
        main.innerHTML += ''
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
            return `<a class="anchor__style" title="Lookup python in Dictionary" target="_blank" href="/word-meaning?search=${item}">
            <li>${item}
          <span class="points" value="${sum}" style="position:relative; top:4px; font-size:12px"> ${sum}</span>
            </li></a>`
          }
        })

        if (ok) {
          tab_container.innerHTML += `
          <input type="button" id="Tab_${i}" onclick="Filtering(${i})" value="${i} Letter"
          class="tab_link  cursorPointer" />
          `
          let tabs = document.getElementsByClassName('tab_link')
          tabs[0] ? tabs[0].classList.add('active-tab') : ''

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
    }

    if (newWordsLength === 0) {
      errorMsg.innerHTML = 'no words found'
    } else {
      wordCount.innerHTML = `<strong>${newWordsLength} words with letters ${serachValue.split(
        ''
      )}</strong>`
    }
  }
}

// sort by aplhabets
function sortby(sortBool, data) {
  if (sortBool) {
    main.innerHTML = ''
    data.reverse()
    let newWordsLength = 0
    for (let i = serachValue.length; i >= 1; i--) {
      var newdata = data.filter((item) => item.length === i)

      if (newdata.length === 0) {
        main.innerHTML += ''
      } else {
        newWordsLength += newdata.length

        const result = newdata.map((item) => {
          if (item.length === 1) {
            ok = false
            newWordsLength = newWordsLength - 1
          } else {
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
          }
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
  } else {
    main.innerHTML = ''
    data.sort()
    for (let i = serachValue.length; i >= 1; i--) {
      var newdata = data.filter((item) => item.length === i)
      if (newdata.length === 0) {
        main.innerHTML += ''
      } else {
        const result = newdata.map((item) => {
          if (item.length === 1) {
            ok = false
          } else {
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
          }
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
  }
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

// Implement Filtering
let sections = {}
function Filtering(id) {
  let tabs = document.getElementsByClassName('tab_link')
  tabs[0] ? tabs[0].classList.add('active-tab') : ''

  Array.from(tabs).map((item) => {
    item.classList.remove('active-tab')
  })
  main.innerHTML += ``
  let activeLetter = event.target
  // console.log(activeLetter)
  activeLetter.classList.add('active-tab')

  var section = document.querySelectorAll('.wordlistContainer')
  var sort_val = document.querySelector('.sort-select').value
  sections = {}
  Array.prototype.forEach.call(section, function (e) {
    if (document.body.clientWidth > 991) {
      sections[e.id] = e.offsetTop - 10
    } else {
      sections[e.id] = e.offsetTop - 10
      console.log(sections)
    }
  })
  document.body.scrollTop = sections[sort_val + '_' + id] + 5
}

let prev = document.getElementById('prev')
let next = document.getElementById('next')

if (prev) {
  prev.onclick = scroll_Right
}
if (next) {
  next.onclick = scroll_Left
}
window.addEventListener('resize', function () {
  scroll_visible()
})
function scroll_visible() {
  let tab_container = document.querySelector('#tab-container')
  console.log(tab_container)
  if (tab_container) {
    if (tab_container.clientWidth === tab_container.scrollWidth) {
      prev.style.display = 'none'
      next.style.display = 'none'
    } else {
      prev.style.display = 'block'
      next.style.display = 'block'
    }
  }
}
scroll_visible()
function scroll_Left() {
  tab_container.scrollLeft += 130
}
function scroll_Right() {
  tab_container.scrollLeft -= 130
}
