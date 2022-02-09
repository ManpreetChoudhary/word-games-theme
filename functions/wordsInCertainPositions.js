const allWords = require('./Dictonary/scrabbleword.js')
exports.handler = function (event, context, callback) {
  let body = JSON.parse(event.body)


  let greenWithIndex = body.greenWithIndex
  // let letterLen = body.wordLength

  // let dictionaryData = allWords.filter((item) => item.length == 9)


  let result = []
  allWords.map((item) => {
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
  // wordsMatched

  const send = () => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: JSON.stringify(result),
    })
  }

  //   Make sure method is POST
  if (event.httpMethod == 'POST') {
    send()
  }
}
