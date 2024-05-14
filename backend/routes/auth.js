import express from "express"
import { logout,registeruser,loginuser } from "../controllers/auth.js"
const router=express.Router()
router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/logout",logout)
export default router