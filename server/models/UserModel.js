const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserModel = new mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    age : {
        type : String,
        required : true,
        min : 18
    },
    password : {
        type : String,
        required : true
    }
})

UserModel.pre("save", async function(){
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
})

module.exports = mongoose.model("users", UserModel)