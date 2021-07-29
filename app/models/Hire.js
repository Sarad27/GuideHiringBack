const mongoose = require('mongoose')

const HireSchema = new mongoose.Schema({

    guide:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    tourist:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'Destination'
    },
    status:{
        type: String,
        // required: true
    },
    rating:{
        type: Number,
        default: null
    }
},
  {
    timestamps: true,
  }

)

module.exports = mongoose.model("Hire", HireSchema);