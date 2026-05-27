import fs from 'fs'
import path from 'path'
import { query } from './pool'
import { env } from '../config/env'
import bcrypt from 'bcryptjs'

const migrationsDir = path.join(__dirname, 'migrations')

async function runMigrations() {
  console.log('🗄️  Running migrations...')
  const files = fs.readdirSync(migrationsDir).sort()

  for (const file of files) {
    if (!file.endsWith('.sql')) continue
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8')
    await query(sql)
    console.log(`  ✓ ${file}`)
  }
}

async function seedAdmin() {
  console.log('\n👤 Seeding admin user...')
  const existing = await query('SELECT id FROM users WHERE email = $1', [env.adminEmail])
  if (existing.rows.length > 0) {
    console.log('  ℹ Admin user already exists — skipping.')
    return
  }
  const hash = await bcrypt.hash(env.adminPassword, 12)
  await query(
    'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)',
    [env.adminEmail, hash, 'admin']
  )
  console.log(`  ✓ Admin created: ${env.adminEmail}`)
}

async function main() {
  try {
    await runMigrations()
    await seedAdmin()
    console.log('\n✅ Database ready.\n')
    process.exit(0)
  } catch (err) {
    console.error('\n❌ Migration failed:', err)
    process.exit(1)
  }
}

main()