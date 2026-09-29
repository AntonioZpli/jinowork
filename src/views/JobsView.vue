<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore'
import { useJobs } from '@/controllers/useJobs'
import JobCard from '@/components/jobs/JobCard.vue'
import {
  PhMagnifyingGlass,
  PhX,
  PhFunnelSimple,
} from '@phosphor-icons/vue'

const theme = useThemeStore()
const {
  searchQuery,
  selectedModality,
  selectedSeniority,
  modalities,
  seniorities,
  filteredJobs,
  totalJobs,
  resetFilters,
} = useJobs()
</script>

<template>
  <div
    class="min-h-screen"
    :class="theme.theme === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- ── Page header ─────────────────────────────────────────── -->
      <div class="mb-8">
        <h1
          class="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-2"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          Ofertas de empleo
        </h1>
        <p
          class="text-sm"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
        >
          {{ totalJobs }} oportunidades en distintas áreas profesionales en Nicaragua
        </p>
      </div>

      <!-- ── Search + filters ────────────────────────────────────── -->
      <div
        class="rounded-lg border p-4 mb-6"
        :class="
          theme.theme === 'dark'
            ? 'bg-[#151A27] border-[#242C3D]'
            : 'bg-white border-gray-200'
        "
      >
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Search input -->
          <div class="relative flex-1">
            <PhMagnifyingGlass
              :size="15"
              class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por cargo, empresa o tecnología..."
              class="input-field pl-9 pr-9"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              :class="
                theme.theme === 'dark'
                  ? 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                  : 'text-gray-400 hover:text-gray-600'
              "
            >
              <PhX :size="14" />
            </button>
          </div>

          <!-- Modality filter -->
          <select
            v-model="selectedModality"
            class="input-field sm:w-40"
          >
            <option v-for="m in modalities" :key="m" :value="m">
              {{ m === 'Todas' ? 'Modalidad' : m }}
            </option>
          </select>

          <!-- Seniority filter -->
          <select
            v-model="selectedSeniority"
            class="input-field sm:w-36"
          >
            <option v-for="s in seniorities" :key="s" :value="s">
              {{ s === 'Todas' ? 'Nivel' : s }}
            </option>
          </select>

          <!-- Reset -->
          <button
            @click="resetFilters"
            class="flex items-center gap-1.5 px-4 py-2 rounded-md border text-xs font-medium transition-colors flex-shrink-0"
            :class="
              theme.theme === 'dark'
                ? 'border-[#242C3D] text-[#9CA3AF] hover:border-[#3B82F6]/50 hover:text-[#F3F4F6]'
                : 'border-gray-200 text-gray-500 hover:border-[#3B82F6]/50 hover:text-gray-800'
            "
          >
            <PhFunnelSimple :size="13" />
            Limpiar
          </button>
        </div>
      </div>

      <!-- ── Results count ───────────────────────────────────────── -->
      <div
        class="text-xs mb-5"
        :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
      >
        Mostrando
        <span
          class="font-semibold"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          {{ filteredJobs.length }}
        </span>
        de {{ totalJobs }} ofertas
      </div>

      <!-- ── Jobs grid ───────────────────────────────────────────── -->
      <div v-if="filteredJobs.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <JobCard
          v-for="job in filteredJobs"
          :key="job.id"
          :job="job"
        />
      </div>

      <!-- ── Empty state ─────────────────────────────────────────── -->
      <div
        v-else
        class="rounded-lg border p-12 text-center"
        :class="
          theme.theme === 'dark'
            ? 'bg-[#151A27] border-[#242C3D]'
            : 'bg-white border-gray-200'
        "
      >
        <div
          class="w-10 h-10 rounded-md border flex items-center justify-center mx-auto mb-4"
          :class="
            theme.theme === 'dark'
              ? 'border-[#242C3D] text-[#9CA3AF]'
              : 'border-gray-200 text-gray-400'
          "
        >
          <PhMagnifyingGlass :size="18" />
        </div>
        <h3
          class="font-heading text-base font-semibold mb-1"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          Sin resultados
        </h3>
        <p
          class="text-xs mb-4"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
        >
          Ninguna oferta coincide con los filtros seleccionados.
        </p>
        <button @click="resetFilters" class="btn-primary text-xs">
          Ver todas las ofertas
        </button>
      </div>
    </div>
  </div>
</template>
