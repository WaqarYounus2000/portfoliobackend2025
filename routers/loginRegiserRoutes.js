require('../db/conn')
const express = require("express")

const jwt = require("jsonwebtoken")
const router = new express.Router()
const UserCredentials = require("../db/models/loginRegistration")
const { securePassword, checkPassword } = require("../login/passwordSecure")
const { auth } = require("../middlewares/auth")
const { generate_JWT_token, verifyToken } = require("../jwt/jwt")




router.post("/registration", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const hashpassword = await securePassword(password);

        const USER = new UserCredentials({
            name,
            email,
            phone,
            password: hashpassword,
        });

        const UserCreatedRef = await USER.save();




        res.status(201).json({ "User-Registered:": UserCreatedRef, });

    } catch (e) {
        console.error("Error:", e); // Log the error for debugging
        res.status(500).json({ error: e.message });
    }

    //  there is another method Schema.pre("save") already created in jwt.js, that method is used for post("/registration") logic , 

})









router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)


        // Find user by email
        const user = await UserCredentials.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        const isMatch = await checkPassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }



        if (user) {
            const tokenCreated = generate_JWT_token(user._id, user.name, user.email);
            // console.log(tokenCreated)

            const verifiedUser = verifyToken(tokenCreated)
            const cookiesExpiry = new Date(verifiedUser.exp * 1000 + 15 * 1000); // Expiry in milliseconds
            res.cookie("jwt", tokenCreated, {
                expires: cookiesExpiry,
                httpOnly: true,
                secure: true,  // Change to true in production with HTTPS, in localhost it should be false
                sameSite: "none" // Chrome blocks cross-site cookies if this is missing, it should be lax in localhost mode and none in production
            });

            res.status(200).json({
                message: 'Login successful',
                user: user.email,
                // token: tokenCreated, 
            })

        }




    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
});



router.post("/logout", auth, (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, secure: false, sameSite: "lax" });
        res.status(200).json({ message: "Logout Successfully!" })


    } catch (error) {
        res.status(500).json({ message: "User Must Login First!" })

    }

})




// for protectedroute in react 
router.get("/auth/jwt", auth, async (req, res) => {
    if (req.user) {   /// if not a admin then 
        // console.log(req.user)
        res.status(200).json({ "isAuthenticated": true, "current_user": req.user })
    } else {
        res.status(401).json({ "isAuthenticated": false })

    }
})






module.exports = router;