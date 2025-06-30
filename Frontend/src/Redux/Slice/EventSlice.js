import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../Utils/axiosSecure.js'

const initialState = {
  events: [],

  myEvents: [],
  myEventStats: {
    totalEvents: 0,
    totalAttendees: 0,
    avgAttendees: 0
  },

  isGetMyEventLoading: false,
  isGetMyEventSuccess: false,
  isGetMyEventError: false,

  isGetEventLoading: false,
  isGetEventSuccess: false,
  isGetEventError: false,

  isCreateEventLoading: false,
  isCreateEventSuccess: false,
  isCreateEventError: false,

  isUpdateEventLoading: false,
  isUpdateEventSuccess: false,
  isUpdateEventError: false,

  isDeleteEventLoading: false,
  isDeleteEventSuccess: false,
  isDeleteEventError: false,

  isAttendEventLoading: false,
  isAttendEventSuccess: false,
  isAttendEventError: false,

  error: null
}

// --- Fetch Events ---
export const fetchEvents = createAsyncThunk(
  'event/fetchEvents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosSecure.get('/events', { params });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// --- Create Event ---
export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const res = await axiosSecure.post('/events/create-event', eventData)
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// --- Update Event ---
export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const res = await axiosSecure.put(
        `/events/update-event/${id}`,
        updateData
      )
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// --- Delete Event ---
export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      await axiosSecure.delete(`/events/delete-event/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// --- Add Attendee ---
export const addAttendee = createAsyncThunk(
  'event/addAttendee',
  async ({ eventId }, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axiosSecure.post(`/events/attend/${eventId}`)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

export const fetchMyEvents = createAsyncThunk(
  'event/fetchMyEvents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosSecure.get('/events/my-event')
      // The backend response: { data: { events, totalEvents, totalAttendees, avgAttendees } }
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    resetEventState: state => {
      state.isGetEventLoading = false
      state.isGetEventSuccess = false
      state.isGetEventError = false

      state.isCreateEventLoading = false
      state.isCreateEventSuccess = false
      state.isCreateEventError = false

      state.isUpdateEventLoading = false
      state.isUpdateEventSuccess = false
      state.isUpdateEventError = false

      state.isDeleteEventLoading = false
      state.isDeleteEventSuccess = false
      state.isDeleteEventError = false

      state.isAttendEventLoading = false
      state.isAttendEventSuccess = false
      state.isAttendEventError = false

      state.isGetMyEventLoading = false
      state.isGetMyEventSuccess = false
      state.isGetMyEventError = false

      state.error = null
    }
  },
  extraReducers: builder => {
    // Fetch Events
    builder
      .addCase(fetchEvents.pending, state => {
        state.isGetEventLoading = true
        state.isGetEventSuccess = false
        state.isGetEventError = false
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isGetEventLoading = false
        state.isGetEventSuccess = true
        state.isGetEventError = false
        state.events = action.payload
        state.error = null
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isGetEventLoading = false
        state.isGetEventSuccess = false
        state.isGetEventError = true
        state.error = action.payload
      })

      .addCase(createEvent.pending, state => {
        state.isCreateEventLoading = true
        state.isCreateEventSuccess = false
        state.isCreateEventError = false
        state.error = null
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isCreateEventLoading = false
        state.isCreateEventSuccess = true
        state.isCreateEventError = false
        state.events.unshift(action.payload)
        state.error = null
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isCreateEventLoading = false
        state.isCreateEventSuccess = false
        state.isCreateEventError = true
        state.error = action.payload
      })

      .addCase(updateEvent.pending, state => {
        state.isUpdateEventLoading = true
        state.isUpdateEventSuccess = false
        state.isUpdateEventError = false
        state.error = null
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isUpdateEventLoading = false
        state.isUpdateEventSuccess = true
        state.isUpdateEventError = false
        // Update the event in the events array
        state.events = state.events.map(event =>
          event._id === action.payload._id ? action.payload : event
        )
        state.error = null
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isUpdateEventLoading = false
        state.isUpdateEventSuccess = false
        state.isUpdateEventError = true
        state.error = action.payload
      })
      .addCase(deleteEvent.pending, state => {
        state.isDeleteEventLoading = true
        state.isDeleteEventSuccess = false
        state.isDeleteEventError = false
        state.error = null
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isDeleteEventLoading = false
        state.isDeleteEventSuccess = true
        state.isDeleteEventError = false
        // Remove deleted event from events array
        state.events = state.events.filter(
          event => event._id !== action.payload
        )
        state.error = null
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isDeleteEventLoading = false
        state.isDeleteEventSuccess = false
        state.isDeleteEventError = true
        state.error = action.payload
      })
      .addCase(addAttendee.pending, state => {
        state.isAttendEventLoading = true
        state.isAttendEventSuccess = false
        state.isAttendEventError = false
        state.error = null
      })
      .addCase(addAttendee.fulfilled, (state) => {
        state.isAttendEventLoading = false
        state.isAttendEventSuccess = true
        state.isAttendEventError = false
        state.error = null
      })
      .addCase(addAttendee.rejected, (state, action) => {
        state.isAttendEventLoading = false
        state.isAttendEventSuccess = false
        state.isAttendEventError = true
        state.error = action.payload
      })
      .addCase(fetchMyEvents.pending, state => {
        state.isGetMyEventLoading = true
        state.isGetMyEventSuccess = false
        state.isGetMyEventError = false
        state.error = null
      })
      .addCase(fetchMyEvents.fulfilled, (state, action) => {
        state.isGetMyEventLoading = false
        state.isGetMyEventSuccess = true
        state.isGetMyEventError = false
        state.myEvents = action.payload.events
        state.myEventStats = {
          totalEvents: action.payload.totalEvents,
          totalAttendees: action.payload.totalAttendees,
          avgAttendees: action.payload.avgAttendees
        }
        state.error = null
      })
      .addCase(fetchMyEvents.rejected, (state, action) => {
        state.isGetMyEventLoading = false
        state.isGetMyEventSuccess = false
        state.isGetMyEventError = true
        state.error = action.payload
      })
  }
})

export const { resetEventState } = eventSlice.actions
export default eventSlice.reducer
