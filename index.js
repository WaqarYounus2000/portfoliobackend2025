require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors");
require('./db/conn')

const resumeRoutes = require('./routers/resumeRoutes')
const userCredentialRoutes = require('./routers/loginRegiserRoutes')

const cookieParser = require('cookie-parser')
const port = process.env.BACKEND_PORT || 8000







app.use(express.json())   //// this is necceassary when fetching data from localhost:
app.use(cookieParser())

app.use('/uploads', express.static('uploads'));   ///It makes the uploads folder accessible via the /uploads route.Any file inside the uploads folder can be accessed using http://localhost:8000/uploads/filename.jpg.


app.use(cors({
  origin: process.env.FRONTEND_SERVER_ADDRESS,   ///this is necessary from where the data should be coming from
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allows cookies to be sent ths is necessary to be true
}));

app.use("/", resumeRoutes)
app.use("/user", userCredentialRoutes)







app.listen(port, () => {
  console.log("your Express-app is running at: " + port)
})