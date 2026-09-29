// ─── Controller: useJobs ─────────────────────────────────────────────────────
// Composable handling job board state, search/filtering, focused on Jinotega & Nicaragua.

import { ref, computed } from 'vue'
import type { Job } from '@/models/Job'

// ── Mock data: Jinotega & Nicaragua ─────────────────────────────────────────
const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Desarrollador Frontend Senior (Vue 3 / TS)',
    company: 'AgroTech Jinotega / Café Las Brumas',
    companyInitials: 'AJ',
    companyColor: '#059669',
    location: 'Jinotega, Nicaragua',
    country: 'Nicaragua',
    modality: 'Híbrido',
    seniority: 'Senior',
    contract: 'Tiempo completo',
    salary: '$2,200 – $3,500 USD/mes',
    description: 'Buscamos un desarrollador frontend senior para liderar la arquitectura de nuestra plataforma web de trazabilidad de café especial y comercio internacional.',
    tags: ['Vue.js', 'TypeScript', 'Jinotega', 'Híbrido'],
    postedAt: 'Hace 1 día',
    featured: true,
  },
  {
    id: 2,
    title: 'Ingeniero de Software Backend (Node.js + PostgreSQL)',
    company: 'BAC Credomatic Nicaragua',
    companyInitials: 'BAC',
    companyColor: '#DC2626',
    location: 'Managua, Nicaragua (Remoto para Jinotega)',
    country: 'Nicaragua',
    modality: 'Remoto',
    seniority: 'Mid',
    contract: 'Tiempo completo',
    salary: '$2,400 – $3,800 USD/mes',
    description: 'Desarrollo de microservicios bancarios y pasarelas de pago digitales para comercio electrónico en todo el territorio nicaragüense.',
    tags: ['Node.js', 'PostgreSQL', 'Remoto', 'Nicaragua'],
    postedAt: 'Hace 2 días',
    featured: true,
  },
  {
    id: 3,
    title: 'Líder de Sistemas & Plataformas ERP',
    company: 'Cooperativa Cafetalera SOPPEXCCA R.L.',
    companyInitials: 'SX',
    companyColor: '#D97706',
    location: 'Jinotega, Nicaragua',
    country: 'Nicaragua',
    modality: 'Presencial',
    seniority: 'Senior',
    contract: 'Tiempo completo',
    salary: 'C$ 60,000 – C$ 80,000 NIO/mes',
    description: 'Dirección del equipo técnico y modernización de sistemas de control de acopio, trazabilidad de microlotes y logística de exportación cafetalera.',
    tags: ['ERP', 'SQL', 'Jinotega', 'Presencial'],
    postedAt: 'Hace 3 días',
    featured: true,
  },
  {
    id: 4,
    title: 'Desarrollador Full Stack (React + Python)',
    company: 'DevNica Studio & Labs',
    companyInitials: 'DN',
    companyColor: '#7C3AED',
    location: 'Estelí / Jinotega · Remoto',
    country: 'Nicaragua',
    modality: 'Remoto',
    seniority: 'Mid',
    contract: 'Tiempo completo',
    salary: '$1,800 – $2,800 USD/mes',
    description: 'Desarrollo de aplicaciones SaaS y dashboards analíticos para clientes en Nicaragua, Centroamérica y Estados Unidos.',
    tags: ['React', 'Python', 'Remoto', 'Nicaragua'],
    postedAt: 'Hace 4 días',
    featured: false,
  },
  {
    id: 5,
    title: 'Especialista en Infraestructura Cloud & DevOps',
    company: 'Cisa Exportadora Jinotega',
    companyInitials: 'CE',
    companyColor: '#2563EB',
    location: 'Jinotega, Nicaragua',
    country: 'Nicaragua',
    modality: 'Híbrido',
    seniority: 'Senior',
    contract: 'Tiempo completo',
    salary: '$2,800 – $4,200 USD/mes',
    description: 'Mantenimiento de pipelines CI/CD, servidores en AWS y monitoreo de la infraestructura tecnológica para operaciones de exportación agrícola.',
    tags: ['AWS', 'Docker', 'Linux', 'Jinotega'],
    postedAt: 'Hace 5 días',
    featured: true,
  },
  {
    id: 6,
    title: 'Desarrollador Móvil (Flutter / iOS / Android)',
    company: 'Hugo / PedidosYa Nicaragua',
    companyInitials: 'PY',
    companyColor: '#E11D48',
    location: 'Managua / Departamentos · Remoto',
    country: 'Nicaragua',
    modality: 'Remoto',
    seniority: 'Mid',
    contract: 'Tiempo completo',
    salary: '$2,000 – $3,200 USD/mes',
    description: 'Optimización de la experiencia móvil para usuarios y repartidores con expansión en Jinotega, Matagalpa y ciudades del interior.',
    tags: ['Flutter', 'Mobile', 'Remoto', 'Nicaragua'],
    postedAt: 'Hace 6 días',
    featured: false,
  },
  {
    id: 7,
    title: 'Diseñador UI/UX & Producto Digital',
    company: 'AgroData Las Brumas',
    companyInitials: 'LB',
    companyColor: '#0891B2',
    location: 'Jinotega, Nicaragua · Remoto',
    country: 'Nicaragua',
    modality: 'Remoto',
    seniority: 'Junior',
    contract: 'Tiempo completo',
    salary: '$1,200 – $1,900 USD/mes',
    description: 'Diseño de interfaces móviles intuitivas para productores de café y administradores de fincas en Jinotega. Prototipado en Figma y pruebas de usabilidad.',
    tags: ['Figma', 'UI/UX', 'Junior', 'Jinotega'],
    postedAt: 'Hace 1 semana',
    featured: false,
  },
  {
    id: 8,
    title: 'Analista de Datos & BI Agropecuario',
    company: 'Cooperativa Aldea Global Jinotega',
    companyInitials: 'AG',
    companyColor: '#16A34A',
    location: 'Jinotega, Nicaragua',
    country: 'Nicaragua',
    modality: 'Presencial',
    seniority: 'Mid',
    contract: 'Tiempo completo',
    salary: 'C$ 45,000 – C$ 65,000 NIO/mes',
    description: 'Análisis de datos agronómicos, rendimiento de cosecha, pronóstico de precios de café y generación de reportes estratégicos para asociados.',
    tags: ['Python', 'SQL', 'PowerBI', 'Jinotega'],
    postedAt: 'Hace 1 semana',
    featured: false,
  },
  {
    id: 9, title: 'Coordinador/a de Operaciones Agrícolas', company: 'Cooperativa del Norte', companyInitials: 'CN', companyColor: '#15803D',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Tiempo completo', salary: 'C$ 38,000 – C$ 52,000 NIO/mes',
    description: 'Coordina la planificación de cosechas, acompaña a productores y mejora los procesos de acopio y distribución.', tags: ['Agricultura', 'Operaciones', 'Gestión'], postedAt: 'Hace 2 días', featured: false, category: 'Agricultura',
  },
  {
    id: 10, title: 'Asistente de Contabilidad', company: 'Comercial La Segovia', companyInitials: 'LS', companyColor: '#B45309',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 18,000 – C$ 24,000 NIO/mes',
    description: 'Apoya el registro de transacciones, conciliaciones bancarias, facturación y cierres mensuales.', tags: ['Contabilidad', 'Excel', 'Finanzas'], postedAt: 'Hace 3 días', featured: false, category: 'Administración y finanzas',
  },
  {
    id: 11, title: 'Docente de Inglés', company: 'Centro Educativo Horizonte', companyInitials: 'CH', companyColor: '#7C3AED',
    location: 'Matagalpa, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Medio tiempo', salary: 'C$ 22,000 – C$ 30,000 NIO/mes',
    description: 'Imparte clases de inglés para secundaria y adultos, prepara materiales y da seguimiento al progreso del alumnado.', tags: ['Educación', 'Inglés', 'Docencia'], postedAt: 'Hace 4 días', featured: false, category: 'Educación',
  },
  {
    id: 12, title: 'Ejecutivo/a de Ventas', company: 'Nicaragua Hogar', companyInitials: 'NH', companyColor: '#DB2777',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Sin experiencia', contract: 'Tiempo completo', salary: 'C$ 20,000 + comisiones',
    description: 'Asesora a clientes, presenta soluciones para el hogar y da seguimiento a oportunidades comerciales.', tags: ['Ventas', 'Atención al cliente', 'Comercial'], postedAt: 'Hace 5 días', featured: false, category: 'Ventas y servicio',
  },
]

// ── Composable ─────────────────────────────────────────────────────────────
export function useJobs() {
  const searchQuery = ref('')
  const selectedModality = ref<'Todas' | Job['modality']>('Todas')
  const selectedSeniority = ref<'Todas' | Job['seniority']>('Todas')

  const modalities: Array<'Todas' | Job['modality']> = ['Todas', 'Remoto', 'Presencial', 'Híbrido']
  const seniorities: Array<'Todas' | Job['seniority']> = ['Todas', 'Junior', 'Mid', 'Senior', 'Sin experiencia']

  const filteredJobs = computed<Job[]>(() => {
    return MOCK_JOBS.filter((job) => {
      const q = searchQuery.value.toLowerCase().trim()
      if (q) {
        const matches =
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.tags.some((t) => t.toLowerCase().includes(q)) ||
          job.location.toLowerCase().includes(q)
          || (job.category ?? '').toLowerCase().includes(q)
        if (!matches) return false
      }
      if (selectedModality.value !== 'Todas' && job.modality !== selectedModality.value) return false
      if (selectedSeniority.value !== 'Todas' && job.seniority !== selectedSeniority.value) return false
      return true
    })
  })

  const totalJobs = MOCK_JOBS.length

  function resetFilters() {
    searchQuery.value = ''
    selectedModality.value = 'Todas'
    selectedSeniority.value = 'Todas'
  }

  return {
    searchQuery,
    selectedModality,
    selectedSeniority,
    modalities,
    seniorities,
    filteredJobs,
    totalJobs,
    resetFilters,
    allJobs: MOCK_JOBS,
  }
}
