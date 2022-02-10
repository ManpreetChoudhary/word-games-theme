const axios = require('axios')
const scrabble = require('scrabble')
const twl06 = require('./Dictonary/twl06.js')
const sowpods = require('./Dictonary/sowpods.js')
const words = require('./Dictonary/scrabbleword.js')
const enable = require('./Dictonary/enable.js')
exports.handler = function (event, context, callback) {
  let resultArr = []
  let request_data = event['queryStringParameters']
  let name = request_data['name']
  let selectedDictionary = request_data['selecteddictionary']
  let dictionaryData = []
  if (selectedDictionary === 'Dictionary') {
    dictionaryData = [...words]
    resultArr = words
  } else if (selectedDictionary === 'sowpods') {
    dictionaryData = [...sowpods]
    resultArr = sowpods
  } else if (selectedDictionary === 'twl06') {
    dictionaryData = [...twl06]
    resultArr = twl06
  } else {
    dictionaryData = [...enable]
    resultArr = enable
  }
 
  let newdata = resultArr.filter((item) =>
        item.startsWith(name.toLowerCase())
    )
  const send = (body) => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: JSON.stringify(newdata),
    })
  }
  //   Perform APi Call
  const wordsStartingWith = () => {
    axios
      .get()
      .then((res) => send(res.data))
      .catch((err) => send(err))
  }

  //   Make sure method is GET
  if (event.httpMethod == 'GET') {
    wordsStartingWith()
  }
}
