// Change keys to Netlify env variables
var apiKey = 'c64d63d7e5bf5919cc9a6f78b340ce41',
    apiSecret = '1f179442b58e961fee8f7fa9156a3cc4',
    sailthru = require('sailthru-client').createSailthruClient(apiKey, apiSecret);

exports.handler = (event, context, callback) => {
  try {
    const data = JSON.parse(event.body);
    const sailthruData = {
      "vars": {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "showupdev": [],
        "source": "showup_submit"
      }
    }
    
    sailthru.getUserByKey(data.email, 'email', function (error, res) {
      // Check if user excists
      // Doesn't excist
      console.log(`Line 21: ${JSON.stringify(error)}`);
      if (error !== null) {
        sailthruData.vars.showupdev.push(data.showupdev);
        // Create new user
        sailthru.saveUserByKey(data.email, 'email', sailthruData, function(err, res){
          if(err){
            console.log(`saveUserByKey Error: ${JSON.stringify(err)}`);
            return
          }
          console.log(`saveUserByKey Sucess: ${JSON.stringify(res)}`);
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify(res)
          })
        });
      } else {
        // User does excist. Append new entry to showup var
        console.log(`Line 39: ${JSON.stringify(res)}`);
        // Check if showup excisst
        if (res.vars.showupdev !== undefined) {
          // Does excist 
          sailthruData.vars.showupdev = res.vars.showupdev;
          sailthruData.vars.showupdev.push(data.showupdev);
        } else {
          // Doesn't excist, add data
          sailthruData.vars.showupdev.push(data.showupdev);
        }
        // Update user with new submission
        sailthru.saveUserByKey(data.email, 'email', sailthruData, function(err, res){
          if(err){
            return callback(null, {
              statusCode: 200,
              body: err
            })
          }
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify(res)
          })
        })
      }
    })
  } catch (error) {
    return { statusCode: 500, body: err.toString() }
  }
}
