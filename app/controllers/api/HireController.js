const { success, error, validation } = require("../../helpers/responseApi");
const nodemailer = require("nodemailer")

const Hire = require("../../models/Hire")

const templateMail = require("../../lib/generateMail");
const User = require("../../models/User");
const Destinations = require("../../models/Destinations");
const sendNotificationOfHire = require("../../../socket/socket");

const GuideProfile = require("../../models/GuideProfile")


exports.Hire = async (req,res) =>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        //   type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        //   clientId: process.env.OAUTH_CLIENTID,
        //   clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //   refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });

      const mailOptions = (gEmail, gName,  tEmail, tName, destination ) =>{

          return {
            from: "subedisarad27@gmail.com",
            to: gEmail,
            subject: 'Hire Notification from Yatri',
            html: templateMail( gName , tEmail, tName, destination)
          };
      }

      
    try{
        if(req.body.destinationId && req.body.guideId && req.user.id){

            var hire = new Hire();
            hire.guide = req.body.guideId;
            hire.tourist = req.user.id;
            hire.destination = req.body.destinationId;
            hire.status = "Pending";

            await hire.save();

            hire = await hire.populate('destination')
                                .populate('guide')
                                .populate('tourist').execPopulate()
            

            var returnHireData = {}

            returnHireData.id = hire.id;
            returnHireData.guideName = hire.guide.name;
            returnHireData.guideId = hire.guide.id;
            returnHireData.touristName = hire.tourist.name;
            returnHireData.touristId = hire.tourist.id;
            returnHireData.destination = hire.destination.name

            console.log(hire.guide.email, hire.guide.name, req.user.email, req.user.name, hire.destination.name)

            
            transporter.sendMail(mailOptions(hire.guide.email, hire.guide.name, req.user.email, req.user.name, hire.destination.name), function(err, data) {
                if (err) {
                  console.log("Error " + err);
                } else {
                    res.status(201).json(success("Successfully Hired", returnHireData, res.statusCode))
                }
              });

        }else{
            res.status(404).json(error("All fields Required", res.statusCode))
        }

    }catch(e){
        console.log(e)
        res.status(500).json(error("Server Error", res.statusCode))
    }
}

exports.getHires = async(req,res) =>{

    try{



        var HireData ;

        if(req.user.role == "GUIDE"){
             HireData = await Hire.find({guide: req.user.id}).sort('-updatedAt').populate('destination').populate('guide').populate('tourist')
        }else if(req.user.role == "TOURIST"){
             HireData = await Hire.find({tourist: req.user.id}).sort('-updatedAt').populate('destination').populate('guide').populate('tourist')
        }



    
        if(HireData){
            return res.status(200).json(success("Successfully Fetched Hires Data", HireData, res.statusCode));
        }

        return;

    }catch(e){

        console.log(e)

        res.status(500).json(error("Server Error", res.statusCode))
    }
}

exports.confirmHire = async(req,res) =>{

    try{

        var HireData = await Hire.findById(req.params.id);

        if(req.user.id == HireData.guide){
            HireData.status = req.body.status;

             await HireData.save();

            if(HireData.status == 'Accepted'){

            await User.findByIdAndUpdate(HireData.guide, {availability: false});

            await User.findByIdAndUpdate(HireData.tourist, {availability: false});

            }



             HireData = await HireData.populate('destination')
                                .populate('guide')
                                .populate('tourist').execPopulate()

            var returnHireData = {}

            returnHireData.id = HireData.id;
            returnHireData.guideName = HireData.guide.name;
            returnHireData.guideId = HireData.guide.id;
            returnHireData.touristName = HireData.tourist.name;
            returnHireData.touristId = HireData.tourist.id;
            returnHireData.destination = HireData.destination.name
            returnHireData.status = HireData.status;

            return res.status(201).json(success("Successfully Updated Hires Data", returnHireData,  res.statusCode))
        }else{

            return;
        }

        
    }catch(e){
        res.status(500).json(error("Server Error", res.statusCode))
    }

}

exports.RateHire = async(req,res) =>{
    try{

        var HireData = await Hire.findById(req.params.id);


        if(req.user.id == HireData.tourist){


            HireData.rating = req.body.rating;

             await HireData.save();


             HireData = await HireData
                                .populate('guide')
                                .execPopulate()

            const tempProfile = await GuideProfile.findById(HireData.guide.gProfile)


            var rateCount = tempProfile.rateCount + 1;
            var rating = (tempProfile.rating + parseInt(req.body.rating)) / rateCount ;


            tempProfile.rateCount = rateCount;
            tempProfile.rating = rating;


            await tempProfile.save()
            
            return res.status(201).json(success("Successfully Updated Hires Data",  res.statusCode))

        }else{

            return;
        }

        
    }catch(e){
        res.status(500).json(error("Server Error", res.statusCode))
    }






}



