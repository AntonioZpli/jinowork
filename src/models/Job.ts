// ─── Model: Job ─────────────────────────────────────────────────────────────
// Represents a job listing on the Jinowork platform.

export type JobModality = 'Remoto' | 'Presencial' | 'Híbrido'
export type JobSeniority = 'Junior' | 'Mid' | 'Senior' | 'Sin experiencia'
export type JobContract = 'Tiempo completo' | 'Medio tiempo' | 'Por proyecto'

export interface Job {
  id: number
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
  category?: string
}
