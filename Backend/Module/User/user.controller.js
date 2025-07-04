import generateToken from '../../Utils/generateToken.js'
import User from './user.model.js'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res, next) => {
  try {
    const userData = req.body

    const result = await User.create(userData)

    res.status(200).json({
      status: 'success',
      message: 'Successfully registered',
      data: result.email
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, pass } = req.body

    if (!email || !pass) {
      return next('Please provide credentials', 400)
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return next('No user with this email', 404)
    }
    const isPasswordValid = bcrypt.compareSync(pass, user.password)
    if (!isPasswordValid) {
      return next('Wrong credentials', 401)
    }
    const { accessToken } = generateToken(user)
    const { password, ...others } = user.toObject()
    res.status(200).json({
      status: 'Success',
      message: 'Login successful',
      data: others,
      accessToken: accessToken
    })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res) => {
  try {
    const { _id } = req.user

    const user = await User.findById(_id).select('-password') // Exclude sensitive info

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const fetchUser = async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await User.findOne({ _id: id })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
