// ─── Pinia Store: Auth ───────────────────────────────────────────────────────
// Handles authentication state

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/models/User'
import type { JobApplication } from '@/models/Job'

const MOCK_EMAIL = 'yamir@jinowork.com'
const MOCK_PASSWORD = '1234'

const DEMO_USER: User = {
  id: 1,
  name: 'Yamir Zeledón',
  email: 'yamir@jinowork.com',
  role: 'candidate',
  professionalAreaId: 'technology',
  specializationIds: ['backend', 'devops'],
  experienceYears: 3,
  skillIds: ['linux', 'bash', 'docker', 'go', 'python', 'node-js', 'postgresql', 'redis', 'nginx'],
  skillLevels: { linux: 'Avanzado', docker: 'Avanzado', 'node-js': 'Intermedio', python: 'Intermedio' },
  title: 'Ingeniero Backend & DevOps',
  location: 'Jinotega, Nicaragua',
  about: 'Especialista en desarrollo backend y administración de sistemas Linux.',
  avatar: 'https://i.pinimg.com/736x/23/70/03/2370031777c7a29d964afdbb39521e3e.jpg',
  available: true,
  skills: ['Linux', 'Bash', 'Docker', 'Go', 'Python', 'Node.js', 'PostgreSQL', 'Redis', 'NGINX'],
  experience: [
    {
      id: 1,
      title: 'Senior Backend Engineer & Linux SysAdmin',
      company: 'NicaSys Infrastructure / Cloud Jinotega',
      companyInitials: 'NS',
      companyColor: '#0284C7',
      location: 'Jinotega, Nicaragua',
      startDate: 'Ene 2023',
      endDate: null,
      current: true,
      description: 'Diseño y mantenimiento de infraestructura de servidores Linux en alta disponibilidad.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Ingeniería en Sistemas de Información',
      institution: 'UNAN',
      year: '2019',
      field: 'Backend'
    }
  ],
  languages: [
    { id: 1, language: 'Español', level: 'Nativo' },
    { id: 2, language: 'Inglés', level: 'Avanzado' },
  ],
  interests: ['Tecnología', 'Ingeniería'],
  preferredCategories: ['Tecnología']
}

const DEMO_COMPANY_USER: User = {
  id: 2,
  name: 'María López',
  email: 'empresa@nicotech.com',
  role: 'company',
  title: 'Directora general',
  location: 'Managua, Nicaragua',
  companyName: 'NicaTech Solutions',
  companySize: '11-50', 
  industry: 'Tecnología',
  about: 'Empresa de desarrollo de software...', 
  avatar: '', 
  available: false,
  skills: [], 
  experience: [{ id: 1, title: 'Ingeniero backend y administrador Linux', company: 'NicaSys Infrastructure', companyInitials: 'NS', companyColor: '#0284C7', location: 'Jinotega, Nicaragua', startDate: 'Ene 2023', endDate: null, current: true, description: 'Diseño y mantenimiento de servicios backend e infraestructura Linux.' }],
  education: [{ id: 1, degree: 'Ingeniería en Sistemas de Información', institution: 'UNAN', year: '2019', field: 'Sistemas' }],
  department: 'Jinotega', municipality: 'Jinotega', preferredModality: 'Híbrido',
  preferredEmploymentTypes: ['Tiempo completo'], preferredLocations: ['Jinotega'],
  languages: []
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const authError = ref<string | null>(null)
  const isLoading = ref(false)
  const candidates = ref<User[]>([DEMO_USER])
  const applicationRecords = ref<JobApplication[]>([
    { id: 1, jobId: 36, candidateId: DEMO_USER.id, candidate: DEMO_USER, note: 'Tengo experiencia desarrollando servicios y aplicaciones web.', appliedAt: '2026-09-29T09:00:00.000Z', status: 'submitted', profileSnapshot: { areaId: 'technology', specializationIds: ['backend', 'devops'], skillIds: ['linux', 'bash', 'docker', 'go', 'python', 'node-js', 'postgresql', 'redis', 'nginx'], experienceYears: 3, education: DEMO_USER.education || [] } },
  ])
  const applications = computed(() => user.value?.role === 'candidate'
    ? applicationRecords.value.filter(record => record.candidateId === user.value?.id).map(record => record.jobId)
    : [])
  const applicationNotes = computed(() => Object.fromEntries(applicationRecords.value
    .filter(record => record.candidateId === user.value?.id)
    .map(record => [record.jobId, record.note])))

  const userInitial = computed(() =>
    user.value?.name ? user.value.name.charAt(0).toUpperCase() : 'Y',
  )

  async function login(email: string, password: string): Promise<boolean> {
    authError.value = null
    isLoading.value = true

    await new Promise((resolve) => setTimeout(resolve, 500))

    const normalizedEmail = email.trim().toLowerCase()
    
    if (normalizedEmail === DEMO_COMPANY_USER.email && password === MOCK_PASSWORD) {
      user.value = DEMO_COMPANY_USER
      isAuthenticated.value = true
      isLoading.value = false
      return true
    }

    const isValidUser = (normalizedEmail === MOCK_EMAIL || normalizedEmail.startsWith('yamir')) && password === MOCK_PASSWORD

    if (isValidUser) {
      user.value = DEMO_USER
      isAuthenticated.value = true
      isLoading.value = false
      return true
    } else {
      authError.value = 'Credenciales incorrectas. Verifica tu correo y contraseña.'
      isLoading.value = false
      return false
    }
  }

  async function register(data: { role: 'candidate' | 'company', name: string, email: string, password: string, title?: string, location?: string, companyName?: string, industry?: string, companySize?: string, interests?: string[] }): Promise<boolean> {
    authError.value = null
    isLoading.value = true
    
    await new Promise((resolve) => setTimeout(resolve, 500))

    user.value = {
      id: Math.floor(Math.random() * 1000) + 3,
      name: data.name,
      email: data.email,
      role: data.role,
      title: data.title,
      location: data.location,
      companyName: data.companyName,
      industry: data.industry,
      companySize: data.companySize,
      available: data.role === 'candidate',
      secondaryAreaIds: [], specializationIds: [], skillIds: [], skillLevels: {}, experienceYears: 0,
      interests: data.role === 'candidate' ? [...(data.interests || [])] : [],
      preferredCategories: data.role === 'candidate' ? [...(data.interests || [])] : [],
      skills: [],
      experience: [],
      education: [],
      languages: []
    }
    if (data.role === 'candidate' && user.value) candidates.value = [...candidates.value, user.value]
    
    isAuthenticated.value = true
    isLoading.value = false
    return true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    authError.value = null
  }

  function clearError() {
    authError.value = null
  }

  function updateProfile(updates: Partial<User>) {
    if (user.value) {
      const updatedUser = { ...user.value, ...updates }
      user.value = updatedUser
      if (updatedUser.role === 'candidate') {
        candidates.value = candidates.value.map(candidate => candidate.id === updatedUser.id ? updatedUser : candidate)
      }
    }
  }

  function applyToJob(jobId: number, note = '') {
    if (user.value?.role !== 'candidate') return
    const candidate = user.value?.role === 'candidate' ? user.value : null
    if (candidate && !applicationRecords.value.some(record => record.jobId === jobId && record.candidateId === candidate.id)) {
      const profileSnapshot = {
        areaId: candidate.professionalAreaId,
        specializationIds: [...(candidate.specializationIds || [])],
        skillIds: [...(candidate.skillIds || candidate.skills || [])],
        experienceYears: candidate.experienceYears || 0,
        education: [...(candidate.education || [])],
      }
      applicationRecords.value = [...applicationRecords.value, {
        id: Date.now(), jobId, candidateId: candidate.id, candidate: { ...candidate }, note,
        appliedAt: new Date().toISOString(), status: 'submitted', profileSnapshot,
      }]
    }
  }

  function updateApplicationStatus(applicationId: number, status: JobApplication['status']) {
    applicationRecords.value = applicationRecords.value.map(application => application.id === applicationId ? { ...application, status } : application)
  }

  return {
    user,
    isAuthenticated,
    authError,
    isLoading,
    userInitial,
    login,
    register,
    logout,
    clearError,
    applications,
    applicationRecords,
    candidates,
    applicationNotes,
    updateProfile,
    applyToJob,
    updateApplicationStatus,
  }
})
