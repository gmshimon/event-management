import express from 'express';
import { fetchUser, getUserById, loginUser, registerUser } from './user.controller.js';
import verifyToken from '../../Middleware/verifyToken.js';
const router = express.Router();


router.post('/create-user',registerUser)
router.post('/login',loginUser)
router.get('/fetch-user',verifyToken,fetchUser)
router.get('/', getUserById)
export default router