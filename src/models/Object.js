const mongoose = require("mongoose");

const ObjectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //the user is itself a mongoose model
        ref: "users",
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    extras: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("object", ObjectSchema);
