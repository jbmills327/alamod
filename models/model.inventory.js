var mongoose = require("mongoose");

InventorySchema = new mongoose.Schema({

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
    "imageUrl": Array,
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
