import express from "express"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Creditionals",true)
    next()
})
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST","GET"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.listen("8800",()=>{
    console.log("backend connected")
})