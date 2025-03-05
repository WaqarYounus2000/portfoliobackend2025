
const mongoose = require('mongoose');

const loginRegisterSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
   




})



const UserCredentials = new mongoose.model("userCredential", loginRegisterSchema)












// this method is used to generate token and store in database 

// loginRegisterSchema.pre("save", function (next) {
//     if (!this.tokens || this.tokens.length === 0) {
//         this.tokens = [{ token: generate_JWT_token(this._id, this.phone) }];
//     }
//     next();
// });

// this will automatically generate and save the token




module.exports = UserCredentials;