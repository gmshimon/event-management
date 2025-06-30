import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utils/axios.js'

const initialState = {
  user: null,
  isLoading: false,
  isLoginLoading: false,
  isLoginSuccess: false,
  isLoginError: false,
  isCreateUserLoading: false,
  isCreateUserSuccess: false,
  isCreateUserError: false,
  isGetUserDataLoading: false,
  isGetUserDataSuccess: false,
  isGetUserDataError: false,
  error: null
}

// Register user via backend
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/user/create-user', userData)
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Login user via backend
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, pass }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/user/login', { email, pass })
      if (res.data.data) {
        const tokenExpiration = new Date().getTime() + 5 * 60 * 60 * 1000;
        localStorage.setItem(
          'userToken',
          JSON.stringify({
            accessToken: res.data.accessToken,
            tokenExpiration: tokenExpiration,
          })
        ); 
      }
      return res.data.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Fetch user info from backend
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      // Use token from localStorage if needed
      const token = localStorage.getItem('userToken')
      const res = await axios.get('/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Logout (just clears token, backend can blacklist if needed)
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('userToken')
      return true
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetStatus: state => {
      state.isLoginLoading = false
      state.isLoginSuccess = false
      state.isLoginError = false
      state.isCreateUserLoading = false
      state.isCreateUserError = false
      state.isCreateUserSuccess = false
      state.isGetUserDataLoading = false
      state.isGetUserDataSuccess = false
      state.isGetUserDataError = false
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.isLoading = false
    }
  },
  extraReducers: builder => {
    builder
      // Register
      .addCase(registerUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserSuccess = false
        state.isCreateUserError = false
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isCreateUserLoading = false
        state.isCreateUserSuccess = true
        state.isCreateUserError = false
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isCreateUserLoading = false
        state.isCreateUserSuccess = false
        state.isCreateUserError = true
        state.error = action.payload
      })

      // Login
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginSuccess = false
        state.isLoginError = false
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.isLoginSuccess = false
        state.isLoginError = true
        state.error = action.payload
      })

      // Fetch User
      .addCase(fetchUser.pending, state => {
        state.isGetUserDataLoading = true
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = false
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = true
        state.isGetUserDataError = false
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = true
        state.error = action.payload
      })

      // Logout
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const { resetStatus, setUser } = userSlice.actions
export default userSlice.reducer
