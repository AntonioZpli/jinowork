<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useJobs } from '@/controllers/useJobs'

const auth = useAuthStore()
const { allJobs, setJobStatus } = useJobs()
const jobs = computed(() => allJobs.value.filter(job => job.ownerId === auth.user?.id))
const applicationCount = (jobId: number) => auth.applicationRecords.filter(record => record.jobId === jobId).length
function toggleJob(jobId: number, status?: string) { setJobStatus(jobId, status === 'closed' ? 'active' : 'closed') }
</script>

<template>
  <main class="min-h-screen bg-[#0B0F19] px-5 py-10 text-[#F3F4F6]">
    <div class="mx-auto max-w-5xl">
      <p class="text-sm font-semibold text-[#3B82F6]">Espacio de empresa</p>
      <h1 class="mt-2 text-3xl font-bold">Mis ofertas</h1>
      <div class="mt-2 flex flex-wrap items-center justify-between gap-3"><p class="text-[#9CA3AF]">Vacantes publicadas por {{ auth.user?.companyName }} y las personas que han aplicado.</p><router-link to="/empresa/ofertas/nueva" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Publicar oferta</router-link></div>
      <div v-if="jobs.length" class="mt-8 grid gap-4">
        <article v-for="job in jobs" :key="job.id" class="rounded-xl border border-[#242C3D] bg-[#151A27] p-5">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div><div class="flex flex-wrap items-center gap-2"><h2 class="text-xl font-semibold">{{ job.title }}</h2><span class="rounded-full px-2 py-1 text-xs" :class="job.status === 'closed' ? 'bg-gray-500/15 text-gray-400' : 'bg-emerald-500/10 text-emerald-300'">{{ job.status === 'closed' ? 'Cerrada' : 'Activa' }}</span></div><p class="mt-2 text-sm text-[#9CA3AF]">{{ job.location }} · {{ job.modality }} · {{ job.contract }}</p></div>
            <div class="flex flex-wrap gap-2"><button class="rounded-lg border border-[#34445b] px-4 py-2 text-sm" @click="toggleJob(job.id, job.status)">{{ job.status === 'closed' ? 'Reabrir oferta' : 'Cerrar oferta' }}</button><router-link :to="{ name: 'company-applicants', query: { oferta: job.id } }" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Ver {{ applicationCount(job.id) }} postulantes</router-link></div>
          </div>
          <p class="mt-4 text-sm leading-6 text-gray-300">{{ job.description }}</p>
          <p class="mt-3 text-xs text-gray-500">{{ job.salary || 'Salario a convenir' }} · Publicada {{ job.postedAt }}</p>
        </article>
      </div>
      <p v-else class="mt-8 rounded-xl border border-dashed border-[#34445b] p-8 text-[#9CA3AF]">Esta empresa todavía no tiene ofertas publicadas.</p>
    </div>
  </main>
</template>
