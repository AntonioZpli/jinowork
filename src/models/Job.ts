// ─── Model: Job ─────────────────────────────────────────────────────────────
// Represents a job listing on the Jinowork platform.

export type JobModality = 'Remoto' | 'Presencial' | 'Híbrido'
export type JobSeniority = 'Junior' | 'Mid' | 'Senior' | 'Sin experiencia'
export type JobContract = 'Tiempo completo' | 'Medio tiempo' | 'Temporal' | 'Prácticas' | 'Por proyecto'

export interface Job {
  id: number
  ownerId?: number
  title: string
  company: string
  companyInitials: string
  companyColor: string
  location: string
  country: string
  modality: JobModality
  seniority: JobSeniority
  contract: JobContract
  salary: string | null
  description: string
  tags: string[]
  postedAt: string
  featured: boolean
  category: string
  areaId?: string
  specializationId?: string
  requiredSkillIds?: string[]
  minimumExperienceYears?: number
  educationRequirements?: string[]
  department?: string
  municipality?: string
  status?: 'active' | 'closed'
}

export type ApplicationStatus = 'submitted' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted'

export interface ApplicationProfileSnapshot {
  areaId?: string
  specializationIds: string[]
  skillIds: string[]
  experienceYears: number
  education: Array<{ degree: string; institution: string; year: string; field: string }>
}

export interface JobApplication {
  id: number
  jobId: number
  candidateId: number
  candidate: User
  appliedAt: string
  status: ApplicationStatus
  note: string
  profileSnapshot: ApplicationProfileSnapshot
}
import type { User } from '@/models/User'
