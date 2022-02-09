
const sowpods = require('./Dictonary/sowpods.js')
// console.log(sowpods)
exports.handler = function (event, context, callback) {
  // your server-side functionalit
  let body = JSON.parse(event.body)
  let value = body.value

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

  let obj = sowpods.find((item) => item === search)
  send(obj)
}
