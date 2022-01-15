const allWords = require('./Dictonary/scrabbleword.js')
exports.handler = function (event, context, callback) {
  let body = JSON.parse(event.body)
  let greyLetters = body.greyLetters
  let yellowLetters = body.yellowLetters
  let greenLetters = body.greenLetters

  let data = []
  let letterLen = 5
  let dictionaryData = allWords.filter((item) => item.length == letterLen)

  dictionaryData.map((item, index) => {
    for (let e = 0; e < greyLetters.length; e++) {
      if (!item.includes(greyLetters[e])) {
        data.push(item)
      }
    }
  })

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
