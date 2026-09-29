<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobs } from '@/controllers/useJobs'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { PhMapPin, PhArrowLeft, PhCheckCircle, PhBriefcase } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()
const { allJobs } = useJobs()
const auth = useAuthStore()
const theme = useThemeStore()
const job = computed(() => allJobs.find((item) => item.id === Number(route.params.id)))
const coverLetter = ref('')
const submitted = ref(false)
const alreadyApplied = computed(() => !!job.value && auth.applications.includes(job.value.id))

function apply() {
  if (!job.value || alreadyApplied.value) return
  auth.applyToJob(job.value.id, coverLetter.value.trim())
  submitted.value = true
}
</script>

<template>
  <div class="min-h-screen" :class="theme.theme === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'">
    <div v-if="job" class="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <button @click="router.push('/empleos')" class="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] mb-7"><PhArrowLeft :size="17"/> Volver a ofertas</button>
      <div class="grid lg:grid-cols-[1fr_360px] gap-7 items-start">
        <article class="rounded-2xl border p-7 sm:p-10" :class="theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D]' : 'bg-white border-gray-200'">
          <div class="flex gap-5 items-start mb-8">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold" :style="{backgroundColor: job.companyColor}">{{ job.companyInitials }}</div>
            <div class="min-w-0"><p class="text-sm text-gray-500 mb-1">{{ job.company }}</p><h1 class="text-2xl sm:text-3xl font-bold leading-tight">{{ job.title }}</h1></div>
          </div>
          <div class="flex flex-wrap gap-3 text-sm text-gray-500 mb-8"><span class="inline-flex items-center gap-2"><PhMapPin/>{{ job.location }}</span><span>·</span><span>{{ job.modality }}</span><span>·</span><span>{{ job.contract }}</span><span>·</span><span>{{ job.seniority }}</span></div>
          <section class="mb-8"><h2 class="text-xl font-bold mb-3">Sobre el puesto</h2><p class="text-base leading-7 text-gray-500">{{ job.description }}</p></section>
          <section class="mb-8"><h2 class="text-xl font-bold mb-3">Área profesional</h2><p class="text-base text-gray-500">{{ job.category || 'Tecnología y producto' }}</p></section>
          <section><h2 class="text-xl font-bold mb-4">Habilidades relacionadas</h2><div class="flex flex-wrap gap-2"><span v-for="tag in job.tags" :key="tag" class="tag-pill">{{ tag }}</span></div></section>
        </article>
        <aside class="rounded-2xl border p-6 sm:p-7 sticky top-24" :class="theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D]' : 'bg-white border-gray-200'">
          <p class="text-sm text-gray-500 mb-2">Compensación</p><p class="text-xl font-bold mb-6">{{ job.salary || 'A convenir' }}</p>
          <p class="text-sm text-gray-500 mb-6">Publicado {{ job.postedAt }}</p>
          <form v-if="!alreadyApplied" @submit.prevent="apply" class="space-y-4">
            <label class="block text-sm font-semibold">Mensaje para la empresa <span class="font-normal text-gray-500">(opcional)</span><textarea v-model="coverLetter" rows="4" placeholder="Cuéntales brevemente por qué te interesa el puesto" class="input-field mt-2 resize-y"></textarea></label>
            <button type="submit" class="btn-primary w-full py-3">Enviar postulación</button>
          </form>
          <div v-else class="rounded-xl p-4 text-sm font-medium flex gap-2 items-start" :class="theme.theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-50 text-emerald-800'"><PhCheckCircle :size="20"/> {{ submitted ? '¡Postulación enviada! Puedes revisar su estado desde tu perfil.' : 'Ya te postulaste a esta oferta. Puedes revisar el seguimiento desde tu perfil.' }}</div>
          <div class="mt-6 pt-5 border-t border-gray-200/20 text-sm text-gray-500 flex gap-2"><PhBriefcase :size="18"/> La empresa recibirá tu perfil al postularte.</div>
        </aside>
      </div>
    </div>
    <div v-else class="max-w-4xl mx-auto px-5 py-24 text-center"><h1 class="text-2xl font-bold mb-4">Oferta no encontrada</h1><button @click="router.push('/empleos')" class="btn-primary">Ver ofertas</button></div>
  </div>
</template>
