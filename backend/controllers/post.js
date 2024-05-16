import {db} from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"
export const getposts=(req,res)=>{
    // const q="SELECT * FROM post WHERE userid=4"
const q=`SELECT p.*, u.id AS userid, name, profilepic FROM post AS p JOIN users AS u ON (u.id=userid)`
// const q="SELECT * FROM post RIGHT JOIN users ON post.userid= user.id"
db.query(q,(err,data)=>{
    if(err)
        return res.json(err).status(400)

    console.log(data)
    return res.json(data).status(200)
})
}
export const addpost=(req,res)=>{
const token=req.cookies.token
if(!token)
    return res.json("Logged out").status(401)
jwt.verify(token,"jwt-secret-key",(err,userinfo)=>{
    if(err)
        return res.json("Invalid token").status(403)
    const q="INSERT INTO post(`desc`,`img`,`createdAt`,`userid`) VALUES(?)"
    const time=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    const values=[req.body.desc,req.body.img,time,userinfo.id]
    db.query(q,[values],(error,data)=>{
        if(error)
            res.json(error).status(500)
        return res.json("post created").status(200)
    })
})
}