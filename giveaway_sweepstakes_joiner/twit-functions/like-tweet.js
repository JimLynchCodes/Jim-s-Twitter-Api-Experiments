const like = (Twitter, tweetId) => {

    return new Promise((resolve, reject) => {

        Twitter.post('favorites/create', {
            id: tweetId
        }, (err, response) => {

            if (err) {
                console.log('Something went wrong while LIKING... ', err)
                reject(err)
            }

            console.log('Liked ' + tweetId + '!')
            resolve(response)
        });

    })
}

module.exports = like