const twit = require('twit');
const config = require('./config.js');

console.log('config is: ', config.creds)

const Twitter = new twit(config.creds);
let i = 0;
let  statuses = [];
const likeFails = [];

module.exports.giveawayFavBot = function () {
    
    return new Promise(function (resolve, reject) {
        
        giveawayFavBot(resolve);
        
    });
    
};


giveawayFavBot = function (resolve) {
    
    console.log('config keywords: ', config.keywords)
    const keywords = config.keywords
    console.log('queryL ', typeof keywords);
    var query = keywords.join(" OR ");
    console.log('queryL ' + query);
    console.log('queryL ' + keywords[0]);
    
    const params = {
        q: query,
        result_type: 'recent',
        lang: 'en',
        count: 100
    };

    console.log('searching for tweets about ', query);

    Twitter.get('search/tweets', params, function (err, data) {
        const tweet = data.statuses;
        statuses = data.statuses;

        console.log('statuses: ', statuses)
        console.log('# of statuses: ', statuses.length)

        // if (data.statuses[i].favorited === false) {
        //     console.log('about to tweet this: ' + data.statuses[i].id_str);
        //     likeTweetUntilSuccess(data.statuses[i].id_str, resolve);

        // }
    });
};


likeTweetUntilSuccess = function (tweetId, resolve) {
    console.log('trying to like tweet: ' + tweetId);
    Twitter.post('favorites/create', {id: tweetId}, function (err, response) {
        if (err) {
            console.log('OMG mang! Error liking the tweet!');
            console.log(err);

            likeFails.push(tweetId);
            i++;

            if (i < statuses.length) {
                likeTweetUntilSuccess(statuses[i].id_str, resolve);
            } else {
                console.log('tried ' + statuses.length + ' tweets... ' + i);
                resolve('Aww man, no new unliked status about ' + config.hastags + '')
            }

        }
        else {
            console.log(response);
            console.log('Like failures: ', likeFails.length);
            console.log('Success!!! Favorited ' + tweetId);
            attemptToRetweet(tweetId, resolve);
        }
    });
};


attemptToRetweet = function (tweetId, resolve) {
    Twitter.post('statuses/retweet/:id', {
        id: tweetId
    }, function (err, response) {
        if (response) {
            console.log('Retweeted!!!');


            resolve("Retweet worked!");
        }
        if (err) {
            console.log('Something went wrong while RETWEETING... Duplication maybe...');
            resolve("Retweet did not work, uh oh baby!");
        }
    });
};

