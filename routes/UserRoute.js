import express from "express";
import{
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} from "../controller/Users.js";
import { vrifyUser, adminOn } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', vrifyUser, adminOn, getUsers);
router.get('/users/:id', vrifyUser, adminOn, getUserById);
router.post('/users', vrifyUser, adminOn, createUser);
router.patch('/users/:id', vrifyUser, adminOn, updateUser);
router.delete('/users/:id', vrifyUser, adminOn, deleteUser);

export default router;