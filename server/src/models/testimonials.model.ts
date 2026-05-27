import { query } from '../db/pool'
import { Testimonial, CreateTestimonialDTO, UpdateTestimonialDTO } from '../types'

export const findAll = async (visibleOnly = false): Promise<Testimonial[]> => {
  const sql = visibleOnly
    ? 'SELECT * FROM testimonials WHERE visible = TRUE ORDER BY order_index ASC'
    : 'SELECT * FROM testimonials ORDER BY order_index ASC'
  return (await query<Testimonial>(sql)).rows
}

export const findById = async (id: number): Promise<Testimonial | null> => {
  const res = await query<Testimonial>('SELECT * FROM testimonials WHERE id = $1', [id])
  return res.rows[0] ?? null
}

export const create = async (dto: CreateTestimonialDTO): Promise<Testimonial> => {
  const res = await query<Testimonial>(
    `INSERT INTO testimonials (quote, author, role, organization, initials, color, order_index, visible)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [dto.quote, dto.author, dto.role, dto.organization, dto.initials, dto.color ?? '#00E5FF', dto.order_index ?? 0, dto.visible ?? true]
  )
  return res.rows[0]
}

export const update = async (id: number, dto: UpdateTestimonialDTO): Promise<Testimonial | null> => {
  const fields: string[] = []
  const values: unknown[] = []
  let i = 1

  if (dto.quote !== undefined)        { fields.push(`quote=$${i++}`);        values.push(dto.quote) }
  if (dto.author !== undefined)       { fields.push(`author=$${i++}`);       values.push(dto.author) }
  if (dto.role !== undefined)         { fields.push(`role=$${i++}`);         values.push(dto.role) }
  if (dto.organization !== undefined) { fields.push(`organization=$${i++}`); values.push(dto.organization) }
  if (dto.initials !== undefined)     { fields.push(`initials=$${i++}`);     values.push(dto.initials) }
  if (dto.color !== undefined)        { fields.push(`color=$${i++}`);        values.push(dto.color) }
  if (dto.order_index !== undefined)  { fields.push(`order_index=$${i++}`);  values.push(dto.order_index) }
  if (dto.visible !== undefined)      { fields.push(`visible=$${i++}`);      values.push(dto.visible) }

  if (fields.length === 0) return findById(id)

  values.push(id)
  const res = await query<Testimonial>(
    `UPDATE testimonials SET ${fields.join(', ')} WHERE id=$${i} RETURNING *`,
    values
  )
  return res.rows[0] ?? null
}

export const remove = async (id: number): Promise<boolean> => {
  const res = await query('DELETE FROM testimonials WHERE id = $1', [id])
  return (res.rowCount ?? 0) > 0
}