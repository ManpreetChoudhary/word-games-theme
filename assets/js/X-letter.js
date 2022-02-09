---
---
const getScript=document.currentScript
const letterLen = getScript.dataset.letter

const ablank = getScript.dataset.ablank

let errorMsg = document.querySelector('.errorMsg')
let script = document.currentScript
let wordCount = document.querySelector('.wordCount')
let main = document.querySelector('.main')

const params = new URLSearchParams(window.location.search)
let serachValue = params.get('search').toLowerCase()
let prefixValue = params.get('prefix')
let containsValue = params.get('contains')
let suffixValue = params.get('suffix')
let exculdeValue = params.get('exculde')
let includeValue = params.get('include')
let lengthValue = params.get('length')
let dictonary = params.get('dictionary')



let home_page_search_result =  document.querySelector("#home_page_search_result")
let homePageSearchResult = `/result?search=${serachValue}&dictionary=Dictionary&prefix=&contains=&suffix=&exculde=&inculde=&length=`;


 // Attach click listener to relevant buttons.
 home_page_search_result.addEventListener("click",()=>{
  ga('send', 'event', 'Link click', 'click', home_page_search_result.innerText)
  // ga('send', 'event', 'CTA click', 'click', home_page_search_result.innerText);
})


let tab_link_wrapper = document.querySelector('.tab_link_wrapper')
tab_link_wrapper.style.display = "none"

let txtBox = document.querySelector('.txtBox')
txtBox.focus()
txtBox.value = serachValue


if(ablank){
if(!serachValue.includes("?")){
  if(serachValue.length < letterLen){
  serachValue = serachValue + '?'
  }
  }
}

txtBox.addEventListener('input', (e) => {
  let rangeOfBlankTile = script.dataset.range
  e.target.value = e.target.value.replace(/[^a-zA-Z? ]/g, '')
  if (rangeOfBlankTile === '') {
    rangeOfBlankTile = 5
  }
  e.target.value = e.target.value.replace(/ /g, '?')
  let data = []
  data = e.target.value.split('').filter((i) => i === '?')
  if (data.length > rangeOfBlankTile) {
    e.target.value = e.target.value.replace(/\?$/, '')
  }
})

var theSelect = document.getElementById('select_dropDown')
document.querySelector('.select_dropDown2').value = dictonary
const getDiff = (text1, text2) => {
  var diffRange = []
  var currentRange = undefined
  for (var i = 0; i < text1.length; i++) {
    if (text1[i] != text2[i]) {
      if (currentRange == undefined) {
        currentRange = [i]
      }
    }
    if (currentRange != undefined && text1[i] == text2[i]) {
      currentRange.push(i)
      diffRange.push(currentRange)
      currentRange = undefined
    }
  }
  if (currentRange != undefined) {
    currentRange.push(i)
    diffRange.push(currentRange)
  }
  return diffRange
}
const getData = async (serachValue) => {
  try {
    main.innerHTML = `<div class="loader">
    <img src='/assets/images/loading.gif'>
    </div>`
    const response = await fetch(
      `http://127.0.0.1:9000/getWords?name=${serachValue}`
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
  // console.log(data);
  if (typeof data === 'string') {
    errorMsg.innerHTML = 'No words found'
    wordCount.innerHTML = `<strong>Found 0 words with letters ${serachValue.split(
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

    if (exculdeValue) {
      let data = []
      filterData.map((item) => {
        let check = false
        for (let e = 0; e < exculdeValue.length; e++) {
          const element = exculdeValue[e]
          if (item.includes(element)) {
            check = true
            break
          } else {
            check = false
          }
        }
        if (check === false) {
          data.push(item)
        }
      })
      exculdeWith.classList.add('tick')
      exculdeWith.value = exculdeValue
      filterData = data
    }

    if (includeValue) {
      let data = []
      filterData.map((item) => {
        let check = false
        for (let e = 0; e < includeValue.length; e++) {
          const element = includeValue[e]
          if (!item.includes(element)) {
            check = true
            break
          } else {
            check = false
          }
        }
        if (check === false) {
          data.push(item)
        }
      })
      inculdeWith.classList.add('tick')
      inculdeWith.value = includeValue
      filterData = data
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

        var text1 = serachValue.replace('?', '')
        var text2 = item
        var text3 = item
        function findIndex(str, char) {
          const strLength = str.length
          const indexes = []
          let newStr = str
          while (newStr && newStr.indexOf(char) > -1) {
            indexes.push(newStr.indexOf(char) + strLength - newStr.length)
            newStr = newStr.substring(newStr.indexOf(char) + 1)
            newStr = newStr.substring(newStr.indexOf(char) + 1)
          }
          return indexes
        }
        let chars = text1.split('')
        let indexs = []
        chars.map((i) => {
          let findIndexes = findIndex(text3, i)
          if (findIndexes.length > 0) {
            text3 = text3.split('')
            text3[findIndexes] = '$'
            text3 = text3.join('')
            indexs = [...indexs, ...findIndexes]
          }
        })
        let itemHtml = ''
        text2.split('').map((itemValue, index) => {
          let check = indexs.find((i) => i === index)
          if (check !== undefined) {
            itemHtml += `${itemValue}`
          } else {
            itemHtml += `<span class='highlight'>${itemValue}</span>`
          }
        })
      
        
        return `<a class="anchor__style" title="Lookup ${item} in Dictionary" target="_blank" href="/word-meaning?search=${item}">
        <li>${itemHtml}
          <span class="points" value="${sum}" style="position:relative; top:4px; font-size:12px"> ${sum}</span>
            </li></a>`
      })

      // tab_container.innerHTML += `
      // <a href="#${itemLength}">
      // <input type="button" value="${itemLength} Letter" id="Tab${itemLength}" onclick="addFilter(${itemLength})"
      // class="tab_link">
      // </a>
      // `

      // let tabs = document.getElementsByClassName('tab_link')
      // tabs[0] ? tabs[0].classList.add('active-tab') : ''

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
  
    home_page_search_result.href = homePageSearchResult 
    home_page_search_result.innerHTML = `See words of any length with letters ${serachValue.split("")}`
    wordCount.innerHTML = `<strong>Found ${newWordsLength} words with letters with ${serachValue.split(
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
  filter_val[3].value = exculdeValue
  filter_val[4].value = includeValue
  filter_val[5].value = lengthValue

  for (var i = 0; i <= 4; i++) {
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
      var text1 = serachValue.replace('?', '')
        var text2 = item.words
        var text3 = item.words
        function findIndex(str, char) {
          const strLength = str.length
          const indexes = []
          let newStr = str
          while (newStr && newStr.indexOf(char) > -1) {
            indexes.push(newStr.indexOf(char) + strLength - newStr.length)
            newStr = newStr.substring(newStr.indexOf(char) + 1)
            newStr = newStr.substring(newStr.indexOf(char) + 1)
          }
          return indexes
        }
        let chars = text1.split('')
        let indexs = []
        chars.map((i) => {
          let findIndexes = findIndex(text3, i)
          if (findIndexes.length > 0) {
            text3 = text3.split('')
            text3[findIndexes] = '$'
            text3 = text3.join('')
            indexs = [...indexs, ...findIndexes]
          }
        })
        let itemHtml = ''
        text2.split('').map((itemValue, index) => {
          let check = indexs.find((i) => i === index)
          if (check !== undefined) {
            itemHtml += `${itemValue}`
          } else {
            itemHtml += `<span class='highlight'>${itemValue}</span>`
          }
        })
      return `<a class="anchor__style" title="Lookup ${item} in Dictionary" target="_blank" href="/word-meaning?search=${item.words}">
      <li>${itemHtml}
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

      var text1 = serachValue.replace('?', '')
      var text2 = item
      var text3 = item
      function findIndex(str, char) {
        const strLength = str.length
        const indexes = []
        let newStr = str
        while (newStr && newStr.indexOf(char) > -1) {
          indexes.push(newStr.indexOf(char) + strLength - newStr.length)
          newStr = newStr.substring(newStr.indexOf(char) + 1)
          newStr = newStr.substring(newStr.indexOf(char) + 1)
        }
        return indexes
      }
      let chars = text1.split('')
      let indexs = []
      chars.map((i) => {
        let findIndexes = findIndex(text3, i)
        if (findIndexes.length > 0) {
          text3 = text3.split('')
          text3[findIndexes] = '$'
          text3 = text3.join('')
          indexs = [...indexs, ...findIndexes]
        }
      })
      let itemHtml = ''
      text2.split('').map((itemValue, index) => {
        let check = indexs.find((i) => i === index)
        if (check !== undefined) {
          itemHtml += `${itemValue}`
        } else {
          itemHtml += `<span class='highlight'>${itemValue}</span>`
        }
      })
    
      return `<a class="anchor__style" title="Lookup ${item} in Dictionary" target="_blank" href="/word-meaning?search=${item}">
            <li>${itemHtml}
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

      var text1 = serachValue.replace('?', '')
      var text2 = item
      var text3 = item
      function findIndex(str, char) {
        const strLength = str.length
        const indexes = []
        let newStr = str
        while (newStr && newStr.indexOf(char) > -1) {
          indexes.push(newStr.indexOf(char) + strLength - newStr.length)
          newStr = newStr.substring(newStr.indexOf(char) + 1)
          newStr = newStr.substring(newStr.indexOf(char) + 1)
        }
        return indexes
      }
      let chars = text1.split('')
      let indexs = []
      chars.map((i) => {
        let findIndexes = findIndex(text3, i)
        if (findIndexes.length > 0) {
          text3 = text3.split('')
          text3[findIndexes] = '$'
          text3 = text3.join('')
          indexs = [...indexs, ...findIndexes]
        }
      })
      let itemHtml = ''
      text2.split('').map((itemValue, index) => {
        let check = indexs.find((i) => i === index)
        if (check !== undefined) {
          itemHtml += `${itemValue}`
        } else {
          itemHtml += `<span class='highlight'>${itemValue}</span>`
        }
      })
    
      return `<a class="anchor__style" title="Lookup ${item} in Dictionary" target="_blank" href="/word-meaning?search=${item}">
              <li>${itemHtml}
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
// const addFilter = () => {
//   let tabs = document.getElementsByClassName('tab_link')
//   tabs[0] ? tabs[0].classList.add('active-tab') : ''

//   Array.from(tabs).map((item) => {
//     item.classList.remove('active-tab')
//   })
//   main.innerHTML += ``
//   let activeLetter = event.target
//   // console.log(activeLetter)
//   activeLetter.classList.add('active-tab')
// }

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
