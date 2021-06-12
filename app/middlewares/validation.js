const {check} = require('express-validator');

exports.registerValidation = [

    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("role", "Role is required").not().isEmpty()
]


exports.loginValidation = [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty()
]

exports.destinationValidation = [
    check("name", "Name is required").not().isEmpty(),
    check("image", "Image is required").not().isEmpty(),
    check("details", "Details is required").not().isEmpty()
]