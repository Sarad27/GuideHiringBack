const mongoose = require('mongoose')

const DestinationSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        minlength: 5
    },
    image:{
        type:String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    location:{
         type: String,
         required: true
    },
     abstract:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Destination", DestinationSchema);