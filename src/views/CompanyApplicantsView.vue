<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useJobs } from '@/controllers/useJobs'
import { calculateCandidateJobMatch } from '@/services/jobMatching'
import type { ApplicationStatus, JobApplication } from '@/models/Job'
import { EDUCATION_REQUIREMENTS, PROFESSIONAL_AREAS } from '@/data/professionalTaxonomy'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const sortBy = ref('match')
const statusFilter = ref('Todas')
const areaFilter = ref('Todas')
const skillFilter = ref('Todas')
const locationFilter = ref('Todas')
const availabilityFilter = ref('Todas')
const minimumExperience = ref(0)
const educationFilter = ref('Todas')
const { allJobs } = useJobs()
const jobs = computed(() => allJobs.value.filter(job => job.ownerId === auth.user?.id))
const relevantApplications = computed(() => auth.applicationRecords.filter(record => jobs.value.some(job => job.id === record.jobId)))
const applicantSkills = computed(() => [...new Set(relevantApplications.value.flatMap(record => record.profileSnapshot.skillIds))].sort())
const applicantLocations = computed(() => [...new Set(relevantApplications.value.map(record => record.candidate.municipality || record.candidate.department || record.candidate.location?.split(',')[0]).filter((location): location is string => Boolean(location)))].sort())
const records = computed(() => auth.applicationRecords
  .filter(record => jobs.value.some(job => job.id === record.jobId)
    && (!route.query.oferta || record.jobId === Number(route.query.oferta))
    && (statusFilter.value === 'Todas' || record.status === statusFilter.value)
    && (areaFilter.value === 'Todas' || record.profileSnapshot.areaId === areaFilter.value)
    && (skillFilter.value === 'Todas' || record.profileSnapshot.skillIds.includes(skillFilter.value))
    && (locationFilter.value === 'Todas' || [record.candidate.municipality, record.candidate.department, record.candidate.location].some(location => location?.toLocaleLowerCase().includes(locationFilter.value.toLocaleLowerCase())))
    && (availabilityFilter.value === 'Todas' || (availabilityFilter.value === 'Disponible' ? record.candidate.available : !record.candidate.available))
    && record.profileSnapshot.experienceYears >= minimumExperience.value
    && (educationFilter.value === 'Todas' || educationRank(record) >= EDUCATION_REQUIREMENTS.findIndex(level => level === educationFilter.value)))
  .map(record => ({ ...record, match: calculateCandidateJobMatch(record.candidate, allJobs.value.find(job => job.id === record.jobId)!).score }))
  .sort((a, b) => sortBy.value === 'match' ? b.match - a.match : sortBy.value === 'experience' ? b.profileSnapshot.experienceYears - a.profileSnapshot.experienceYears : b.appliedAt.localeCompare(a.appliedAt)))
function jobTitle(id: number) { return allJobs.value.find(job => job.id === id)?.title || 'Oferta' }
function statusLabel(status: ApplicationStatus) { return ({ submitted: 'Recibida', reviewing: 'En revisión', shortlisted: 'Preseleccionada', rejected: 'No seleccionada', accepted: 'Seleccionada' })[status] }
function updateStatus(id: number, event: Event) { auth.updateApplicationStatus(id, (event.target as HTMLSelectElement).value as ApplicationStatus) }
function educationRank(record: JobApplication) {
  const text = record.profileSnapshot.education.map(item => `${item.degree} ${item.field}`).join(' ').toLocaleLowerCase()
  return /posgrado|maestr|doctor/.test(text) ? 4 : /licen|ingenier|abogad/.test(text) ? 3 : /universidad|en curso/.test(text) ? 2 : /t[eé]cnic/.test(text) ? 1 : /bachiller|secundaria/.test(text) ? 0 : -1
}
function skillLabel(id: string) { return PROFESSIONAL_AREAS.flatMap(area => area.specializations).flatMap(item => item.skills).find(skill => skill.id === id)?.name || id }
function filterOffer(event: Event) {
  const offerId = (event.target as HTMLSelectElement).value
  router.replace({ query: offerId ? { oferta: offerId } : {} })
}
</script>

<template>
  <main class="min-h-screen bg-[#0B0F19] px-5 py-10 text-[#F3F4F6]">
    <div class="mx-auto max-w-5xl">
      <p class="text-sm font-semibold text-[#3B82F6]">Espacio de empresa</p><h1 class="mt-2 text-3xl font-bold">Postulantes</h1>
      <label class="mt-6 block max-w-md text-sm text-gray-400">Filtrar por oferta
        <select :value="route.query.oferta || ''" class="mt-2 w-full rounded-lg border border-[#34445b] bg-[#151A27] p-3 text-white" @change="filterOffer">
          <option value="">Todas mis ofertas</option><option v-for="job in jobs" :key="job.id" :value="job.id">{{ job.title }}</option>
        </select>
      </label>
      <div class="mt-4 grid max-w-2xl gap-4 sm:grid-cols-2"><label class="grid gap-2 text-sm text-gray-400">Estado de postulación<select v-model="statusFilter" class="rounded-lg border border-[#34445b] bg-[#151A27] p-3 text-white"><option>Todas</option><option value="submitted">Recibida</option><option value="reviewing">En revisión</option><option value="shortlisted">Preseleccionada</option><option value="rejected">No seleccionada</option><option value="accepted">Seleccionada</option></select></label><label class="grid gap-2 text-sm text-gray-400">Ordenar por<select v-model="sortBy" class="rounded-lg border border-[#34445b] bg-[#151A27] p-3 text-white"><option value="match">Compatibilidad</option><option value="experience">Experiencia</option><option value="date">Más recientes</option></select></label></div>
      <details class="mt-5 max-w-4xl rounded-lg border border-[#242C3D] bg-[#151A27] p-4"><summary class="cursor-pointer text-sm font-semibold">Filtros profesionales</summary><div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><select v-model="areaFilter" class="rounded border border-[#34445b] bg-[#0B0F19] p-3 text-white"><option value="Todas">Todas las áreas</option><option v-for="area in PROFESSIONAL_AREAS" :key="area.id" :value="area.id">{{ area.name }}</option></select><select v-model="skillFilter" class="rounded border border-[#34445b] bg-[#0B0F19] p-3 text-white"><option value="Todas">Todas las habilidades</option><option v-for="skill in applicantSkills" :key="skill" :value="skill">{{ skillLabel(skill) }}</option></select><select v-model="educationFilter" class="rounded border border-[#34445b] bg-[#0B0F19] p-3 text-white"><option>Todas</option><option v-for="level in EDUCATION_REQUIREMENTS" :key="level">{{ level }}</option></select><select v-model="locationFilter" class="rounded border border-[#34445b] bg-[#0B0F19] p-3 text-white"><option value="Todas">Todas las ubicaciones</option><option v-for="location in applicantLocations" :key="location">{{ location }}</option></select><select v-model="availabilityFilter" class="rounded border border-[#34445b] bg-[#0B0F19] p-3 text-white"><option>Todas</option><option>Disponible</option><option>No disponible</option></select><label class="grid gap-1 text-xs text-gray-400">Experiencia mínima<select v-model.number="minimumExperience" class="rounded border border-[#34445b] bg-[#0B0F19] p-3 text-white"><option v-for="years in 11" :key="years - 1" :value="years - 1">{{ years - 1 }} años</option></select></label></div></details>
      <div v-if="records.length" class="mt-7 grid gap-4">
        <article v-for="record in records" :key="record.id" class="rounded-xl border border-[#242C3D] bg-[#151A27] p-5">
          <div class="flex flex-wrap items-start justify-between gap-4"><div><h2 class="text-lg font-semibold">{{ record.candidate.name }}</h2><p class="mt-1 text-[#9CA3AF]">{{ record.candidate.title || 'Perfil profesional' }} · {{ record.candidate.location || 'Ubicación no especificada' }}</p></div><router-link :to="{ name: 'candidate-profile', params: { id: record.candidateId } }" class="rounded-lg border border-[#34445b] px-4 py-2 text-sm">Ver perfil</router-link></div>
          <p class="mt-3 text-sm text-blue-300">{{ jobTitle(record.jobId) }} · {{ record.match }}% de coincidencia · {{ statusLabel(record.status) }}</p>
          <p class="mt-2 text-xs text-gray-400">{{ record.profileSnapshot.experienceYears }} años de experiencia · {{ record.profileSnapshot.skillIds.length }} habilidades registradas · {{ record.profileSnapshot.education.length }} estudios</p>
          <div class="mt-3 flex flex-wrap items-center gap-3"><label class="text-xs text-gray-400">Actualizar estado <select :value="record.status" class="ml-2 rounded border border-[#34445b] bg-[#0B0F19] px-2 py-1 text-white" @change="updateStatus(record.id, $event)"><option value="submitted">Recibida</option><option value="reviewing">En revisión</option><option value="shortlisted">Preseleccionada</option><option value="rejected">No seleccionada</option><option value="accepted">Seleccionada</option></select></label></div>
          <p v-if="record.note" class="mt-3 text-sm leading-6 text-gray-300">{{ record.note }}</p>
        </article>
      </div>
      <p v-else class="mt-8 rounded-xl border border-dashed border-[#34445b] p-8 text-[#9CA3AF]">Todavía no hay postulaciones para estas ofertas.</p>
    </div>
  </main>
</template>
