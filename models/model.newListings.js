var mongoose = require('mongoose');

NewlistingSchema = new mongoose.Schema({

    "name": String,
    "imageOne": String,
    "imageOneDescription": String,

    "imageTwo": String,
    "imageTwoDescription": String,

    "imageThree": String,
    "imageThreeDescription": String,

    "imageFour": String,
    "imageFourDescription": String,

    "imageFive": String,
    "imageFiveDescription": String

});


module.exports = mongoose.model('Newlisting', NewlistingSchema);
