const { verifyToken } = require("../jwt/jwt")
const cookieParser = require("cookie-parser");
const express = require("express")
const UserCredentials = require("../db/models/loginRegistration")
const app = express()
app.use(cookieParser()); // Must be added before routes



const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        console.log("Received Token:", token);

        if (!token) {
            // res.status(401).json({ message: "Login is Required!" })
            res.status(401).json({ "isAuthenticated": false })

        }
        else {
            const loginUserData = verifyToken(token, process.env.JWT_PRIVATE_KEY)
            req.user = loginUserData
            // console.log("from auth"+loginUserData)
            next()


        }


    } catch (error) {
        return res.status(401).send(error);
    }

}



const isAdmin = async (req, res, next) => {
    try {
        req.user = req.user
        next()

    } catch (error) {
        return res.status(401).send("Token Is Expired / Plz Sign In Again!-");
    }


}


const isEmailVerified = async (req, res, next) => {
    try {
        const userLogedIn = req.user
        const UserID = userLogedIn.id
        const userAllData = await UserCredentials.findOne({ _id: UserID });

        req.EmailVerified = userAllData.isEmailVerified
        req.user = userAllData
        next()
    } catch (error) {
        console.log(error)

    }
}




module.exports = { auth, isAdmin, isEmailVerified }