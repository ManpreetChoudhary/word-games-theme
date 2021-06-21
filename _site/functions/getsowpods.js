const sowpods = require('./Dictonary/sowpods.js')
// console.log(sowpods)
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

  let obj = sowpods.find((item) => item === search)
  send(obj)
}
