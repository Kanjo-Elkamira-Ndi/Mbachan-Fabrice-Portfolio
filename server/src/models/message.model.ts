import { query } from '../db/pool'
import { Message, CreateMessageDTO } from '../types'

export const findAll = async (): Promise<Message[]> => {
  const res = await query<Message>('SELECT * FROM messages ORDER BY created_at DESC')
  return res.rows
}

export const findById = async (id: number): Promise<Message | null> => {
  const res = await query<Message>('SELECT * FROM messages WHERE id = $1', [id])
  return res.rows[0] ?? null
}

export const create = async (dto: CreateMessageDTO): Promise<Message> => {
  const res = await query<Message>(
    `INSERT INTO messages (name, email, subject, message) VALUES ($1,$2,$3,$4) RETURNING *`,
    [dto.name, dto.email, dto.subject, dto.message]
  )
  return res.rows[0]
}

export const markRead = async (id: number, isRead: boolean): Promise<Message | null> => {
  const res = await query<Message>(
    'UPDATE messages SET is_read = $1 WHERE id = $2 RETURNING *',
    [isRead, id]
  )
  return res.rows[0] ?? null
}

export const remove = async (id: number): Promise<boolean> => {
  const res = await query('DELETE FROM messages WHERE id = $1', [id])
  return (res.rowCount ?? 0) > 0
}

export const unreadCount = async (): Promise<number> => {
  const res = await query<{ count: string }>('SELECT COUNT(*) FROM messages WHERE is_read = FALSE')
  return parseInt(res.rows[0].count, 10)
}