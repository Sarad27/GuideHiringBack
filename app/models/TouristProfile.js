const mongoose = require('mongoose')

const TouristSchema = new mongoose.Schema({

    city:{
        type: String,
        required: true,
        minlength: 5
    },
    country:{
        type: String,
        required: true,
        minlength: 5
    },
    passport_number:{
        type: Number,
        required: true,
        unique: true
    },
    language:{
        type: String,
        required: true,
        minlength: 5
    }
})

module.exports = mongoose.model("TouristProfile", TouristSchema);