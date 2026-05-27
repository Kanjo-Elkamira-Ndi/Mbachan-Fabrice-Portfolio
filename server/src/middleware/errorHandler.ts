import { Request, Response, NextFunction } from 'express'
import { env } from '../config/env'

export interface AppError extends Error {
  statusCode?: number
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500
  console.error(`[${new Date().toISOString()}] ${statusCode} — ${err.message}`)
  if (env.isDev) console.error(err.stack)

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message,
    ...(env.isDev && { stack: err.stack }),
  })
}

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({ success: false, message: 'Route not found' })
}