require("dotenv").config();
var moment = require('moment')
var request = require('request');
// var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require("fs");
// var spotify = new Spotify(keys.spotify);
//--------------------
var command = process.argv[2];

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

// App functionality due to user input
if(command === "my-tweets") {
	myTweets();
} else { // use case where command is given but not recognized
	console.log("Command not recognized! Please try again.")
};