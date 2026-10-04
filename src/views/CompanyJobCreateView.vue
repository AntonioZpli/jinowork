<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useJobs } from '@/controllers/useJobs'
import { useUiStore } from '@/stores/useUiStore'
import { DEPARTMENTS, EDUCATION_REQUIREMENTS, EMPLOYMENT_TYPES, MUNICIPALITIES_BY_DEPARTMENT, PROFESSIONAL_AREAS, WORK_MODALITIES } from '@/data/professionalTaxonomy'
import type { JobContract, JobModality } from '@/models/Job'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()
const { addJob } = useJobs()
const areas = PROFESSIONAL_AREAS
const form = reactive({ title: '', areaId: '', specializationId: '', skillIds: [] as string[], experience: '0', education: [] as string[], department: '', municipality: '', modality: 'Presencial' as JobModality, contract: 'Tiempo completo' as JobContract, salary: '', description: '' })
const error = ref('')
const area = computed(() => areas.find(item => item.id === form.areaId))
const specialization = computed(() => area.value?.specializations.find(item => item.id === form.specializationId))
const municipalities = computed(() => MUNICIPALITIES_BY_DEPARTMENT[form.department] || [])
watch(() => form.areaId, () => { form.specializationId = ''; form.skillIds = [] })
watch(() => form.specializationId, () => { form.skillIds = [] })
watch(() => form.department, () => { form.municipality = '' })
function toggle(list: string[], id: string) { return list.includes(id) ? list.filter(item => item !== id) : [...list, id] }
function publish() {
  error.value = ''
  if (!auth.user || !form.title.trim() || !area.value || !specialization.value || !form.department || !form.municipality || !form.description.trim()) {
    error.value = 'Completa el cargo, el área, la especialización, la ubicación y la descripción.'
    return
  }
  const initials = (auth.user.companyName || 'Empresa').split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase()
  const job = addJob({
    ownerId: auth.user.id,
    title: form.title.trim(), company: auth.user.companyName || auth.user.name, companyInitials: initials, companyColor: '#0F766E',
    location: `${form.municipality}, ${form.department}`, department: form.department, municipality: form.municipality,
    country: 'Nicaragua', areaId: form.areaId, specializationId: form.specializationId,
    category: area.value.name, requiredSkillIds: [...form.skillIds], tags: specialization.value.skills.filter(skill => form.skillIds.includes(skill.id)).map(skill => skill.name),
    seniority: Number(form.experience) >= 5 ? 'Senior' : Number(form.experience) >= 2 ? 'Mid' : Number(form.experience) === 0 ? 'Sin experiencia' : 'Junior',
    minimumExperienceYears: Number(form.experience), educationRequirements: [...form.education],
    modality: form.modality, contract: form.contract, salary: form.salary.trim() || null,
    description: form.description.trim(),
  })
  ui.notifySuccess('Oferta publicada', 'La vacante ya está disponible para candidatos.')
  router.push({ name: 'company-jobs', query: { creada: job.id } })
}
</script>

<template>
  <main class="min-h-screen bg-[#0B0F19] px-5 py-10 text-[#F3F4F6]"><div class="mx-auto max-w-3xl">
    <router-link to="/empresa/ofertas" class="text-sm text-blue-400">← Volver a mis ofertas</router-link>
    <h1 class="mt-4 text-3xl font-bold">Publicar una oferta</h1><p class="mt-2 text-gray-400">Configura los requisitos para ayudar a encontrar perfiles adecuados.</p>
    <form class="mt-7 grid gap-5 rounded-xl border border-[#242C3D] bg-[#151A27] p-6" @submit.prevent="publish">
      <label class="grid gap-2 text-sm font-medium">Título del puesto<input v-model="form.title" class="input-field" required placeholder="Ej. Desarrollador frontend" /></label>
      <div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-2 text-sm font-medium">Área profesional<select v-model="form.areaId" class="input-field" required><option value="" disabled>Selecciona un área</option><option v-for="item in areas" :key="item.id" :value="item.id">{{ item.name }}</option></select></label>
        <label class="grid gap-2 text-sm font-medium">Especialización<select v-model="form.specializationId" class="input-field" :disabled="!area" required><option value="" disabled>Selecciona una especialización</option><option v-for="item in area?.specializations || []" :key="item.id" :value="item.id">{{ item.name }}</option></select></label></div>
      <fieldset v-if="specialization" class="grid gap-3"><legend class="text-sm font-medium">Habilidades requeridas</legend><div class="flex flex-wrap gap-2"><button v-for="skill in specialization.skills" :key="skill.id" type="button" class="rounded-full border px-3 py-1.5 text-sm" :class="form.skillIds.includes(skill.id) ? 'border-blue-500 bg-blue-500/15 text-blue-200' : 'border-[#34445b] text-gray-300'" @click="form.skillIds = toggle(form.skillIds, skill.id)">{{ skill.name }}</button></div></fieldset>
      <div class="grid gap-4 sm:grid-cols-2"><label class="grid gap-2 text-sm font-medium">Departamento<select v-model="form.department" class="input-field" required><option value="" disabled>Selecciona un departamento</option><option v-for="item in DEPARTMENTS" :key="item" :value="item">{{ item }}</option></select></label><label class="grid gap-2 text-sm font-medium">Municipio<select v-model="form.municipality" class="input-field" :disabled="!form.department" required><option value="" disabled>Selecciona un municipio</option><option v-for="item in municipalities" :key="item" :value="item">{{ item }}</option></select></label></div>
      <div class="grid gap-4 sm:grid-cols-3"><label class="grid gap-2 text-sm font-medium">Modalidad<select v-model="form.modality" class="input-field"><option v-for="item in WORK_MODALITIES" :key="item">{{ item }}</option></select></label><label class="grid gap-2 text-sm font-medium">Tipo de empleo<select v-model="form.contract" class="input-field"><option v-for="item in EMPLOYMENT_TYPES" :key="item">{{ item }}</option></select></label><label class="grid gap-2 text-sm font-medium">Experiencia mínima<select v-model="form.experience" class="input-field"><option v-for="years in 11" :key="years - 1" :value="String(years - 1)">{{ years - 1 }} {{ years === 2 ? 'año' : 'años' }}</option></select></label></div>
      <fieldset class="grid gap-3"><legend class="text-sm font-medium">Formación requerida (opcional)</legend><div class="flex flex-wrap gap-2"><button v-for="level in EDUCATION_REQUIREMENTS" :key="level" type="button" class="rounded-full border px-3 py-1.5 text-sm" :class="form.education.includes(level) ? 'border-blue-500 bg-blue-500/15 text-blue-200' : 'border-[#34445b] text-gray-300'" @click="form.education = toggle(form.education, level)">{{ level }}</button></div></fieldset>
      <label class="grid gap-2 text-sm font-medium">Salario o rango (opcional)<input v-model="form.salary" class="input-field" placeholder="Ej. C$ 30,000–40,000 al mes" /></label>
      <label class="grid gap-2 text-sm font-medium">Descripción del puesto<textarea v-model="form.description" class="input-field min-h-32" required maxlength="2000" placeholder="Responsabilidades principales y contexto del equipo"></textarea></label>
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p><div class="flex justify-end gap-3"><router-link to="/empresa/ofertas" class="rounded-lg border border-[#34445b] px-4 py-2 text-sm">Cancelar</router-link><button class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white">Publicar oferta</button></div>
    </form>
  </div></main>
</template>
