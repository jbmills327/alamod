var INV = require("../models/model.inventory.js");

module.exports = {
    create: (req, res) => {
        console.log(req.body);
        var newDoc = new INV(req.body);
        console.log(newDoc);
        newDoc.save((err, doc) => {
            if (err) {
                return res.send(err);
            }
            console.log(doc);
            res.send(doc);
        });
    },
    get: (req, res) => {

        INV.find({}, (err, docs) => {
            if (err) {
                res.send(err);
            }
            res.json(docs);
        })

    }

}
