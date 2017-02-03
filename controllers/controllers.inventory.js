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
        if (req.params.id) {
            INV.findOne({
                _id: req.params.id
            }, (err, docs) => {
                if (err) {
                    res.send("This is the error", err)
                }
                if (!docs) {
                    return res.send("Nothing with that id");
                }
                res.json(docs);
                // res.redirect("/inventory");
            });
        } else {
            INV.find({}, (err, docs) => {
                if (err) {
                    res.send(err);
                }
                res.json(docs);
            })
        }
    },

    edit: (req, res) => {
        var newVar = {
            "name": req.body.name,
            "period": req.body.period,
            "description": req.body.description,
            "price": req.body.price,
            "condition": req.body.condition,
            "measurements": {
                "width": req.body.measurements.width,
                "height": req.body.measurements.height,
                "depth": req.body.measurements.depth,
                "diameter": req.body.measurements.diameter,
            },
            "numOfItems": req.body.numOfItems,
            "imageUrl": [req.body.imageUrl[0], req.body.imageUrl[1], req.body.imageUrl[2], req.body.imageUrl[3], req.body.imageUrl[4]],
            "category": req.body.category,
        };
        INV.findOneAndUpdate({
            "_id": req.body._id
        }, newVar, {
            new: true
        }, (err, doc) => {
            if (err) {
                return res.send("This is the error", err)
            }
            console.log("This is the doc", doc);
            res.send(doc);
        });
    },

    delete: (req, res) => {
        INV.findByIdAndRemove({
            "_id": req.params.id
        }, (err, item) => {
            var response = {
                message: "Item was deleted",
                id: req.body.id
            };
            if (err) {
                console.log("This is the error", err);
            } else {
                res.send(response);
            };
        });
    }
}
