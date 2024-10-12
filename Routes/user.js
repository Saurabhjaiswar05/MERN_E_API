import express from "express";
import { register, login, users, profile } from "../Controllers/user.js";
import {Authenticated} from "../Middlewares/auth.js";

 const router = express.Router();
// user register
router.post("/register",register);
// user login
router.post("/login",login);
// get all users
router.get("/all",users);

// get user profile
router.get("/profile",Authenticated,profile);



export default router;