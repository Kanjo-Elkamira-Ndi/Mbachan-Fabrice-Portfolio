import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import * as Model from '../models/project.model'
import * as R from '../utils/response'

export const validation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('challenge').notEmpty().withMessage('Challenge is required'),
  body('outcome').notEmpty().withMessage('Outcome is required'),
  body('metrics').isArray().withMessage('Metrics must be an array'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
]

// GET /api/projects  — public (visible only)
// GET /api/projects?all=true  — admin (all rows)
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const visibleOnly = req.query.all !== 'true'
    const data = await Model.findAll(visibleOnly)
    R.ok(res, data)
  } catch (err) { R.serverError(res, err) }
}

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Model.findById(Number(req.params.id))
    if (!item) { R.notFound(res, 'Project not found'); return }
    R.ok(res, item)
  } catch (err) { R.serverError(res, err) }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) { R.badRequest(res, 'Validation failed', errors.array()); return }
  try {
    const item = await Model.create(req.body)
    R.created(res, item, 'Project created')
  } catch (err) { R.serverError(res, err) }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Model.update(Number(req.params.id), req.body)
    if (!item) { R.notFound(res, 'Project not found'); return }
    R.ok(res, item, 'Project updated')
  } catch (err) { R.serverError(res, err) }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Model.remove(Number(req.params.id))
    if (!deleted) { R.notFound(res, 'Project not found'); return }
    R.noContent(res)
  } catch (err) { R.serverError(res, err) }
}