export interface ProfessionalSkill {
  id: string
  name: string
}

export interface ProfessionalSpecialization {
  id: string
  name: string
  skills: ProfessionalSkill[]
}

export interface ProfessionalArea {
  id: string
  name: string
  specializations: ProfessionalSpecialization[]
}

const specialization = (id: string, name: string, skills: string[]): ProfessionalSpecialization => ({
  id, name, skills: skills.map(skill => ({ id: skill.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: skill })),
})

export const PROFESSIONAL_AREAS: ProfessionalArea[] = [
  { id: 'technology', name: 'Tecnología', specializations: [
    specialization('frontend', 'Desarrollo frontend', ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'React']),
    specialization('backend', 'Desarrollo backend', ['Node.js', 'Python', 'Java', 'Go', 'SQL', 'API REST']),
    specialization('devops', 'Infraestructura y DevOps', ['Linux', 'Bash', 'Docker', 'Kubernetes', 'NGINX', 'Redes']),
    specialization('it-support', 'Soporte técnico', ['Windows', 'Linux', 'Redes', 'Hardware', 'Atención al cliente']),
    specialization('data', 'Datos y análisis', ['Excel', 'SQL', 'Power BI', 'Python', 'Estadística']),
  ] },
  { id: 'administration', name: 'Administración', specializations: [specialization('office-assistance', 'Asistencia administrativa', ['Excel', 'Microsoft Office', 'Gestión documental', 'Atención al cliente'])] },
  { id: 'accounting', name: 'Contabilidad', specializations: [specialization('accounting-assistant', 'Asistencia contable', ['Excel', 'Contabilidad', 'Facturación', 'Registros financieros'])] },
  { id: 'marketing', name: 'Mercadeo', specializations: [specialization('digital-marketing', 'Mercadeo digital', ['Redes sociales', 'Creación de contenido', 'SEO', 'Analítica digital'])] },
  { id: 'sales', name: 'Ventas', specializations: [specialization('sales-executive', 'Ejecutivo de ventas', ['Ventas', 'Negociación', 'CRM', 'Atención al cliente'])] },
  { id: 'human-resources', name: 'Recursos humanos', specializations: [specialization('recruitment', 'Reclutamiento', ['Selección de personal', 'Entrevistas', 'Excel', 'Comunicación'])] },
  { id: 'education', name: 'Educación', specializations: [specialization('teaching', 'Docencia', ['Planificación educativa', 'Evaluación', 'Comunicación', 'Microsoft Office'])] },
  { id: 'health', name: 'Salud', specializations: [specialization('nursing', 'Enfermería', ['Atención al paciente', 'Primeros auxilios', 'Expediente clínico'])] },
  { id: 'engineering', name: 'Ingeniería', specializations: [specialization('civil-engineering', 'Ingeniería civil', ['AutoCAD', 'Supervisión de obra', 'Presupuestos', 'Seguridad ocupacional'])] },
  { id: 'tourism', name: 'Turismo', specializations: [specialization('hospitality', 'Turismo y hospitalidad', ['Atención al cliente', 'Reservaciones', 'Inglés', 'Gestión hotelera'])] },
  { id: 'agriculture', name: 'Agricultura', specializations: [specialization('agronomy', 'Agronomía', ['Manejo de cultivos', 'Control de plagas', 'Suelos', 'Asistencia técnica'])] },
  { id: 'construction', name: 'Construcción', specializations: [specialization('construction-supervision', 'Supervisión de construcción', ['Lectura de planos', 'Seguridad ocupacional', 'Presupuestos', 'AutoCAD'])] },
  { id: 'logistics', name: 'Logística', specializations: [specialization('supply-chain', 'Logística y cadena de suministro', ['Inventario', 'Excel', 'Compras', 'Coordinación de transporte'])] },
  { id: 'customer-service', name: 'Atención al cliente', specializations: [specialization('customer-support', 'Servicio al cliente', ['Atención al cliente', 'Comunicación', 'CRM', 'Resolución de problemas'])] },
  { id: 'design', name: 'Diseño', specializations: [specialization('graphic-design', 'Diseño gráfico', ['Figma', 'Adobe Illustrator', 'Photoshop', 'Diseño editorial'])] },
  { id: 'legal', name: 'Legal', specializations: [specialization('legal-assistance', 'Asistencia legal', ['Redacción jurídica', 'Gestión documental', 'Investigación', 'Contratos'])] },
  { id: 'finance', name: 'Finanzas', specializations: [specialization('financial-analysis', 'Análisis financiero', ['Excel', 'Análisis financiero', 'Presupuestos', 'Power BI'])] },
]

export const EMPLOYMENT_TYPES = ['Tiempo completo', 'Medio tiempo', 'Temporal', 'Prácticas', 'Por proyecto'] as const
export const WORK_MODALITIES = ['Presencial', 'Híbrido', 'Remoto'] as const
export const SKILL_LEVELS = ['Básico', 'Intermedio', 'Avanzado'] as const
export const EXPERIENCE_LEVELS = ['Sin experiencia', 'Junior', 'Mid', 'Senior'] as const
export const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '501+'] as const
export const ORGANIZATION_TYPES = ['Empresa privada', 'Empresa pública', 'Emprendimiento', 'Organización sin fines de lucro', 'Cooperativa'] as const
export const COMPANY_SECTORS = [...PROFESSIONAL_AREAS.map(area => area.name), 'Comercio y servicios', 'Otro'] as const
export const DEPARTMENTS = ['Boaco', 'Carazo', 'Chinandega', 'Chontales', 'Estelí', 'Granada', 'Jinotega', 'León', 'Madriz', 'Managua', 'Masaya', 'Matagalpa', 'Nueva Segovia', 'Río San Juan', 'Rivas', 'Región Autónoma de la Costa Caribe Norte', 'Región Autónoma de la Costa Caribe Sur']
export const MUNICIPALITIES_BY_DEPARTMENT: Record<string, string[]> = {
  Managua: ['Managua', 'Ciudad Sandino', 'Tipitapa', 'Ticuantepe'], Jinotega: ['Jinotega', 'San Rafael del Norte', 'La Concordia'],
  Matagalpa: ['Matagalpa', 'Sébaco', 'Ciudad Darío'], León: ['León', 'Nagarote', 'La Paz Centro'],
  Masaya: ['Masaya', 'Nindirí', 'Nandasmo'], Granada: ['Granada', 'Nandaime', 'Diriá'],
  Chinandega: ['Chinandega', 'El Viejo', 'Corinto'], Estelí: ['Estelí', 'Condega', 'Pueblo Nuevo'],
  Carazo: ['Jinotepe', 'Diriamba', 'San Marcos'], Boaco: ['Boaco', 'Camoapa'], Chontales: ['Juigalpa', 'Santo Tomás'],
  Madriz: ['Somoto', 'Palacagüina'], 'Nueva Segovia': ['Ocotal', 'Jalapa'], Rivas: ['Rivas', 'San Juan del Sur'],
  'Río San Juan': ['San Carlos', 'El Castillo'],
  'Región Autónoma de la Costa Caribe Norte': ['Puerto Cabezas', 'Waspam'],
  'Región Autónoma de la Costa Caribe Sur': ['Bluefields', 'Nueva Guinea'],
}
export const EDUCATION_REQUIREMENTS = ['Secundaria', 'Técnico', 'Universidad en curso', 'Licenciatura', 'Posgrado'] as const

export function areaForLabel(label?: string) {
  const normalized = label?.trim().toLocaleLowerCase()
  if (!normalized) return undefined
  return PROFESSIONAL_AREAS.find(area => area.id === normalized || area.name.toLocaleLowerCase() === normalized)
    ?? PROFESSIONAL_AREAS.find(area => normalized.includes(area.name.toLocaleLowerCase()) || area.name.toLocaleLowerCase().includes(normalized))
}

export function specializationById(id?: string) {
  return PROFESSIONAL_AREAS.flatMap(area => area.specializations).find(item => item.id === id)
}
