
import { Router } from "express";
import { registerUser as register, loginUser as login } from '../controllers/auth.js'



const router = Router()

router.post("/login", login)

export default router
