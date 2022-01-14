const dictionaryData = require('./Dictonary/scrabbleword.js')
exports.handler = function (event, context, callback) {
  let body = JSON.parse(event.body)
  let greyLetters = body.greyLetters.replace(/\s/g, '')
  let yellowLetters = body.yellowLetters
  let greenLetters = body.greenLetters

  let data = []
  let letterLen = 5
  let filterData = dictionaryData.filter((item) => item.length == letterLen)

  let wordValue = greyLetters.split('')

  filterData.map((item, index) => {
    for (let e = 0; e < wordValue.length; e++) {
      if (!item.includes(wordValue[e])) {
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
