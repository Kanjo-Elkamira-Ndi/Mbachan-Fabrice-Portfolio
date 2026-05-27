import { Pool, QueryResultRow } from 'pg'
import { env } from '../config/env'

const pool = new Pool({
  connectionString: env.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err)
  process.exit(-1)
})

export const query = <T extends QueryResultRow = Record<string, unknown>>(
  text: string,
  params?: unknown[]
) => pool.query<T>(text, params)

export const getClient = () => pool.connect()

export default pool