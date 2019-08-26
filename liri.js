const axios = require('axios');
var fs = require("fs");
require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "76feb939624d4a0fbddca0f8d2292d73",
  secret: "c4191599c2d547229bd8d9396ba15187"
});

var command = process.argv[2];
var input = process.argv[3];

function concertThis(){
    var URL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    axios.get(URL).then(
        function(response){
            console.log("<><><><><><><><><><>")
            console.log("Artist: " + input);
            console.log("<><><><><><><><><><>")
            for(i = 0; i < response.data.length; i++){
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[0].venue.country);
                console.log("Event Date: " + response.data[i].datetime);
                console.log("--------------------");
            }
        }
    )
};

function movieThis(){
    if(input == null){
        var URL = "http://www.omdbapi.com/?t=Mr Robot&y=&plot=short&tomatoes=True&apikey=trilogy"
    }else{
        var URL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&tomatoes=True&apikey=trilogy"
    }
    axios.get(URL).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    )
}

function spotifyThis(){
    if(input == null){
        input = "The Sign Ace of Base"
    };
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
      console.log("Album Name: " + data.tracks.items[0].album.name);
      });
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        var dataArr = data.split(",");

        var command = dataArr[0];

        if(command === "concert-this"){
            input = dataArr[1];
            concertThis()
        }else if(command === "movie-this"){
            input = dataArr[1];
            movieThis()
        }else if(command === "spotify-this-song"){
            input = dataArr[1];
            spotifyThis()
        }

      
      });
}

if(command === "concert-this"){
    concertThis()
}else if(command === "movie-this"){
    movieThis()
}else if(command === "spotify-this-song"){
    spotifyThis()
}else if(command === "do-what-it-says"){
    doWhatItSays()
}

