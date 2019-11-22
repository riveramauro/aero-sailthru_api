// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
var apiKey = 'c64d63d7e5bf5919cc9a6f78b340ce41',
    apiSecret = '1f179442b58e961fee8f7fa9156a3cc4',
    sailthru = require('sailthru-client').createSailthruClient(apiKey, apiSecret);

exports.handler = (event, context, callback) => {
  const email = event.queryStringParameters.email;
  try {
    sailthru.getUserByKey(email, 'email', function (error, res) {
      if (error) {
        console.log(error);
        return callback(null, {
          statusCode: error.statusCode,
          body: JSON.stringify(error)
        })
      }
      console.log(res)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
  } catch (error) {
    return { statusCode: 500, body: err.toString() }
  }
}
