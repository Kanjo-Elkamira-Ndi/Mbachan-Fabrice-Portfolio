import app from './app'
import { env } from './config/env'
import pool from './db/pool'

const start = async () => {
  // Verify DB connection before accepting traffic
  try {
    const client = await pool.connect()
    client.release()
    console.log('✅ PostgreSQL connected')
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err)
    process.exit(1)
  }

  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port} [${env.nodeEnv}]`)
    console.log(`   Health: http://localhost:${env.port}/health`)
    console.log(`   API:    http://localhost:${env.port}/api`)
  })
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received — shutting down gracefully')
  await pool.end()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await pool.end()
  process.exit(0)
})

start()