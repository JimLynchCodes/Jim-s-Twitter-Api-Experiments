'use strict';
const joinGiveaway = require('./giveaway-joiner');
const logger = require('./logger')

const main = async () => {

    const quietFlag = process.argv.slice(2).find(arg => arg.includes('--quiet'))

    console.log('quiet flag: ' + quietFlag)
    if (quietFlag) {
        logger.info('Starting in quiet mode...')
        logger.pause()
    }

    else
        logger.info('Starting Twitter Engager!')

    const result = await joinGiveaway()


    logger.info('Twitter Engager has completed successfully!')

    const memUsage = process.memoryUsage()

    logger.info('mem used: ~ ' + (memUsage.rss / 1024 / 1024).toFixed(1), 1) + "Gb"

}

main().catch(err => {
    logger.error('Any errors: ' + err)
})
