import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import * as Model from '../models/experience.model'
import * as R from '../utils/response'

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const visibleOnly = req.query.all !== 'true'
    R.ok(res, await Model.findAll(visibleOnly))
  } catch (err) { R.serverError(res, err) }
}

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Model.findById(Number(req.params.id))
    if (!item) { R.notFound(res); return }
    R.ok(res, item)
  } catch (err) { R.serverError(res, err) }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) { R.badRequest(res, 'Validation failed', errors.array()); return }
  try {
    R.created(res, await Model.create(req.body))
  } catch (err) { R.serverError(res, err) }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Model.update(Number(req.params.id), req.body)
    if (!item) { R.notFound(res); return }
    R.ok(res, item)
  } catch (err) { R.serverError(res, err) }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Model.remove(Number(req.params.id))
    if (!deleted) { R.notFound(res); return }
    R.noContent(res)
  } catch (err) { R.serverError(res, err) }
}