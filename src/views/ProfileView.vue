<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { useUiStore } from '@/stores/useUiStore'
import { useJobs } from '@/controllers/useJobs'
import { PROFESSIONAL_AREAS, MUNICIPALITIES_BY_DEPARTMENT, DEPARTMENTS, EMPLOYMENT_TYPES, WORK_MODALITIES, SKILL_LEVELS, COMPANY_SIZES, COMPANY_SECTORS, ORGANIZATION_TYPES } from '@/data/professionalTaxonomy'
import { calculateProfileCompletion } from '@/services/jobMatching'
import type { UserEducation, UserExperience } from '@/models/User'
import { EDUCATION_REQUIREMENTS } from '@/data/professionalTaxonomy'
import {
  PhMapPin, PhBriefcase, PhGraduationCap, PhEnvelope, PhPhone,
  PhGlobe, PhPencilSimple, PhPlus, PhX, PhCheck, PhBuildings,
  PhUsersThree, PhArrowUpRight, PhSparkle, PhCalendarBlank, PhMagnifyingGlass,
} from '@phosphor-icons/vue'

const props = defineProps<{ readOnly?: boolean; profileUserId?: number }>()
const auth = useAuthStore()
const ui = useUiStore()
const theme = useThemeStore()
const route = useRoute()
const router = useRouter()
const EDIT_PROFILE_PATH = '/panel/editar'
const { allJobs, categories } = useJobs()
const interestCategories = computed(() => PROFESSIONAL_AREAS.map(area => area.name))
const user = computed(() => auth.user)
const targetCandidateId = computed(() => Number(props.profileUserId ?? route.params.id ?? 0))
const isReadOnlyCandidateView = computed(() => Boolean(props.readOnly || route.name === 'candidate-profile') && auth.user?.role === 'company' && Boolean(targetCandidateId.value))
const candidateProfile = computed(() => auth.candidates.find(person => person.id === targetCandidateId.value) ?? null)
const displayUser = computed(() => isReadOnlyCandidateView.value ? candidateProfile.value ?? user.value : user.value)
const isCompany = computed(() => !isReadOnlyCandidateView.value && user.value?.role === 'company')
const showProfileCompletion = ref(true)
const showCompanyProfileCompletion = ref(true)
const editorOpen = ref(route.path === EDIT_PROFILE_PATH)
const isEditing = computed(() => editorOpen.value)
watch(() => route.path, path => { editorOpen.value = path === EDIT_PROFILE_PATH })
function goToEdit(section = profileTabs.value[0]) {
  syncForm()
  activeTab.value = section
  editorOpen.value = true
  if (route.path !== EDIT_PROFILE_PATH) void router.push(EDIT_PROFILE_PATH)
}
const activeTab = ref('Perfil')
const companyTabs = ['Perfil', 'Contacto', 'Contratación']
const candidateTabs = ['Perfil', 'Experiencia', 'Educación', 'Preferencias']
const profileTabs = computed(() => isCompany.value ? companyTabs : candidateTabs)
const formSnapshot = ref('')
const hasUnsavedChanges = computed(() => formSnapshot.value !== JSON.stringify(form))
const errors = ref<Record<string, string>>({})
const appliedJobs = computed(() => allJobs.value.filter(job => auth.applications.includes(job.id)))
function applicationStatus(jobId: number) {
  const status = auth.applicationRecords.find(record => record.jobId === jobId && record.candidateId === user.value?.id)?.status
  return ({ submitted: 'Recibida', reviewing: 'En revisión', shortlisted: 'Preseleccionada', rejected: 'No seleccionada', accepted: 'Seleccionada' } as Record<string, string>)[status || 'submitted']
}
const companyJobs = computed(() => allJobs.value.filter(job => job.ownerId === user.value?.id))
const companyApplications = computed(() => auth.applicationRecords.filter(record => companyJobs.value.some(job => job.id === record.jobId)))
const companyRecruitingAreas = computed(() => PROFESSIONAL_AREAS.filter(area => user.value?.recruitingAreaIds?.includes(area.id)))
const userProfessionalArea = computed(() => PROFESSIONAL_AREAS.find(area => area.id === user.value?.professionalAreaId))
const userSpecializations = computed(() => userProfessionalArea.value?.specializations.filter(item => user.value?.specializationIds?.includes(item.id)) || [])
const profileCompletion = computed(() => user.value ? calculateProfileCompletion(user.value) : null)
const companyProfileCompletion = computed(() => {
  const checks = [
    Boolean(user.value?.companyName), Boolean(user.value?.industry), Boolean(user.value?.companySize),
    Boolean(user.value?.location || user.value?.department), Boolean(user.value?.about),
    Boolean(user.value?.website), Boolean(user.value?.organizationType), Boolean(user.value?.recruitingAreaIds?.length),
  ]
  return Math.round(checks.filter(Boolean).length / checks.length * 100)
})
const profileArea = computed(() => PROFESSIONAL_AREAS.find(area => area.id === form.professionalAreaId))
const profileSpecializations = computed(() => profileArea.value?.specializations || [])
const secondaryAreas = computed(() => PROFESSIONAL_AREAS.filter(area => area.id !== form.professionalAreaId))
const profileSkills = computed(() => profileSpecializations.value.filter(item => form.specializationIds.includes(item.id)).flatMap(item => item.skills))
const selectedProfileSkills = computed(() => profileSkills.value.filter(skill => form.skillIds.includes(skill.id)))
const profileSkillLabels = computed(() => {
  const structured = PROFESSIONAL_AREAS.flatMap(area => area.specializations).flatMap(item => item.skills).filter(skill => user.value?.skillIds?.includes(skill.id)).map(skill => skill.name)
  return structured.length ? structured : user.value?.skills || []
})
const profileMunicipalities = computed(() => MUNICIPALITIES_BY_DEPARTMENT[form.department] || [])
const educationYears = computed(() => Array.from({ length: 60 }, (_, index) => String(new Date().getFullYear() + 8 - index)))
const studySpecializations = computed(() => profileArea.value?.specializations || PROFESSIONAL_AREAS.flatMap(area => area.specializations))
function isCustomEducationLevel(level: string) { return Boolean(level) && !EDUCATION_REQUIREMENTS.some(option => option === level) }
const industries = COMPANY_SECTORS
const companySizes = COMPANY_SIZES
const modalities = WORK_MODALITIES
const technologySkills = [
  { name: 'JavaScript', icon: 'javascript' }, { name: 'TypeScript', icon: 'typescript' },
  { name: 'Vue.js', icon: 'vuejs' }, { name: 'React', icon: 'react' }, { name: 'Node.js', icon: 'nodejs' },
  { name: 'Python', icon: 'python' }, { name: 'Go', icon: 'go' }, { name: 'Java', icon: 'java' },
  { name: 'PHP', icon: 'php' }, { name: 'C++', icon: 'cplusplus' }, { name: 'Linux', icon: 'linux' },
  { name: 'Docker', icon: 'docker' }, { name: 'Kubernetes', icon: 'kubernetes' }, { name: 'Git', icon: 'git' },
  { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'MySQL', icon: 'mysql' }, { name: 'Redis', icon: 'redis' },
  { name: 'MongoDB', icon: 'mongodb' }, { name: 'AWS', icon: 'amazonwebservices' }, { name: 'Azure', icon: 'azure' },
  { name: 'Figma', icon: 'figma' }, { name: 'HTML5', icon: 'html5' }, { name: 'CSS3', icon: 'css3' },
  { name: 'Bash', icon: 'bash' }, { name: 'NGINX', icon: 'nginx' },
]

function skillIcon(skill: string) {
  const match = technologySkills.find(item => item.name.toLowerCase() === skill.toLowerCase())
  return match ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${match.icon}/${match.icon}-original.svg` : ''
}

const languageOptions = ['Español', 'Inglés', 'Francés', 'Alemán', 'Portugués', 'Italiano', 'Japonés', 'Coreano']

const form = reactive({
  name: '', title: '', email: '', phone: '', location: '', website: '', about: '', avatar: '',
  skills: [] as string[], preferredModality: 'Remoto', preferredCategories: [] as string[],
  available: false, companyName: '', industry: '', companySize: '',
  professionalAreaId: '', secondaryAreaIds: [] as string[], specializationIds: [] as string[], skillIds: [] as string[],
  skillLevels: {} as Record<string, 'Básico' | 'Intermedio' | 'Avanzado'>, experienceYears: 0,
  preferredEmploymentTypes: [] as string[], preferredLocations: [] as string[], department: '', municipality: '',
  recruitingAreaIds: [] as string[], organizationType: '',
  experience: [] as UserExperience[], education: [] as UserEducation[], languages: [] as Array<{ id: number; language: string; level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Nativo' }>,
})

function syncForm() {
  const u = user.value
  if (!u) return
  Object.assign(form, {
    name: u.name || '', title: u.title || '', email: u.email || '', phone: u.phone || '',
    location: u.location || '', website: u.website || '', about: u.about || '', avatar: u.avatar || '',
    skills: [...(u.skills || [])], preferredModality: u.preferredModality || 'Remoto',
    preferredCategories: [...(u.preferredCategories || [])], available: !!u.available,
    companyName: u.companyName || '', industry: u.industry || '', companySize: u.companySize || '',
    professionalAreaId: u.professionalAreaId || '', secondaryAreaIds: [...(u.secondaryAreaIds || [])],
    specializationIds: [...(u.specializationIds || [])], skillIds: [...(u.skillIds || [])],
    skillLevels: { ...(u.skillLevels || {}) }, experienceYears: u.experienceYears || 0,
    preferredEmploymentTypes: [...(u.preferredEmploymentTypes || [])], preferredLocations: [...(u.preferredLocations || [])],
    department: u.department || '', municipality: u.municipality || '', recruitingAreaIds: [...(u.recruitingAreaIds || [])],
    organizationType: u.organizationType || '',
    experience: (u.experience || []).map(item => ({ ...item })), education: (u.education || []).map(item => ({ ...item })),
    languages: (u.languages || []).map(language => ({ ...language })),
  })
  formSnapshot.value = JSON.stringify(form)
}
watch(user, syncForm, { immediate: true })
onBeforeRouteLeave(async () => {
  if (!isEditing.value || !hasUnsavedChanges.value) return true
  const confirmed = await ui.askConfirm({
    title: 'Descartar cambios',
    message: 'Tienes cambios sin guardar. ¿Quieres salir sin guardar?',
    confirmText: 'Salir sin guardar',
    cancelText: 'Continuar editando',
  })
  return confirmed
})

function toggleCategory(category: string) {
  form.preferredCategories = form.preferredCategories.includes(category)
    ? form.preferredCategories.filter(item => item !== category)
    : [...form.preferredCategories, category]
}
function toggleList(values: string[], value: string) {
  return values.includes(value) ? values.filter(item => item !== value) : [...values, value]
}
async function changeTab(tab: string) {
  if (tab === activeTab.value) return
  if (hasUnsavedChanges.value) {
    const confirmed = await ui.askConfirm({
      title: 'Cambiar de sección',
      message: 'Tienes cambios sin guardar. ¿Quieres descartarlos para cambiar de sección?',
      confirmText: 'Descartar cambios',
      cancelText: 'Continuar editando',
    })
    if (!confirmed) return
  }
  if (hasUnsavedChanges.value) syncForm()
  errors.value = {}
  activeTab.value = tab
}
async function changeProfessionalArea(nextAreaId: string, select: HTMLSelectElement) {
  const oldAreaId = form.professionalAreaId
  const nextSpecializations = PROFESSIONAL_AREAS.find(area => area.id === nextAreaId)?.specializations || []
  const incompatible = form.specializationIds.filter(id => !nextSpecializations.some(item => item.id === id))
  if (incompatible.length) {
    const labels = incompatible.map(id => PROFESSIONAL_AREAS.flatMap(area => area.specializations).find(item => item.id === id)?.name || id)
    const confirmed = await ui.askConfirm({
      title: 'Cambiar área profesional',
      message: `Al cambiar de área se eliminarán estas especializaciones:\n\n${labels.join('\n')}\n\n¿Deseas continuar?`,
      confirmText: 'Continuar',
      cancelText: 'Cancelar',
    })
    if (!confirmed) {
      select.value = oldAreaId
      return
    }
    form.specializationIds = form.specializationIds.filter(id => !incompatible.includes(id))
    const validSkillIds = nextSpecializations.filter(item => form.specializationIds.includes(item.id)).flatMap(item => item.skills.map(skill => skill.id))
    form.skillIds = form.skillIds.filter(id => validSkillIds.includes(id))
  }
  form.professionalAreaId = nextAreaId
  if (oldAreaId !== nextAreaId) form.secondaryAreaIds = form.secondaryAreaIds.filter(id => id !== nextAreaId)
}
async function removeExperience(id: number) {
  const item = form.experience.find(exp => exp.id === id)
  if (!item) return
  const confirmed = await ui.askConfirm({
    title: 'Eliminar experiencia',
    message: `¿Eliminar esta experiencia?\n\n${item.title || 'Experiencia'}${item.company ? ` · ${item.company}` : ''}\n\nSe quitará de tu perfil al guardar.` ,
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
  })
  if (!confirmed) return
  form.experience = form.experience.filter(exp => exp.id !== id)
  ui.notifyInfo('Experiencia eliminada', 'Se quitó del perfil y podrás guardar los cambios.')
}
async function removeEducation(id: number) {
  const item = form.education.find(education => education.id === id)
  if (!item) return
  const confirmed = await ui.askConfirm({
    title: 'Eliminar formación',
    message: `¿Eliminar este estudio?\n\n${item.degree || 'Formación'}${item.institution ? ` · ${item.institution}` : ''}\n\nSe quitará de tu perfil al guardar.`,
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
  })
  if (!confirmed) return
  form.education = form.education.filter(education => education.id !== id)
  ui.notifyInfo('Formación eliminada', 'Se quitó del perfil y podrás guardar los cambios.')
}
function addLanguage() {
  form.languages.push({ id: Date.now(), language: 'Español', level: 'Avanzado' })
}
function removeLanguage(id: number) {
  form.languages = form.languages.filter(language => language.id !== id)
}
function addExperience() {
  form.experience.push({ id: Date.now(), title: '', company: '', companyInitials: '', companyColor: '#0284C7', location: form.location, startDate: '', endDate: null, current: true, description: '', areaId: form.professionalAreaId || undefined })
}
function addEducation() {
  form.education.push({ id: Date.now(), degree: '', institution: '', year: String(new Date().getFullYear()), field: '', currentlyStudying: false })
}
function monthIndex(value: string | null) {
  if (!value) return null
  const numeric = value.match(/^(\d{4})-(\d{1,2})$/)
  if (numeric) return Number(numeric[2]) >= 1 && Number(numeric[2]) <= 12 ? Number(numeric[1]) * 12 + Number(numeric[2]) : null
  const normalized = value.trim().toLocaleLowerCase()
  const year = Number(normalized.match(/\d{4}/)?.[0])
  const month = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'].findIndex(name => normalized.includes(name))
  return year && month >= 0 ? year * 12 + month : null
}
function saveProfile() {
  errors.value = {}
  if (!isCompany.value && activeTab.value === 'Perfil') {
    if (!form.name.trim() || form.name.trim().length < 2) errors.value.name = 'Escribe tu nombre completo.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.value.email = 'Revisa el formato del correo.'
    if (form.avatar && !/^https?:\/\//i.test(form.avatar)) errors.value.avatar = 'Usa un enlace de imagen que comience con https://.'
    if (form.department && form.municipality && !profileMunicipalities.value.includes(form.municipality)) errors.value.municipality = 'Selecciona un municipio válido para este departamento.'
    if (Object.keys(errors.value).length) return
    auth.updateProfile({ name: form.name, email: form.email, title: form.title, phone: form.phone, avatar: form.avatar, website: form.website, about: form.about, available: form.available, location: form.municipality && form.department ? `${form.municipality}, ${form.department}` : form.location, department: form.department || undefined, municipality: form.municipality || undefined, professionalAreaId: form.professionalAreaId || undefined, secondaryAreaIds: [...form.secondaryAreaIds], specializationIds: [...form.specializationIds], skillIds: [...form.skillIds], skillLevels: { ...form.skillLevels }, skills: [...new Set([...form.skillIds.map(id => PROFESSIONAL_AREAS.flatMap(area => area.specializations).flatMap(item => item.skills).find(skill => skill.id === id)?.name).filter((name): name is string => Boolean(name)), ...form.skills])] , experienceYears: Number(form.experienceYears) })
    savedSection()
    return
  }
  if (!isCompany.value && activeTab.value === 'Experiencia') {
    if (form.experience.some(item => !item.title.trim() || !item.company.trim() || !item.startDate.trim())) { errors.value.experience = 'Cada experiencia necesita cargo, empresa y fecha de inicio.'; return }
    const duplicate = form.experience.find((item, index) => item.title.trim() && form.experience.some((other, otherIndex) => otherIndex !== index && item.title.trim().toLocaleLowerCase() === other.title.trim().toLocaleLowerCase() && item.company.trim().toLocaleLowerCase() === other.company.trim().toLocaleLowerCase()))
    if (duplicate) { errors.value.experience = 'Hay experiencias duplicadas con el mismo cargo y empresa.'; return }
    const invalidFormat = form.experience.find(item => (item.startDate && monthIndex(item.startDate) === null) || (item.endDate && monthIndex(item.endDate) === null))
    if (invalidFormat) { errors.value.experience = 'Usa una fecha válida, por ejemplo “2023-01” o “Ene 2023”.'; return }
    const invalidDates = form.experience.find(item => {
      if (item.current || !item.startDate || !item.endDate) return false
      const start = monthIndex(item.startDate)
      const end = monthIndex(item.endDate)
      return start !== null && end !== null && end < start
    })
    if (invalidDates) { errors.value.experience = 'La fecha de finalización no puede ser anterior a la de inicio.'; return }
    const missingEnd = form.experience.find(item => item.title.trim() && item.company.trim() && !item.current && !item.endDate)
    if (missingEnd) { errors.value.experience = 'Añade una fecha de finalización o marca que todavía trabajas allí.'; return }
    const currentWithEnd = form.experience.find(item => item.current && item.endDate)
    if (currentWithEnd) { errors.value.experience = 'Una experiencia actual no debe tener fecha de finalización.'; return }
    auth.updateProfile({ experience: form.experience.filter(item => item.title.trim() && item.company.trim()).map(item => ({ ...item, companyInitials: item.company.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase() })) })
    savedSection(); return
  }
  if (!isCompany.value && activeTab.value === 'Educación') {
    auth.updateProfile({ education: form.education.filter(item => item.degree && item.institution.trim()).map(item => ({ ...item })) })
    savedSection(); return
  }
  if (!isCompany.value && activeTab.value === 'Preferencias') {
    auth.updateProfile({ preferredLocations: [...form.preferredLocations], preferredEmploymentTypes: [...form.preferredEmploymentTypes], preferredModality: form.preferredModality as 'Remoto' | 'Presencial' | 'Híbrido', preferredCategories: [...form.preferredCategories], available: form.available, languages: form.languages.map(language => ({ ...language })) })
    savedSection(); return
  }
  if (isCompany.value) {
    if (!form.companyName.trim()) errors.value.companyName = 'Indica el nombre de tu empresa.'
    if (!form.industry) errors.value.industry = 'Selecciona el sector de actividad.'
    if (form.department && form.municipality && !profileMunicipalities.value.includes(form.municipality)) errors.value.municipality = 'Selecciona un municipio válido para este departamento.'
  } else {
    if (form.name.trim().length < 2) errors.value.name = 'Escribe tu nombre completo.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.value.email = 'Revisa el formato del correo.'
  }
  if (Object.keys(errors.value).length) return
  const commonProfile = {
    name: form.name, email: form.email, phone: form.phone,
    location: form.municipality && form.department ? `${form.municipality}, ${form.department}` : form.location,
    department: form.department || undefined, municipality: form.municipality || undefined,
    website: form.website, about: form.about,
  }
  auth.updateProfile(isCompany.value
    ? { ...commonProfile, title: form.title, companyName: form.companyName, industry: form.industry, companySize: form.companySize, organizationType: form.organizationType, recruitingAreaIds: [...form.recruitingAreaIds] }
    : {
        ...commonProfile,
        title: form.title,
        skills: [...new Set([...form.skillIds.map(id => profileSkills.value.find(skill => skill.id === id)?.name).filter((name): name is string => Boolean(name)), ...form.skills])],
        professionalAreaId: form.professionalAreaId || undefined,
        secondaryAreaIds: [...form.secondaryAreaIds], specializationIds: [...form.specializationIds],
        skillIds: [...form.skillIds], skillLevels: { ...form.skillLevels }, experienceYears: Number(form.experienceYears),
        department: form.department || undefined, municipality: form.municipality || undefined,
        preferredLocations: [...form.preferredLocations], preferredEmploymentTypes: [...form.preferredEmploymentTypes],
        preferredModality: form.preferredModality as 'Remoto' | 'Presencial' | 'Híbrido',
        preferredCategories: [...form.preferredCategories],
        available: form.available,
        experience: form.experience.filter(item => item.title.trim() && item.company.trim()).map(item => ({ ...item, companyInitials: item.company.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase() })),
        education: form.education.filter(item => item.degree && item.institution.trim()),
      })
  ui.notifySuccess('Perfil guardado', 'Los cambios se actualizaron correctamente.')
  router.push({ name: 'profile' })
  activeTab.value = 'Perfil'
}
function savedSection() {
  syncForm()
  ui.notifySuccess('Sección actualizada', 'Los cambios de esta parte del perfil se guardaron correctamente.')
  editorOpen.value = false
  router.push({ name: 'profile' })
}
function cancelEdit() {
  syncForm()
  errors.value = {}
  editorOpen.value = false
  router.push({ name: 'profile' })
  activeTab.value = 'Perfil'
}
</script>

<template>
  <main class="profile-page" :class="{ 'editing-page': isEditing, 'profile-page-light': theme.theme === 'light' }">
    <div class="profile-shell" :class="{ 'editing-shell': isEditing }">
      <template v-if="isCompany">
        <section class="company-hero panel">
          <div class="company-cover"></div>
          <div class="company-heading">
            <div class="company-mark"><PhBuildings :size="36" weight="duotone" /></div>
            <div class="company-intro">
              <span class="eyebrow">Perfil de empresa</span>
              <h1>{{ user?.companyName || 'Tu empresa' }}</h1>
              <p>{{ user?.industry || 'Agrega el sector de tu empresa' }}<span v-if="user?.location"> · {{ user.location }}</span></p>
            </div>
            <button class="button button-primary company-edit" @click="goToEdit('Perfil')"><PhPencilSimple :size="17" />Editar empresa</button>
          </div>
          <div class="company-meta">
            <span v-if="user?.companySize"><PhUsersThree :size="17" />{{ user.companySize }} colaboradores</span><span v-if="user?.organizationType">{{ user.organizationType }}</span>
            <a v-if="user?.website" :href="user.website" target="_blank" rel="noreferrer"><PhGlobe :size="17" />{{ user.website }}<PhArrowUpRight :size="14" /></a>
            <span><PhEnvelope :size="17" />{{ user?.email }}</span>
          </div>
        </section>

        <section v-if="showCompanyProfileCompletion && companyProfileCompletion < 100" class="panel content-panel profile-completion-panel"><button type="button" class="profile-completion-close" aria-label="Ocultar aviso de completitud" @click="showCompanyProfileCompletion = false"><PhX :size="16" /></button><div class="flex flex-wrap items-center justify-between gap-4"><div><span class="eyebrow">Perfil de empresa</span><h2>{{ companyProfileCompletion }}% completo</h2><p class="mt-1 text-sm text-gray-400">Completa los datos de tu organización para dar más contexto a quienes buscan empleo.</p></div><button class="button button-secondary" @click="goToEdit">Completar perfil</button></div><div class="mt-4 h-2 overflow-hidden rounded-full bg-[#253247]"><div class="h-full rounded-full bg-emerald-500" :style="{ width: `${companyProfileCompletion}%` }"></div></div></section>
        <div class="company-layout">
          <section class="panel content-panel">
            <div class="section-heading"><div><span class="eyebrow">Quiénes somos</span><h2>Acerca de la empresa</h2></div></div>
            <p v-if="user?.about" class="body-copy preserve-lines">{{ user.about }}</p>
            <div v-else class="empty-state"><PhSparkle :size="21" /><p>Cuéntales a los candidatos qué hace especial a tu empresa.</p><button class="text-button" @click="goToEdit('Contratación')">Completar descripción <PhArrowUpRight :size="15" /></button></div>
          </section>
          <aside class="panel content-panel company-contact">
            <span class="eyebrow">Contacto principal</span><h2>{{ user?.name }}</h2><p>{{ user?.title || 'Representante de empresa' }}</p>
            <a :href="`mailto:${user?.email}`"><PhEnvelope :size="17" />{{ user?.email }}</a>
            <a v-if="user?.phone" :href="`tel:${user.phone}`"><PhPhone :size="17" />{{ user.phone }}</a>
          </aside>
        </div>

        <section class="panel content-panel"><div class="section-heading"><div><span class="eyebrow">Áreas de contratación</span><h2>Perfiles que busca la empresa</h2></div></div><div v-if="companyRecruitingAreas.length" class="category-list"><span v-for="area in companyRecruitingAreas" :key="area.id" class="category-chip">{{ area.name }}</span></div><div v-else class="empty-state"><p>Selecciona las áreas profesionales en las que contrata tu organización.</p><button class="text-button" @click="goToEdit('Contratación')">Completar áreas</button></div></section><section class="panel content-panel company-next">
          <div class="company-next-icon"><PhBriefcase :size="23" /></div><div><span class="eyebrow">Tu actividad</span><h2>{{ companyJobs.length }} ofertas · {{ companyApplications.length }} postulaciones</h2><p>Administra tus vacantes y revisa los perfiles de quienes aplicaron.</p></div>
          <router-link class="button button-secondary" to="/empresa/ofertas">Ver mis ofertas</router-link>
          <router-link class="button button-secondary" to="/empresa/postulantes">Ver postulantes</router-link>
          <router-link class="button button-primary" to="/empresa/perfiles">Buscar perfiles</router-link>
        </section>

        <section v-if="isEditing" class="edit-overlay">
          <form class="edit-card" @submit.prevent="saveProfile">
            <div class="edit-header"><div><span class="eyebrow">Configuración</span><h2>Editar empresa</h2></div><button type="button" class="icon-button" aria-label="Volver al panel" @click="cancelEdit"><PhX :size="20" /></button></div>
            <div class="editor-tabs"><button v-for="tab in companyTabs" :key="tab" type="button" :class="{ selected: activeTab === tab }" @click="changeTab(tab)">{{ tab }}</button></div>
            <div v-if="activeTab === 'Perfil'" class="edit-grid">
              <label class="field"><span>Nombre de la empresa <i>*</i></span><input v-model="form.companyName" class="control" placeholder="Ej. NicaTech Solutions" /><small v-if="errors.companyName">{{ errors.companyName }}</small></label>
              <label class="field"><span>Sector <i>*</i></span><select v-model="form.industry" class="control"><option value="">Selecciona un sector</option><option v-for="industry in industries" :key="industry">{{ industry }}</option></select><small v-if="errors.industry">{{ errors.industry }}</small></label>
              <label class="field"><span>Tamaño de empresa</span><select v-model="form.companySize" class="control"><option value="">Selecciona el tamaño</option><option v-for="size in companySizes" :key="size" :value="size">{{ size }} colaboradores</option></select></label>
              <label class="field"><span>Ubicación</span><input v-model="form.location" class="control" placeholder="Ciudad, país" /></label>
              <label class="field"><span>Tipo de organización</span><select v-model="form.organizationType" class="control"><option value="">Selecciona un tipo</option><option v-for="kind in ORGANIZATION_TYPES" :key="kind" :value="kind">{{ kind }}</option></select></label>
              <div class="field"><span class="field-label">Departamento y municipio</span><div class="edit-grid"><select v-model="form.department" class="control" @change="form.municipality = ''"><option value="">Departamento</option><option v-for="department in DEPARTMENTS" :key="department">{{ department }}</option></select><select v-model="form.municipality" class="control" :disabled="!form.department"><option value="">Municipio</option><option v-for="municipality in profileMunicipalities" :key="municipality">{{ municipality }}</option></select></div></div>
              <label class="field field-wide"><span>Sitio web</span><input v-model="form.website" type="url" class="control" placeholder="https://tuempresa.com" /></label>
            </div>
            <div v-else-if="activeTab === 'Contacto'" class="edit-grid">
              <label class="field"><span>Persona de contacto</span><input v-model="form.name" class="control" /></label>
              <label class="field"><span>Correo de contacto</span><input v-model="form.email" type="email" class="control" /></label>
              <label class="field"><span>Teléfono</span><input v-model="form.phone" type="tel" class="control" placeholder="+505 0000 0000" /></label>
              <label class="field"><span>Foto de perfil (enlace)</span><input v-model="form.avatar" type="url" class="control" placeholder="https://..." /><small v-if="errors.avatar">{{ errors.avatar }}</small></label>
              <label class="field"><span>Cargo del representante</span><input v-model="form.title" class="control" placeholder="Ej. Director de operaciones" /></label>
            </div>
            <div v-else class="edit-grid">
              <fieldset class="field field-wide"><legend>Áreas en las que contrata</legend><div class="choice-grid"><button v-for="area in PROFESSIONAL_AREAS" :key="area.id" type="button" class="choice-chip" :class="{ chosen: form.recruitingAreaIds.includes(area.id) }" @click="form.recruitingAreaIds = toggleList(form.recruitingAreaIds, area.id)"><PhCheck v-if="form.recruitingAreaIds.includes(area.id)" :size="14" />{{ area.name }}</button></div></fieldset>
              <label class="field field-wide"><span>Acerca de la empresa</span><textarea v-model="form.about" class="control textarea" rows="5" maxlength="800" placeholder="Describe la misión, el equipo y la cultura de tu empresa…"></textarea><span class="field-foot">{{ form.about.length }} / 800</span></label>
            </div>
            <div class="edit-actions"><button type="button" class="button button-secondary" @click="cancelEdit">Cancelar</button><button type="submit" class="button button-primary"><PhCheck :size="17" />Guardar cambios</button></div>
          </form>
        </section>
      </template>

      <template v-else>
        <section v-if="isReadOnlyCandidateView" class="panel content-panel read-only-profile-view">
          <div class="section-heading"><div><span class="eyebrow">Perfil profesional</span><h2>{{ candidateProfile?.name || 'Perfil profesional' }}</h2></div></div>
          <div class="profile-hero panel">
            <div class="hero-cover"></div>
            <div class="hero-main">
              <div class="avatar-wrap"><img v-if="candidateProfile?.avatar" :src="candidateProfile.avatar" :alt="candidateProfile.name" class="avatar" /><div v-else class="avatar avatar-fallback">{{ candidateProfile?.name?.charAt(0) }}</div></div>
              <div class="hero-info">
                <div class="name-line"><h1>{{ candidateProfile?.name }}</h1></div>
                <p v-if="candidateProfile?.title" class="profile-title">{{ candidateProfile.title }}</p>
                <div class="profile-meta-inline">
                  <span v-if="candidateProfile?.location"><PhMapPin :size="16" />{{ candidateProfile.location }}</span>
                  <span v-if="candidateProfile?.preferredModality"><PhBriefcase :size="16" />{{ candidateProfile.preferredModality }}</span>
                  <a v-if="candidateProfile?.website" :href="candidateProfile.website" target="_blank" rel="noreferrer"><PhGlobe :size="16" />{{ candidateProfile.website }}</a>
                  <a v-if="candidateProfile?.email" :href="`mailto:${candidateProfile.email}`"><PhEnvelope :size="16" />{{ candidateProfile.email }}</a>
                </div>
              </div>
            </div>
          </div>

          <div class="candidate-layout">
            <div class="candidate-main-column">
              <section class="panel content-panel">
                <div class="section-heading"><div><span class="eyebrow">Sobre mí</span><h2>Presentación</h2></div></div>
                <p v-if="candidateProfile?.about" class="body-copy preserve-lines">{{ candidateProfile.about }}</p>
                <div v-else class="empty-state"><PhSparkle :size="21" /><p>Este perfil aún no incluye una presentación.</p></div>
              </section>
              <section class="panel content-panel">
                <div class="section-heading"><div><span class="eyebrow">Trayectoria</span><h2>Experiencia</h2></div></div>
                <div v-if="candidateProfile?.experience?.length" class="timeline"><article v-for="exp in candidateProfile.experience" :key="exp.id" class="timeline-item"><div><h3>{{ exp.title }}</h3><p class="item-subtitle">{{ exp.company }}<span v-if="exp.location"> · {{ exp.location }}</span></p><p class="item-date">{{ exp.startDate }} — {{ exp.current ? 'Actualidad' : exp.endDate }}</p><p v-if="exp.description" class="body-copy item-description">{{ exp.description }}</p></div></article></div>
                <div v-else class="empty-state"><PhBriefcase :size="21" /><p>Este candidato todavía no agregó experiencia.</p></div>
              </section>
              <section class="panel content-panel">
                <div class="section-heading"><div><span class="eyebrow">Habilidades</span><h2>Competencias</h2></div></div>
                <div v-if="candidateProfile?.skillIds?.length || candidateProfile?.skills?.length" class="hero-tags compact-tags"><span v-for="skill in (candidateProfile?.skills || [])" :key="skill" class="tech-badge"><span class="tech-fallback">{{ skill.slice(0, 1) }}</span>{{ skill }}</span></div>
                <div v-else class="empty-state"><p>Este candidato aún no agregó habilidades.</p></div>
              </section>
              <section v-if="candidateProfile?.languages?.length" class="panel content-panel">
                <div class="section-heading"><div><span class="eyebrow">Idiomas</span><h2>Niveles</h2></div></div>
                <div class="language-list"><span v-for="language in candidateProfile.languages" :key="language.id" class="language-chip"><strong>{{ language.language }}</strong><em>{{ language.level }}</em></span></div>
              </section>
              <section class="panel content-panel">
                <div class="section-heading"><div><span class="eyebrow">Formación</span><h2>Educación</h2></div></div>
                <div v-if="candidateProfile?.education?.length" class="timeline"><article v-for="edu in candidateProfile.education" :key="edu.id" class="timeline-item"><div><h3>{{ edu.degree }}</h3><p class="item-subtitle">{{ edu.institution }}</p><p class="item-date">{{ edu.field }}<span v-if="edu.field"> · </span>{{ edu.year }}</p></div></article></div>
                <div v-else class="empty-state"><PhGraduationCap :size="21" /><p>Este candidato aún no agregó formación.</p></div>
              </section>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap items-center gap-3"><a class="button button-primary" :href="`mailto:${candidateProfile?.email}`"><PhEnvelope :size="17" />Contactar por correo</a></div>
        </section>

        <section v-else-if="showProfileCompletion && profileCompletion" class="panel content-panel profile-completion-panel">
          <button type="button" class="profile-completion-close" aria-label="Ocultar aviso de completitud" @click="showProfileCompletion = false"><PhX :size="16" /></button>
          <div class="flex flex-wrap items-center justify-between gap-4"><div><span class="eyebrow">Compleción del perfil</span><h2>{{ profileCompletion.percentage }}% completo</h2><p class="mt-1 text-sm text-gray-400">{{ profileCompletion.next ? `Siguiente paso recomendado: ${profileCompletion.next.label}. Puedes completarlo cuando quieras.` : 'Tu perfil tiene la información principal para recibir mejores recomendaciones.' }}</p></div><router-link to="/panel/editar" class="button button-secondary">Completar perfil</router-link></div>
          <div class="mt-4 h-2 overflow-hidden rounded-full bg-[#253247]"><div class="h-full rounded-full bg-emerald-500 transition-all" :style="{ width: `${profileCompletion.percentage}%` }"></div></div>
          <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400"><span v-for="check in profileCompletion.checks" :key="check.id">{{ check.complete ? '✓' : '○' }} {{ check.label }}</span></div>
        </section>
        <section v-else class="profile-hero panel">
          <div class="hero-cover"></div>
          <div class="hero-main">
            <div class="avatar-wrap"><img v-if="user?.avatar" :src="user.avatar" :alt="user.name" class="avatar" /><div v-else class="avatar avatar-fallback">{{ user?.name?.charAt(0) }}</div></div>
            <div class="hero-info">
              <div class="name-line"><h1>{{ user?.name }}</h1></div>
              <p v-if="user?.title" class="profile-title">{{ user.title }}</p>
              <div class="profile-meta-inline">
                <span v-if="user?.location"><PhMapPin :size="16" />{{ user.location }}</span>
                <span v-if="user?.preferredModality"><PhBriefcase :size="16" />{{ user.preferredModality }}</span>
                <a v-if="user?.website" :href="user.website" target="_blank" rel="noreferrer"><PhGlobe :size="16" />{{ user.website }}</a>
                <a v-if="user?.email" :href="`mailto:${user?.email}`"><PhEnvelope :size="16" />{{ user.email }}</a>
              </div>
            </div>
            <button class="button button-secondary hero-edit" @click="goToEdit()"><PhPencilSimple :size="17" />Editar perfil</button>
          </div>
        </section>

        <div v-if="!isReadOnlyCandidateView" class="candidate-layout">
          <div class="candidate-main-column">
            <section class="panel content-panel">
              <div class="section-heading"><div><span class="eyebrow">Sobre mí</span><h2>Presentación</h2></div></div>
              <p v-if="user?.about" class="body-copy preserve-lines">{{ user.about }}</p><div v-else class="empty-state"><PhSparkle :size="21" /><p>Presenta tu experiencia, tus fortalezas y el tipo de retos que te interesan.</p><button class="text-button" @click="goToEdit('Perfil')">Escribir presentación <PhArrowUpRight :size="15" /></button></div>
            </section>
            <section class="panel content-panel">
              <div class="section-heading"><div><span class="eyebrow">Trayectoria</span><h2>Experiencia</h2></div></div>
              <div v-if="user?.experience?.length" class="timeline"><article v-for="exp in user.experience" :key="exp.id" class="timeline-item"><div><h3>{{ exp.title }}</h3><p class="item-subtitle">{{ exp.company }}<span v-if="exp.location"> · {{ exp.location }}</span></p><p class="item-date">{{ exp.startDate }} — {{ exp.current ? 'Actualidad' : exp.endDate }}</p><p v-if="exp.description" class="body-copy item-description">{{ exp.description }}</p></div></article></div>
              <div v-else class="empty-state"><PhBriefcase :size="21" /><p>Agrega tus puestos anteriores y actuales.</p><button class="text-button" @click="goToEdit('Experiencia')">Añadir experiencia <PhPlus :size="15" /></button></div>
            </section>
            <section class="panel content-panel">
              <div class="section-heading"><div><span class="eyebrow">Habilidades</span><h2>Competencias</h2></div></div>
              <div v-if="profileSkillLabels.length" class="hero-tags compact-tags"><span v-for="skill in profileSkillLabels" :key="skill" class="tech-badge"><img v-if="skillIcon(skill)" :src="skillIcon(skill)" :alt="''" class="tech-icon" loading="lazy" /><span v-else class="tech-fallback">{{ skill.slice(0, 1) }}</span>{{ skill }}</span></div>
              <div v-else class="empty-state"><p>Aún no tienes habilidades agregadas.</p><button class="text-button" @click="goToEdit('Perfil')">Añadir habilidades <PhPlus :size="15" /></button></div>
            </section>
            <section v-if="user?.languages?.length" class="panel content-panel">
              <div class="section-heading"><div><span class="eyebrow">Idiomas</span><h2>Niveles</h2></div></div>
              <div class="language-list"><span v-for="language in user.languages" :key="language.id" class="language-chip"><strong>{{ language.language }}</strong><em>{{ language.level }}</em></span></div>
            </section>
            <section class="panel content-panel">
              <div class="section-heading"><div><span class="eyebrow">Formación</span><h2>Educación</h2></div></div>
              <div v-if="user?.education?.length" class="timeline"><article v-for="edu in user.education" :key="edu.id" class="timeline-item"><div><h3>{{ edu.degree }}</h3><p class="item-subtitle">{{ edu.institution }}</p><p class="item-date">{{ edu.field }}<span v-if="edu.field"> · </span>{{ edu.year }}</p></div></article></div>
              <div v-else class="empty-state"><PhGraduationCap :size="21" /><p>Comparte tu formación académica.</p><button class="text-button" @click="goToEdit('Educación')">Añadir estudios <PhPlus :size="15" /></button></div>
            </section>
          </div>
        </div>

        <section v-if="!isReadOnlyCandidateView" class="panel applications-list"><div class="section-heading"><div><span class="eyebrow">Actividad</span><h2>Mis postulaciones</h2></div><span class="count-pill">{{ appliedJobs.length }}</span></div><div v-if="appliedJobs.length" class="job-list"><router-link v-for="job in appliedJobs" :key="job.id" :to="`/empleos/${job.id}`" class="job-row"><div class="job-monogram" :style="{ backgroundColor: job.companyColor }">{{ job.companyInitials }}</div><div class="job-copy"><strong>{{ job.title }}</strong><span>{{ job.company }} · {{ job.location }}</span></div><span class="sent-status"><span></span>{{ applicationStatus(job.id) }}</span><PhArrowUpRight :size="16" class="job-arrow" /></router-link></div><div v-else class="empty-applications"><div class="empty-briefcase"><PhBriefcase :size="22" /></div><div><strong>Aún no tienes postulaciones</strong><p>Encuentra una oportunidad que encaje contigo y aparecerá aquí.</p></div><router-link to="/empleos" class="button button-primary">Ver empleos</router-link></div></section>

        <section v-if="isEditing" class="edit-overlay">
          <form class="edit-card candidate-editor" @submit.prevent="saveProfile">
            <div class="edit-header"><div><span class="eyebrow">Tu espacio profesional</span><h2>Editar perfil</h2></div><button type="button" class="icon-button" aria-label="Volver al panel" @click="cancelEdit"><PhX :size="20" /></button></div>
            <div class="editor-tabs"><button v-for="tab in profileTabs" :key="tab" type="button" :class="{ selected: activeTab === tab }" @click="changeTab(tab)">{{ tab }}</button></div>
            <div v-if="activeTab === 'Perfil'" class="edit-grid">
              <label class="field"><span>Nombre completo <i>*</i></span><input v-model="form.name" class="control" placeholder="Tu nombre y apellidos" /><small v-if="errors.name">{{ errors.name }}</small></label>
              <label class="field"><span>Titular profesional</span><input v-model="form.title" class="control" placeholder="Ej. Ingeniera de software · Backend" /></label>
              <label class="field"><span>Correo electrónico <i>*</i></span><input v-model="form.email" type="email" class="control" placeholder="nombre@correo.com" /><small v-if="errors.email">{{ errors.email }}</small></label>
              <label class="field"><span>Teléfono</span><input v-model="form.phone" type="tel" class="control" placeholder="+505 0000 0000" /></label>
              <label class="field"><span>Ubicación</span><input v-model="form.location" class="control" placeholder="Ciudad, país" /></label>
              <label class="field"><span>Sitio web o portafolio</span><input v-model="form.website" type="url" class="control" placeholder="https://tuportafolio.com" /></label>
              <div class="field field-wide"><span class="field-label">Área profesional principal</span><select :value="form.professionalAreaId" class="control" @change="changeProfessionalArea(($event.target as HTMLSelectElement).value, $event.target as HTMLSelectElement)"><option value="">Selecciona un área</option><option v-for="area in PROFESSIONAL_AREAS" :key="area.id" :value="area.id">{{ area.name }}</option></select><small class="field-hint">Las especializaciones y habilidades disponibles dependen del área.</small></div>
              <fieldset class="field field-wide"><legend>Otras áreas de interés</legend><div class="choice-grid"><button v-for="area in secondaryAreas" :key="area.id" type="button" class="choice-chip" :class="{ chosen: form.secondaryAreaIds.includes(area.id) }" @click="form.secondaryAreaIds = toggleList(form.secondaryAreaIds, area.id)"><PhCheck v-if="form.secondaryAreaIds.includes(area.id)" :size="14" />{{ area.name }}</button></div></fieldset>
              <fieldset v-if="profileArea" class="field field-wide"><legend>Especializaciones</legend><div class="choice-grid"><button v-for="item in profileSpecializations" :key="item.id" type="button" class="choice-chip" :class="{ chosen: form.specializationIds.includes(item.id) }" @click="form.specializationIds = toggleList(form.specializationIds, item.id); form.skillIds = form.skillIds.filter(id => profileSkills.some(skill => skill.id === id))"><PhCheck v-if="form.specializationIds.includes(item.id)" :size="14" />{{ item.name }}</button></div></fieldset>
              <fieldset v-if="form.specializationIds.length" class="field field-wide"><legend>Habilidades</legend><div class="choice-grid"><button v-for="skill in profileSkills" :key="skill.id" type="button" class="choice-chip" :class="{ chosen: form.skillIds.includes(skill.id) }" @click="form.skillIds = toggleList(form.skillIds, skill.id)"><PhCheck v-if="form.skillIds.includes(skill.id)" :size="14" />{{ skill.name }}</button></div><small class="field-hint">Elige solo las habilidades que correspondan a tus especializaciones.</small></fieldset><div v-if="selectedProfileSkills.length" class="grid gap-3 sm:grid-cols-2"><label v-for="skill in selectedProfileSkills" :key="skill.id" class="field"><span>Nivel de {{ skill.name }}</span><select v-model="form.skillLevels[skill.id]" class="control"><option value="">Sin especificar</option><option v-for="level in SKILL_LEVELS" :key="level" :value="level">{{ level }}</option></select></label></div>
              <label class="field"><span>Años de experiencia</span><select v-model.number="form.experienceYears" class="control"><option v-for="year in 21" :key="year - 1" :value="year - 1">{{ year - 1 }}{{ year === 21 ? '+' : '' }}</option></select></label>
              <div class="field"><span class="field-label">Departamento y municipio</span><div class="edit-grid"><select v-model="form.department" class="control" @change="form.municipality = ''"><option value="">Departamento</option><option v-for="department in DEPARTMENTS" :key="department">{{ department }}</option></select><select v-model="form.municipality" class="control" :disabled="!form.department"><option value="">Municipio</option><option v-for="municipality in profileMunicipalities" :key="municipality">{{ municipality }}</option></select></div><small v-if="errors.municipality">{{ errors.municipality }}</small></div>
              <label class="field field-wide"><span>Acerca de ti</span><textarea v-model="form.about" class="control textarea" rows="5" maxlength="600" placeholder="Resume tu experiencia, tus fortalezas y lo que buscas en tu próximo reto…"></textarea><span class="field-foot">{{ form.about.length }} / 600</span></label>
            </div>
            <div v-else-if="activeTab === 'Experiencia'" class="structured-editor">
  <div class="editor-callout"><PhBriefcase :size="20"/><p>Agrega cada puesto por separado. Las fechas y el área ayudan a comparar tu experiencia con los requisitos de una oferta.</p></div>
  <button type="button" class="button button-secondary justify-self-start" @click="addExperience"><PhPlus :size="16"/>Añadir experiencia</button>
  <p v-if="errors.experience" class="field-error">{{ errors.experience }}</p>
  <article v-for="(item, index) in form.experience" :key="item.id" class="rounded-xl border border-[#293a50] p-4">
    <div class="edit-grid">
      <label class="field"><span>Cargo</span><input v-model="item.title" class="control" placeholder="Ej. Analista contable"/></label>
      <label class="field"><span>Empresa</span><input v-model="item.company" class="control" placeholder="Nombre de la empresa"/></label>
      <label class="field"><span>Área profesional</span><select v-model="item.areaId" class="control"><option value="">Selecciona un área</option><option v-for="area in PROFESSIONAL_AREAS" :key="area.id" :value="area.id">{{ area.name }}</option></select></label>
      <label class="field"><span>Ubicación</span><input v-model="item.location" class="control" placeholder="Municipio, departamento"/></label>
      <label class="field"><span>Fecha de inicio</span><input v-model="item.startDate" type="text" class="control" placeholder="Ej. Ene 2023 o 2023-01"/></label>
      <label class="availability-toggle"><input v-model="item.current" type="checkbox"/><span class="toggle-visual"></span><span><strong>Actualmente trabajo aquí</strong></span></label>
      <label v-if="!item.current" class="field"><span>Fecha de finalización</span><input v-model="item.endDate" type="text" class="control" placeholder="Ej. Dic 2024 o 2024-12"/></label>
      <label class="field field-wide"><span>Responsabilidades o logros (opcional)</span><textarea v-model="item.description" class="control textarea" rows="3" maxlength="600"></textarea></label>
    </div>
    <button type="button" class="mt-3 text-sm text-red-300" @click="removeExperience(item.id)">Quitar este puesto</button>
  </article>
  <p v-if="!form.experience.length" class="empty-editor">Aún no has añadido puestos. Puedes saltar esta sección y completarla después.</p>
</div><div v-else-if="activeTab === 'Educación'" class="structured-editor">
  <div class="editor-callout"><PhGraduationCap :size="20"/><p>Registra cada estudio por separado. La institución y el año se pueden actualizar después.</p></div>
  <button type="button" class="button button-secondary justify-self-start" @click="addEducation"><PhPlus :size="16"/>Añadir formación</button>
  <article v-for="item in form.education" :key="item.id" class="rounded-xl border border-[#293a50] p-4">
    <div class="edit-grid">
      <label class="field"><span>Nivel o título</span><select v-model="item.degree" class="control"><option value="">Selecciona un nivel</option><option v-if="isCustomEducationLevel(item.degree)" :value="item.degree">{{ item.degree }}</option><option v-for="level in EDUCATION_REQUIREMENTS" :key="level" :value="level">{{ level }}</option></select></label>
      <label class="field"><span>Institución</span><input v-model="item.institution" class="control" placeholder="Nombre de la institución"/></label>
      <label class="field"><span>Área de estudio</span><select v-model="item.field" class="control"><option value="">Selecciona un área</option><option v-if="item.field" :value="item.field">{{ item.field }}</option><option v-for="spec in studySpecializations" :key="spec.id" :value="spec.name">{{ spec.name }}</option></select></label>
      <label class="availability-toggle"><input v-model="item.currentlyStudying" type="checkbox"/><span class="toggle-visual"></span><span><strong>Actualmente estudiando</strong></span></label>
      <label class="field"><span>Año de finalización o esperado</span><select v-model="item.year" class="control"><option v-for="year in educationYears" :key="year" :value="String(year)">{{ year }}</option></select></label>
    </div>
    <button type="button" class="mt-3 text-sm text-red-300" @click="removeEducation(item.id)">Quitar estos estudios</button>
  </article>
  <p v-if="!form.education.length" class="empty-editor">Aún no has añadido formación. Puedes saltar esta sección y completarla después.</p>
</div><div v-else class="edit-grid preferences-editor">
              <fieldset class="field field-wide"><legend>Modalidad de trabajo preferida</legend><div class="option-cards"><button v-for="mode in modalities" :key="mode" type="button" class="option-card" :class="{ chosen: form.preferredModality === mode }" @click="form.preferredModality = mode"><span class="radio-dot"></span>{{ mode }}</button></div></fieldset>
              <fieldset class="field field-wide"><legend>Tipo de empleo preferido</legend><div class="choice-grid"><button v-for="type in EMPLOYMENT_TYPES" :key="type" type="button" class="choice-chip" :class="{ chosen: form.preferredEmploymentTypes.includes(type) }" @click="form.preferredEmploymentTypes = toggleList(form.preferredEmploymentTypes, type)"><PhCheck v-if="form.preferredEmploymentTypes.includes(type)" :size="14" />{{ type }}</button></div></fieldset>
              <fieldset class="field field-wide"><legend>Áreas profesionales de interés</legend><div class="choice-grid"><button v-for="category in interestCategories" :key="category" type="button" class="choice-chip" :class="{ chosen: form.preferredCategories.includes(category) }" @click="toggleCategory(category)"><PhCheck v-if="form.preferredCategories.includes(category)" :size="14" />{{ category }}</button></div></fieldset>
              <fieldset class="field field-wide"><legend>Idiomas</legend><div class="space-y-3"><div v-for="language in form.languages" :key="language.id" class="flex flex-col gap-2 rounded-xl border border-[#2b3a50] bg-[#0f1726] p-3 md:flex-row md:items-center"><select v-model="language.language" class="control flex-1"><option value="">Selecciona un idioma</option><option v-for="option in languageOptions" :key="option" :value="option">{{ option }}</option></select><select v-model="language.level" class="control md:w-44"><option value="Básico">Básico</option><option value="Intermedio">Intermedio</option><option value="Avanzado">Avanzado</option><option value="Nativo">Nativo</option></select><button type="button" class="button button-secondary md:w-auto" @click="removeLanguage(language.id)">Quitar</button></div><button type="button" class="button button-secondary justify-self-start" @click="addLanguage"><PhPlus :size="16" />Añadir idioma</button></div></fieldset>
              <label class="field field-wide"><span>Ubicaciones de interés</span><div class="choice-grid"><button v-for="department in DEPARTMENTS" :key="department" type="button" class="choice-chip" :class="{ chosen: form.preferredLocations.includes(department) }" @click="form.preferredLocations = toggleList(form.preferredLocations, department)">{{ department }}</button></div></label>
              <label class="availability-toggle"><input v-model="form.available" type="checkbox" /><span class="toggle-visual"></span><span><strong>Disponible para nuevas oportunidades</strong><small>Las empresas sabrán que estás abierto a conversar.</small></span></label>
            </div>
            <div class="edit-actions"><button type="button" class="button button-secondary" @click="cancelEdit">Cancelar</button><button type="submit" class="button button-primary"><PhCheck :size="17" />Guardar cambios</button></div>
          </form>
        </section>
      </template>
    </div>
  </main>
</template>

<style scoped>
.profile-page{--ink:#f2f5fa;--muted:#9ba8bb;--quiet:#728097;--surface:#111a29;--surface-raised:#152135;--line:#26364b;--blue:#72a7ff;--blue-deep:#397be7;--green:#49cb96;min-height:100%;padding:40px 24px 72px;background:radial-gradient(ellipse at 50% -25%,rgba(48,99,174,.17),transparent 55%),#0b111c;color:var(--ink);font-size:15px}.profile-page.profile-page-light{--ink:#1b2533;--muted:#52657a;--quiet:#6b7b8d;--surface:#edf3f9;--surface-raised:#f8fafc;--line:#d5dfea;--blue:#2f6dd7;--blue-deep:#245ec2;--green:#2d8f64;background:radial-gradient(ellipse at 50% -25%,rgba(95,130,217,.12),transparent 45%),#edf3f8;color:var(--ink)}.profile-page.profile-page-light .panel,.profile-page.profile-page-light .content-panel,.profile-page.profile-page-light .profile-hero,.profile-page.profile-page-light .applications-list,.profile-page.profile-page-light .company-hero,.profile-page.profile-page-light .company-next,.profile-page.profile-page-light .edit-card{background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(248,250,252,.88));border-color:var(--line);box-shadow:0 10px 28px rgba(15,23,42,.05)}.profile-page.profile-page-light .button-secondary{background:#edf4fb;color:var(--ink);border-color:#cbd8ea}.profile-page.profile-page-light .button-secondary:hover{background:#e3edf9;border-color:#a6b9d4}.profile-page.profile-page-light .eyebrow,.profile-page.profile-page-light .profile-meta-inline,.profile-page.profile-page-light .body-copy,.profile-page.profile-page-light .empty-state p,.profile-page.profile-page-light .company-meta span,.profile-page.profile-page-light .company-meta a,.profile-page.profile-page-light .item-subtitle,.profile-page.profile-page-light .item-date,.profile-page.profile-page-light .company-next p,.profile-page.profile-page-light .field-hint,.profile-page.profile-page-light .field-foot,.profile-page.profile-page-light .availability-toggle small{color:var(--muted)}.profile-page.profile-page-light .company-meta a,.profile-page.profile-page-light .company-contact>a,.profile-page.profile-page-light .profile-meta-inline a,.profile-page.profile-page-light .profile-meta-inline span{color:var(--ink)}.profile-page.profile-page-light .empty-state,.profile-page.profile-page-light .editor-callout,.profile-page.profile-page-light .empty-editor,.profile-page.profile-page-light .option-card,.profile-page.profile-page-light .availability-toggle,.profile-page.profile-page-light .edit-card .choice-chip,.profile-page.profile-page-light .edit-card .control,.profile-page.profile-page-light .edit-card .textarea{background:#f7fafc;border-color:#dfeaf4;color:var(--ink)}.profile-page.profile-page-light .profile-completion-close{background:#f4f8fc;border-color:#dfeaf2;color:var(--ink)}.profile-page.profile-page-light .text-button{color:#1f5ecf}.profile-page.profile-page-light .company-cover{background:linear-gradient(110deg,#dfeaf6,#dfeef4 55%,#dfe7f8)}.profile-page.profile-page-light .hero-cover{background:linear-gradient(110deg,#dfeaf5,#dceef1 52%,#dfeafc)}.profile-page.profile-page-light .timeline-item:not(:last-child):after{background:rgba(109,130,167,.22)}.field-error{color:#ff8d91;font-size:12px}.profile-shell{max-width:1120px;margin:auto;display:grid;gap:20px}.panel{background:var(--surface);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 10px 34px rgba(0,0,0,.12)}.notice{position:fixed;right:24px;top:92px;z-index:60;display:flex;align-items:center;gap:10px;padding:13px 17px;border:1px solid rgba(73,203,150,.35);border-radius:12px;background:#10251f;color:#84e0b8;box-shadow:0 15px 40px #0005}.eyebrow{display:block;color:var(--quiet);font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}.button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:42px;padding:0 16px;border:1px solid transparent;border-radius:9px;font:700 14px 'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:.18s ease}.button-primary{background:var(--blue-deep);color:white}.button-primary:hover{background:#4d8df0;transform:translateY(-1px)}.button-secondary{background:#17243a;color:#e4eaf4;border-color:#32445e}.button-secondary:hover{border-color:#7694bf;background:#1b2c46}.icon-button{display:grid;place-items:center;width:36px;height:36px;background:transparent;border:1px solid transparent;border-radius:9px;color:#94a6bf;cursor:pointer}.icon-button:hover{background:#1b2b42;color:var(--ink);border-color:#344963}.edit-card{font-size:15px}.edit-card .field,.edit-card .field > span,.edit-card .field-label,.edit-card .field legend{font-size:15px}.edit-card .control,.edit-card .choice-chip,.edit-card .option-card,.edit-card .button,.edit-card input,.edit-card select,.edit-card textarea{font-size:15px}.edit-card .control{min-height:44px}.edit-card .button{min-height:44px}.edit-card .textarea{min-height:120px}.editor-tabs{gap:8px}.editor-tabs button{font-size:14px;padding:10px 12px}.field small,.field-hint,.field-foot,.editor-callout p,.empty-editor,.availability-toggle span small{font-size:13px}.profile-hero{position:relative}.hero-cover,.company-cover{height:172px;position:relative;overflow:hidden;background:linear-gradient(112deg,#132441,#183258 52%,#15233a)}.hero-cover:after,.company-cover:after{content:"";position:absolute;inset:auto -18% -45% auto;width:380px;height:280px;border:1px solid rgba(141,186,255,.12);border-radius:50%;transform:rotate(-18deg);box-shadow:0 0 0 32px rgba(141,186,255,.04)}.cover-edit{position:absolute;right:20px;top:17px;z-index:1;width:34px;height:34px;display:grid;place-items:center;background:#09132180;color:white;border:1px solid #b5d1f333;border-radius:9px;cursor:pointer}.hero-main{position:relative;display:flex;align-items:center;gap:20px;padding:0 30px 0 34px;min-height:126px}.avatar-wrap{align-self:flex-start;margin-top:-43px;position:relative;z-index:2;flex-shrink:0;padding:4px;border-radius:50%;background:var(--surface)}.avatar{width:90px;height:90px;display:grid;place-items:center;border-radius:50%;object-fit:cover;border:2px solid #a8c9ff;background:#263d60}.avatar-fallback{color:#edf4ff;font-size:32px;font-weight:700}.hero-info{min-width:0;flex:1;padding:17px 0}.name-line{display:flex;align-items:center;flex-wrap:wrap;gap:12px}.name-line h1,.company-intro h1{font-size:25px;line-height:1.2;letter-spacing:-.04em}.availability{display:inline-flex;align-items:center;gap:7px;color:#74dcb0;font-size:11px;font-weight:700}.availability>span,.sent-status>span{width:7px;height:7px;background:#52ce97;border-radius:50%;box-shadow:0 0 0 3px #52ce971e}.profile-title{margin-top:5px;color:#c1ccdc;font-size:15px}.profile-location{display:flex;align-items:center;gap:7px;margin-top:8px;color:var(--muted);font-size:13px}.profile-location a,.company-meta a{color:#98bdf2;text-decoration:none}.profile-meta-inline{display:flex;align-items:center;flex-wrap:wrap;gap:10px 16px;margin-top:8px;color:#c8d7ee;font-size:13px}.profile-meta-inline span,.profile-meta-inline a{display:inline-flex;align-items:center;gap:6px;color:#d6e2f6;text-decoration:none}.profile-professional-summary{padding:0 30px 20px}.profile-professional-summary .eyebrow{margin-bottom:8px}.profile-professional-summary p{margin:0;color:#edf3ff;font-size:15px;line-height:1.7}.hero-edit{flex-shrink:0}.hero-tags{display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid #25354a;padding:14px 30px 17px}.skill-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid #36547a;background:#172a45;color:#bdd5f5;border-radius:7px;padding:6px 10px;font-size:11px;font-weight:650}.tag-add{width:28px;height:28px;display:grid;place-items:center;border:1px dashed #415675;background:transparent;border-radius:7px;color:#8ba6cd;cursor:pointer}.muted-copy{color:var(--quiet);font-size:12px}
.candidate-layout{display:grid;grid-template-columns:1fr;gap:20px;align-items:start}.candidate-main-column,.candidate-side-column{display:grid;gap:16px}.content-panel{padding:22px 24px}.candidate-main-column{width:100%}.section-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}.section-heading h2,.content-panel h2,.applications-list h2{margin-top:5px;font-size:18px;letter-spacing:-.025em}.body-copy{color:#bcc6d5;font-size:14px;line-height:1.8}.preserve-lines{white-space:pre-line}.empty-state{padding:16px;border:1px dashed #2b3a50;border-radius:11px;color:#8da2be}.empty-state>svg{color:#76a7ec}.empty-state p{margin:8px 0 10px;max-width:470px;color:#a7b4c7;font-size:13px;line-height:1.6}.text-button{display:inline-flex;align-items:center;gap:6px;background:transparent;color:#8fb8f4;border:0;font:700 12px 'Plus Jakarta Sans',sans-serif;text-decoration:none;cursor:pointer}.text-button:hover{color:#c0d7fc}.profile-completion-panel{position:relative}.profile-completion-close{position:absolute;right:14px;top:14px;display:grid;place-items:center;width:30px;height:30px;border:1px solid #2d3d55;border-radius:8px;background:#132134;color:#dfeafc;cursor:pointer}.profile-completion-close:hover{border-color:#4b678a;background:#192a42}.timeline{display:grid;gap:10px;min-width:0}.timeline-item{position:relative;display:block;width:100%;max-width:100%;padding:0 0 16px 18px;min-width:0;box-sizing:border-box}.timeline-item:not(:last-child):after{content:"";position:absolute;left:6px;top:7px;bottom:-8px;width:1px;background:rgba(115,145,189,.35)}.timeline-item > div{width:100%;max-width:100%;min-width:0;box-sizing:border-box}.timeline-item > *{min-width:0;word-break:break-word;overflow-wrap:anywhere}.timeline-mark{position:relative;z-index:1;width:38px;height:38px;display:grid;place-items:center;background:#1b2c46;border:1px solid #324d70;border-radius:10px;color:#94baff}.education-mark{background:#282440;border-color:#4a426f;color:#b6aaff}.timeline-item h3,.structured-list h3{margin:0;font-size:15px;line-height:1.5;overflow-wrap:anywhere;white-space:normal}.item-subtitle{margin-top:4px;color:#c3cede;font-size:13px;overflow-wrap:anywhere;white-space:normal}.item-date{display:block;white-space:normal!important;overflow-wrap:anywhere;word-break:break-word;max-width:100%}.item-subtitle,.item-date,.timeline-item h3,.structured-list h3{white-space:normal!important;overflow-wrap:anywhere;word-break:break-word;max-width:100%}.profile-location{display:flex;align-items:center;flex-wrap:wrap;gap:5px;margin-top:7px;color:#8190a6;font-size:12px;overflow-wrap:anywhere;white-space:normal}.item-description{margin-top:10px;overflow-wrap:anywhere;white-space:normal}.contact-card h2,.applications-card h2{margin-bottom:16px}.profile-summary-card .section-heading .text-button{font-size:12px}.profile-summary-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px 16px;align-items:stretch}.profile-summary-grid .info-row:nth-child(1),.profile-summary-grid .info-row:nth-child(2),.profile-summary-grid .info-row:nth-child(3),.profile-summary-grid .info-row:nth-child(4),.profile-summary-grid .info-row:nth-child(5){border-top:0;padding-top:0}.profile-summary-grid .info-row:nth-child(3),.profile-summary-grid .info-row:nth-child(4),.profile-summary-grid .info-row:nth-child(5){padding-bottom:0}.info-row{display:flex;align-items:center;gap:11px;padding:12px 14px;border:1px solid #2a3c57;border-radius:12px;background:#101c2e;color:#7e9fc9;text-decoration:none;min-height:64px}.info-row>div{min-width:0;flex:1}.info-row small{display:block;color:#718198;font-size:10px}.info-row p{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.info-row a{color:inherit}.language-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.language-chip{display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid rgba(128,160,205,.38);border-radius:10px;padding:12px 14px;background:linear-gradient(180deg,#121d2c,#0e1726);color:#dfe9ff;font-size:13px;min-height:56px;box-shadow:0 8px 18px rgba(9,15,27,.15)}.language-chip strong{font-weight:700;color:#edf4ff}.language-chip em{font-style:normal;color:#aac3ec;font-weight:600}.hero-tags.compact-tags{border-top:0;padding:0;gap:10px}.hero-tags.compact-tags .tech-badge{padding:8px 10px}.item-subtitle{margin-top:3px;color:#c8d1df;font-size:13px;text-overflow:ellipsis;white-space:nowrap}.category-list{display:flex;gap:7px;flex-wrap:wrap}.profile-summary-grid,.language-list{grid-template-columns:1fr}.profile-summary-grid{display:grid}@media (min-width: 640px){.language-list{grid-template-columns:repeat(2,minmax(0,1fr))}.profile-summary-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width: 640px){.profile-professional-summary{padding:0 16px 16px}.profile-summary-grid,.language-list{grid-template-columns:1fr}}.category-chip{padding:6px 9px;border:1px solid #354c6d;border-radius:999px;background:#192943;color:#aac6ec;font-size:10px;font-weight:700}.application-count{font-size:29px;font-weight:750;letter-spacing:-.05em}.application-count span{font-size:12px;font-weight:500;color:var(--muted);letter-spacing:0}.applications-card>p{margin:5px 0 12px;color:#93a0b2;font-size:11px;line-height:1.6}.applications-list{padding:24px}.count-pill{display:grid;place-items:center;min-width:30px;height:27px;border:1px solid #354964;border-radius:8px;background:#1a2b43;color:#c2d6f2;font-size:11px;font-weight:700}.job-list{border-top:1px solid #27364b}.job-row{display:flex;align-items:center;gap:13px;padding:14px 4px;border-bottom:1px solid #243247;text-decoration:none;transition:background .15s}.job-row:hover{background:#152135}.job-monogram{width:40px;height:40px;display:grid;place-items:center;flex-shrink:0;border-radius:11px;color:white;font-size:12px;font-weight:800}.job-copy{display:grid;gap:4px;min-width:0;flex:1}.job-copy strong{overflow:hidden;color:#e7ecf4;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.job-copy>span{color:#8593a7;font-size:11px}.sent-status{display:inline-flex;align-items:center;gap:7px;color:#77d8ae;font-size:10px;font-weight:700}.sent-status>span{width:6px;height:6px;box-shadow:none}.job-arrow{color:#657a96}.empty-applications{display:flex;align-items:center;gap:14px;padding:22px 0 4px}.empty-briefcase{width:42px;height:42px;display:grid;place-items:center;flex-shrink:0;border:1px solid #304664;border-radius:12px;background:#192b45;color:#8db6f0}.empty-applications>div:nth-child(2){flex:1}.empty-applications strong{font-size:12px}.empty-applications p{margin-top:4px;color:#8998ad;font-size:11px}
.company-hero{padding-bottom:0}.company-cover{height:194px;background:linear-gradient(110deg,#122a34,#164449 52%,#152c39)}.company-heading{position:relative;display:flex;align-items:flex-end;gap:17px;padding:0 30px;margin-top:-47px}.company-mark{position:relative;z-index:2;width:94px;height:94px;display:grid;place-items:center;flex-shrink:0;border:5px solid var(--surface);border-radius:21px;background:#1d6461;color:#d4f2e9;box-shadow:0 5px 16px #0003}.company-intro{padding:0 0 5px;flex:1;min-width:0}.company-intro h1{margin-top:5px}.company-intro p{margin-top:6px;color:#a7b4c7;font-size:12px}.company-edit{margin:0 0 6px}.editing-shell>:not(.notice):not(.edit-overlay){display:none}.editing-page .edit-card{margin:0 auto}.company-meta{display:flex;gap:21px;flex-wrap:wrap;padding:21px 30px;margin-top:14px;border-top:1px solid #26364b}.company-meta span,.company-meta a{display:flex;align-items:center;gap:8px;color:#a7b7ca;font-size:11px;text-decoration:none}.company-meta svg{color:#77c8b4}.company-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:20px;align-items:start}.company-contact h2{margin-top:7px}.company-contact>p{margin-top:4px;color:#98a7ba;font-size:11px}.company-contact>a{display:flex;align-items:center;gap:9px;margin-top:16px;color:#aec8ec;font-size:11px;text-decoration:none}.company-contact>a svg{color:#78a6e1}.full-button{width:100%;margin-top:20px}.company-next{display:flex;align-items:center;gap:14px}.company-next-icon{width:44px;height:44px;display:grid;place-items:center;flex-shrink:0;border:1px solid #344a66;border-radius:12px;background:#192a42;color:#9dc0f0}.company-next h2{margin-top:5px;font-size:15px}.company-next p{margin-top:4px;color:#95a3b6;font-size:11px}.coming-soon{margin-left:auto;padding:7px 10px;border:1px solid #344358;border-radius:7px;color:#90a0b6;font-size:10px;white-space:nowrap}.edit-overlay{position:relative;display:flex;justify-content:center;align-items:flex-start;overflow:visible;padding:0;background:transparent}.edit-card{width:min(100%,720px);height:max-content;max-height:none;overflow-y:visible;padding:26px;background:#101a29;border:1px solid #324259;border-radius:17px;box-shadow:0 25px 80px #0008}.edit-header{display:flex;align-items:center;justify-content:space-between}.edit-header h2{margin-top:5px;font-size:22px;letter-spacing:-.04em}.editor-tabs{display:flex;gap:4px;overflow-x:auto;margin:21px 0 22px;padding:4px;border:1px solid #26364b;border-radius:10px;background:#0c1421}.editor-tabs button{flex:1;min-width:max-content;padding:10px 12px;border:0;border-radius:7px;background:transparent;color:#8290a4;font:650 11px 'Plus Jakarta Sans',sans-serif;cursor:pointer}.editor-tabs button.selected{background:#203554;color:#c8ddfc;box-shadow:0 1px 4px #0003}.edit-grid{display:grid;grid-template-columns:1fr 1fr;gap:17px 14px}.field{display:grid;gap:7px;align-content:start;min-width:0}.field>span,.field-label,.field legend{color:#c9d2df;font-size:11px;font-weight:700}.field i{color:#78aaff;font-style:normal}.field small{color:#ff8d91;font-size:10px}.field-wide{grid-column:1/-1}.control{width:100%;min-height:43px;padding:0 12px;appearance:none;border:1px solid #34445b;border-radius:8px;background-color:#141f30;color:#edf2f9;font:500 12px 'Plus Jakarta Sans',sans-serif;outline:0;transition:border-color .15s,box-shadow .15s}.control:focus{border-color:#6196e8;box-shadow:0 0 0 3px #5593ed20}.control::placeholder{color:#718096}.control option{background:#141f30;color:#edf2f9}.select,.field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2398a9c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:34px}.textarea{height:auto;min-height:120px;padding:11px 12px;resize:vertical;line-height:1.65}.field-foot{justify-self:end;color:#718198;font-size:10px}.skill-editor{display:flex;flex-wrap:wrap;align-items:center;gap:7px;min-height:50px;padding:9px;border:1px solid #34445b;border-radius:9px;background:#141f30}.skill-editor .skill-chip{padding:5px 7px}.skill-chip button{display:grid;place-items:center;padding:0;border:0;background:transparent;color:#95b5e3;cursor:pointer}.skill-entry{display:flex;align-items:center;gap:7px;flex:1;min-width:210px;color:#8499b7}.skill-entry input{width:100%;min-height:28px;border:0;outline:0;background:transparent;color:#eef3fa;font:500 11px 'Plus Jakarta Sans',sans-serif}.skill-entry input::placeholder{color:#748198}.skill-entry>button{display:grid;place-items:center;width:25px;height:25px;border:0;border-radius:6px;background:#263c5d;color:#b8d3f8;cursor:pointer}.field-hint{color:#78879b;font-size:10px;line-height:1.6}.edit-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:24px;padding-top:17px;border-top:1px solid #29384c}.structured-editor{display:grid;gap:15px}.editor-callout{display:flex;align-items:flex-start;gap:12px;padding:13px;border:1px solid #30435c;border-radius:10px;background:#16243a;color:#8ab3ed}.editor-callout p{color:#b4c0d1;font-size:11px;line-height:1.65}.structured-list{display:grid;gap:9px}.structured-list article{display:flex;align-items:flex-start;gap:12px;padding:12px;border:1px solid #293a50;border-radius:10px}.structured-list article>div:last-child{flex:1}.structured-list p,.structured-list small{display:block;margin-top:4px;color:#9aa9bc;font-size:10px}.structured-list small{color:#7e8da1;line-height:1.6}.empty-editor{padding:17px;border:1px dashed #35445a;border-radius:9px;color:#98a7bb;font-size:11px}.preferences-editor fieldset{padding:0;border:0}.preferences-editor legend{margin-bottom:9px}.option-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.option-card{display:flex;align-items:center;gap:9px;min-height:49px;padding:0 12px;border:1px solid #34445b;border-radius:9px;background:#141f30;color:#b9c4d3;text-align:left;font:600 11px 'Plus Jakarta Sans',sans-serif;cursor:pointer}.option-card.chosen{border-color:#568ce0;background:#192b45;color:#deebff}.radio-dot{width:14px;height:14px;flex-shrink:0;border:1px solid #63748a;border-radius:50%}.chosen .radio-dot{border:4px solid #75a9fa}.choice-grid{display:flex;flex-wrap:wrap;gap:7px}.choice-chip{display:flex;align-items:center;gap:5px;padding:7px 10px;border:1px solid #34445b;border-radius:8px;background:#141f30;color:#aab8ca;font:600 10px 'Plus Jakarta Sans',sans-serif;cursor:pointer}.choice-chip.chosen{border-color:#5287d8;background:#1a2c47;color:#c5dcff}.availability-toggle{display:flex;align-items:center;gap:11px;grid-column:1/-1;padding:14px;border:1px solid #30435a;border-radius:10px;background:#132136;cursor:pointer}.availability-toggle input{position:absolute;opacity:0}.toggle-visual{position:relative;width:34px;height:19px;flex-shrink:0;border-radius:20px;background:#405066;transition:.18s}.toggle-visual:after{content:"";position:absolute;left:3px;top:3px;width:13px;height:13px;border-radius:50%;background:#e8edf4;transition:.18s}.availability-toggle input:checked+.toggle-visual{background:#25825f}.availability-toggle input:checked+.toggle-visual:after{left:18px;background:white}.availability-toggle strong,.availability-toggle small{display:block}.availability-toggle strong{color:#dce5f1;font-size:11px}.availability-toggle small{margin-top:4px;color:#8796aa;font-size:10px}
@media(max-width:800px){.candidate-layout{grid-template-columns:minmax(0,1fr) 270px;gap:13px}.content-panel{padding:18px}.company-layout{grid-template-columns:minmax(0,1fr) 285px;gap:13px}}
@media(max-width:650px){.profile-page{padding:20px 13px 48px}.profile-shell{gap:13px}.hero-cover{height:135px}.hero-main{align-items:flex-start;gap:13px;padding:0 16px;min-height:0}.avatar-wrap{margin-top:-34px;padding:3px}.avatar{width:70px;height:70px}.avatar-fallback{font-size:25px}.hero-info{padding:10px 0 14px}.name-line h1,.company-intro h1{font-size:20px}.name-line{gap:8px}.availability{font-size:9px}.profile-title{font-size:11px}.profile-location{flex-wrap:wrap;gap:5px;font-size:10px}.hero-edit{width:37px;min-height:37px;padding:0;font-size:0}.hero-edit svg{width:17px}.hero-tags{padding:12px 16px;gap:6px}.skill-chip{padding:5px 7px;font-size:10px}.candidate-layout,.company-layout{grid-template-columns:1fr;gap:13px}.candidate-main-column,.candidate-side-column{gap:13px}.company-cover{height:155px}.company-heading{align-items:center;gap:12px;padding:0 16px;margin-top:-35px}.company-mark{width:70px;height:70px;border-width:4px;border-radius:17px}.company-mark svg{width:29px}.company-intro{padding:0}.company-intro .eyebrow{font-size:8px}.company-intro h1{font-size:18px}.company-intro p{font-size:10px}.company-edit{width:38px;min-height:38px;padding:0;font-size:0}.company-edit svg{width:17px}.company-meta{gap:12px;padding:16px; margin-top:13px}.company-meta span,.company-meta a{font-size:10px}.company-next{align-items:flex-start;flex-wrap:wrap}.coming-soon{margin-left:58px}.edit-overlay{padding:12px 8px}.edit-card{max-height:calc(100vh - 24px);padding:19px 15px;border-radius:14px}.edit-header h2{font-size:20px}.editor-tabs{margin:17px 0}.editor-tabs button{padding:9px 10px;font-size:14px}.edit-grid{grid-template-columns:1fr;gap:14px}.field-wide{grid-column:auto}.option-cards{grid-template-columns:1fr}.availability-toggle{grid-column:auto}.edit-actions{margin-top:18px}.empty-applications{align-items:flex-start;flex-wrap:wrap}.empty-applications>div:nth-child(2){min-width:calc(100% - 58px)}.empty-applications>.button{margin-left:56px}.job-row{gap:9px}.sent-status{font-size:0}.sent-status>span{width:8px;height:8px}.job-arrow{display:none}.applications-list{padding:18px}.notice{left:13px;right:13px;top:79px;justify-content:center;font-size:12px}}
.tech-badge{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border:1px solid #334966;border-radius:8px;background:#17263b;color:#cfe0ff;font-size:12px;font-weight:600}.tech-icon{width:16px;height:16px;object-fit:contain}.tech-fallback{display:grid;place-items:center;width:16px;height:16px;border-radius:6px;background:#29486f;color:#dceaff;font-size:10px;font-weight:700}.tech-badge button{display:grid;place-items:center;margin-left:2px;padding:2px;border:0;background:transparent;color:#8da8cc;cursor:pointer}.skill-picker{position:relative}.skill-search{display:flex;align-items:center;gap:8px;flex:1;min-width:min(100%,220px);padding:0 5px;color:#8ca3c1}.skill-search input{width:100%;min-height:32px;border:0;outline:0;background:transparent;color:#eef3fa;font:500 12px 'Plus Jakarta Sans',sans-serif}.skill-search input::placeholder{color:#8291a5}.skill-results{position:absolute;z-index:4;top:calc(100% + 5px);left:0;right:0;max-height:220px;overflow:auto;padding:5px;border:1px solid #35465e;border-radius:10px;background:#111c2c;box-shadow:0 12px 30px #0008}.skill-results button{display:flex;align-items:center;gap:9px;width:100%;padding:9px 10px;border:0;border-radius:7px;background:transparent;color:#d6dfec;text-align:left;font:600 12px 'Plus Jakarta Sans',sans-serif;cursor:pointer}.skill-results button:hover{background:#1c2e47}.skill-results button svg{margin-left:auto;color:#8eacd5}.no-skills{padding:10px;color:#96a5b8;font-size:12px}.body-copy{font-size:14px}.item-subtitle,.info-row p,.company-contact>a,.company-meta span,.company-meta a{font-size:12px}.item-date,.field-hint{font-size:11px}.eyebrow{font-size:11px}.profile-location{font-size:13px}.language-chip{font-size:12px}.profile-summary-grid{grid-template-columns:1fr}.edit-card .field small,.edit-card .field-hint,.edit-card .field-foot,.edit-card .editor-callout p,.edit-card .empty-editor{font-size:13px}.edit-card .field > span,.edit-card .field-label,.edit-card .field legend,.edit-card .editor-tabs button{font-size:14px}@media(max-width:650px){.body-copy{font-size:14px;line-height:1.75}.profile-location{font-size:12px}.company-meta span,.company-meta a{font-size:12px}.item-subtitle,.info-row p,.company-contact>a{font-size:12px}.item-date,.field-hint{font-size:11px}.eyebrow{font-size:10px}.profile-summary-grid{grid-template-columns:1fr}.language-list{grid-template-columns:1fr}.field>span,.field-label,.field legend{font-size:12px}.control,.skill-search input{font-size:13px}.editor-tabs button{font-size:11px}.hero-main{gap:9px}.profile-location{overflow-wrap:anywhere}.hero-tags{gap:7px}.tech-badge{font-size:11px}}
@media(prefers-reduced-motion:reduce){.profile-page *{scroll-behavior:auto!important;transition:none!important}}
</style>

<style scoped>
.editing-shell .edit-overlay{display:block;padding:0;background:transparent;backdrop-filter:none}
.editing-shell .edit-card{max-height:none;margin:0 auto;box-shadow:0 10px 34px rgba(0,0,0,.12)}
</style>
