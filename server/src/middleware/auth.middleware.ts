import { Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { unauthorized } from '../utils/response'
import { AuthRequest } from '../types'

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    unauthorized(res, 'No token provided')
    return
  }
  const token = authHeader.split(' ')[1]
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    unauthorized(res, 'Invalid or expired token')
  }
}