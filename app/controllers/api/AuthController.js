const { success, error, validation } = require("../../helpers/responseApi");

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const GuideProfile = require('../../models/GuideProfile')
const TouristProfile = require('../../models/TouristProfile')

exports.signUp = async (req, res) => {
    // Validation
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));

    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email: email.toLowerCase() });

        // Check the user email
        if (user)
            return res
                .status(422)
                .json(validation({ msg: "Email already registered" }));

        let newUser = new User({
            name,
            email: email.toLowerCase().replace(/\s+/, ""),
            password,
            role
        });

        // Hash the password
        const hash = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, hash);
        newUser.details = false;

        // Save the user
        await newUser.save();

        // If the requirement above pass
        // Lets send the response with JWT token in it
        const payload = {
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res
                    .status(200)
                    .json(success("Register success, please fill details of your account.", { token: token }, res.statusCode));
            }
        );
        } catch (err) {
            console.error(err.message);
            res.status(500).json(error("Server error", res.statusCode));
        }
    };

exports.login = async (req, res) =>{
    //validation

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(422).json(validation(errors.array()))

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check the email
        // If there's not exists
        // Throw the error
        if (!user) return res.status(422).json(validation("Invalid credentials"));

        // Check the password
        let checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword)
            return res.status(422).json(validation("Invalid credentials"));

        //location GEO

        const location = req.body.location;

        user.geometry = location;


        //set user online
        user.status = true;
        await user.save();

        // If the requirement above pass
        // Lets send the response with JWT token in it
        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;

                res
                    .status(200)
                    .json(success("Login success", { token: token }, res.statusCode));
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}


exports.logout = async(req,res) =>{

    try{

        const user = await User.findByIdAndUpdate(req.user.id, {status: false})

        res
        .status(200)
        .json(success("Logout", res.statusCode));

    }catch(e){
        res.status(500).json(error("Server error", res.statusCode));
    }
}


exports.getAuthenticatedUser = async(req, res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");

        // Check the user just in case
        if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

        // Send the response
        res
            .status(200)
            .json(success(`Hello ${user.name}`, { user }, res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.updateGuideProfile = async(req,res) =>{

    try{

        const gProfile = new GuideProfile();
        gProfile.city = req.body.city;
        gProfile.citizenship_number = req.body.citizenship_number;


        gProfile.save().then( async() =>{

            const findUser = await User.findById(req.user.id);

            findUser.gProfile = gProfile._id;
            findUser.details = true;
            await findUser.save();

        }
        )

        res.status(201).json(success("Successfully Updated Profile", res.statusCode, gProfile))

    }catch(e){
        res.status(401).json({message : "Failed to update Profile"})
    }
}

exports.updateTouristProfile = async(req,res) =>{
    try{

        const tProfile = new TouristProfile();
        tProfile.city = req.body.city;
        tProfile.country = req.body.country;
        tProfile.passport_number = req.body.passport_number;
        tProfile.language = req.body.language;

        tProfile.save().then( async() =>{

            const findUser = await User.findById(req.user.id);

            findUser.tProfile = tProfile._id;
            findUser.details = true;
            await findUser.save();
        })

        res.status(201).json(success("Successfully Updated Profile", res.statusCode, tProfile))

    }catch(e){
        res.status(401).json({message : "Failed to update Profile"})
    }
}
