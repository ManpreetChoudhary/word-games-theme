---
---
const getScript=document.currentScript
const letterLen = getScript.dataset.letter


const folderName=getScript.dataset.foldername
const fileName=getScript.dataset.filename
const jsonData={{site.data | jsonify }}
const newArr= jsonData[folderName][fileName]


let filterData
let errorMsg = document.querySelector('#errorMsg')
let Xletters = document.querySelector('.Xletters')

Xletters.innerHTML = `Highest scoring X letter words for scrabble containing letters ABC`

async function Scrabble() {
  try {
    newArr.map(async (val) => {
      const response = await fetch(
        `http://127.0.0.1:9000/getWords?name=${val.word}`
      )
      const data = await response.json()
      if (typeof data === 'string') {
        errorMsg.innerHTML = 'No words found'
        wordCount.innerHTML = `<strong> 0 words with letters ${serachValue.split(
          ''
        )}</strong>`
      } else {
       

    if (letterLen) {
      filterData = data.filter((item) => item.length == letterLen)
    }
  

        if (filterData.length === 0) {
          table.innerHTML += ''
          errorMsg.innerHTML = 'Table Not Found'
        } else {
          const result = filterData.map((item) => {
            let ScrabbleLetterScore = ScrabbleScore()
            sum = 0
            item = item.toLowerCase()
            for (let i = 0; i < item.length; i++) {
              sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
            }
            return `
            <tr>
            <td>${item}</td>
            <td>${sum}</td>
            </tr>
            `
          })

          let table = document.createElement('table')
          table.className = 'table table-bordered'
          table.style.margin = '30px 0'
          table.style.fontSize = '15px'
          
          let wordpointtables = document.querySelector('.wordpointtables')
          table.innerHTML += `<tbody><tr><th>Word</th><th>Points</th></tr></tbody>
          <tbody style="border:0;">
          ${result}
          </tbody>
          `
          wordpointtables.appendChild(table)
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}

Scrabble() // calling function

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

  return wwfScore
}

async function wordswithfriends() {
  try {
    newArr.map(async (val) => {
      const response = await fetch(
        `http://127.0.0.1:9000/getWords?name=${val.word}`
      )
      const data = await response.json()
      if (typeof data === 'string') {
        errorMsg.innerHTML = 'No words found'
        wordCount.innerHTML = `<strong> 0 words with letters ${serachValue.split(
          ''
        )}</strong>`
      } else {
      
    if (letterLen) {
      filterData = data.filter((item) => item.length == letterLen)
    }
  

        if (filterData.length === 0) {
          table.innerHTML += ''
          errorMsg.innerHTML = 'Table Not Found'
        } else {
          const result = filterData.map((item) => {
            let ScrabbleLetterScore = twl06_sowpods()
            sum = 0
            item = item.toLowerCase()
            for (let i = 0; i < item.length; i++) {
              sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
            }
            return `
            <tr>
            <td>${item}</td>
            <td>${sum}</td>
            </tr>
            `
          })

          let table = document.createElement('table')
          table.className = 'table table-bordered'
          table.style.margin = '30px 0'
          table.style.fontSize = '15px'
          let wordpointtables = document.querySelector('.wordpointtables')
          table.innerHTML += `<tr><th>Word</th><th>Points</th></tr></tbody>
          <tbody style="border:0;">
          ${result}
          `
          wordpointtables.appendChild(table)
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}

wordswithfriends() // calling function
// Scrabble Point Counts
const twl06_sowpods = () => {
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
