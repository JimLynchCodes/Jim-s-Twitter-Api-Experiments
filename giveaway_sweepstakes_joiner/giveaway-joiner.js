
const logger = require('./logger')
const initializeWithCreds = require('./twit-functions/initilize-with-creds')
const getNewestUnlikedMatchingTweet = require('./twit-functions/get-newest-unliked-matching-tweet')
const likeTweet = require('./twit-functions/like-tweet')
const retweetTweet = require('./twit-functions/retweet-tweet')
const followUser = require('./twit-functions/follow-user')

const KEYWORDS_FLAG = '--keywords'
const NO_LIKE_FLAG = '--no-like'
const NO_RETWEET_FLAG = '--no-retweet'
const NO_FOLLOW_FLAG = '--no-follow'

const joinGiveaway = () => {

    try {

        return new Promise(async resolve => {

            const args = process.argv.slice(2)

            const keywordsArg = getCommandLineKeywords(args)
            const noLikesArg = args.find(arg => arg.includes(NO_LIKE_FLAG))
            const noRetweetArg = args.find(arg => arg.includes(NO_RETWEET_FLAG))
            const noFollowArg = args.find(arg => arg.includes(NO_FOLLOW_FLAG))

            logger.info('Keywords arg: ' + keywordsArg)
            logger.info('"No Like" arg: ' + noLikesArg)
            logger.info('"No Retweet" arg: ' + noRetweetArg)
            logger.info('"No Follow" arg: ' + noFollowArg)

            logger.info('Initializing twitter...')

            const Twitter = initializeWithCreds()

            logger.info('Getting newest unliked matching tweet...')

            const tweet = await getNewestUnlikedMatchingTweet(Twitter, keywordsArg)

            const tweetId = tweet.id_str
            logger.info(`Fulltweet: ${JSON.stringify(tweet, null, 2)}`)

            const tweeterId = tweet.user.id_str
            logger.info(`User who tweeted id: https://twitter.com/intent/user?user_id=${tweeterId}`)
            logger.info(`https://twitter.com/_/status/${tweetId}`)

            
            setTimeout(async () => {

                if (noLikesArg)
                    logger.info('NOT liking!')

                else {
                    logger.info(`liking tweet: ${tweetId}`)
                    await likeTweet(Twitter, tweetId)
                }
                setTimeout(async () => {

                    if (noRetweetArg)
                        logger.info('NOT retweeting!')

                    else {
                        logger.info(`retweeting tweet: ${tweetId}`)
                        await retweetTweet(Twitter, tweetId)
                    }

                    setTimeout(async () => {


                        if (noFollowArg)
                            logger.info('NOT following!')

                        else {
                            logger.info(`following tweeter: ${tweeterId}`)
                            await followUser(Twitter, tweeterId)
                        }

                        resolve('success!')

                    }, 844)

                }, 751)

            }, 100)

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

const getCommandLineKeywords = (args) => {

    const keywordsArgFullString = args.find(arg => arg.includes(KEYWORDS_FLAG))

    return keywordsArgFullString &&
        keywordsArgFullString.substring(
            KEYWORDS_FLAG.length + 1,
            keywordsArgFullString.length)
}