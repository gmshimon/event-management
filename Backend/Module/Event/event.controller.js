import eventModel from './event.model.js'

export const createEvents = async (req, res, next) => {
  try {
    const { title, organizer, date, time, location, description, image } =
      req.body
    const { id } = req.user
    const createdBy = id
    // Input validation (basic)
    if (
      !title ||
      !organizer ||
      !date ||
      !time ||
      !location ||
      !description ||
      !image
    ) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    // Create new event document
    const newEvent = new eventModel({
      title,
      organizer,
      date,
      time,
      location,
      description,
      createdBy,
      image
    })

    // Save to DB
    const savedEvent = await newEvent.save()

    return res.status(201).json({
      message: 'Event created successfully',
      event: savedEvent
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedEvent = await eventModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }

    return res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent
    })
  } catch (error) {
    console.error('Error updating event:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params

    const deletedEvent = await eventModel.findByIdAndDelete(id)

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }

    return res.status(200).json({
      message: 'Event deleted successfully',
      event: deletedEvent
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const addAttendee = async (req, res) => {
  try {
    const { eventId } = req.params
    const { id } = req.user

    if (!id) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    const event = await eventModel.findById(eventId)

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    // Check if user is already an attendee
    if (event.attendees.includes(id)) {
      return res.status(400).json({ message: 'User already joined this event' })
    }

    // Add user and update attendee count
    event.attendees.push(id)
    event.attendeeCount = event.attendees.length

    await event.save()

    return res.status(200).json({
      message: 'User successfully added to the event',
      event
    })
  } catch (error) {
    console.error('Error adding attendee:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getMyEvent = async (req, res, next) => {
  try {
    const { id } = req.user
    // 1. Find all events created by this user
    const events = await eventModel.find({ createdBy: id })
    // 2. Calculate totals
    const totalEvents = events.length
    const totalAttendees = events.reduce(
      (sum, event) => sum + (event.attendeeCount || 0),
      0
    )
    const avgAttendees = totalEvents > 0 ? totalAttendees / totalEvents : 0
    // 3. Send response
    res.status(200).json({
      success: true,
      data: {
        events,
        totalEvents,
        totalAttendees,
        avgAttendees
      }
    })
  } catch (error) {
    next(error)
  }
}
