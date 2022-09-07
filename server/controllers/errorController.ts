import { ErrorRequestHandler, RequestHandler } from "express"

export const routeNotFound: RequestHandler = (req, res, next) => {
  res.status(400).json({
    status: 'error',
    message: `The route '${req.originalUrl}' not found.`
  })
}

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400).json({
    status: 'failed',
    message: err.message,
    stack: err.stack
  })
}