const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_DATABASE_URI).then(() => {
    console.log("Database Connected and running at 27017")
}).catch((err) => {
    console.log("No Connection")
})


