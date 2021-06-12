const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        minlength: 5
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role :{
        type: String,
        required: true
    },
    details:{
        type: Boolean
    },
    gProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'GuideProfile'
    },
    tProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'TouristProfile'
    }
})

module.exports = mongoose.model("User", UserSchema);