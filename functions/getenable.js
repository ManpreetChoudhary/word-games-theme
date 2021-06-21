const enable = require('./Dictonary/enable.js')
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
