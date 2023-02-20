const express = require("express")
const {PostModel} = require("../model/Post.model")

require("dotenv").config()
const app = express()
const postRouter = express.Router()

app.use(express.json())

postRouter.get("/",async(req,res)=>{
    const posts = await PostModel.find({userID:req.body.userID})
    res.send(posts)
})
postRouter.get("/device",async(req,res)=>{
    let device = req.query
    try {
        const posts = await PostModel.find(device)
        res.send(posts)  
    } catch (error) {
        console.log(error);
    }
 
})
postRouter.post("/create",async(req,res)=>{
    const payload = req.body
    const post = new PostModel(payload) 
    await post.save()
    res.send("post created")
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    const post = await PostModel.findOne({"_id":id})
    const postid = post.userID
    const reqid = req.body.userID
    try {
        if(postid!==reqid){
            res.send("not authorized")
        }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("deleted")
        }
    } catch (error) {
        console.log(error);
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    const id = req.params.id
    const payload = req.body
    const post = await PostModel.findOne({"_id":id})
    const postid = post.userID
    const reqid = req.body.userID
    try {
        if(postid!==reqid){
            res.send("not authorized")
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("updated")
        }
    } catch (error) {
        console.log(error);
        res.setDefaultEncoding("errrror")
    }
})

module.exports={postRouter}
