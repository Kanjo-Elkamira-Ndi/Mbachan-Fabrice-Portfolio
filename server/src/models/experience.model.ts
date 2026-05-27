import { query } from '../db/pool'
import { Experience, CreateExperienceDTO, UpdateExperienceDTO } from '../types'

export const findAll = async (visibleOnly = false): Promise<Experience[]> => {
  const sql = visibleOnly
    ? 'SELECT * FROM experience WHERE visible = TRUE ORDER BY order_index ASC'
    : 'SELECT * FROM experience ORDER BY order_index ASC'
  return (await query<Experience>(sql)).rows
}

export const findById = async (id: number): Promise<Experience | null> => {
  const res = await query<Experience>('SELECT * FROM experience WHERE id = $1', [id])
  return res.rows[0] ?? null
}

export const create = async (dto: CreateExperienceDTO): Promise<Experience> => {
  const res = await query<Experience>(
    `INSERT INTO experience (organization, role, period, location, highlights, order_index, visible)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [dto.organization, dto.role, dto.period, dto.location, dto.highlights ?? [], dto.order_index ?? 0, dto.visible ?? true]
  )
  return res.rows[0]
}

export const update = async (id: number, dto: UpdateExperienceDTO): Promise<Experience | null> => {
  const fields: string[] = []
  const values: unknown[] = []
  let i = 1

  if (dto.organization !== undefined) { fields.push(`organization=$${i++}`); values.push(dto.organization) }
  if (dto.role !== undefined)         { fields.push(`role=$${i++}`);         values.push(dto.role) }
  if (dto.period !== undefined)       { fields.push(`period=$${i++}`);       values.push(dto.period) }
  if (dto.location !== undefined)     { fields.push(`location=$${i++}`);     values.push(dto.location) }
  if (dto.highlights !== undefined)   { fields.push(`highlights=$${i++}`);   values.push(dto.highlights) }
  if (dto.order_index !== undefined)  { fields.push(`order_index=$${i++}`);  values.push(dto.order_index) }
  if (dto.visible !== undefined)      { fields.push(`visible=$${i++}`);      values.push(dto.visible) }

  if (fields.length === 0) return findById(id)

  values.push(id)
  const res = await query<Experience>(
    `UPDATE experience SET ${fields.join(', ')} WHERE id=$${i} RETURNING *`,
    values
  )
  return res.rows[0] ?? null
}

export const remove = async (id: number): Promise<boolean> => {
  const res = await query('DELETE FROM experience WHERE id = $1', [id])
  return (res.rowCount ?? 0) > 0
}