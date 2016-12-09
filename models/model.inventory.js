var mongoose = require("mongoose");

InventorySchema = new mongoose.Schema({
    description: String,
    reference: String,
    height: Number,
    width: Number,
    depth: Number,
    price: Number

});

// Creating inventory collection in database
module.exports = mongoose.model("Inventory", InventorySchema);
