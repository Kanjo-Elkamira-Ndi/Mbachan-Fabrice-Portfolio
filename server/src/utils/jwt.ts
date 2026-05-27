import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { AuthPayload } from '../types'

export const signToken = (payload: AuthPayload): string =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn } as jwt.SignOptions)

export const verifyToken = (token: string): AuthPayload =>
  jwt.verify(token, env.jwtSecret) as AuthPayload