import {db} from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const registeruser=(req,res)=>{
    const q="SELECT * from users WHERE `username`=?"
    
    const values=[req.body.username]
    db.query(q,[values],(err,data)=>{
        if(err)
            return res.status(500).json(err)
        if(data.length >0){
            return res.json("username already exists").status(409)
        }
        else{
            const salt=10
            const q="INSERT INTO users (`username`,`email`,`password`,`name`,`coverpic`,`profilepic`) VALUES(?)"
            const hash=bcrypt.hash(req.body.password,salt,(err,hash)=>{
                if(err)
                    return res.json(err)
                const values=[req.body.username,req.body.email,hash,req.body.name,req.body.coverpic,req.body.profilepic]
               db.query(q,[values],(err,data)=>{
                if(err)
                    return res.json(err)
                return res.json(data).status(401)
            })
            })
            
        }
    })

}
export const loginuser=(req,res)=>{
const q="SELECT * FROM users WHERE `username`=?"
const values=[req.body.username]
db.query(q,[values],(err,data)=>{
    if(err)
        return res.json(err).status(401)
    console.log(data)
    if(data.length>0){
        bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
            if(err)
                return res.json(err)
            console.log(response)
            if(!response)
                return res.json("Incorrect password").status(400)
            const token=jwt.sign({id:data[0].id},"jwt-secret-key")
            const {password,...others}=data[0]
            // res.json (token)
            res.cookie("token",token,{httpOnly:true}).status(200).json({others})
            // alert("user logged in")
        })
    }
    else{
        return res.json("username not registered").status(400)
    }
})
}
export const logout=(req,res)=>{
    res.clearCookie("token",{
        secure:true,
        sameSite:"none"
    }).status(200).json("user logged out")
    return res
}