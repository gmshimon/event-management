import express from 'express';
import { getUserById, registerUser } from './user.controller.js';
const router = express.Router();


router.post('/create-user',registerUser)
router.get('/', getUserById)
export default router