
var favBot = require('./louie-liker');

favBot.beginFavBot().then( function (msg) {
   console.log('fav bot resolved! ' + msg);
});
