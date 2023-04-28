var express = require("express"),
    Inv = require("./controllers/controllers.inventory"),
    List = require("./controllers/controllers.newListings");

var app = express();

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile("newListings.html", {
            root: './public/html'
        });
    });

    app.get('/location', (req, res) => {
        res.sendFile("location.html", {
            root: './public/html'
        });
    });

    app.get('/newListings', (req, res) => {
        res.sendFile("newListings.html", {
            root: './public/html'
        });
    });

    app.get('/inventory', (req, res) => {
        res.sendFile("inventory.html", {
            root: './public/html'
        });
    });

    app.get('/contact', (req, res) => {
        res.sendFile("contact.html", {
            root: './public/html'
        });
    });
    // Routes to manipulate inventory
    app.get("/api/inventory", Inv.get);
    app.get("/api/inventory/:id", Inv.get);
    app.post("/api/inventory", Inv.create);
    app.put("/api/inventory/", Inv.edit);
    app.delete("/api/inventory/:id", Inv.delete);

    // Routes to manipulate new listing photos

    app.post("/api/newListing/", List.create);
    app.get("/api/newListing/", List.get);
    app.put("/api/Newlisting", List.edit);

    app.post("/sendEmail", List.sendEmail);



}
