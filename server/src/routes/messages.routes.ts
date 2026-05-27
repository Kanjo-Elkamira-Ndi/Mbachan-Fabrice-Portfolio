import { Router } from 'express'
import * as ctrl from '../controllers/messages.controller'
import { authenticate } from '../middleware/auth.middleware'
import { contactLimiter } from '../middleware/rateLimit.middleware'

const router = Router()

// Public — contact form submission (rate limited)
router.post('/', contactLimiter, ctrl.submitValidation, ctrl.submit)

// Admin — protected inbox
router.get('/', authenticate, ctrl.getAll)
router.get('/:id', authenticate, ctrl.getOne)
router.patch('/:id/read', authenticate, ctrl.toggleRead)
router.delete('/:id', authenticate, ctrl.remove)

export default router