import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) => {
    res.set('Content-Type', 'application/json');
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'telp', 'email', 'role']
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'telp', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}  

export const createUser = async(req, res) => {  
    const {name, email, telp, password, confPassword, role} = req.body;
    if (!password || !confPassword) {
        return res.status(400).json({ msg: "Password and confirmation password are required" });
    }
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password didn't match!" });
    }
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name,
            email,
            telp,
            password: hashPassword,
            role
        });
        res.status(201).json({ msg: "User Registered!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found!" });

    const { name, email, telp, password, confPassword, role } = req.body;
    let hashPassword;

    if (password && password !== "") {
        // Only validate confirmation and rehash when a new password is provided
        if (!confPassword || password !== confPassword) {
            return res.status(400).json({ msg: "Password didn't match!" });
        }
        hashPassword = await argon2.hash(password);
    } else {
        hashPassword = user.password;
    }

    try {
        await User.update({
            name,
            email,
            telp,
            password: hashPassword,
            role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted!"});
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}