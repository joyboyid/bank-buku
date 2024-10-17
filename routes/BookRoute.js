import express from "express";
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controller/Books.js";
import { vrifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/books', vrifyUser, getBooks);
router.get('/books/:id', vrifyUser, getBookById);
router.post('/books', vrifyUser, createBook);
router.patch('/books/:id', vrifyUser, updateBook);
router.delete('/books/:id', vrifyUser, deleteBook);

export default router;