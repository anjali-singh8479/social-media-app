import express from "express"
import { getauth,registeruser,loginuser } from "../controllers/auth.js"
const router=express.Router()
router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/logout",getauth)
export default router