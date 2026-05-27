import { Router } from 'express'
import * as ctrl from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware'
import { loginLimiter } from '../middleware/rateLimit.middleware'

const router = Router()

// POST /api/auth/login
router.post('/login', loginLimiter, ctrl.loginValidation, ctrl.login)

// GET /api/auth/me  — protected
router.get('/me', authenticate, ctrl.me)

// PATCH /api/auth/change-password  — protected
router.patch('/change-password', authenticate, ctrl.changePasswordValidation, ctrl.changePassword)

export default router