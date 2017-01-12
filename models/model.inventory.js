var mongoose = require("mongoose");

InventorySchema = new mongoose.Schema({
    // images: Array,
    // name: String,
    // period: String,
    // description: String,
    // reference: String,
    // condition: String,
    // quantity: Number,
    // height: String,
    // width: String,
    // depth: String,
    // diameter: String,
    // price: Number,
    // location: {
    //     type: String,
    //     default: "886 N Palm Canyon Dr. Palm Springs, CA 92262 US"
    // },
    // available: {
    //     type: Boolean,
    //     default: true
    // }

    "name": String,
    "period": String,
    "description": String,
    "price": {
        type: String,
        default: "SOLD!"
    },
    "condition": String,
    "measurements": {
        "width": {
            type: String,
            default: "N/A"
        },
        "height": {
            type: String,
            default: "N/A"
        },
        "depth": {
            type: String,
            default: "N/A"
        },
        "diameter": {
            type: String,
            default: "N/A"
        },
    },
    "numOfItems": String,
    "imageUrl": String,
    "dateCreated": {
        type: Date,
        default: new Date()
    },
    "category": String,
    "location": {
        type: String,
        default: "886 N Palm Canyon Dr. Palm Springs, CA 92262 US"
    },

});

// Creating inventory collection in database
module.exports = mongoose.model("Inventory", InventorySchema);
