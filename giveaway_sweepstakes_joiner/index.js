'use strict';

let favBot = require('./giveaway-fav-bot');

// module.exports.handler = (event, context, callback) => {

favBot.giveawayFavBot().then(function (msg) {
    console.log('fav bot resolved! ' + msg);

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: msg,
            input: event,
        }),
    };

    console.log('response was: ', response)


        // callback(null, response);

    // });
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
})