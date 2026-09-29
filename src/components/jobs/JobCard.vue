<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import type { Job } from '@/models/Job'
import {
  PhMapPin,
  PhArrowRight,
  PhClock,
} from '@phosphor-icons/vue'

interface Props {
  job: Job
}

defineProps<Props>()

const theme = useThemeStore()
const auth = useAuthStore()
const router = useRouter()

// Modality tag color
function modalityClass(modality: string, dark: boolean) {
  if (dark) {
    const map: Record<string, string> = {
      Remoto: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      Presencial: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      Híbrido: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    }
    return map[modality] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  } else {
    const map: Record<string, string> = {
      Remoto: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Presencial: 'bg-amber-50 text-amber-700 border-amber-200',
      Híbrido: 'bg-purple-50 text-purple-700 border-purple-200',
    }
    return map[modality] ?? 'bg-gray-50 text-gray-600 border-gray-200'
  }
}

function seniorityClass(seniority: string, dark: boolean) {
  if (dark) {
    const map: Record<string, string> = {
      Junior: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      Mid: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      Senior: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    }
    return map[seniority] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  } else {
    const map: Record<string, string> = {
      Junior: 'bg-sky-50 text-sky-700 border-sky-200',
      Mid: 'bg-blue-50 text-blue-700 border-blue-200',
      Senior: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    }
    return map[seniority] ?? 'bg-gray-50 text-gray-600 border-gray-200'
  }
}
</script>

<template>
  <article
    @click="router.push(`/empleos/${job.id}`)"
    @keydown.enter="router.push(`/empleos/${job.id}`)"
    tabindex="0"
    class="group rounded-xl border p-6 flex flex-col gap-5 transition-all duration-200 cursor-pointer min-h-[270px]"
    :class="
      theme.theme === 'dark'
        ? 'bg-[#151A27] border-[#242C3D] hover:border-[#3B82F6]/50'
        : 'bg-white border-gray-200 hover:border-[#3B82F6]/50'
    "
  >
    <!-- Top row: logo + meta -->
    <div class="flex items-start gap-3">
      <!-- Company initials logo -->
      <div
        class="w-11 h-11 rounded-md flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        :style="{ backgroundColor: job.companyColor }"
      >
        {{ job.companyInitials }}
      </div>

      <!-- Company + title -->
      <div class="flex-1 min-w-0">
        <p
          class="text-sm font-medium mb-1 truncate"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
        >
          {{ job.company }}
        </p>
        <h3
          class="font-heading text-lg font-semibold leading-snug"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          {{ job.title }}
        </h3>
      </div>

      <!-- Featured indicator -->
      <div
        v-if="job.featured"
        class="w-2 h-2 rounded-full bg-[#3B82F6] flex-shrink-0 mt-1.5"
        title="Oferta destacada"
      ></div>
    </div>

    <!-- Location -->
    <div
      class="flex items-center gap-1.5 text-xs"
      :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
    >
      <PhMapPin :size="12" />
      {{ job.location }}
    </div>

    <!-- Tags row -->
    <div class="flex flex-wrap gap-1.5">
      <span
        class="text-xs px-2 py-0.5 rounded border font-medium"
        :class="modalityClass(job.modality, theme.theme === 'dark')"
      >
        {{ job.modality }}
      </span>
      <span
        class="text-xs px-2 py-0.5 rounded border font-medium"
        :class="seniorityClass(job.seniority, theme.theme === 'dark')"
      >
        {{ job.seniority }}
      </span>
      <span
        class="text-xs px-2 py-0.5 rounded border font-medium"
        :class="
          theme.theme === 'dark'
            ? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            : 'bg-gray-50 text-gray-600 border-gray-200'
        "
      >
        {{ job.contract }}
      </span>
    </div>

    <!-- Bottom row: salary + posted + CTA -->
    <div class="flex items-center justify-between pt-1 border-t"
      :class="theme.theme === 'dark' ? 'border-[#242C3D]' : 'border-gray-100'"
    >
      <div>
        <span
          v-if="job.salary"
          class="text-xs font-semibold"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-800'"
        >
          {{ job.salary }}
        </span>
        <div
          class="flex items-center gap-1 text-xs mt-0.5"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
        >
          <PhClock :size="11" />
          {{ job.postedAt }}
        </div>
      </div>

      <span class="flex items-center gap-1 text-sm font-semibold text-[#3B82F6]">
        {{ auth.applications.includes(job.id) ? 'Postulación enviada' : 'Ver oferta' }}
        <PhArrowRight :size="13" class="transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  </article>
</template>
