var express = require("express"),
    Inv = require("./controllers/controllers.inventory");

var app = express();

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile("index.html", {
            root: './public/html'
        });
    });

    app.get('/location', (req, res) => {
        res.sendFile("location.html", {
            root: './public/html'
        });
    });

    app.get("/api/inventory", Inv.get);
    app.post("/api/inventory", Inv.create);




}
