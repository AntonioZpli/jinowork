// ─── Pinia Store: Auth ───────────────────────────────────────────────────────
// Handles authentication state with credentials for Yamir Zeledón (Linux & Backend specialist).

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/models/User'

const MOCK_EMAIL = 'yamir@jinowork.com'
const MOCK_PASSWORD = 'password123'

const DEMO_USER: User = {
  id: 1,
  name: 'Yamir Zeledón',
  email: 'yamir@jinowork.com',
  role: 'candidate',
  title: 'Ingeniero Backend & DevOps | Linux & Terminal Power User',
  location: 'Jinotega, Nicaragua',
  about:
    'Especialista en desarrollo backend, arquitectura de servidores y administración de sistemas Linux originario de Jinotega, Nicaragua. Apasionado por la eficiencia en la terminal, Neovim, automatización con scripts de Bash y el diseño de APIs robustas en Go, Python y Node.js. Con sólida experiencia desplegando servicios con Docker y NGINX, optimizando bases de datos PostgreSQL y gestionando infraestructura de alta disponibilidad tanto para proyectos locales e infraestructuras del norte de Nicaragua como para entornos cloud distribuidos.',
  avatar: 'https://i.pinimg.com/736x/23/70/03/2370031777c7a29d964afdbb39521e3e.jpg',
  available: true,
  skills: [
    'Linux',
    'Terminal',
    'Bash',
    'Neovim',
    'Docker',
    'Go',
    'Python',
    'Node.js',
    'PostgreSQL',
    'Redis',
    'NGINX',
    'Git',
    'Kubernetes',
    'Rust',
  ],
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
      description:
        'Diseño y mantenimiento de infraestructura de servidores Linux en alta disponibilidad. Implementación de microservicios backend en Go y Python con Docker, automatización de tareas en terminal con Bash y gestión de bases de datos PostgreSQL.',
    },
    {
      id: 2,
      title: 'Ingeniero Backend & DevOps',
      company: 'Café Las Brumas Tech / AgroTech Networks',
      companyInitials: 'LB',
      companyColor: '#059669',
      location: 'Jinotega, Nicaragua',
      startDate: 'Feb 2021',
      endDate: 'Dic 2022',
      current: false,
      description:
        'Desarrollo de APIs RESTful y pipelines de procesamiento en segundo plano con Redis y Node.js para monitoreo de centros de acopio y telemetría de estaciones meteorológicas en Jinotega y Matagalpa.',
    },
    {
      id: 3,
      title: 'Administrador de Sistemas & Backend Junior',
      company: 'Telecom & Fibra Norte Nicaragua',
      companyInitials: 'TN',
      companyColor: '#D97706',
      location: 'Jinotega, Nicaragua',
      startDate: 'Jun 2019',
      endDate: 'Ene 2021',
      current: false,
      description:
        'Gestión de servidores Linux (Debian/Ubuntu), configuración de proxies inversos NGINX, scripts de monitoreo en terminal y soporte a redes en el departamento de Jinotega.',
    },
  ],
  education: [
    {
      id: 1,
      degree: 'Ingeniería en Sistemas de Información',
      institution: 'Universidad Nacional Autónoma de Nicaragua (UNAN - CUR Jinotega)',
      year: '2019',
      field: 'Especialización en Redes, Sistemas Operativos y Backend',
    },
    {
      id: 2,
      degree: 'Certificación Profesional Linux SysAdmin & Cloud Containers',
      institution: 'Linux Foundation & UNI Managua',
      year: '2021',
      field: 'GNU/Linux Kernel, CLI & Docker Architecture',
    },
  ],
  languages: [
    { id: 1, language: 'Español', level: 'Nativo' },
    { id: 2, language: 'Inglés', level: 'Avanzado' },
  ],
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const authError = ref<string | null>(null)
  const isLoading = ref(false)
  const applications = ref<number[]>([])
  const applicationNotes = ref<Record<number, string>>({})

  const userInitial = computed(() =>
    user.value?.name ? user.value.name.charAt(0).toUpperCase() : 'Y',
  )

  async function login(email: string, password: string): Promise<boolean> {
    authError.value = null
    isLoading.value = true

    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const normalizedEmail = email.trim().toLowerCase()
    // Accept yamir@jinowork.com, carlos@jinowork.com or any username at jinowork.com with password123
    const isValidUser =
      (normalizedEmail === MOCK_EMAIL ||
       normalizedEmail === 'carlos@jinowork.com' ||
       normalizedEmail.startsWith('yamir')) &&
      password === MOCK_PASSWORD

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

  function logout() {
    user.value = null
    isAuthenticated.value = false
    authError.value = null
  }

  function clearError() {
    authError.value = null
  }

  function updateProfile(updates: Partial<User>) {
    if (user.value) user.value = { ...user.value, ...updates }
  }

  function applyToJob(jobId: number, note = '') {
    if (!applications.value.includes(jobId)) applications.value = [...applications.value, jobId]
    applicationNotes.value = { ...applicationNotes.value, [jobId]: note }
  }

  return {
    user,
    isAuthenticated,
    authError,
    isLoading,
    userInitial,
    login,
    logout,
    clearError,
    applications,
    applicationNotes,
    updateProfile,
    applyToJob,
  }
})
