const { success, error, validation } = require("../../helpers/responseApi");
const User = require("../../models/User")

exports.getUser = async(req,res) =>{

    try{
        const user = await User.findById(req.params.id).select("-password").populate('gProfile').populate('tProfile');

        console.log(user)

        res.status(201).json(success("Successfully Fetched User Data", user))

    }catch(e){
        res.status(500).json(error("Error in server", res.statusCode))
    }
}