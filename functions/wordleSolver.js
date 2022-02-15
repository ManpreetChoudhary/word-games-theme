const allWords = require('./Dictonary/sowpods.js')
exports.handler = function (event, context, callback) {
  let body = JSON.parse(event.body)
  let greyLetters = body.greyLetters
  let yellowLetters = body.yellowLetters
  let greenLetters = body.greenLetters
  let greenWithIndex = body.greenWithIndex
  let existedLetters = [...yellowLetters, ...greenLetters]
  let data = []
  let letterLen = 5
  let dictionaryData = allWords.filter((item) => item.length == letterLen)
  data = dictionaryData
  let lettersWithoutGray = []
  dictionaryData.map((item) => {
    let check = false
    for (let index = 0; index < greyLetters.length; index++) {
      const element = greyLetters[index]
      if (item.includes(element)) {
        check = true
        break
      } else {
        check = false
      }
    }
    if (check === false) {
      lettersWithoutGray.push(item)
    }
  })

  let wordsMatched = []
  lettersWithoutGray.map((item) => {
    let check = false
    for (let index = 0; index < existedLetters.length; index++) {
      const element = existedLetters[index]
      if (item.includes(element)) {
        check = true
      } else {
        check = false
        break
      }
    }
    if (check === true) {
      wordsMatched.push(item)
    }
  })
  let result = []
  wordsMatched.map((item) => {
    let check = false
    for (let index = 0; index < greenWithIndex.length; index++) {
      const element = greenWithIndex[index]
      let findIndex = item.indexOf(element.value)
      if (findIndex == element.index) {
        check = true
      } else {
        check = false
        break
      }
    }
    if (check === true) {
      result.push(item)
    }
  })
  if(greyLetters[0]){
    data = lettersWithoutGray
  }
  if(yellowLetters[0])
  {
    data = wordsMatched
  }
  if(greenLetters[0])
  {
    data = result
  }
  const send = () => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: JSON.stringify(data),
    })
  }

  //   Make sure method is POST
  if (event.httpMethod == 'POST') {
    send()
  }
}
