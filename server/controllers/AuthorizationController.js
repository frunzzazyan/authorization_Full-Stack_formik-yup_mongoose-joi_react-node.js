const {registerSchema} = require("../joiSchema/RegisterSchema.js")
const {loginSchema} = require("../joiSchema/loginSchema.js")
class AuthorizationController{
    async createUser(req,res){
        try {
            const body = await registerSchema.validateAsync(req.body)
            const user = await req.app.locals.services.authorization.createUser(body)
            res.json(user)
        } catch (error) {
            res.json(error.message)
        }
    }
    
    async loginUser(req,res){
        try {
            const body = await loginSchema.validateAsync(req.body)
            const user = await await req.app.locals.services.authorization.loginUser(body)
            res.json(user)
        } catch (error) {
            res.json(error.message)
        }
    }
    async authMe(req,res){
        try {
            const user = await await req.app.locals.services.authorization.authMe(req.app.locals.tokenId)
            res.json(user)
        } catch (error) {
            res.json(error.message)
        }
    }
    async authSuccess(req,res){
        try {
            res.json("ok")
        } catch (error) {
            res.json(error.message)
        }
    }
}

module.exports = AuthorizationController