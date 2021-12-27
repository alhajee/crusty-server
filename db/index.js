const mongoose = require('mongoose')

// use when starting application locally
let mongoUrlLocal = "mongodb://localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb";

// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = "crusty-db";

// callback on successful connection to mongodb
mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
});

// callback on error connecting to mongodb
mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});


mongoose
    .connect(`${mongoUrlLocal}/${databaseName}`, 
    {
        authSource: "admin",
        user: "admin",
        pass: "password",
        useNewUrlParser: false
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db