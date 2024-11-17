const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class AuthorizationServices{
    constructor(models){
        this.models = models
    }
    async createUser(body){
        const doc = await this.models.users(body)
        const user = await doc.save()
        const {password, __v, ...userData} = user._doc
         return userData
    }

    async loginUser(body){
        // identification
        const user = await this.models.users.findOne({email : body.email})
        if(!user){
            return {"msg" : "invalid email or password"}
        }

        const vallPass = await bcrypt.compare(body.password, user.password)
        if(!vallPass){
            return {"msg" : "invalid email or password"}
        }

        const token = jwt.sign({_id : user._id}, "12345", {expiresIn: "1d"})
        const {password, __v, ...userData} = user._doc
        return {...userData,token}
    }

    async authMe(id){
        const user = await this.models.users.findById(id)
        return user
    }
}

module.exports = AuthorizationServices