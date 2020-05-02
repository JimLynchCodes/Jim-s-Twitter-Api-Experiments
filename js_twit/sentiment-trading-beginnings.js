const twit = require('twit');
const config = require('./../config.js');

const Twitter = new twit(config);

const retweet = function () {
    const params = {
        // q: '#CoronavirusNewYork from:drjeffle OR jimlynchcodes %20%3A%28',  // REQUIRED
        // q: 'CoronavirusNewYork%20from:drjeffle%20%3A%29',  // REQUIRED
        // q: '%22happy%20hour%22%20%3A%28',  // REQUIRED
        
        // q: 'google from:jimlynchcodes %3A%29',  // REQUIRED
        q: ' google :) since:2020-3-22 from:jimlynchcodes',  // REQUIRED
        result_type: 'recent',
        lang: 'en',
        count: 100
    };
    // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('account/verify_credentials', function (err, data) {

        console.log('verify was: ');
        console.log(err);
        console.log(data);

        console.log('searching for tweets...');

        Twitter.get('search/tweets', params, function (err, data) {
            if (!err) {
                console.log(data.statuses.length + ' matching posts found.');
                const rand = Math.floor(Math.random() * data.statuses.length);
                console.log('rand was: ' + rand);


                // console.log(JSON.stringify(data.statuses[rand]));
                console.log(JSON.stringify(data.statuses[3]));


                // const retweetId = data.statuses[0].id_str;
                // console.log('post id was: ' + retweetId);

                // Twitter.post('favorites/create', {
                //     id: retweetId
                // }, function (err, response) {
                //     if (response) {
                //         console.log('Liked ' + retweetId + '!');
                //     }
                //     if (err) {
                //         console.log('Something went wrong while RETWEETING... Duplication maybe...');
                //         console.log(err);
                //     }
                // });
            }
            else {
                console.log('Something went wrong while SEARCHING...');
                console.log(err);
            }
        });
    });
};

retweet();