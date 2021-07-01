const { success, error, validation } = require("../../helpers/responseApi");
const nodemailer = require("nodemailer")

const Hire = require("../../models/Hire")

const templateMail = require("../../lib/generateMail");
const User = require("../../models/User");
const Destinations = require("../../models/Destinations");


exports.Hire = async (req,res) =>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
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

            const hire = new Hire();
            hire.guide = req.body.guideId;
            hire.tourist = req.user.id;
            hire.destination = req.body.destinationId;

            const guide = await User.findById(req.body.guideId);

            const destination = await Destinations.findById(req.body.destinationId)

            transporter.sendMail(mailOptions(guide.email, guide.name, req.user.email, req.user.name, destination.name), function(err, data) {
                if (err) {
                  console.log("Error " + err);
                } else {
                    hire.save()
                    .then(data =>{
                    res.status(201).json(success("Successfully Hired", data, res.statusCode))
                    }, e =>{
                    res.status(500).json(error("Error while hiring", res.statusCode))
                    })
                  
                }
              });

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