// console.log("certain position");
let form = document.querySelector('[name=verify')
let greenLetters = document.querySelectorAll('.greenLetters')
let certain_pos_words_data = document.getElementById('certain_pos_words_data')
greenLetters[0].focus()
let certain_pos_count = document.querySelector('#certain_pos_count')
let certain_pos_error_msg = document.querySelector('#certain_pos_error_msg')
let certain_pos_submit = document.getElementById('certain_pos_submit')
let newWordsLength
let errMessage = document.querySelector('.errMessage')
let spinner = document.querySelector('.spinner')
let tab_container = document.querySelector('.tab_container')
let tab_link_wrapper =  document.querySelector(".tab_link_wrapper")
tab_link_wrapper.style.marginTop = "1rem"
tab_link_wrapper.style.display = "none"

const wordsInCertainPos = async (letters, lettersWithIndex,wordLength) => {
  let maxLength = Math.max.apply(null, wordLength);
  // maxLength = maxLength + 1
  try {
    let result = ''
    document.querySelector('#searchData').innerHTML = ''
    spinner.classList.add('spinner-border')
    certain_pos_count.innerHTML = 'Finding words  in certain position...'
    let response = await fetch('http://127.0.0.1:9000/wordsInCertainPositions', {
      method: 'POST',
      body: JSON.stringify({
        greenLetters: letters,
        greenWithIndex: lettersWithIndex,
      }),
    })
    let data = await response.json()
   
    if(data.length == 0){
        errMessage.innerHTML = 'Sorry!! No words found'
        errMessage.classList.add('alert-danger')
        errMessage.style.display = 'block'
        document.querySelector('#searchData').innerHTML = 'Search'
        spinner.classList.remove('spinner-border')
        certain_pos_words_data.innerHTML = ""
        tab_container.innerHTML = ""
        certain_pos_count.innerHTML = ""
        newWordsLength = 0
    }
    else{
    errMessage.innerHTML = ''
    errMessage.classList.remove('alert-danger')
    data = data.slice(0,1500)
    document.querySelector('#searchData').innerHTML = 'Search'
    spinner.classList.remove('spinner-border')
    certain_pos_words_data.innerHTML = ""
    tab_container.innerHTML = ""
    newWordsLength = 0
    

    let ok = true

    for (let i = maxLength; i <= 15; i++) {
      let newdata = data.filter((item) => item.length === i)
      if (newdata.length === 0) {
        certain_pos_words_data.innerHTML += ''
      } else {
        newWordsLength += newdata.length
        certain_pos_error_msg.classList.remove('alert-danger')
        certain_pos_error_msg.innerHTML = ''
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
          tab_link_wrapper.style.display = "inline-flex"
          tab_container.innerHTML += `
          <input type="button" id="Tab_${i}" onclick="Filtering(${i})" value="${i} Letter"
          class="tab_link  cursorPointer" />
          `
          let tabs = document.getElementsByClassName('tab_link')
          tabs[0] ? tabs[0].classList.add('active-tab') : ''
          certain_pos_words_data.innerHTML += `
          <div class="letterswords wordlistContainer" id="alpha_${i}">
              <div class="wordListHeading">
                  <h3 class="lead">List of ${i} letter words that contain letters ${letters}</h3>
              </div>
              <div class="certainWordsList">
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
      certain_pos_count.innerHTML = ""
      certain_pos_error_msg.classList.add('alert-danger')
      certain_pos_error_msg.innerHTML = 'Sorry!! No words found'
    } else {
      certain_pos_count.innerHTML = `<strong>Found <span>${newWordsLength}</span> 
      words matching your search criteria </strong>`
    }
 
  
  
  
  
  }
} catch (error) {
    console.log(error)
  }
}

for (let g = 0; g < greenLetters.length; g++) {
  const elem = greenLetters[g]
  elem.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z? ]/g, "")
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
  let letters = getLetters('.greenLetters')
  let lettersWithIndex = getIndexs('.greenWithIndex')
  let wordLength = getLength('.greenWithIndex')
  
  wordsInCertainPos(letters,lettersWithIndex,wordLength)
}
form.addEventListener('submit', handleSubmit)

// handling of filter on scroll
window.onscroll = function () {
  var section = document.querySelectorAll('.letterswords')
  let new_sections = {}
  Array.prototype.forEach.call(section, function (e) {
    if (document.body.clientWidth > 991) {
      new_sections[e.id] = e.offsetTop - 10
    } else {
      new_sections[e.id] = e.offsetTop - 10
    }
  })
  var scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop
  for (i in new_sections) {
    let sort_val = "alpha"
    if (
      i.split('_')[0] == sort_val &&
      new_sections[i] &&
      new_sections[i] <= scrollPosition
    ) {
      document.querySelector('.active-tab').classList.remove('active-tab')
      var active_now = document.querySelector('#Tab_' + i.split('_')[1])
      active_now.classList.add('active-tab')
      // active_now.scrollIntoView()
    }
  }
}
// Add Filtering
let sections = {}
function Filtering(id) {
  let tabs = document.getElementsByClassName('tab_link')
  tabs[0] ? tabs[0].classList.add('active-tab') : ''

  Array.from(tabs).map((item) => {
    item.classList.remove('active-tab')
  })
  // certain_pos_words_data.innerHTML += ``
  let activeLetter = event.target
  activeLetter.classList.add('active-tab')

  var section = document.querySelectorAll('.letterswords')
  var sort_val = "alpha"
  
  Array.prototype.forEach.call(section, function (e) {
    if (document.body.clientWidth > 991) {
      sections[e.id] = e.offsetTop - 10
    } else {
      sections[e.id] = e.offsetTop - 30
    }
  })
  document.documentElement.scrollTop = sections[sort_val + '_' + id] + 5

  // document.body.scrollTop = sections[sort_val + '_' + id] + 5
}
// next && previous functionality
let prev = document.getElementById('prev')
let next = document.getElementById('next')
if (prev) {
  prev.onclick = scroll_Right
}
if (next) {
  next.onclick = scroll_Left
}
scroll_visible()
window.addEventListener('resize', function () {
  scroll_visible()
})
window.addEventListener('scroll', function () {
  scroll_visible()
})
function scroll_visible() {
  let tab_container = document.querySelector('#tab-container')
  // console.log(tab_container)
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
function scroll_Left() {
  tab_container.scrollLeft += 130
}
function scroll_Right() {
  tab_container.scrollLeft -= 130
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
