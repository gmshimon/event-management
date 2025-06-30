// middlewares/globalErrorHandler.js
const globalErrorHandler = (err, req, res, next) => {
  // Fallbacks
  const statusCode = err.statusCode || 500
  const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({ status, message })
}

export default globalErrorHandler
