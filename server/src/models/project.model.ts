import { query } from '../db/pool'
import { Project, CreateProjectDTO, UpdateProjectDTO } from '../types'

export const findAll = async (visibleOnly = false): Promise<Project[]> => {
  const sql = visibleOnly
    ? 'SELECT * FROM projects WHERE visible = TRUE ORDER BY order_index ASC, created_at DESC'
    : 'SELECT * FROM projects ORDER BY order_index ASC, created_at DESC'
  const res = await query<Project>(sql)
  return res.rows
}

export const findById = async (id: number): Promise<Project | null> => {
  const res = await query<Project>('SELECT * FROM projects WHERE id = $1', [id])
  return res.rows[0] ?? null
}

export const create = async (dto: CreateProjectDTO): Promise<Project> => {
  const res = await query<Project>(
    `INSERT INTO projects
       (title, category, confidential, challenge, outcome, metrics, technologies, order_index, visible)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [
      dto.title, dto.category, dto.confidential, dto.challenge,
      dto.outcome, dto.metrics, dto.technologies, dto.order_index ?? 0, dto.visible ?? true,
    ]
  )
  return res.rows[0]
}

export const update = async (id: number, dto: UpdateProjectDTO): Promise<Project | null> => {
  const fields: string[] = []
  const values: unknown[] = []
  let i = 1

  if (dto.title !== undefined)        { fields.push(`title=$${i++}`);        values.push(dto.title) }
  if (dto.category !== undefined)     { fields.push(`category=$${i++}`);     values.push(dto.category) }
  if (dto.confidential !== undefined) { fields.push(`confidential=$${i++}`); values.push(dto.confidential) }
  if (dto.challenge !== undefined)    { fields.push(`challenge=$${i++}`);    values.push(dto.challenge) }
  if (dto.outcome !== undefined)      { fields.push(`outcome=$${i++}`);      values.push(dto.outcome) }
  if (dto.metrics !== undefined)      { fields.push(`metrics=$${i++}`);      values.push(dto.metrics) }
  if (dto.technologies !== undefined) { fields.push(`technologies=$${i++}`); values.push(dto.technologies) }
  if (dto.order_index !== undefined)  { fields.push(`order_index=$${i++}`);  values.push(dto.order_index) }
  if (dto.visible !== undefined)      { fields.push(`visible=$${i++}`);      values.push(dto.visible) }

  if (fields.length === 0) return findById(id)

  values.push(id)
  const res = await query<Project>(
    `UPDATE projects SET ${fields.join(', ')} WHERE id=$${i} RETURNING *`,
    values
  )
  return res.rows[0] ?? null
}

export const remove = async (id: number): Promise<boolean> => {
  const res = await query('DELETE FROM projects WHERE id = $1', [id])
  return (res.rowCount ?? 0) > 0
}