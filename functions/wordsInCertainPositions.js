const allWords = require('./Dictonary/sowpods.js')
exports.handler = function (event, context, callback) {
  let body = JSON.parse(event.body)
  let lettersWithIndex = body.greenWithIndex
  let result = []
  allWords.map((item) => {
    let check = false
    for (let index = 0; index < lettersWithIndex.length; index++) {
      const element = lettersWithIndex[index]
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
