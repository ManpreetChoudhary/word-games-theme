const twl06 = require('./Dictonary/twl06.js')

exports.handler = function (event, context, callback) {
  request_data = event['queryStringParameters']
  let search = request_data['search']
  // your server-side functionality

  const send = (body) => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: JSON.stringify(body),
    })
  }

  let obj = twl06.find((item) => item === search)
  send(obj)
}
