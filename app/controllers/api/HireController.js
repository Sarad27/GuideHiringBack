const { success, error, validation } = require("../../helpers/responseApi");

const Hire = require("../../models/Hire")


exports.Hire = async (req,res) =>{

    console.log("here")


    try{
        if(req.body.destinationId && req.body.guideId && req.user.id){

            const hire = new Hire();
            hire.guide = req.body.guideId;
            hire.tourist = req.user.id;
            hire.destination = req.body.destinationId;

            hire.save()
                .then(data =>{
                    res.status(201).json(success("Successfully Hired", data, res.statusCode))
                }, e =>{
                    res.status(500).json(error("Error while hiring", res.statusCode))
                })


        }else{
            res.status(404).json(error("All fields Required", res.statusCode))
        }

    }catch(e){
        res.status(500).json(error("Server Error", res.statusCode))
    }
}

exports.getHires = (req,res) =>{
    res.status(200).json(success("Successfully Fetched Hires Data"));
}