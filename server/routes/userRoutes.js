import express from 'express'
import { signup,login,me,logout } from "../controllers/userController.js";
import { requireAuth } from '../middleware/authMiddleware.js';

const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post('/login',login)
userRouter.get("/me", requireAuth, me);
userRouter.post('/logout',logout)


export default userRouter