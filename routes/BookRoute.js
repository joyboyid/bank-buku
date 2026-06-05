import express from "express";
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controller/Books.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/books', verifyUser, getBooks);
router.get('/books/:id', verifyUser, getBookById);
router.post('/books', verifyUser, createBook);
router.patch('/books/:id', verifyUser, updateBook);
router.delete('/books/:id', verifyUser, deleteBook);

export default router;