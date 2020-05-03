
const retweetTweet = (Twitter, tweetId) => {

    return new Promise((resolve, reject) => {

        console.log('Retweeting tweet!', tweetId)

        Twitter.post('statuses/retweet/:id', {
            id: tweetId
        }, (err, response) => {
            if (err) {
                console.log(' Error retweeting: ' , err) 
                reject(err)
            }
                console.log('Retweeted tweet!');
                resolve(response)
        })
        
    })
}

module.exports = retweetTweet