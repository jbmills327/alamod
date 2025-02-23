var express = require("express"),
  logger = require("morgan")("dev"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  routes = require("./routes"),
  https = require("https"),
  http = require("http"),
  fs = require("fs");

// SSL certificate paths
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/alamodps.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/alamodps.com/fullchain.pem"),
};

var HTTPS_PORT = process.env.PORT || 443;
var HTTP_PORT = 80; // Standard HTTP port

var app = express();

// Redirect all HTTP requests to HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://www.alamodps.com" + req.url });
  res.end();
}).listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}, redirecting to HTTPS`);
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost/alamod");

app.use(express.static("public"));
app.use(logger);
app.post('*', bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Force www on HTTPS requests
app.use((req, res, next) => {
  if (!req.hostname.startsWith("www.")) {
    return res.redirect(301, `https://www.alamodps.com${req.url}`);
  }
  next();
});

routes(app);

// Start HTTPS server
https.createServer(options, app).listen(HTTPS_PORT, (err) => {
  if (err) {
    console.log("Server error: ", err);
    process.exit(1);
  }
  console.log("HTTPS Server is up on port", HTTPS_PORT);
});
