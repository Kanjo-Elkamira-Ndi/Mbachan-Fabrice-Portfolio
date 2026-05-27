import { Router } from 'express'
import * as ctrl from '../controllers/certifications.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

// Public — visible items only
router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)

// Admin — protected
router.post('/', authenticate, ctrl.create)
router.patch('/:id', authenticate, ctrl.update)
router.delete('/:id', authenticate, ctrl.remove)

export default router