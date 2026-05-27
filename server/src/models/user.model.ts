import { query } from '../db/pool'
import { User } from '../types'

export const findByEmail = async (email: string): Promise<User | null> => {
  const res = await query<User>('SELECT * FROM users WHERE email = $1', [email])
  return res.rows[0] ?? null
}

export const findById = async (id: number): Promise<User | null> => {
  const res = await query<User>('SELECT id, email, role, created_at FROM users WHERE id = $1', [id])
  return res.rows[0] ?? null
}

export const updatePassword = async (id: number, hash: string): Promise<void> => {
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, id])
}