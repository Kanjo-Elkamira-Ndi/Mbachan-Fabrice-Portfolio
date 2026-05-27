import { query } from '../db/pool'
import { Certification, CreateCertDTO, UpdateCertDTO } from '../types'

export const findAll = async (visibleOnly = false): Promise<Certification[]> => {
  const sql = visibleOnly
    ? 'SELECT * FROM certifications WHERE visible = TRUE ORDER BY order_index ASC, year DESC'
    : 'SELECT * FROM certifications ORDER BY order_index ASC, year DESC'
  return (await query<Certification>(sql)).rows
}

export const findById = async (id: number): Promise<Certification | null> => {
  const res = await query<Certification>('SELECT * FROM certifications WHERE id = $1', [id])
  return res.rows[0] ?? null
}

export const create = async (dto: CreateCertDTO): Promise<Certification> => {
  const res = await query<Certification>(
    `INSERT INTO certifications (name, issuer, year, color, badge_url, order_index, visible)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [dto.name, dto.issuer, dto.year, dto.color ?? '#00E5FF', dto.badge_url ?? null, dto.order_index ?? 0, dto.visible ?? true]
  )
  return res.rows[0]
}

export const update = async (id: number, dto: UpdateCertDTO): Promise<Certification | null> => {
  const fields: string[] = []
  const values: unknown[] = []
  let i = 1

  if (dto.name !== undefined)        { fields.push(`name=$${i++}`);        values.push(dto.name) }
  if (dto.issuer !== undefined)      { fields.push(`issuer=$${i++}`);      values.push(dto.issuer) }
  if (dto.year !== undefined)        { fields.push(`year=$${i++}`);        values.push(dto.year) }
  if (dto.color !== undefined)       { fields.push(`color=$${i++}`);       values.push(dto.color) }
  if (dto.badge_url !== undefined)   { fields.push(`badge_url=$${i++}`);   values.push(dto.badge_url) }
  if (dto.order_index !== undefined) { fields.push(`order_index=$${i++}`); values.push(dto.order_index) }
  if (dto.visible !== undefined)     { fields.push(`visible=$${i++}`);     values.push(dto.visible) }

  if (fields.length === 0) return findById(id)

  values.push(id)
  const res = await query<Certification>(
    `UPDATE certifications SET ${fields.join(', ')} WHERE id=$${i} RETURNING *`,
    values
  )
  return res.rows[0] ?? null
}

export const remove = async (id: number): Promise<boolean> => {
  const res = await query('DELETE FROM certifications WHERE id = $1', [id])
  return (res.rowCount ?? 0) > 0
}