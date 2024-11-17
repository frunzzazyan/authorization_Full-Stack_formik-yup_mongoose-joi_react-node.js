const joi = require("joi")

const registerSchema = joi.object({
    fname : joi.string().required(),
    lname : joi.string().required(),
    email : joi.string().email().required(),
    age : joi.number().min(18).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    rpassword: joi.ref('password'),
})

module.exports = {registerSchema}