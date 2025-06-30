import express from 'express';
import { registerUser } from './user.controller.js';
const router = express.Router();


router.post('/create-user',registerUser)
export default router