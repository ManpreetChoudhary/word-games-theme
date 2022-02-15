/*const axios = require('axios')
const scrabble = require('./Dictonary/es-dict')
// const twl06 = require('./Dictonary/twl06.js')
// const sowpods = require('./Dictonary/sowpods.js')
// const words = require('./Dictonary/scrabbleword.js')
// const enable = require('./Dictonary/enable.js')
exports.handler = function (event, context, callback) {
  let resultArr = []
  let request_data = event['queryStringParameters']
  let name = request_data['name']

  // let selectedDictionary = request_data['selecteddictionary']
  let dictionaryData = scrabble.sW;
  resultArr = scrabble.sW;
  // if (selectedDictionary === 'Dictionary') {
  //   dictionaryData = [...words]
  //   resultArr = words
  // } else if (selectedDictionary === 'sowpods') {
  //   dictionaryData = [...sowpods]
  //   resultArr = sowpods
  // } else if (selectedDictionary === 'twl06') {
  //   dictionaryData = [...twl06]
  //   resultArr = twl06
  // } else {
  //   dictionaryData = [...enable]
  //   resultArr = enable
  // }

  let data = []
  if (name.includes('?')) {
    const searchWord = (word) => {
      let wordValue = word.split('')
      dictionaryData.map((i, index) => {
        let check = true
        for (let k = 0; k < wordValue.length; k++) {
          if (i.includes(wordValue[k])) {
            check = true
            dictionaryData[index] = i.split('')
            let findIndex = i.indexOf(wordValue[k])
            dictionaryData[index][findIndex] = '$'
            dictionaryData[index] = dictionaryData[index].join('')
            i = dictionaryData[index]
          } else {
            check = false
            break
          }
        }
        if (check === true) {
          data.push(resultArr[index])
        }
      })
    }
    searchWord(name.replace(/\?/g, ''))
    data = [...new Set(data)]
  } else {
    data = scrabble(name)
  }
  const send = (body) => {
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
  //   Perform APi Call
  const getWords = () => {
    axios
      .get()
      .then((res) => send(res.data))
      .catch((err) => send(err))
  }

  //   Make sure method is GET
  if (event.httpMethod == 'GET') {
    getWords()
  }
}
*/