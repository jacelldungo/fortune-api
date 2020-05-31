const mongoose = require("mongoose");

const fortuneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fortune: { type: String, required: true }
});

module.exports = mongoose.model('Fortune', fortuneSchema);