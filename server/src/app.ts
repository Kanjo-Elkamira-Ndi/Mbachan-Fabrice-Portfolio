import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import { apiLimiter } from './middleware/rateLimit.middleware'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

import authRoutes from './routes/auth.routes'
import projectRoutes from './routes/projects.routes'
import certRoutes from './routes/certifications.routes'
import experienceRoutes from './routes/experience.routes'
import testimonialRoutes from './routes/testimonials.routes'
import technologyRoutes from './routes/technologies.routes'
import messageRoutes from './routes/messages.routes'

const app = express()

// ─── Security & Parsing ───────────────────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: env.clientUrl,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(apiLimiter)

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: env.nodeEnv })
})

// ─── Public API Routes ────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/certifications', certRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/technologies', technologyRoutes)
app.use('/api/messages', messageRoutes)

// ─── 404 & Error Handling ─────────────────────────────────────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

export default app