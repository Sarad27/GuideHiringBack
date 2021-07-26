const { success, error, validation } = require("../../helpers/responseApi");
const { validationResult } = require("express-validator");
const Destination = require('../../models/Destinations')


exports.postDestination = async (req,res) =>{

    try{

        if(req.body.name  && req.body.details && req.file.path && req.body.location && req.body.abstract){

            const newDestination = new Destination();
            newDestination.name = req.body.name;
            newDestination.details = req.body.details;
            newDestination.image =  req.file.path;
            newDestination.location = req.body.location;
            newDestination.abstract = req.body.abstract;


            await newDestination.save();
            res.status(201).json(success("Succeddfully Uploaded Destination"))

        }else{
            res.status(400).json(validation("A field is missing"))
        }

    }catch(e){
        res.status(500).json(error("Server Failure"))
    }
}

exports.getDestination = async (req,res) =>{

    try{
        const getDestination = await Destination.find();

        res.status(201).json(success("Successfully Fetched Data", getDestination))

    }catch(e){
        res.status(500).json(error("Server Error"))
    }
}

exports.getSingleDestination = async (req,res) =>{
    try{

        const getDestination = await Destination.findById(req.params.id)

        if(getDestination){
            res.status(201).json(success("Successfully Retrieved Destination", getDestination, res.statusCode))
        }else{
            res.status(400).json(error("Destination Not Found", res.statusCode))
        }


    }catch(e){
        res.status(500).json(error("Server Error"))
    }
}