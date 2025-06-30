import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import {
  addAttendee,
  createEvents,
  deleteEvent,
  getEvent,
  getMyEvent,
  updateEvent
} from './event.controller.js'

const router = express.Router()

router.delete('/delete-event/:id', deleteEvent)
router.put('/update-event/:id', updateEvent)
router.post('/attend/:eventId/', addAttendee)
router.post('/create-event', verifyToken, createEvents)
router.get('/my-event', verifyToken, getMyEvent)
router.get('/', getEvent)

export default router
