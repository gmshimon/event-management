import generateToken from '../../Utils/generateToken.js'
import User from './user.model.js'
import bcrypt from 'bcrypt'

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
      return next(makeError('Please provide credentials', 400))
    }
    const user = await User.findOne({ email })
    if (!user) {
      return next(makeError('No user with this email', 404))
    }
    const isPasswordValid = bcrypt.compareSync(pass, user.password)
    if (!isPasswordValid) {
      return next(makeError('Wrong credentials', 401))
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
    next(err)
  }
}


