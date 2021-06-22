const axios = require('axios')
const scrabble = require('scrabble')

exports.handler = function (event, context, callback) {
  // your server-side functionality
  request_data = event['queryStringParameters']
  name = request_data['name']
  const data = scrabble(name)
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
