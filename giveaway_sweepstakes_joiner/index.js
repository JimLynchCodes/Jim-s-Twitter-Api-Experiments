'use strict';
const giveawayJoiner = require('./giveaway-joiner');
const logger = require('./logger')

logger.info('Starting the Giveaway Joiner index!');

const main = async () => {

    const result = await giveawayJoiner.joinGiveaway()

    logger.info('Giveaway Joiner has completed successfully!');
}

main().catch(err => {
    logger.error(err)
})


    // console.log('response was: ', response)


    // callback(null, response);

    // });
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// })