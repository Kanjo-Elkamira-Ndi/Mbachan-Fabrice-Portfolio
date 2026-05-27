import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import * as Model from '../models/message.model'
import * as R from '../utils/response'

export const submitValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
]

// POST /api/messages — public contact form
export const submit = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) { R.badRequest(res, 'Validation failed', errors.array()); return }
  try {
    const msg = await Model.create(req.body)
    R.created(res, { id: msg.id }, 'Message received. Thank you for reaching out!')
  } catch (err) { R.serverError(res, err) }
}

// GET /api/admin/messages — admin inbox
export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Model.findAll()
    const unread = await Model.unreadCount()
    R.ok(res, { messages, unread })
  } catch (err) { R.serverError(res, err) }
}

// GET /api/admin/messages/:id
export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const msg = await Model.findById(Number(req.params.id))
    if (!msg) { R.notFound(res, 'Message not found'); return }
    // Auto mark as read when opened
    if (!msg.is_read) await Model.markRead(msg.id, true)
    R.ok(res, { ...msg, is_read: true })
  } catch (err) { R.serverError(res, err) }
}

// PATCH /api/admin/messages/:id/read
export const toggleRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { is_read } = req.body
    if (typeof is_read !== 'boolean') { R.badRequest(res, 'is_read (boolean) is required'); return }
    const msg = await Model.markRead(Number(req.params.id), is_read)
    if (!msg) { R.notFound(res, 'Message not found'); return }
    R.ok(res, msg)
  } catch (err) { R.serverError(res, err) }
}

// DELETE /api/admin/messages/:id
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Model.remove(Number(req.params.id))
    if (!deleted) { R.notFound(res, 'Message not found'); return }
    R.noContent(res)
  } catch (err) { R.serverError(res, err) }
}