
// TODO Finish this
//


var favBot = require('./fav-bot');


favBot.beginFavBot().then( function (msg) {
   console.log('fav bot resolved! ' + msg);
});


// searchForTweets.then ( )_ => {
//
// }.then( () => {
//     pulllikedTweetsFromDb
//     - chooseTweetThatHasntBeenLiked
// }).then( () => {
//     likeTweet
//     retweet tweet
// })