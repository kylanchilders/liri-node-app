const axios = require('axios');
require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

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
            console.log(URL)
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

if(command === "concert-this"){
    concertThis()
}else if(command === "movie-this"){
    movieThis()
}

