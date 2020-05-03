
const logger = require('./logger')
const initializeWithCreds = require('./twit-functions/initilize-with-creds')
const getNewestUnlikedMatchingTweet = require('./twit-functions/get-newest-unliked-matching-tweet')
const likeTweet = require('./twit-functions/like-tweet')
const retweetTweet = require('./twit-functions/retweet-tweet')
const followUser = require('./twit-functions/follow-user')

const joinGiveaway = () => {

    try {

        return new Promise(async resolve => {

            logger.info('Initializing twitter...')

            const Twitter = initializeWithCreds()

            logger.info('getting newest unliked matching tweet...')

            const tweet = await getNewestUnlikedMatchingTweet(Twitter)

            console.log('tweet is: ', tweet)
            console.log('tweet is: ', tweet.id_str)

            const tweetId = tweet.id_str
            console.log('Captured tweet id: ', tweetId)

            const tweeterId = tweet.user.id_str
            logger.info(`User who tweeted id: ${tweeterId}`)

            setTimeout(async () => {
                logger.info(`liking tweet: ${tweetId}`)

                const liked = await likeTweet(Twitter, tweetId)

                logger.info('tweet liked!')

                setTimeout(async () => {

                    logger.info(`retweeting tweet: ${tweetId}`)

                    const retweeted = await retweetTweet(Twitter, tweetId)

                    setTimeout(async () => {

                        logger.info(`following tweeter: ${tweeterId}`)
                        const followed = await followUser(Twitter, tweeterId)

                    }, 844)

                }, 751)

            }, 100)

            console.log('down here')
            resolve('success!')

        }).catch(err => {
            return Promise.reject(err)
        })
    }
    catch (err) {
        return Promise.reject(err)
    }

}

module.exports = {
    joinGiveaway
}