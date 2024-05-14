import {db} from "../connect.js"
import bcrypt from "bcrypt"
export const getauth=(req,res)=>{
    res.json("get auth")
}
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
                const values=[req.body.username,req.body.password,hash,req.body.name,req.body.coverpic,req.body.profilepic]
               db.query(q,[values],(err,data)=>{
                if(err)
                    return res.json(err)
                return res.json({status:200,data:data})
            })
            })
            
        }
    })

}
export const loginuser=(req,res)=>{

}