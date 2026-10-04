import type { Job } from '@/models/Job'

export const MOCK_JOBS: Job[] = [
  // Tecnología (original 1-8)
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
    category: 'Tecnología'
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
    category: 'Tecnología'
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
    category: 'Tecnología'
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
    category: 'Tecnología'
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
    category: 'Tecnología'
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
    category: 'Tecnología'
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
    category: 'Tecnología'
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
    category: 'Tecnología'
  },
  
  // Agricultura (original 9)
  {
    id: 9, title: 'Coordinador/a de Operaciones Agrícolas', company: 'Cooperativa del Norte', companyInitials: 'CN', companyColor: '#15803D',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Tiempo completo', salary: 'C$ 38,000 – C$ 52,000 NIO/mes',
    description: 'Coordina la planificación de cosechas, acompaña a productores y mejora los procesos de acopio y distribución.', tags: ['Agricultura', 'Operaciones', 'Gestión'], postedAt: 'Hace 2 días', featured: false, category: 'Agricultura',
  },
  
  // Finanzas (original 10)
  {
    id: 10, title: 'Asistente de Contabilidad', company: 'Comercial La Segovia', companyInitials: 'LS', companyColor: '#B45309',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 18,000 – C$ 24,000 NIO/mes',
    description: 'Apoya el registro de transacciones, conciliaciones bancarias, facturación y cierres mensuales.', tags: ['Contabilidad', 'Excel', 'Finanzas'], postedAt: 'Hace 3 días', featured: false, category: 'Finanzas',
  },
  
  // Educación (original 11)
  {
    id: 11, title: 'Docente de Inglés', company: 'Centro Educativo Horizonte', companyInitials: 'CH', companyColor: '#7C3AED',
    location: 'Matagalpa, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Medio tiempo', salary: 'C$ 22,000 – C$ 30,000 NIO/mes',
    description: 'Imparte clases de inglés para secundaria y adultos, prepara materiales y da seguimiento al progreso del alumnado.', tags: ['Educación', 'Inglés', 'Docencia'], postedAt: 'Hace 4 días', featured: false, category: 'Educación',
  },
  
  // Ventas (original 12)
  {
    id: 12, title: 'Ejecutivo/a de Ventas', company: 'Nicaragua Hogar', companyInitials: 'NH', companyColor: '#DB2777',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Sin experiencia', contract: 'Tiempo completo', salary: 'C$ 20,000 + comisiones',
    description: 'Asesora a clientes, presenta soluciones para el hogar y da seguimiento a oportunidades comerciales.', tags: ['Ventas', 'Atención al cliente', 'Comercial'], postedAt: 'Hace 5 días', featured: false, category: 'Ventas',
  },

  // Nuevos Empleos (13 a 34)

  // Salud
  {
    id: 13, title: 'Médico General', company: 'Hospital Clínica San Francisco', companyInitials: 'SF', companyColor: '#059669',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Tiempo completo', salary: 'C$ 40,000 – C$ 55,000 NIO/mes',
    description: 'Atención primaria a pacientes, diagnóstico y tratamiento en emergencias y consultas programadas.', tags: ['Medicina', 'Salud', 'Clínica'], postedAt: 'Hace 1 día', featured: true, category: 'Salud',
  },
  {
    id: 14, title: 'Licenciado/a en Enfermería', company: 'Clínica Médica Jinotega', companyInitials: 'CM', companyColor: '#10B981',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 20,000 – C$ 28,000 NIO/mes',
    description: 'Cuidados generales a pacientes, administración de medicamentos y asistencia a médicos especialistas.', tags: ['Enfermería', 'Salud', 'Atención'], postedAt: 'Hace 2 días', featured: false, category: 'Salud',
  },
  {
    id: 15, title: 'Regente Farmacéutico', company: 'Farmacias Kielsa', companyInitials: 'FK', companyColor: '#047857',
    location: 'Matagalpa, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Senior', contract: 'Tiempo completo', salary: 'C$ 35,000 – C$ 45,000 NIO/mes',
    description: 'Supervisión de la calidad de los medicamentos, inventarios y cumplimiento de normativas del MINSA.', tags: ['Farmacia', 'Regencia', 'Salud'], postedAt: 'Hace 3 días', featured: false, category: 'Salud',
  },
  
  // Educación
  {
    id: 16, title: 'Coordinador Académico', company: 'Universidad Nacional Autónoma de Nicaragua (UNAN)', companyInitials: 'UN', companyColor: '#1D4ED8',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Senior', contract: 'Tiempo completo', salary: 'C$ 40,000 – C$ 50,000 NIO/mes',
    description: 'Supervisión de planes de estudio, evaluación docente y coordinación de actividades académicas universitarias.', tags: ['Educación', 'Coordinación', 'Universidad'], postedAt: 'Hace 1 semana', featured: true, category: 'Educación',
  },
  {
    id: 17, title: 'Tutor de Matemáticas', company: 'Colegio San Luis', companyInitials: 'CS', companyColor: '#3B82F6',
    location: 'Matagalpa, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Medio tiempo', salary: 'C$ 12,000 – C$ 16,000 NIO/mes',
    description: 'Clases de reforzamiento para alumnos de secundaria, preparación para exámenes de admisión.', tags: ['Matemáticas', 'Tutoría', 'Educación'], postedAt: 'Hace 2 semanas', featured: false, category: 'Educación',
  },

  // Finanzas
  {
    id: 18, title: 'Analista Financiero', company: 'Banco Ficohsa', companyInitials: 'BF', companyColor: '#DC2626',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Mid', contract: 'Tiempo completo', salary: '$1,000 – $1,500 USD/mes',
    description: 'Análisis de riesgos, proyecciones financieras y evaluación de portafolio de créditos corporativos.', tags: ['Finanzas', 'Banca', 'Análisis'], postedAt: 'Hace 1 día', featured: false, category: 'Finanzas',
  },
  {
    id: 19, title: 'Auditor Interno', company: 'Grupo Pellas', companyInitials: 'GP', companyColor: '#2563EB',
    location: 'León, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Senior', contract: 'Tiempo completo', salary: '$1,200 – $1,800 USD/mes',
    description: 'Auditorías operativas y financieras, aseguramiento de controles internos y cumplimiento normativo.', tags: ['Auditoría', 'Controles', 'Finanzas'], postedAt: 'Hace 3 días', featured: false, category: 'Finanzas',
  },

  // Logística
  {
    id: 20, title: 'Coordinador de Bodega', company: 'Wal-Mart Centroamérica', companyInitials: 'WM', companyColor: '#1E40AF',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Tiempo completo', salary: 'C$ 30,000 – C$ 40,000 NIO/mes',
    description: 'Gestión de inventarios, recepción y despacho de mercadería, y liderazgo de personal operativo.', tags: ['Bodega', 'Logística', 'Inventario'], postedAt: 'Hace 4 días', featured: false, category: 'Logística',
  },
  {
    id: 21, title: 'Especialista en Supply Chain', company: 'Cargill Nicaragua', companyInitials: 'CG', companyColor: '#16A34A',
    location: 'Masaya, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Senior', contract: 'Tiempo completo', salary: '$1,500 – $2,000 USD/mes',
    description: 'Optimización de la cadena de suministro, logística de importación/exportación y negociaciones con proveedores.', tags: ['Supply Chain', 'Logística', 'Compras'], postedAt: 'Hace 5 días', featured: true, category: 'Logística',
  },

  // Comercio y Retail
  {
    id: 22, title: 'Gerente de Tienda', company: 'Tiendas SINSA', companyInitials: 'SN', companyColor: '#F59E0B',
    location: 'Estelí, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Tiempo completo', salary: 'C$ 35,000 – C$ 48,000 NIO/mes',
    description: 'Administración integral de la tienda, cumplimiento de metas de venta y supervisión de servicio al cliente.', tags: ['Retail', 'Ventas', 'Gerencia'], postedAt: 'Hace 1 semana', featured: false, category: 'Comercio y Retail',
  },
  {
    id: 23, title: 'Visual Merchandiser', company: 'Siman Nicaragua', companyInitials: 'SM', companyColor: '#E11D48',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 18,000 – C$ 25,000 NIO/mes',
    description: 'Diseño de escaparates, distribución de mercancía en sala de ventas y estrategias visuales comerciales.', tags: ['Diseño', 'Retail', 'Merchandising'], postedAt: 'Hace 2 semanas', featured: false, category: 'Comercio y Retail',
  },

  // Hospitalidad
  {
    id: 24, title: 'Chef Ejecutivo', company: 'Hotel Selva Negra', companyInitials: 'HS', companyColor: '#059669',
    location: 'Matagalpa, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Senior', contract: 'Tiempo completo', salary: '$1,200 – $1,800 USD/mes',
    description: 'Creación de menús, manejo de costos de alimentos, y dirección del personal de cocina del resort.', tags: ['Chef', 'Hospitalidad', 'Cocina'], postedAt: 'Hace 2 días', featured: true, category: 'Hospitalidad',
  },
  {
    id: 25, title: 'Recepcionista Bilingüe', company: 'Hotel Real La Merced', companyInitials: 'RM', companyColor: '#B45309',
    location: 'Granada, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 16,000 – C$ 22,000 NIO/mes',
    description: 'Atención a huéspedes internacionales, check-in/out, y asistencia en reservaciones y tours.', tags: ['Recepción', 'Turismo', 'Inglés'], postedAt: 'Hace 4 días', featured: false, category: 'Hospitalidad',
  },

  // Ingeniería
  {
    id: 26, title: 'Ingeniero Civil', company: 'Constructora MECO', companyInitials: 'MC', companyColor: '#475569',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Por proyecto', salary: '$1,500 – $2,500 USD/mes',
    description: 'Supervisión de obras civiles y proyectos viales, control de calidad y manejo de presupuestos de obra.', tags: ['Construcción', 'Ingeniería Civil', 'Obras'], postedAt: 'Hace 3 días', featured: true, category: 'Ingeniería',
  },
  {
    id: 27, title: 'Ingeniero Eléctrico', company: 'Disnorte-Dissur', companyInitials: 'DD', companyColor: '#EAB308',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Senior', contract: 'Tiempo completo', salary: 'C$ 45,000 – C$ 60,000 NIO/mes',
    description: 'Diseño y mantenimiento de redes de distribución eléctrica, planificación de proyectos energéticos.', tags: ['Electricidad', 'Energía', 'Ingeniería'], postedAt: 'Hace 1 semana', featured: false, category: 'Ingeniería',
  },

  // Creativo
  {
    id: 28, title: 'Diseñador Gráfico', company: 'Agencia CreaNica', companyInitials: 'CN', companyColor: '#EC4899',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Mid', contract: 'Tiempo completo', salary: '$600 – $900 USD/mes',
    description: 'Creación de identidad visual, materiales para campañas digitales y diseño editorial.', tags: ['Diseño Gráfico', 'Illustrator', 'Branding'], postedAt: 'Hace 1 día', featured: false, category: 'Creativo',
  },
  {
    id: 29, title: 'Community Manager', company: 'Marketing Digital Centro', companyInitials: 'MD', companyColor: '#8B5CF6',
    location: 'Remoto, Nicaragua', country: 'Nicaragua', modality: 'Remoto', seniority: 'Junior', contract: 'Medio tiempo', salary: '$300 – $500 USD/mes',
    description: 'Gestión de redes sociales, creación de parrillas de contenido y atención al cliente digital.', tags: ['Redes Sociales', 'Marketing', 'Digital'], postedAt: 'Hace 2 días', featured: false, category: 'Creativo',
  },

  // Legal
  {
    id: 30, title: 'Abogado Corporativo', company: 'Bufete Arias', companyInitials: 'BA', companyColor: '#334155',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Senior', contract: 'Tiempo completo', salary: '$2,000 – $3,000 USD/mes',
    description: 'Asesoría legal corporativa, redacción de contratos internacionales y cumplimiento regulatorio.', tags: ['Legal', 'Corporativo', 'Derecho'], postedAt: 'Hace 4 días', featured: true, category: 'Legal',
  },
  {
    id: 31, title: 'Asistente Legal', company: 'Firma Jurídica Central', companyInitials: 'FC', companyColor: '#64748B',
    location: 'León, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Sin experiencia', contract: 'Tiempo completo', salary: 'C$ 15,000 – C$ 18,000 NIO/mes',
    description: 'Revisión de documentos legales, gestión de trámites en juzgados y soporte a abogados senior.', tags: ['Legal', 'Asistencia', 'Trámites'], postedAt: 'Hace 1 semana', featured: false, category: 'Legal',
  },

  // Administración
  {
    id: 32, title: 'Especialista en Recursos Humanos', company: 'B2Gold Corp.', companyInitials: 'B2', companyColor: '#F59E0B',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Mid', contract: 'Tiempo completo', salary: '$1,200 – $1,800 USD/mes',
    description: 'Reclutamiento y selección de talento, evaluación de desempeño y clima organizacional.', tags: ['RRHH', 'Talento', 'Psicología'], postedAt: 'Hace 3 días', featured: false, category: 'Administración',
  },
  {
    id: 33, title: 'Asistente Administrativo', company: 'Distribuidora del Norte', companyInitials: 'DN', companyColor: '#0F766E',
    location: 'Estelí, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 14,000 – C$ 18,000 NIO/mes',
    description: 'Manejo de caja chica, atención telefónica, organización de agenda y apoyo a gerencia.', tags: ['Administración', 'Asistencia', 'Oficina'], postedAt: 'Hace 6 días', featured: false, category: 'Administración',
  },

  // Adicional Agricultura / Ventas
  {
    id: 34, title: 'Agrónomo de Campo', company: 'Fincas El Paraíso', companyInitials: 'FP', companyColor: '#15803D',
    location: 'Jinotega, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Mid', contract: 'Tiempo completo', salary: 'C$ 25,000 – C$ 35,000 NIO/mes',
    description: 'Asistencia técnica a cultivos de café, manejo de plagas y fertilización orgánica.', tags: ['Agronomía', 'Café', 'Campo'], postedAt: 'Hace 5 días', featured: false, category: 'Agricultura',
  },
  {
    id: 35, title: 'Vendedor de Ruta (Consumo Masivo)', company: 'Grupo Lala', companyInitials: 'GL', companyColor: '#0284C7',
    location: 'Matagalpa, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 18,000 + comisiones',
    description: 'Visita a pulperías y supermercados, toma de pedidos y exhibición de productos.', tags: ['Ventas', 'Ruta', 'Consumo'], postedAt: 'Hace 1 semana', featured: false, category: 'Ventas',
  },
  {
    id: 36, ownerId: 2, areaId: 'technology', specializationId: 'backend', requiredSkillIds: ['node-js', 'python', 'sql'], minimumExperienceYears: 2, educationRequirements: ['Técnico', 'Licenciatura'], department: 'Managua', municipality: 'Managua', status: 'active', title: 'Desarrollador/a de software', company: 'NicaTech Solutions', companyInitials: 'NT', companyColor: '#0F766E',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Híbrido', seniority: 'Mid', contract: 'Tiempo completo', salary: 'C$ 35,000 – C$ 48,000 NIO/mes',
    description: 'Diseño y desarrollo de aplicaciones web para clientes locales. Colaboración con equipos de producto y soporte a servicios existentes.', tags: ['TypeScript', 'Vue.js', 'Node.js'], postedAt: 'Hace 2 días', featured: true, category: 'Tecnología',
  },
  {
    id: 37, ownerId: 2, title: 'Analista de soporte técnico', company: 'NicaTech Solutions', companyInitials: 'NT', companyColor: '#0F766E',
    location: 'Managua, Nicaragua', country: 'Nicaragua', modality: 'Presencial', seniority: 'Junior', contract: 'Tiempo completo', salary: 'C$ 22,000 – C$ 30,000 NIO/mes',
    description: 'Atención y resolución de incidencias técnicas, documentación de soluciones y acompañamiento a clientes empresariales.', tags: ['Soporte', 'Linux', 'Atención al cliente'], postedAt: 'Hace 5 días', featured: false, category: 'Tecnología',
  }
]
