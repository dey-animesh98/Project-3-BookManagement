const userModel = require("../Models/userModel")
const validation = require("../Middlewares/validation")
const jwt = require("jsonwebtoken")

// Create User


//Login User
const loginUser = async function (req, res) {
    try {
        const credentials = req.body
        if (!validation.isValidRequest(credentials)) res.status(400).send({ status: false, message: "Please enter the required credentials." })
        const { email, password } = credentials

        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "Please enter the emailId" })
        if (!validation.isValid(password))return res.status(400).send({ status: false, message: "Please enter the password" })

        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "Not a valid emailId" })
        if (!validation.isValidPassword(password))return res.status(400).send({ status: false, message: "Not a valid password" })

        const getUser = await userModel.findOne({ email })
        if (!getUser) return res.status(404).send({ status: false, message: "User email id doesn't exit." })

        const matchPassword = await userModel.findOne({password})
        if(!matchPassword) return res.status(401).send({ status: false, message: "Incorrect password"})

        const token = await jwt.sign({
            userId: getUser._id,
            iat: Math.floor(Date.now()/1000),
            exp: Math.floor(Date.now()/1000)+ 20*60*60
        }, "UrAnIuM#GrOuP@32");

        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, msg: "Author login successful", data: { token } })
    } catch (err) {
        res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}

module.exports.loginUser = loginUser