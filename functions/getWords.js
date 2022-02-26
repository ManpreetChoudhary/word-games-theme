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


  let data = []
  if (name.includes('?')) {
    const searchWord = (wordToSearch) => {
      var blankTileCount = wordToSearch.split('').filter((i) => i === '?').length
      // wordToSearch = wordToSearch.replace(/\?$/, '')
      dictionaryData.map((word, index) => {
        var missedCounter = 0;
        var matchedCounter = 0;
        dicWord = word.split('')
        for (let i = 0; i < dicWord.length; i++) {
          if (wordToSearch.includes(dicWord[i])) {
            matchedCounter++;

            let newSet = wordToSearch.split("")
            newSet = [...new Set(newSet)]

            if (newSet.length + blankTileCount - 1 === wordToSearch.split("").length) {
              let re = new RegExp(`${dicWord[i]}`, 'g');
              let ds = word.replace(re, '$')
              word = ds
              dicWord = word.split('')
            }
          }
          else {
            missedCounter++;
          }
        }
        if (matchedCounter != 0) {
          if (missedCounter <= blankTileCount) {
            data.push(resultArr[index])
          }
        }
      })
      data = [...new Set(data)]
    }
    searchWord(name)
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
