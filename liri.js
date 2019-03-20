require("dotenv").config();

const axios = require("axios");

const keys = require("./keys.js");

// const spotify = new Spotify(keys.spotify);

let bandsInTownURL = "https://rest.bandsintown.com/artists/" + "muse" + "/events?app_id=codingbootcamp";

axios.get(bandsInTownURL).then(function (response) {

    var bands = response.data[2];

    // console.log(bands);

    console.log(bands.venue.name);

    console.log(bands.venue.city);

    console.log(bands.datetime);

    // console.log(bit.venue.city);

    // console.log(bit.datetime);





});

// Name of the venue


// Venue location


// Date of the Event (use moment to format this as "MM/DD/YYYY")