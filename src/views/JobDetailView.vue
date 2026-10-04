<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobs } from '@/controllers/useJobs'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { calculateCandidateJobMatch } from '@/services/jobMatching'
import { specializationById } from '@/data/professionalTaxonomy'
import { PhMapPin, PhArrowLeft, PhCheckCircle, PhBriefcase, PhTag } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()
const { allJobs } = useJobs()
const auth = useAuthStore()
const theme = useThemeStore()
const job = computed(() => allJobs.value.find((item) => item.id === Number(route.params.id)))
const match = computed(() => {
  const currentJob = job.value
  const candidate = auth.user
  return currentJob && candidate?.role === 'candidate'
    ? calculateCandidateJobMatch(candidate, currentJob)
    : null
})
function specializationName(id?: string) { return specializationById(id)?.name }
const coverLetter = ref('')
const submitted = ref(false)
const alreadyApplied = computed(() => !!job.value && auth.applications.includes(job.value.id))

function apply() {
  if (!job.value || job.value.status === 'closed' || alreadyApplied.value) return
  auth.applyToJob(job.value.id, coverLetter.value.trim())
  submitted.value = true
}
</script>

<template>
  <div class="min-h-screen" :class="theme.theme === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'">
    <div v-if="job" class="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <button
        @click="router.push('/empleos')"
        class="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] mb-7 hover:underline"
      >
        <PhArrowLeft :size="17"/>
        Volver a ofertas
      </button>

      <div class="grid lg:grid-cols-[1fr_360px] gap-7 items-start">
        <article
          class="rounded-2xl border p-7 sm:p-10"
          :class="theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D]' : 'bg-white border-gray-200'"
        >
          <div class="flex gap-5 items-start mb-8">
            <div
              class="w-20 h-20 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
              :style="{backgroundColor: job.companyColor}"
            >
              {{ job.companyInitials }}
            </div>
            <div class="min-w-0">
              <p class="text-base text-gray-500 mb-2 font-medium">{{ job.company }}</p>
              <h1 class="text-3xl sm:text-4xl font-bold leading-tight">{{ job.title }}</h1>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 text-base text-gray-500 mb-8 font-medium">
            <span class="inline-flex items-center gap-2">
              <PhMapPin/>{{ job.location }}
            </span>
            <span>·</span>
            <span>{{ job.modality }}</span>
            <span>·</span>
            <span>{{ job.contract }}</span>
            <span>·</span>
            <span>{{ job.seniority }}</span>
          </div>

          <section v-if="job.specializationId || job.minimumExperienceYears || job.educationRequirements?.length" class="mb-8 rounded-xl border border-gray-200/10 p-5">
            <h2 class="text-xl font-bold mb-3">Requisitos del perfil</h2>
            <p v-if="job.specializationId" class="text-gray-400">Especialización: {{ specializationName(job.specializationId) }}</p>
            <p v-if="job.minimumExperienceYears" class="mt-2 text-gray-400">Experiencia mínima: {{ job.minimumExperienceYears }} años</p>
            <p v-if="job.educationRequirements?.length" class="mt-2 text-gray-400">Formación: {{ job.educationRequirements.join(', ') }}</p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Sobre el puesto</h2>
            <p class="text-lg leading-8 text-gray-500 whitespace-pre-wrap">{{ job.description }}</p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Área profesional</h2>
            <p class="text-lg text-gray-500">
              <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" :class="theme.theme === 'dark' ? 'border-[#242C3D] bg-blue-500/10 text-blue-400' : 'border-blue-200 bg-blue-50 text-blue-700'">
                <PhTag :size="16" />
                {{ job.category || 'Tecnología y producto' }}
              </span>
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Requisitos</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in job.tags"
                :key="tag"
                class="tag-pill text-sm px-3 py-1.5"
              >
                {{ tag }}
              </span>
            </div>
          </section>
        </article>

        <aside
          class="rounded-2xl border p-6 sm:p-7 sticky top-24"
          :class="theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D]' : 'bg-white border-gray-200'"
        >
          <p class="text-sm text-gray-500 mb-2 font-medium">Compensación</p>
          <p class="text-2xl font-bold mb-6">{{ job.salary || 'A convenir' }}</p>
          <section v-if="match" class="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p class="text-lg font-bold text-emerald-400">{{ match.score }}% de coincidencia</p>
            <ul class="mt-3 space-y-2 text-sm text-gray-400"><li v-for="factor in match.factors" :key="factor.key">{{ factor.score >= 75 ? '✓' : '·' }} {{ factor.label }}: {{ factor.detail }}</li></ul>
          </section>
          <p class="text-sm text-gray-500 mb-6 font-medium">Publicado {{ job.postedAt }}</p>

          <form v-if="!alreadyApplied && job.status !== 'closed'" @submit.prevent="apply" class="space-y-4">
            <!-- Removed cover-letter textarea to streamline application and avoid partial submissions -->
            <button type="submit" class="btn-primary w-full py-4 text-base font-semibold">
              Enviar postulación
            </button>
          </form>

          <div v-else-if="job.status === 'closed'" class="rounded-xl bg-gray-500/10 p-5 text-sm text-gray-400">
            Esta oferta ya está cerrada y no acepta nuevas postulaciones.
          </div>
          <div
            v-else
            class="rounded-xl p-5 text-sm font-medium flex gap-3 items-start leading-relaxed"
            :class="theme.theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-50 text-emerald-800'"
          >
            <PhCheckCircle :size="24" class="flex-shrink-0" />
            {{ submitted ? '¡Postulación enviada! Puedes revisar su estado desde tu perfil.' : 'Ya te postulaste a esta oferta. Puedes revisar el seguimiento desde tu perfil.' }}
          </div>

          <div class="mt-6 pt-5 border-t border-gray-200/20 text-sm text-gray-500 flex gap-3 font-medium">
            <PhBriefcase :size="20" class="flex-shrink-0" />
            La empresa recibirá tu perfil completo al postularte.
          </div>
        </aside>
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto px-5 py-24 text-center">
      <h1 class="text-3xl font-bold mb-6">Oferta no encontrada</h1>
      <button @click="router.push('/empleos')" class="btn-primary py-3 px-6 text-base">Ver ofertas</button>
    </div>
  </div>
</template>
