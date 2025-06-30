import express from 'express';
import verifyToken from '../../Middleware/verifyToken.js';

const router = express.Router();

router.delete('/delete-event/:id', deleteEvent)
router.put('/update-event/:id', updateEvent)
router.post('/attend/:eventId/', addAttendee)
router.post('/create-event',verifyToken,createEvents)

export default router