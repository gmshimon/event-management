import express from 'express';
import { getUserById, loginUser, registerUser } from './user.controller.js';
const router = express.Router();


router.post('/create-user',registerUser)
router.post('/login',loginUser)
router.get('/', getUserById)
export default router