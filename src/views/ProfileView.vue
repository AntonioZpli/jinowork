<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useJobs } from '@/controllers/useJobs'
import {
  PhMapPin,
  PhCheckCircle,
  PhBuildings,
  PhCalendarBlank,
  PhTranslate,
  PhTerminal,
  PhCode,
  PhGraduationCap,
  PhCpu,
} from '@phosphor-icons/vue'

const theme = useThemeStore()
const auth = useAuthStore()
const { allJobs } = useJobs()

const user = computed(() => auth.user)
const editing = ref(false)
const profileDraft = reactive({ name: '', title: '', location: '', about: '', skills: '' })
const appliedJobs = computed(() => {
  return allJobs.filter((job) => auth.applications.includes(job.id))
})
function editProfile() {
  Object.assign(profileDraft, { name: user.value?.name ?? '', title: user.value?.title ?? '', location: user.value?.location ?? '', about: user.value?.about ?? '', skills: user.value?.skills.join(', ') ?? '' })
  editing.value = true
}
function saveProfile() {
  auth.updateProfile({ name: profileDraft.name, title: profileDraft.title, location: profileDraft.location, about: profileDraft.about, skills: profileDraft.skills.split(',').map((skill) => skill.trim()).filter(Boolean) })
  editing.value = false
}

// Markdown Badges from https://github.com/ileriayo/markdown-badges (for-the-badge style)
const markdownBadges: Record<string, string> = {
  'Linux': 'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black',
  'Terminal': 'https://img.shields.io/badge/Terminal-%234D4D4D.svg?style=for-the-badge&logo=windows-terminal&logoColor=white',
  'Bash': 'https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white',
  'Neovim': 'https://img.shields.io/badge/NeoVim-%2357A143.svg?style=for-the-badge&logo=neovim&logoColor=white',
  'Docker': 'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white',
  'Go': 'https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white',
  'Python': 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
  'Node.js': 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
  'PostgreSQL': 'https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white',
  'Redis': 'https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white',
  'NGINX': 'https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white',
  'Git': 'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white',
  'Kubernetes': 'https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white',
  'Rust': 'https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white',
  'Vue.js': 'https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D',
  'TypeScript': 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
  'JavaScript': 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E',
  'Tailwind CSS': 'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
  'AWS': 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white',
}

// Language level color mapping
const levelColors: Record<string, string> = {
  Nativo: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  Avanzado: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  Intermedio: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  Básico: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
}

const levelColorsLight: Record<string, string> = {
  Nativo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Avanzado: 'bg-blue-50 text-blue-700 border-blue-200',
  Intermedio: 'bg-amber-50 text-amber-700 border-amber-200',
  Básico: 'bg-gray-50 text-gray-600 border-gray-200',
}
</script>

<template>
  <div
    class="min-h-screen"
    :class="theme.theme === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <div class="flex justify-end mb-4"><button @click="editProfile" class="btn-outline text-sm">Editar perfil</button></div>
      <form v-if="editing" @submit.prevent="saveProfile" class="rounded-xl border p-6 sm:p-8 mb-6 grid sm:grid-cols-2 gap-4" :class="theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D]' : 'bg-white border-gray-200'">
        <label class="text-sm font-semibold">Nombre<input v-model="profileDraft.name" required class="input-field mt-2" /></label>
        <label class="text-sm font-semibold">Título profesional<input v-model="profileDraft.title" required class="input-field mt-2" /></label>
        <label class="text-sm font-semibold">Ubicación<input v-model="profileDraft.location" class="input-field mt-2" /></label>
        <label class="text-sm font-semibold">Habilidades (separadas por coma)<input v-model="profileDraft.skills" class="input-field mt-2" /></label>
        <label class="text-sm font-semibold sm:col-span-2">Sobre mí<textarea v-model="profileDraft.about" rows="4" class="input-field mt-2" /></label>
        <div class="sm:col-span-2 flex justify-end gap-3"><button type="button" @click="editing = false" class="btn-outline">Cancelar</button><button type="submit" class="btn-primary">Guardar cambios</button></div>
      </form>

      <!-- ── Profile Header Card (SIN BANNER, FOTO REDONDA) ─────────────── -->
      <div
        class="rounded-lg border p-6 sm:p-8 mb-6"
        :class="
          theme.theme === 'dark'
            ? 'bg-[#151A27] border-[#242C3D]'
            : 'bg-white border-gray-200'
        "
      >
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 w-full sm:w-auto">
            <!-- Foto Redonda (Circular Avatar) -->
            <div
              class="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 bg-[#3B82F6] flex items-center justify-center text-white font-heading text-4xl font-bold flex-shrink-0 shadow-md overflow-hidden relative"
              :class="
                theme.theme === 'dark'
                  ? 'border-[#242C3D]'
                  : 'border-blue-100'
              "
            >
              <img
                v-if="user?.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="w-full h-full object-cover rounded-full"
                loading="eager"
              />
              <span v-else>{{ user?.name?.charAt(0) }}</span>
            </div>

            <!-- Profile metadata -->
            <div class="space-y-1.5 flex-1 min-w-0">
              <div class="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1
                  class="font-heading text-2xl sm:text-3xl font-bold tracking-tight"
                  :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
                >
                  {{ user?.name }}
                </h1>
                <!-- Jinotega & Linux Badge -->
                <span
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold border"
                  :class="
                    theme.theme === 'dark'
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                  "
                >
                  <PhTerminal :size="12" weight="bold" />
                  Perfil profesional
                </span>
              </div>

              <p
                class="text-sm font-medium"
                :class="theme.theme === 'dark' ? 'text-[#3B82F6]' : 'text-[#3B82F6]'"
              >
                {{ user?.title }}
              </p>

              <div
                class="flex items-center justify-center sm:justify-start gap-2 text-xs flex-wrap"
                :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
              >
                <div class="flex items-center gap-1">
                  <PhMapPin :size="14" />
                  <span>{{ user?.location }}</span>
                </div>
                <span>·</span>
                <span class="text-xs font-medium text-emerald-500">Talento Verificado Nica 🇳🇮</span>
              </div>
            </div>
          </div>

          <!-- Availability badge -->
          <div class="w-full sm:w-auto flex justify-center sm:justify-end flex-shrink-0">
            <div
              v-if="user?.available"
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border text-xs font-semibold"
              :class="
                theme.theme === 'dark'
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              "
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Disponible para contratación
            </div>
          </div>
        </div>
      </div>

      <!-- ── Two-column layout ───────────────────────────────────── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left column (1/3) -->
        <div class="space-y-5">

          <!-- Sobre mí -->
          <div
            class="rounded-lg border p-5"
            :class="
              theme.theme === 'dark'
                ? 'bg-[#151A27] border-[#242C3D]'
                : 'bg-white border-gray-200'
            "
          >
            <h2
              class="font-heading text-sm font-semibold tracking-tight mb-3 flex items-center gap-1.5"
              :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
            >
              <PhCpu :size="14" />
              Sobre mí
            </h2>
            <p
              class="text-xs leading-relaxed"
              :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-600'"
            >
              {{ user?.about }}
            </p>
          </div>

          <!-- Habilidades (Markdown Badges https://github.com/ileriayo/markdown-badges) -->
          <div
            class="rounded-lg border p-5"
            :class="
              theme.theme === 'dark'
                ? 'bg-[#151A27] border-[#242C3D]'
                : 'bg-white border-gray-200'
            "
          >
            <div class="flex items-center justify-between mb-3.5">
              <h2
                class="font-heading text-sm font-semibold tracking-tight flex items-center gap-1.5"
                :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
              >
                <PhCode :size="14" />
                Habilidades
              </h2>
              <span
                class="text-[10px] font-mono"
                :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
              >
                markdown-badges
              </span>
            </div>

            <!-- List of markdown badges from https://github.com/ileriayo/markdown-badges -->
            <div class="flex flex-wrap gap-2">
              <template v-for="skill in user?.skills" :key="skill">
                <img
                  v-if="markdownBadges[skill]"
                  :src="markdownBadges[skill]"
                  :alt="skill"
                  class="h-[26px] rounded hover:opacity-90 transition-transform duration-150 hover:scale-105 shadow-sm"
                  loading="lazy"
                />
                <span
                  v-else
                  class="tag-pill"
                >
                  {{ skill }}
                </span>
              </template>
            </div>
          </div>

          <!-- Idiomas -->
          <div
            class="rounded-lg border p-5"
            :class="
              theme.theme === 'dark'
                ? 'bg-[#151A27] border-[#242C3D]'
                : 'bg-white border-gray-200'
            "
          >
            <h2
              class="font-heading text-sm font-semibold tracking-tight mb-3 flex items-center gap-1.5"
              :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
            >
              <PhTranslate :size="14" />
              Idiomas
            </h2>
            <div class="space-y-2.5">
              <div
                v-for="lang in user?.languages"
                :key="lang.id"
                class="flex items-center justify-between"
              >
                <span
                  class="text-xs font-medium"
                  :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-800'"
                >
                  {{ lang.language }}
                </span>
                <span
                  class="text-xs px-2 py-0.5 rounded border font-medium"
                  :class="
                    theme.theme === 'dark'
                      ? levelColors[lang.level]
                      : levelColorsLight[lang.level]
                  "
                >
                  {{ lang.level }}
                </span>
              </div>
            </div>
          </div>

          <!-- Educación -->
          <div
            class="rounded-lg border p-5"
            :class="
              theme.theme === 'dark'
                ? 'bg-[#151A27] border-[#242C3D]'
                : 'bg-white border-gray-200'
            "
          >
            <h2
              class="font-heading text-sm font-semibold tracking-tight mb-3 flex items-center gap-1.5"
              :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
            >
              <PhGraduationCap :size="14" />
              Educación & Certificaciones
            </h2>
            <div class="space-y-4">
              <div
                v-for="edu in user?.education"
                :key="edu.id"
                class="space-y-0.5"
              >
                <p
                  class="text-xs font-semibold"
                  :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
                >
                  {{ edu.degree }}
                </p>
                <p
                  class="text-xs font-medium"
                  :class="theme.theme === 'dark' ? 'text-[#3B82F6]' : 'text-blue-600'"
                >
                  {{ edu.institution }}
                </p>
                <p
                  class="text-xs"
                  :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
                >
                  {{ edu.field }} · {{ edu.year }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column (2/3) — Experience timeline -->
        <div class="lg:col-span-2">
          <div
            class="rounded-lg border p-5 sm:p-7"
            :class="
              theme.theme === 'dark'
                ? 'bg-[#151A27] border-[#242C3D]'
                : 'bg-white border-gray-200'
            "
          >
            <div class="flex items-center justify-between mb-6">
              <h2
                class="font-heading text-sm font-semibold tracking-tight"
                :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
              >
                Experiencia profesional
              </h2>
              <span
                class="text-xs"
                :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
              >
                Jinotega & Nicaragua
              </span>
            </div>

            <!-- Timeline -->
            <div class="space-y-0">
              <div
                v-for="(exp, index) in user?.experience"
                :key="exp.id"
                class="relative flex gap-5"
                :class="{ 'pb-8': index < (user?.experience?.length ?? 0) - 1 }"
              >
                <!-- Timeline line -->
                <div class="flex flex-col items-center flex-shrink-0">
                  <!-- Company logo square -->
                  <div
                    class="w-10 h-10 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10 shadow-sm"
                    :style="{ backgroundColor: exp.companyColor }"
                  >
                    {{ exp.companyInitials }}
                  </div>
                  <!-- Line -->
                  <div
                    v-if="index < (user?.experience?.length ?? 0) - 1"
                    class="w-px flex-1 mt-2"
                    :class="theme.theme === 'dark' ? 'bg-[#242C3D]' : 'bg-gray-100'"
                  ></div>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0 pb-1">
                  <div class="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3
                        class="text-sm font-semibold"
                        :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
                      >
                        {{ exp.title }}
                      </h3>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <PhBuildings
                          :size="12"
                          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
                        />
                        <span
                          class="text-xs font-medium"
                          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
                        >
                          {{ exp.company }} · {{ exp.location }}
                        </span>
                      </div>
                    </div>
                    <div
                      class="flex items-center gap-1 text-xs flex-shrink-0"
                      :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
                    >
                      <PhCalendarBlank :size="12" />
                      {{ exp.startDate }} — {{ exp.current ? 'Presente' : exp.endDate }}
                    </div>
                  </div>

                  <!-- Current badge -->
                  <div
                    v-if="exp.current"
                    class="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-xs border"
                    :class="
                      theme.theme === 'dark'
                        ? 'bg-[#3B82F6]/10 border-[#3B82F6]/25 text-[#3B82F6]'
                        : 'bg-blue-50 border-blue-200 text-blue-700'
                    "
                  >
                    <PhCheckCircle :size="11" weight="fill" />
                    Puesto actual
                  </div>

                  <p
                    class="text-xs leading-relaxed mt-2"
                    :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-600'"
                  >
                    {{ exp.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="rounded-xl border p-6 sm:p-8 mt-7" :class="theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D]' : 'bg-white border-gray-200'">
        <div class="flex items-center justify-between mb-5"><div><h2 class="text-xl font-bold">Mis postulaciones</h2><p class="text-sm text-gray-500 mt-1">Sigue las oportunidades a las que ya aplicaste.</p></div><span class="tag-pill">{{ appliedJobs.length }} enviadas</span></div>
        <div v-if="appliedJobs.length" class="divide-y divide-gray-200/20">
          <router-link v-for="job in appliedJobs" :key="job.id" :to="`/empleos/${job.id}`" class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 block hover:text-[#3B82F6]"><div><p class="font-semibold">{{ job.title }}</p><p class="text-sm text-gray-500 mt-1">{{ job.company }} · {{ job.location }}</p></div><span class="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600">Postulación enviada</span></router-link>
        </div>
        <div v-else class="rounded-lg border border-dashed p-7 text-center text-sm text-gray-500">Aún no tienes postulaciones. Explora ofertas y da seguimiento desde aquí.</div>
      </section>
    </div>
  </div>
</template>
