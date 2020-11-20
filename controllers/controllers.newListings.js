var LIST = require("../models/model.newListings.js"),
  nodemailer = require("nodemailer"),
  transporter = nodemailer.createTransport({
    // service: "iCloud",
    service: "gmail",
    port: 465,
    auth: {
      type: "login",
      user: "alamodincps@gmail.com",
      pass: "Codyjack1977$"
    }
  });

module.exports = {

  create: (req, res) => {
    console.log(req.body);
    var newDoc = new LIST(req.body);
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
      LIST.findOne({
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
      LIST.find({}, (err, docs) => {
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
      "imageOne": req.body.imageOne,
      "imageOneDescription": req.body.imageOneDescription,
      "imageTwo": req.body.imageTwo,
      "imageTwoDescription": req.body.imageTwoDescription,
      "imageThree": req.body.imageThree,
      "imageThreeDescription": req.body.imageThreeDescription,
      "imageFour": req.body.imageFour,
      "imageFourDescription": req.body.imageFourDescription,
      "imageFive": req.body.imageFive,
      "imageFiveDescription": req.body.imageFiveDescription,

    };
    LIST.findOneAndUpdate({
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

  sendEmail: (req, res) => {

    var data = req.body;

    transporter.sendMail({
      from: "alamodinc@icloud.com",
      to: data.destEmail,
      subject: "I found this at a La MOD in Palm Springs, Ca",
      html: data.message
    }, (err) => {
      if (err) {
        console.log("This is the sendMail error", err);
      } else {
        res.json(data);
      }
    })

    // res.json(data);

  }


}