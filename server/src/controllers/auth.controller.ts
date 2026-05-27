import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import * as UserModel from '../models/user.model'
import { signToken } from '../utils/jwt'
import * as R from '../utils/response'
import { AuthRequest } from '../types'

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
]

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) { R.badRequest(res, 'Validation failed', errors.array()); return }

  const { email, password } = req.body
  const user = await UserModel.findByEmail(email)
  if (!user) { R.unauthorized(res, 'Invalid credentials'); return }

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) { R.unauthorized(res, 'Invalid credentials'); return }

  const token = signToken({ userId: user.id, email: user.email, role: user.role })
  R.ok(res, { token, user: { id: user.id, email: user.email, role: user.role } }, 'Login successful')
}

export const me = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await UserModel.findById(req.user!.userId)
  if (!user) { R.notFound(res, 'User not found'); return }
  R.ok(res, { id: user.id, email: user.email, role: user.role })
}

export const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
]

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) { R.badRequest(res, 'Validation failed', errors.array()); return }

  const user = await UserModel.findByEmail(req.user!.email)
  if (!user) { R.notFound(res); return }

  const valid = await bcrypt.compare(req.body.currentPassword, user.password_hash)
  if (!valid) { R.unauthorized(res, 'Current password is incorrect'); return }

  const hash = await bcrypt.hash(req.body.newPassword, 12)
  await UserModel.updatePassword(user.id, hash)
  R.ok(res, null, 'Password changed successfully')
}