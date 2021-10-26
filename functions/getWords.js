const axios = require('axios')
const scrabble = require('scrabble')
const twl06 = require('./Dictonary/twl06.js')

exports.handler = function (event, context, callback) {
  let dictionaryData = [...twl06]
  let data = []
  let request_data = event['queryStringParameters']
  let name = request_data['name']
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
          data.push(twl06[index])
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
