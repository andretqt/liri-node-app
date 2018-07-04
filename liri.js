require("dotenv").config();
var moment = require('moment')
var request = require('request');
var keys = require('./keys.js');
var fs = require("fs");
//--------------------
var command = process.argv[2];
var query = process.argv.slice(3);

//defining our functions
var myTweets = function () {
    let tweetArray = [];
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);
    var params = {
		screen_name: 'andretqt',
		count: 20
    };
    var i = params.count;
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) { // if there IS an error
			console.log('Error occured: ' + error);
        } else { // if there is NO error
            console.log(`My last ${params.count} tweets:`)
            tweets.forEach(tweetElement => {
                var tweetDate = tweetElement.created_at;
                var newDate = moment(tweetDate, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
                tweetArray.push([tweetElement.text, newDate]);
                console.log(`#${i}. '${tweetElement.text}' tweeted on ${newDate}`);
                i--;
            });
	  	}
	  }
	);
}
var spotifyThisSong = function(song) {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    if (song === undefined) {
        spotifyThisSong('The Sign')
    } else {
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        var bestResult = data.tracks.items[0]; 
        var artist = bestResult.artists[0].name;
        var title = bestResult.name;
        var album = bestResult.album.name;
        var link = bestResult.external_urls.spotify;
        console.log(`Artist: ${artist}\nSong Title: ${title}\nAppears on: ${album}\nListen: ${link}`);
        });
    };
}
// App functionality due to user input
if(command === "my-tweets") {
	myTweets();
} else if (command === 'spotify-this-song' ) {
    spotifyThisSong(query);
}
else { // use case where command is given but not recognized
	console.log("Command not recognized! Please try again.")
};