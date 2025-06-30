import { Schema, model } from 'mongoose'

const eventSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 80
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    location: {
      type: String,
      trim: true,
      required: true,
      maxlength: 120
    },

    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },

    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
      }
    ],

    attendeeCount: {
      type: Number,
      default: 0,
      min: 0
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }
  },
  { timestamps: true }
)

eventSchema.index({ date: 1, time: 1, })
eventSchema.index({ title: 'text', description: 'text' })

eventSchema.methods.addAttendee = async function (userId) {
  if (this.attendees.includes(userId))
    throw new Error('User already joined this event')

  this.attendees.push(userId)
  this.attendeeCount = this.attendees.length
  return this.save()
}

export default model('Event', eventSchema)
