<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useJobs } from '@/controllers/useJobs'
import { calculateCandidateJobMatch } from '@/services/jobMatching'
import { PROFESSIONAL_AREAS, areaForLabel, specializationById } from '@/data/professionalTaxonomy'
import type { User } from '@/models/User'

const auth = useAuthStore()
const route = useRoute()
const { allJobs } = useJobs()
const candidate = computed(() => auth.candidates.find(person => person.id === Number(route.params.id)))
const selectedAreaId = ref('Todas')
const ownJobs = computed(() => allJobs.value.filter(job => job.ownerId === auth.user?.id))
function areaName(id?: string) { return PROFESSIONAL_AREAS.find(area => area.id === id)?.name || 'Área sin definir' }
function publicLocation(person: User) { return person.municipality || person.department || person.location?.split(',')[0] || 'Ubicación no especificada' }
function matchScore(person: User) { return ownJobs.value.length ? Math.max(...ownJobs.value.map(job => calculateCandidateJobMatch(person, job).score)) : null }
const profiles = computed(() => auth.candidates
  .filter(person => selectedAreaId.value === 'Todas' || (person.professionalAreaId || areaForLabel(person.preferredCategories?.[0] || person.interests?.[0])?.id) === selectedAreaId.value)
  .sort((a, b) => (matchScore(b) ?? 0) - (matchScore(a) ?? 0)))
</script>

<template>
  <main class="min-h-screen bg-[#0B0F19] px-5 py-10 text-[#F3F4F6]"><div class="mx-auto max-w-5xl">
    <router-link v-if="route.params.id" to="/empresa/perfiles" class="text-sm text-blue-400">← Volver a perfiles</router-link>
    <template v-if="route.params.id && candidate">
      <div class="mt-5 rounded-xl border border-[#242C3D] bg-[#151A27] p-7"><p class="text-sm text-blue-400">Perfil profesional</p><h1 class="mt-2 text-3xl font-bold">{{ candidate.name }}</h1><p class="mt-2 text-lg text-gray-300">{{ candidate.title || 'Profesional' }}</p><p class="mt-1 text-gray-400">{{ publicLocation(candidate) }}</p><p class="mt-3 text-sm text-blue-300">{{ areaName(candidate.professionalAreaId) }}<span v-if="candidate.specializationIds?.length"> · {{ candidate.specializationIds.map(id => specializationById(id)?.name).filter(Boolean).join(', ') }}</span></p><p v-if="candidate.about" class="mt-6 whitespace-pre-line leading-7 text-gray-300">{{ candidate.about }}</p>
        <section v-if="candidate.skills?.length" class="mt-6"><h2 class="font-semibold">Habilidades</h2><div class="mt-3 flex flex-wrap gap-2"><span v-for="skill in candidate.skills" :key="skill" class="rounded-full border border-[#34445b] px-3 py-1 text-sm">{{ skill }}</span></div></section>
        <section v-if="candidate.experience?.length" class="mt-6"><h2 class="font-semibold">Experiencia</h2><article v-for="item in candidate.experience" :key="item.id" class="mt-3"><p>{{ item.title }} · {{ item.company }}</p><p class="text-sm text-gray-400">{{ item.description }}</p></article></section>
        <section v-if="candidate.education?.length" class="mt-6"><h2 class="font-semibold">Formación</h2><p v-for="item in candidate.education" :key="item.id" class="mt-2 text-gray-300">{{ item.degree }} · {{ item.institution }} ({{ item.year }})</p></section>
        <a class="mt-7 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white" :href="`mailto:${candidate.email}`">Contactar por correo</a>
      </div>
    </template>
    <template v-else-if="!route.params.id">
      <p class="text-sm font-semibold text-blue-400">Espacio de empresa</p><h1 class="mt-2 text-3xl font-bold">Perfiles profesionales</h1><p class="mt-2 text-gray-400">Explora los perfiles de candidatos registrados.</p>
      <label class="mt-6 block max-w-md text-sm text-gray-400">Área profesional<select v-model="selectedAreaId" class="mt-2 w-full rounded-lg border border-[#34445b] bg-[#151A27] p-3 text-white"><option value="Todas">Todas las áreas</option><option v-for="area in PROFESSIONAL_AREAS" :key="area.id" :value="area.id">{{ area.name }}</option></select></label>
      <div v-if="profiles.length" class="mt-7 grid gap-4 sm:grid-cols-2"><article v-for="person in profiles" :key="person.id" class="rounded-xl border border-[#242C3D] bg-[#151A27] p-5"><div class="flex items-start justify-between gap-3"><div><h2 class="text-lg font-semibold">{{ person.name }}</h2><p class="mt-1 text-gray-300">{{ person.title || 'Profesional' }}</p></div><span v-if="matchScore(person) !== null" class="text-sm font-semibold text-emerald-400">{{ matchScore(person) }}%</span></div><p class="mt-1 text-sm text-gray-500">{{ publicLocation(person) }}</p><p class="mt-2 text-sm text-blue-300">{{ areaName(person.professionalAreaId) }}</p><div class="mt-3 flex flex-wrap gap-1.5"><span v-for="skill in person.skills?.slice(0, 5) || []" :key="skill" class="rounded border border-[#34445b] px-2 py-1 text-xs text-gray-300">{{ skill }}</span></div><p class="mt-3 line-clamp-3 text-sm text-gray-400">{{ person.about }}</p><router-link :to="{ name: 'candidate-profile', params: { id: person.id } }" class="mt-4 inline-block text-sm font-semibold text-blue-400">Ver perfil completo →</router-link></article></div>
      <p v-else class="mt-8 text-gray-400">No hay perfiles en esta área por ahora.</p>
    </template>
    <p v-else class="mt-8 text-gray-400">No se encontró ese perfil.</p>
  </div></main>
</template>
