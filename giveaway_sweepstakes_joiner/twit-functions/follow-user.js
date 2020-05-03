
const followUser = (Twitter, userId) => {

    return new Promise((resolve, reject) => {

        console.log('Following user!', userId)

        Twitter.post('friendships/create', {
            user_id: userId
        }, (err, response) => {
            if (err) {
                console.log(' Error following user: ' , err) 
                reject(err)
            }

                console.log('Followed! User!');

                resolve(response)
        });
    })
}

module.exports = followUser