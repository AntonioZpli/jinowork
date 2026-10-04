// ─── Model: User ────────────────────────────────────────────────────────────
// Represents a Jinowork platform user (candidate or company).

export type UserRole = 'candidate' | 'company'

export interface UserExperience {
  id: number
  title: string
  company: string
  companyInitials: string
  companyColor: string
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  areaId?: string
}

export interface UserEducation {
  id: number
  degree: string
  institution: string
  year: string
  field: string
  currentlyStudying?: boolean
}

export interface UserLanguage {
  id: number
  language: string
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Nativo'
}

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  title?: string
  location?: string
  about?: string
  avatar?: string
  available?: boolean
  skills?: string[]
  professionalAreaId?: string
  secondaryAreaIds?: string[]
  specializationIds?: string[]
  skillIds?: string[]
  skillLevels?: Record<string, 'Básico' | 'Intermedio' | 'Avanzado'>
  experienceYears?: number
  experience?: UserExperience[]
  education?: UserEducation[]
  languages?: UserLanguage[]
  phone?: string
  website?: string
  interests?: string[]
  preferredModality?: 'Remoto' | 'Presencial' | 'Híbrido'
  preferredCategories?: string[]
  preferredEmploymentTypes?: string[]
  preferredLocations?: string[]
  department?: string
  municipality?: string
  companyName?: string
  companySize?: string
  industry?: string
  organizationType?: string
  recruitingAreaIds?: string[]
}
