
var favBot = require('./fav-bot');

favBot.beginFavBot().then( function (msg) {
   console.log('fav bot resolved! ' + msg);
});
