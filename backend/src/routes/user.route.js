import { Router } from "express";
import { registerUser, loginUser, logOutUser } from "../controllers/user.controller.js"; // Ensure loginUser is imported if you are using it

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logOutUser);


export default router;

