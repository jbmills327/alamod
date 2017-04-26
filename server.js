var express = require("express"),
    logger = require("morgan")("dev"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    routes = require("./routes");


// test
// var PORT = process.env.PORT || 3000;
// production
var PORT = process.env.PORT || 80;

var app = express();

mongoose.connect("mongodb://localhost/alamod");

app.use(express.static("public"));


// mount our morgan logger middleware
app.use(logger);

// use body-parser to parse the body of our POST requests
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// this does the same thing and is slightly more efficient
app.post('*', bodyParser.urlencoded({
    extended: true
}));

// also parse the json data in the request
app.use(bodyParser.json());

routes(app);



// create the app listener
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server error: ", err);
        process.exit(1);
    }
    console.log("Server is up on port", PORT);
});
