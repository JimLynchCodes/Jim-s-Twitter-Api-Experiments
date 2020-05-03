var config = require('./../config.js');

const getNewestUnlikedMatchingTweet = (Twitter) => {

    return new Promise((resolve, reject) => {

        const params = {
            q: config.keywords + ' -filter:retweets',  // REQUIRED
            result_type: 'recent',
            lang: 'en',
            count: 100,
            include_entities: false

        }
        // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

        console.log('searching for: ', params.q)

        Twitter.get('search/tweets', params, (err, data) => {

            if (err)
                reject(err)

            console.log('statuses found: ', data.statuses.length)

            const notAlreadyLikedStatuses = data.statuses.filter(tweet => {
                return !tweet.favorited
            })

            console.log('After filtering out already liked tweets: ', notAlreadyLikedStatuses.length)

            const randIndex = Math.floor(Math.random() * notAlreadyLikedStatuses.length)

            console.log('Randomly chose tweet at index: ', randIndex)

            const chosenTweet = notAlreadyLikedStatuses[randIndex]
            console.log('Chose a tweet: ', chosenTweet)

            resolve(chosenTweet);

            // console.log('retweet id was: ' + retweetId);
            // Tell TWITTER to retweet
            // Twitter.post('statuses/retweet/:id', {
            //     id: retweetId
            // }, function (err, response) {
            //     if (response) {
            //         console.log('Retweeted!!!');
            //     }
            //     // if there was an error while tweeting
            //     if (err) {
            //         console.log('Something went wrong while RETWEETING... Duplication maybe...', err);
            //     }
            // });
            //     }
        })
        // if unable to Search a tweet
        //             else {
        //     console.log('Something went wrong while SEARCHING...');
        // }
        //         });
    })
}

module.exports = getNewestUnlikedMatchingTweet

// })
    // retweet();
