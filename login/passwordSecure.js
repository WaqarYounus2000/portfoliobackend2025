const bcryptjs = require("bcryptjs")




const securePassword = async (passwordValue) => {

    const hashPassword = await bcryptjs.hash(passwordValue, 10)
    return hashPassword

}


const checkPassword = async (passwordValue, hashPassword) => {
    const isMatched = await bcryptjs.compare(passwordValue, hashPassword)
    return (isMatched)

}




module.exports = { securePassword,checkPassword }