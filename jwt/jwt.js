
const jwt = require("jsonwebtoken")



const generate_JWT_token = (id, name,email) => {
    try {
        const token = jwt.sign({ id, name,email }, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRY_TIME });
        return token

    } catch (error) {
        console.log(error)
        return error

    }


}


const verifyToken = (token) => {
    try {
        const verifyUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        return verifyUser
    } catch (error) {
        // console.log(error)
        return error

    }
}




module.exports = { generate_JWT_token, verifyToken }