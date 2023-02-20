const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/User.route")
const {authenticate} = require("./middleware/authenticate.middleware")
const {postRouter} = require("./routes/Post.router")
const cors = require("cors")

require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("running");
    } catch (error) {
        console.log(error);
    } 
})

// "name": "a",
// "email": "a@gmail.com",
// "gender": "m",
// "password": "a",
// "age": 20,
// "city":"abc"

// "title": "post",
//     "body": "first",
//     "device" : "phone",
//     "no_if_comments" : 5