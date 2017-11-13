
var twit = require('twit');
var config = require('./../config.js');

var Twitter = new twit(config);

var retweet = function() {
    var params = {
        q: '#clojure, #clojurescript',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    console.log('running...');
    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors

        console.log(err);
        if (!err) {
            // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;

            console.log('retweet id was: ' + retweetId);
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

retweet();