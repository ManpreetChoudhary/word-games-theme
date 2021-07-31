const fs = require('fs')
const scrabble = require('scrabble')
const filePaths = [
  'two_letter_word_finder.json',
  'three_letter_word_finder.json',
  'four_letter_word_finder.json',
  'five_letter_word_finder.json',
  'six_letter_word_finder.json',
  'seven_letter_word_finder.json',
  'eight_letter_word_finder.json',
  'nine_letter_word_finder.json',
  'ten_letter_word_finder.json',
  'eleven_letter_word_finder.json',
  'twelve_letter_word_finder.json',
  'thirteen_letter_word_finder.json',
]
const files = []
const wordsData = []
filePaths.map((file) => {
  const data = fs.readFileSync(`./_data/wordgames/en/${file}`, {
    encoding: 'utf8',
    flag: 'r',
  })
  const filesData = JSON.parse(data)
  filesData.filepath = file
  files.push(JSON.stringify(filesData))
})
files.map((item) => {
  const data = JSON.parse(item)
  data.filewords.name = data.filepath
  wordsData.push(data.filewords)
})

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

const wordsResults = []
let filterData
wordsData.map((i) => {
  name = i.name
  i.data.map((t) => {
    const data = scrabble(t.word.toLowerCase())
    if (typeof data === 'string') {
      console.log('no words found')
    } else {
      if (t.word) {
        filterData = data.filter((r) => r.length == t.word.length)
      }
      if (filterData.length === 0) {
        // console.log('Table Not Found')
      } else {
        let ScrabbleLetterScore
        const result = filterData.map((item) => {
          if (t.gameName == 'scrabble') {
            ScrabbleLetterScore = twl06_sowpods()
          } else {
            ScrabbleLetterScore = wwfScore()
          }
          sum = 0
          item = item.toLowerCase()
          for (let i = 0; i < item.length; i++) {
            sum += ScrabbleLetterScore[item[i]] || 0 // for unknown characters
          }
          let wordsTable = {
            filename: name,
            websitename: t.websitename,
            word: item,
            points: sum,
            x: t.word.length,
            gameName: t.gameName,
          }
          return wordsTable
        })
        wordsResults.push(result)
        // console.log(wordsResults)
        fs.writeFileSync('./_data/test.json', `${JSON.stringify(wordsResults)}`)
      }
    }
  })
})
