import Book from "../models/BookModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getBooks = async(req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Book.findAll({ 
                attributes:['uuid','nama_buku','penulis','penerbit','thn_terbit','jenis_buku'],              
                include:[{
                    model: User,
                    attributes: ['email','name']          
                }]
            });
        }else{
            response = await Book.findAll({ 
                attributes:['uuid','nama_buku','penulis','penerbit','thn_terbit','jenis_buku'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['email', 'name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

export const getBookById = async(req, res) => {
    try {
        const book = await Book.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!book) return res.status(404).json({msg: "Data Not found!"});
        let response;
        if(req.role === "admin"){
            response = await Book.findOne({
                attributes:['uuid','nama_buku','penulis','penerbit','thn_terbit','jenis_buku'],
                where:{
                    id: book.id
                },
                include:[{
                    model: User,
                    attributes:['email','name']
                }]
            });
        }else{
            response = await Book.findOne({
                attributes:['uuid','nama_buku','penulis','penerbit','thn_terbit','jenis_buku'],
                where:{
                    [Op.and]:[{id: book.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['email','name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createBook = async(req, res) => {  
    const {nama_buku, penulis, penerbit, thn_terbit, jenis_buku} = req.body;
    try {
        await Book.create({
            nama_buku: nama_buku,
            penulis: penulis,
            penerbit: penerbit,
            thn_terbit: thn_terbit,
            jenis_buku: jenis_buku,
            userId: req.userId
        });
        res.status(201).json({msg: "Books added!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateBook = async(req, res) => {
    try {
        const book = await Book.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!book) return res.status(404).json({msg: "Data Not found!"});
        const {nama_buku, penulis, penerbit, thn_terbit, jenis_buku} = req.body;
        if(req.role === "admin"){
            await Book.update({nama_buku, penulis, penerbit, thn_terbit, jenis_buku},{
                where:{
                    id: book.id
                }
            });
        }else{
            if(req.userId !== book.userId) return res.status(403).json({msg: "Ristricted Area!"});
            await Book.update({nama_buku, penulis, penerbit, thn_terbit, jenis_buku},{
                where:{
                    [Op.and]:[{id: book.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "Updated!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!book) return res.status(404).json({msg: "Data Not found!"});
        const {nama_buku, penulis, penerbit, thn_terbit, jenis_buku} = req.body;
        if(req.role === "admin"){
            await Book.destroy({
                where:{
                    id: book.id
                }
            });
        }else{
            if(req.userId !== book.userId) return res.status(403).json({msg: "Ristricted Area!"});
            await Book.destroy({
                where:{
                    [Op.and]:[{id: book.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "Data Deleted!!!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}