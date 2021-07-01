const { success, error, validation } = require("../../helpers/responseApi");
const User = require("../../models/User")

exports.getUser = async(req,res) =>{

    try{
        const user = await User.findById(req.params.id).select("-password").populate('gProfile').populate('tProfile');

        res.status(201).json(success("Successfully Fetched User Data", user))

    }catch(e){
        res.status(500).json(error("Error in server", res.statusCode))
    }
}

exports.getGuide = async(req,res) =>{

    try{
        const user = await User.find({role : "GUIDE"}).select("-password").populate('gProfile');
        if(user == null){
            res.status(400).json(error("No Guide Found", res.statusCode))
        }

        res.status(201).json(success("Succesfully retrieved guides", user))

    }catch(e){
        res.status(500).json(error("ERROR in server", res.statusCode));
    }


}