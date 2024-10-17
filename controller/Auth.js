import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({ msg:"user not found!"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({ msg: "wrong password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const telp = user.telp;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, telp, email, role});
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Login first!!!!"});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'telp', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"})
    res.status(200).json(user);     
}

export const Logout = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({ msg: "Can't logOut!"});
        res.status(200).json({msg: "Logut!"})
    });
}