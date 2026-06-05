import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../controller/Users.js";
import { verifyUser, adminOn } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, adminOn, getUsers);
router.get("/users/:id", verifyUser, adminOn, getUserById);
router.post("/users", verifyUser, adminOn, createUser);
router.patch("/users/:id", verifyUser, adminOn, updateUser);
router.delete("/users/:id", verifyUser, adminOn, deleteUser);

// router.get("/users", getUsers);
// router.get("/users/:id", getUserById);
// router.post("/users", createUser);
// router.patch("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

export default router;
