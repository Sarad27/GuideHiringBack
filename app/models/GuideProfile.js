const mongoose = require('mongoose')

const GuideSchema = new mongoose.Schema({

    city:{
        type: String,
        required: true,
        minlength: 5
    },
    citizenship_number:{
        type: String,
        required: true
    },
    rating :{
        type: Number,
        required: false
    },
    rateCount:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("GuideProfile", GuideSchema);