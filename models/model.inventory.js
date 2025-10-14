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
        default: "870 E Research Dr # 8, Palm Springs, CA 92262"
    },

});

// Creating inventory collection in database
module.exports = mongoose.model("Inventory", InventorySchema);
