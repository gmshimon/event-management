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
      type: String,
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
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'Fitness'
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',

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
    }
  },
  { timestamps: true }
)

eventSchema.index({ date: 1, time: 1 })
eventSchema.index({ title: 'text', description: 'text' })

eventSchema.methods.addAttendee = async function (userId) {
  if (this.attendees.includes(userId))
    throw new Error('User already joined this event')

  this.attendees.push(userId)
  this.attendeeCount = this.attendees.length
  return this.save()
}

eventSchema.pre('validate', function (next) {
  if (!this.category) {
    // Choose random category if not provided
    const categories = [
      'Fitness',
      'Education',
      'Literature',
      'Business',
      'Food',
      'Music',
      'Technology'
    ]
    this.category = categories[Math.floor(Math.random() * categories.length)]
  }
  next()
})

export default model('Event', eventSchema)
