import { Request } from 'express'

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface AuthPayload {
  userId: number
  email: string
  role: string
}

export interface AuthRequest extends Request {
  user?: AuthPayload
}

// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: number
  email: string
  password_hash: string
  role: string
  created_at: Date
}

// ─── Project ─────────────────────────────────────────────────────────────────
export interface Project {
  id: number
  title: string
  category: string
  confidential: boolean
  challenge: string
  outcome: string
  metrics: string[]       // stored as TEXT[] in postgres
  technologies: string[]  // stored as TEXT[] in postgres
  order_index: number
  visible: boolean
  created_at: Date
  updated_at: Date
}

export type CreateProjectDTO = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type UpdateProjectDTO = Partial<CreateProjectDTO>

// ─── Certification ────────────────────────────────────────────────────────────
export interface Certification {
  id: number
  name: string
  issuer: string
  year: string
  color: string
  badge_url: string | null
  visible: boolean
  order_index: number
  created_at: Date
  updated_at: Date
}

export type CreateCertDTO = Omit<Certification, 'id' | 'created_at' | 'updated_at'>
export type UpdateCertDTO = Partial<CreateCertDTO>

// ─── Experience ───────────────────────────────────────────────────────────────
export interface Experience {
  id: number
  organization: string
  role: string
  period: string
  location: string
  highlights: string[]
  order_index: number
  visible: boolean
  created_at: Date
  updated_at: Date
}

export type CreateExperienceDTO = Omit<Experience, 'id' | 'created_at' | 'updated_at'>
export type UpdateExperienceDTO = Partial<CreateExperienceDTO>

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  organization: string
  initials: string
  color: string
  visible: boolean
  order_index: number
  created_at: Date
  updated_at: Date
}

export type CreateTestimonialDTO = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>
export type UpdateTestimonialDTO = Partial<CreateTestimonialDTO>

// ─── Technology ───────────────────────────────────────────────────────────────
export interface Technology {
  id: number
  name: string
  category: string
  icon_url: string | null
  order_index: number
  visible: boolean
  created_at: Date
  updated_at: Date
}

export type CreateTechnologyDTO = Omit<Technology, 'id' | 'created_at' | 'updated_at'>
export type UpdateTechnologyDTO = Partial<CreateTechnologyDTO>

// ─── Message ──────────────────────────────────────────────────────────────────
export interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: Date
}

export type CreateMessageDTO = Pick<Message, 'name' | 'email' | 'subject' | 'message'>