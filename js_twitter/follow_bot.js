const twit = require('twit');
const config = require('./../config.js');

const Twitter = new twit(config);

const follow = function () {
    const params = {
        q: '#Clojurescript, #Clojure',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    };

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


                console.log(data.statuses[rand]);


                const followId = data.statuses[rand].user.id_str;
                console.log('user id was: ' + followId);

                Twitter.post('friendships/create', {
                    user_id: followId
                }, function (err, response) {
                    if (response) {
                        console.log('Followed! ' + followId + '!');
                    }
                    if (err) {
                        console.log('Something went wrong while LIKING... Duplication maybe...');
                        console.log(err);
                    }
                });
            }
            else {
                console.log('Something went wrong while SEARCHING...');
                console.log(err);
            }
        });
    });
};

follow();