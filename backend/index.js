import express from "express"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
const app=express();
app.use(express.json())
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.listen("8800",()=>{
    console.log("backend connected")
})