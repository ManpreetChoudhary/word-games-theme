const enable = require('./Dictonary/enable.js')

// const scrabble = require('scrabble')

let userWordLength = 6
let userword = 'python'
let obj = enable.filter((item) => item.length == userWordLength)

obj.map((item) => {
  let tr = scrabble(item)
  if (item.includes(tr)) {
    console.log(item)
  }
})

// ob((elem) => {
//   if (obj.indexOf(userword) > -1) {
//     console.log(elem)
//   }
// })

exports.handler = function (event, context, callback) {
  // your server-side functionalit
  request_data = event['queryStringParameters']
  let search = request_data['search']

  const send = (body) => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: JSON.stringify(obj),
    })
  }
  let obj = enable.find((item) => item === search)
  send(obj)
}
