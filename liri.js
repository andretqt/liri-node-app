require("dotenv").config();
var request = require('request');
var Twitter = require('twitter');
// var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require("fs");
// var spotify = new Spotify(keys.spotify);

//--------------------
var command = process.argv[2];


var myTweets = function() {
    var client = new Twitter({
        consumer_key: keys.consumer_key,
		consumer_secret: keys.consumer_secret,
		access_token_key: keys.access_token_key,
		access_token_secret: keys.access_token_secret
    });
  
    client.get('https://api.twitter.com/1.1/lists/statuses.json?slug=teams&owner_screen_name=andretqt&count=1', function(error, tweets, response) {
        console.log(response);
		if(error) { // if there IS an error
			console.log('Error occurred: ' + error);
		} else { // if there is NO error
	  	console.log("My 20 Most Recent Tweets");
	  	console.log("");
	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + tweets[i].text);
	  		console.log("Created:  " + tweets[i].created_at);
	  		console.log("");
	  	}
	  }
	});
};
if(command === "my-tweets") {
    myTweets();
};
console.log(keys.twitter);
