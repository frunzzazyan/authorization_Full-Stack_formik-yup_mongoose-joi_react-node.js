var express = require('express');
var router = express.Router();

const AuthorizationController = require("../controllers/AuthorizationController.js")
const controllers = new AuthorizationController()
const {checkAuth} = require("../middleware/checkAuth.js")

/* GET home page. */
router.post("/register", controllers.createUser);
router.post("/login", controllers.loginUser);
router.get("/me", checkAuth ,controllers.authMe)

module.exports = router;
