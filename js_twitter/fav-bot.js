
const twit = require('twit');
const config = require('./../config.js');

const Twitter = new twit(config);

const favoriteTweet = function(){
    const params = {
        q: '#emacs',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }


    console.log('[searching tweetes...');
    Twitter.get('search/tweets', params, function(err,data){
        const tweet = data.statuses;


        console.log('Found ' + data.statuses.length + ' matching statuses');
        // Like the first unfavorited tweet.

        let i = 0;
        while (i < data.statuses.length) {


                console.log('looping: ' + i);
            console.log(data.statuses[i]);
            console.log(data.statuses[i].favorited);

            if (data.statuses[i].favorited === false) {

                let id = data.statuses[i].id_str;
                // Twitter.post('favorites/create', {id: data.statuses[i].id_str}, function(err, response){
                //     if(err){
                //         console.log('Favorite Error!');
                //         console.log(err);
                //     }
                //     else{
                //         console.log(response);
                //         console.log('FAVORITED... Success!!! ' + id);
                //         i = data.statuses.length;
                //     }
                // });





                // let id = data.statuses[i].id_str;
                Twitter.post('retweet_count/favorite_count', {id: data.statuses[i].id_str}, function(err, response){
                    if(err){
                        console.log('Favorite Error!');
                        console.log(err);
                    }
                    else{
                        console.log(response);
                        console.log('FAVORITED... Success!!! ' + id);
                        i = data.statuses.length;
                    }
                });


            //
            // }




                if (i === 0) {
                    i = data.statuses.length;

                }
            }

            i++;
        }


        if(typeof randomTweet != 'undefined'){

            console.log(randomTweet);


        }
    });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
};