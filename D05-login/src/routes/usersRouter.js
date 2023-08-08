import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser)

export default router;