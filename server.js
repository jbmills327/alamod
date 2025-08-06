var express = require("express"),
  logger = require("morgan")("dev"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  routes = require("./routes"),
  https = require("https"),
  http = require("http"),
  fs = require("fs"),
  cors = require("cors");

// SSL certificate paths
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/alamodps.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/alamodps.com/fullchain.pem"),
};

var HTTPS_PORT = process.env.PORT || 443;
var HTTP_PORT = 80;

var app = express();

// Domains to redirect to main domain
const redirectDomains = [
  "alamodhome.com",
  "www.alamodhome.com",
  "alamodinteriors.com",
  "www.alamodinteriors.com"
];

// HTTP server: redirect to HTTPS or canonical domain
http.createServer((req, res) => {
  const host = req.headers.host;

  if (redirectDomains.includes(host)) {
    res.writeHead(301, { "Location": "https://www.alamodps.com" });
    return res.end();
  }

  // Default: same domain, just upgrade to HTTPS
  res.writeHead(301, { "Location": "https://" + host + req.url });
  res.end();
}).listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}, redirecting to HTTPS`);
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost/alamod");

// Middleware
app.use(express.static("public"));
app.use(logger);
app.post('*', bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors({
  origin: ["https://www.alamodps.com", "https://alamodps.com"],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));
app.options("*", cors());

// HTTPS domain redirect logic — SKIP for /api routes
app.use((req, res, next) => {
  const host = req.hostname;

  // ✅ Allow API requests without redirect
  if (req.url.startsWith("/api")) {
    return next();
  }

  // Redirect alternate domains
  if (redirectDomains.includes(host)) {
    return res.redirect(301, "https://www.alamodps.com");
  }

  // Force www for alamodps.com
  if (host === "alamodps.com") {
    return res.redirect(301, "https://www.alamodps.com" + req.url);
  }

  next();
});

// Routes
routes(app);

// Start HTTPS server
https.createServer(options, app).listen(HTTPS_PORT, (err) => {
  if (err) {
    console.log("Server error: ", err);
    process.exit(1);
  }
  console.log("HTTPS Server is up on port", HTTPS_PORT);
});
