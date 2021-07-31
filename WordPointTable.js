const fetch = require('node-fetch')
const fs = require('fs')

const wordsList = fs.readFileSync('./_data/WordPointTable/words.json', {
  encoding: 'utf8',
  flag: 'r',
})
const parseData = JSON.parse(wordsList)

const tableJson = []
async function WordPointTable() {
  try {
    parseData.map(async (val) => {
      const response = await fetch(
        `http://127.0.0.1:9000/getWords?name=${val.word}`
      )
      const data = await response.json()
      if (typeof data === 'string') {
        console.log('no words found')
      } else {
        if (val.word) {
          filterData = data.filter((item) => item.length == val.x)
        }
        if (filterData.length === 0) {
          console.log('Table Not Found')
        } else {
          let ScrabbleLetterScore
          let arr = []
          let points = []
          let x = []
          const result = filterData.map((item) => {
            if (val.gameName === 'scrabble') {
              ScrabbleLetterScore = twl06_sowpods()
            } else {
              ScrabbleLetterScore = wwfScore()
            }
            sum = 0
            item = item.toLowerCase()
            for (let i = 0; i < item.length; i++) {
              sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
            }
            arr.push(item)
            points.push(sum)
            x.push(val.x)
          })

          const wordsTable = {
            word: arr,
            points: points,
            x: x,
          }
          tableJson.push(wordsTable)
          fs.writeFileSync(
            './_data/WordPointTable/data.json',
            `${JSON.stringify(tableJson)}`
          )
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}
WordPointTable()

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
const wwfScore = () => {
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
