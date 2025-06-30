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

    organizerName: {
      type: String,
      trim: true,
      required: true
    },

    dateTime: {
      type: Date,
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

/* ------------------------------- indexes ------------------------------ */
eventSchema.index({ dateTime: 1, title: 1 })
eventSchema.index({ title: 'text', description: 'text' })

/* --------------------------- instance method -------------------------- */
eventSchema.methods.addAttendee = async function (userId) {
  if (this.attendees.includes(userId))
    throw new Error('User already joined this event')

  this.attendees.push(userId)
  this.attendeeCount = this.attendees.length
  return this.save()
}

/* ------------------------------- export ------------------------------- */
export default model('Event', eventSchema)
