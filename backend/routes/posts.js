import express from "express"
import {getposts,addpost} from "../controllers/post.js"
const routes=express.Router()
 routes.get("/getposts",getposts)
 routes.post("/addpost",addpost)
export default routes