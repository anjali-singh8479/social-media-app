import express from "express"
import { getuser } from "../controllers/user.js"
const router=express.Router()
router.get("/get",getuser)
export default router