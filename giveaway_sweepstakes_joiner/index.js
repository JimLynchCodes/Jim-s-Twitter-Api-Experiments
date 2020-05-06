'use strict';
const giveawayJoiner = require('./giveaway-joiner');
const logger = require('./logger')

logger.info('Starting the Giveaway Joiner index!');

const main = async () => {

    const result = await giveawayJoiner.joinGiveaway()

    logger.info('Giveaway Joiner has completed successfully!')

    const memUsage = process.memoryUsage()

    logger.info('mem used: ~ ' + (memUsage.rss / 1024 / 1024).toFixed(1), 1) + "Gb"

}

main().catch(err => {
    logger.error(err)
})
