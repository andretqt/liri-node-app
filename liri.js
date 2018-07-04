require("dotenv").config();
var fs = require("fs");
var moment = require('moment')
var keys = require('./keys.js');
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
                var tweetRes = `#${i}. '${tweetElement.text}' tweeted on ${newDate}`;
                console.log(tweetRes);
                fs.appendFile('log.txt', `${tweetRes}\n`, function (error) {
                    if (error) throw error;
                });
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
        song = 'The Sign';
    }
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    var bestResult = data.tracks.items[0]; 
    var artist = bestResult.artists[0].name;
    var title = bestResult.name;
    var album = bestResult.album.name;
    var link = bestResult.external_urls.spotify;
    var spotifyRes = `Artist: ${artist}\nSong Title: ${title}\nAppears on: ${album}\nListen: ${link}`;
    console.log(spotifyRes);
    fs.appendFile('log.txt', `${spotifyRes}\n`, function (err) {
        if (err) throw err;
      });
    });
}
var movieThis = function(movie) {
    var bodyParser = require('body-parser');
    var request = require('request');
    if (movie === undefined) {
        movie = 'Mr. Nobody';
    }
    request('http://www.omdbapi.com/?apikey=trilogy&t='+ movie, function(error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
        };
        var parsedResponse = JSON.parse(body);
        var movieRes = `Title: ${parsedResponse.Title}\nRelease Year: ${parsedResponse.Year}\nIMDB Rating: ${parsedResponse.imdbRating}\nRottenTomatoes Rating: ${parsedResponse.Ratings[1].Value}\nCountry Of Production: ${parsedResponse.Country}\nLanguage: ${parsedResponse.Language}\nPlot: ${parsedResponse.Plot}\nCast: ${parsedResponse.Actors}`;
        console.log(movieRes);
        fs.appendFile('log.txt', `${movieRes}\n`, function(err) {
            if (err) throw err;
        });
    });
}
var doIt = function() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            return console.log('Error Occurred: ' + error);
        }
        var arrayData = data.split(',')
        commandFile = arrayData[0];
        queryFile = arrayData[1];
        if (commandFile === 'spotify-this-song') {
            spotifyThisSong(queryFile);
        }
        else if (commandFile === 'movie-this') {
            movieThis(query);
        }
        else if (commandFile === 'my-tweets') {
            myTweets();
        }
        else {
            console.log('Commmand from file is not valid.');
        }
    });

}
// App functionality due to user input
if(command === "my-tweets") {
	myTweets();
}
else if (command === 'spotify-this-song') {
    spotifyThisSong(query);
}
else if (command == 'movie-this') {
    movieThis(query);
}
else if (command === 'do-what-it-says') {
    doIt();
}
else if(command === undefined) { // use case where no command is given
    console.log("Please enter a command to run LIRI.")
}
else { // use case where command is given but not recognized
	console.log("Command not recognized! Please try again.")
};