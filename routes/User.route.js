const express = require("express")
const {UserModel} = require("../model/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const app = express()
const userRouter = express.Router()

app.use(express.json())

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}= req.body
try {
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err) res.send(err)
        else{
            const user = new UserModel({name,email,gender,password:hash,age,city})
            await user.save()
            res.send("user registered")
        }
    })
} catch (error) {
    console.log(error);
}

})
userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
try {
  const user = await UserModel.find({email})
  if(user.length>0){
    bcrypt.compare(password,user[0].password,(err,result)=>{
        if(result){
            const token = jwt.sign({userID:user[0]._id},process.env.key)
            res.send({"msg":"login successfull","token": token})
        }else{
            res.send("wrong credentials")
        }
    })
  }
} catch (error) {
    console.log(error);
}

})
module.exports={userRouter}