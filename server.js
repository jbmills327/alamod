var express = require("express"),
  logger = require("morgan")("dev"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  routes = require("./routes"),
  https = require("https"),
  fs = require("fs");

// SSL certificate paths
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/alamodps.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/alamodps.com/fullchain.pem"),
};

// test
// var PORT = process.env.PORT || 3000;

// production
var PORT = process.env.PORT || 443;

var app = express();

mongoose.connect("mongodb://localhost/alamod");

app.use(express.static("public"));

// mount our morgan logger middleware
app.use(logger);

// use body-parser to parse the body of our POST requests
app.post('*', bodyParser.urlencoded({
  extended: true
}));

// also parse the json data in the request
app.use(bodyParser.json());

routes(app);

// create the app listener using HTTPS
https.createServer(options, app).listen(PORT, (err) => {
  if (err) {
    console.log("Server error: ", err);
    process.exit(1);
  }
  console.log("HTTPS Server is up on port", PORT);
});
