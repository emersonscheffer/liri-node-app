require("dotenv").config();

let axios = require("axios");

let fs = require('fs');

let moment = require('moment');

let keys = require('./keys.js');

let Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);


let command = process.argv[2];
let requesting = process.argv.slice(3).join(" ");

let key = command;

let concertThis = function () {

    if (requesting === "") {
        requesting = "Drake";
    }

    let bandsInTownURL = "https://rest.bandsintown.com/artists/" + requesting + "/events?app_id=codingbootcamp";

    axios.get(bandsInTownURL).then(function (response) {

        var bands = response.data[0];

        let bandsData = [
            "=====================================" + "\n",

            "Name: " + bands.lineup,

            "Venue: " + bands.venue.name,

            "City : " + bands.venue.city,

            "Date: " + moment(bands.datetime).format("dddd, MMMM Do YYYY, h:mm a") + "\n",

            "=====================================" + "\n"

        ].join("\n\n");

        console.log(bandsData);
        logging(bandsData);

    });
}

let spotifyThis = function () {
    if (requesting === "") {
        requesting = "The Sign Ace of Base";
    }

    spotify.search({
        type: 'track',
        query: requesting
    }).then(function (response) {

        var tracks = response.tracks.items[0];

        let tracksData = [
            "=====================================" + "\n",

            "Artist: " + tracks.artists[0].name,

            "Song: " + tracks.name,

            "Preview Link: " + tracks.preview_url,

            "Album: " + tracks.album.name + "\n",

            "=====================================" + "\n",

        ].join("\n\n");

        console.log(tracksData);
        logging(tracksData);

    });

}

let movieThis = function () {
    if (requesting === "") {
        requesting = "Mr. Nobody";
    }

    let moviesUrl = "http://www.omdbapi.com/?t=" + requesting + "&y=&plot=short&apikey=trilogy";


    axios.get(moviesUrl).then(function (response) {

        var movies = response.data;

        var movieData = [
            "=====================================" + "\n",
            "Title: " + movies.Title,
            "Year: " + movies.Year,
            "Rating: " + movies.imdbRating,
            "Rotten Tomatoes: " + movies.Ratings[1].Value,
            "Country: " + movies.Country,
            "Language: " + movies.Language,
            "Plot: " + movies.Plot,
            "Actors: " + movies.Actors + "\n",
            "=====================================" + "\n"
        ].join("\n\n");

        console.log(movieData);
        logging(movieData);
    });
}

function logging(content) {
    fs.appendFile('./log.txt', content, "utf8", function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Search Logged");
        }
    });
}


switch (key) {
    case "concert-this":

        concertThis();

        break;

    case "spotify-this-song":

        spotifyThis();

        break;
    case "movie-this":

        movieThis();

        break;
    case "do-what-it-says":

        fs.readFile('./random.txt', "utf8", function read(err, data) {
            if (err) {
                throw err;
            }
            var dataArr = data.split(",");

            command = dataArr[0];
            requesting = dataArr[1];

            switch (command) {
                case "movie-this":

                movieThis();
                    break;
                    case "concert-this":

                concertThis();
                    break;
                    case "spotify-this-song":

                spotifyThis();
                    break;
            
                default:
                    break;
            }

        });

        break;

    default:
        console.log("\n" + "type one of the commands after 'node liri.js' : " + "\n" +
            "concert-this" + "\n" +
            "spotify-this-song" + "\n" +
            "movie-this" + "\n" +
            "do-what-it-says" + "\n"
        );

        break;
}