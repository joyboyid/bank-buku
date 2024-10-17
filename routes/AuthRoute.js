import express, { Router } from "express";
import {
    Me,
    Login,
    Logout
} from "../controller/Auth.js";

const router = express.Router();

router.post("/login", Login);
router.get("/me", Me);
router.delete("/logout", Logout);

export default router;
