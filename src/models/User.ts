// ─── Model: User ────────────────────────────────────────────────────────────
// Represents a Jinowork platform user (candidate or company).

export type UserRole = 'candidate' | 'company' | 'guest'

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
}

export interface UserEducation {
  id: number
  degree: string
  institution: string
  year: string
  field: string
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
  title: string
  location: string
  about: string
  avatar: string
  available: boolean
  skills: string[]
  experience: UserExperience[]
  education: UserEducation[]
  languages: UserLanguage[]
}
