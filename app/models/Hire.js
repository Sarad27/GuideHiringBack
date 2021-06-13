const mongoose = require('mongoose')

const HireSchema = new mongoose.Schema({

    guide:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'GuideProfile'
    },
    tourist:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'TouristProfile'
    },
    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'Destination'
    },
    date:{
        type: Date,
        value: Date.now
    }
})

module.exports = mongoose.model("Hire", HireSchema);