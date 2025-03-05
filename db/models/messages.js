const mongoose = require('mongoose');



const messageSchema = new mongoose.Schema({

    message:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    createdAt: { type: Date, default: Date.now },

})



const MessageCollection = mongoose.model("Message", messageSchema);


module.exports = MessageCollection;