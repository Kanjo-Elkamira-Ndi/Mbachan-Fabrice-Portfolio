import { query } from '../db/pool'
import { Technology, CreateTechnologyDTO, UpdateTechnologyDTO } from '../types'

export const findAll = async (visibleOnly = false): Promise<Technology[]> => {
  const sql = visibleOnly
    ? 'SELECT * FROM technologies WHERE visible = TRUE ORDER BY category ASC, order_index ASC'
    : 'SELECT * FROM technologies ORDER BY category ASC, order_index ASC'
  return (await query<Technology>(sql)).rows
}

export const findById = async (id: number): Promise<Technology | null> => {
  const res = await query<Technology>('SELECT * FROM technologies WHERE id = $1', [id])
  return res.rows[0] ?? null
}

export const create = async (dto: CreateTechnologyDTO): Promise<Technology> => {
  const res = await query<Technology>(
    `INSERT INTO technologies (name, category, icon_url, order_index, visible)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [dto.name, dto.category, dto.icon_url ?? null, dto.order_index ?? 0, dto.visible ?? true]
  )
  return res.rows[0]
}

export const update = async (id: number, dto: UpdateTechnologyDTO): Promise<Technology | null> => {
  const fields: string[] = []
  const values: unknown[] = []
  let i = 1

  if (dto.name !== undefined)        { fields.push(`name=$${i++}`);        values.push(dto.name) }
  if (dto.category !== undefined)    { fields.push(`category=$${i++}`);    values.push(dto.category) }
  if (dto.icon_url !== undefined)    { fields.push(`icon_url=$${i++}`);    values.push(dto.icon_url) }
  if (dto.order_index !== undefined) { fields.push(`order_index=$${i++}`); values.push(dto.order_index) }
  if (dto.visible !== undefined)     { fields.push(`visible=$${i++}`);     values.push(dto.visible) }

  if (fields.length === 0) return findById(id)

  values.push(id)
  const res = await query<Technology>(
    `UPDATE technologies SET ${fields.join(', ')} WHERE id=$${i} RETURNING *`,
    values
  )
  return res.rows[0] ?? null
}

export const remove = async (id: number): Promise<boolean> => {
  const res = await query('DELETE FROM technologies WHERE id = $1', [id])
  return (res.rowCount ?? 0) > 0
}