import express from 'express';
const router = express.Router();


router.post('/create-user',authController.registerUser)
export default router