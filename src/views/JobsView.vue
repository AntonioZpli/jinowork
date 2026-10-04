<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore'
import { useJobs } from '@/controllers/useJobs'
import { useAuthStore } from '@/stores/useAuthStore'
import { calculateProfileCompletion } from '@/services/jobMatching'
import JobCard from '@/components/jobs/JobCard.vue'
import {
  PhMagnifyingGlass,
  PhX,
  PhFunnelSimple,
} from '@phosphor-icons/vue'

const theme = useThemeStore()
const auth = useAuthStore()
const profileCompletion = computed(() => auth.user?.role === 'candidate' ? calculateProfileCompletion(auth.user) : null)
const {
  searchQuery,
  selectedModality,
  selectedSeniority,
  selectedCategory,
  selectedAreaId,
  selectedSpecializationId,
  selectedContract,
  selectedLocation,
  selectedEducation,
  modalities,
  seniorities,
  contracts,
  areas,
  specializations,
  locations,
  educationLevels,
  categories,
  filteredJobs,
  recommendedJobs,
  totalJobs,
  resetFilters,
  selectArea,
} = useJobs()

// Sort filteredJobs using recommendedJobs order
const sortedFilteredJobs = computed(() => {
  const recommendedIds = recommendedJobs.value.map(j => j.id)
  return [...filteredJobs.value].sort((a, b) => {
    const idxA = recommendedIds.indexOf(a.id)
    const idxB = recommendedIds.indexOf(b.id)
    const orderA = idxA === -1 ? 9999 : idxA
    const orderB = idxB === -1 ? 9999 : idxB
    return orderA - orderB
  })
})
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
          class="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-3"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          Ofertas de empleo
        </h1>
        <p
          class="text-base"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
        >
          {{ totalJobs }} oportunidades en distintas áreas profesionales en Nicaragua
        </p>
      </div>

      <section v-if="profileCompletion && profileCompletion.percentage < 100" class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <p class="text-sm text-gray-300">Tu perfil está {{ profileCompletion.percentage }}% completo. Añadir {{ profileCompletion.next?.label.toLocaleLowerCase() }} puede mejorar las recomendaciones; puedes continuar explorando mientras tanto.</p>
        <router-link to="/panel/editar" class="text-sm font-semibold text-blue-400">Completar perfil</router-link>
      </section>

      <!-- ── Search + filters ────────────────────────────────────── -->
      <div
        class="rounded-lg border p-4 mb-3"
        :class="
          theme.theme === 'dark'
            ? 'bg-[#151A27] border-[#242C3D]'
            : 'bg-white border-gray-200'
        "
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <!-- Search input -->
          <div class="relative flex-1">
            <PhMagnifyingGlass
              :size="18"
              class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por cargo, empresa o tecnología..."
              class="input-field pl-10 pr-9 text-base"
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
              <PhX :size="16" />
            </button>
          </div>

          <!-- Modality filter -->
          <select
            v-model="selectedModality"
            class="input-field sm:w-44 text-base"
          >
            <option v-for="m in modalities" :key="m" :value="m">
              {{ m === 'Todas' ? 'Modalidad' : m }}
            </option>
          </select>

          <!-- Seniority filter -->
          <select
            v-model="selectedSeniority"
            class="input-field sm:w-40 text-base"
          >
            <option v-for="s in seniorities" :key="s" :value="s">
              {{ s === 'Todas' ? 'Nivel' : s }}
            </option>
          </select>

          <select v-model="selectedSpecializationId" class="input-field text-base"><option value="Todas">Todas las especializaciones</option><option v-for="item in specializations" :key="item.id" :value="item.id">{{ item.name }}</option></select>

          <select v-model="selectedContract" class="input-field text-base">
            <option v-for="contract in contracts" :key="contract" :value="contract">{{ contract === 'Todos' ? 'Tipo de empleo' : contract }}</option>
          </select>
          <select v-model="selectedLocation" class="input-field text-base">
            <option value="Todas">Todas las ubicaciones</option><option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
          </select>
          <select v-model="selectedEducation" class="input-field text-base"><option v-for="level in educationLevels" :key="level" :value="level">{{ level === 'Todas' ? 'Formación' : level }}</option></select>

          <!-- Reset -->
          <button
            @click="resetFilters"
            class="flex items-center gap-1.5 px-4 py-2 rounded-md border text-sm font-medium transition-colors flex-shrink-0"
            :class="
              theme.theme === 'dark'
                ? 'border-[#242C3D] text-[#9CA3AF] hover:border-[#3B82F6]/50 hover:text-[#F3F4F6]'
                : 'border-gray-200 text-gray-500 hover:border-[#3B82F6]/50 hover:text-gray-800'
            "
          >
            <PhFunnelSimple :size="15" />
            Limpiar
          </button>
        </div>
      </div>

      <!-- Categories row -->
      <div class="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar">
        <button
          v-for="area in [{ id: 'Todas', name: 'Todas las áreas' }, ...areas]"
          :key="area.id"
          @click="selectArea(area.id)"
          class="whitespace-nowrap px-4 py-1.5 rounded-full border text-sm font-medium transition-colors flex-shrink-0"
          :class="[
            selectedAreaId === area.id
              ? (theme.theme === 'dark' ? 'bg-[#3B82F6] border-[#3B82F6] text-white' : 'bg-[#3B82F6] border-[#3B82F6] text-white')
              : (theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D] text-[#9CA3AF] hover:text-[#F3F4F6]' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900')
          ]"
        >
          {{ area.name }}
        </button>
      </div>

      <!-- ── Results count ───────────────────────────────────────── -->
      <div
        class="text-sm mb-6"
        :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
      >
        Mostrando
        <span
          class="font-semibold"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          {{ sortedFilteredJobs.length }}
        </span>
        de {{ totalJobs }} ofertas
      </div>

      <!-- ── Jobs grid ───────────────────────────────────────────── -->
      <div v-if="sortedFilteredJobs.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <JobCard
          v-for="job in sortedFilteredJobs"
          :key="job.id"
          :job="job"
        />
      </div>

      <!-- ── Empty state ─────────────────────────────────────────── -->
      <div
        v-else
        class="rounded-lg border p-12 text-center mt-6"
        :class="
          theme.theme === 'dark'
            ? 'bg-[#151A27] border-[#242C3D]'
            : 'bg-white border-gray-200'
        "
      >
        <div
          class="w-12 h-12 rounded-md border flex items-center justify-center mx-auto mb-4"
          :class="
            theme.theme === 'dark'
              ? 'border-[#242C3D] text-[#9CA3AF]'
              : 'border-gray-200 text-gray-400'
          "
        >
          <PhMagnifyingGlass :size="24" />
        </div>
        <h3
          class="font-heading text-lg font-semibold mb-2"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          Sin resultados
        </h3>
        <p
          class="text-sm mb-6 max-w-md mx-auto"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
        >
          Ninguna oferta coincide con los filtros seleccionados. Intenta con otros términos o limpia los filtros.
        </p>
        <button @click="resetFilters" class="btn-primary px-6 py-2">
          Ver todas las ofertas
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
