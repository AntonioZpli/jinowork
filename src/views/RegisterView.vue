<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/useThemeStore'
import { useAuth } from '@/controllers/useAuth'
import { PROFESSIONAL_AREAS } from '@/data/professionalTaxonomy'
import {
  PhUserCircle,
  PhBuildings,
  PhBriefcase,
  PhArrowLeft,
  PhEnvelope,
  PhLockKey,
  PhEye,
  PhEyeSlash,
  PhWarning
} from '@phosphor-icons/vue'

const theme = useThemeStore()
const router = useRouter()
const { handleRegister, authError, isLoading, clearError } = useAuth()

const step = ref(1)
const role = ref<'candidate'|'company'|null>(null)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  title: '',
  location: '',
  companyName: '',
  contactName: '',
  industry: '',
  companySize: '',
  interests: [] as string[]
})

const errors = ref<Record<string,string>>({})

function selectRole(r: 'candidate'|'company') {
  role.value = r
  step.value = 2
  errors.value = {}
  clearError()
}

function validateStep2() {
  errors.value = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (role.value === 'candidate') {
    if (!form.value.name.trim()) errors.value.name = 'Requerido'
    if (!form.value.email.trim() || !emailRegex.test(form.value.email)) errors.value.email = 'Email inválido'
    if (form.value.password.length < 8) errors.value.password = 'Mínimo 8 caracteres'
    if (form.value.password !== form.value.confirmPassword) errors.value.confirmPassword = 'Las contraseñas no coinciden'
  } else {
    if (!form.value.companyName.trim()) errors.value.companyName = 'Requerido'
    if (!form.value.contactName.trim()) errors.value.contactName = 'Requerido'
    if (!form.value.email.trim() || !emailRegex.test(form.value.email)) errors.value.email = 'Email inválido'
    if (form.value.password.length < 8) errors.value.password = 'Mínimo 8 caracteres'
    if (form.value.password !== form.value.confirmPassword) errors.value.confirmPassword = 'Las contraseñas no coinciden'
    if (!form.value.industry) errors.value.industry = 'Requerido'
    if (!form.value.companySize) errors.value.companySize = 'Requerido'
  }
  return Object.keys(errors.value).length === 0
}

function nextStep() {
  if (validateStep2()) {
    if (role.value === 'candidate') step.value = 3
    else submit() // company skips step 3
  }
}

async function submit() {
  clearError()
  
  const data = {
    role: role.value!,
    name: role.value === 'candidate' ? form.value.name : form.value.contactName,
    email: form.value.email,
    password: form.value.password,
    title: form.value.title,
    location: form.value.location,
    companyName: form.value.companyName,
    industry: form.value.industry,
    companySize: form.value.companySize,
    interests: form.value.interests
  }
  
  await handleRegister(data)
  if (!authError.value) {
    router.push('/panel')
  }
}
</script>

<template>
  <div
    class="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 py-12"
    :class="theme.theme === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'"
  >
    <div class="w-full max-w-lg">
      <!-- Logo -->
      <div class="flex items-center gap-2.5 mb-8 justify-center">
        <div class="w-8 h-8 rounded-md bg-[#3B82F6] flex items-center justify-center">
          <PhBriefcase :size="16" weight="bold" class="text-white" />
        </div>
        <span
          class="font-heading text-xl font-bold tracking-tight"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          Jino<span class="text-[#3B82F6]">work</span>
        </span>
      </div>

      <div
        class="rounded-xl border p-7 sm:p-9"
        :class="theme.theme === 'dark' ? 'bg-[#151A27] border-[#242C3D]' : 'bg-white border-gray-200'"
      >
        <!-- Global auth error -->
        <div
          v-if="authError"
          class="flex items-start gap-2.5 p-3 rounded-md border mb-6 text-sm"
          :class="theme.theme === 'dark' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'"
        >
          <PhWarning :size="15" weight="fill" class="flex-shrink-0 mt-0.5" />
          <span>{{ authError }}</span>
        </div>

        <!-- STEP 1: ROLE SELECTION -->
        <div v-if="step === 1">
          <h1 class="font-heading text-2xl font-bold text-center mb-2">Únete a Jinowork</h1>
          <p class="text-sm text-center mb-8" :class="theme.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'">
            Selecciona el tipo de cuenta que deseas crear
          </p>
          
          <div class="grid sm:grid-cols-2 gap-4">
            <button
              @click="selectRole('candidate')"
              class="flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all hover:border-[#3B82F6] hover:bg-[#3B82F6]/5"
              :class="theme.theme === 'dark' ? 'border-[#242C3D]' : 'border-gray-200'"
            >
              <PhUserCircle :size="48" class="text-[#3B82F6] mb-4" weight="light" />
              <h2 class="font-bold text-lg mb-2">Soy candidato</h2>
              <p class="text-sm" :class="theme.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'">
                Busco oportunidades laborales en Nicaragua.
              </p>
            </button>
            
            <button
              @click="selectRole('company')"
              class="flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all hover:border-[#3B82F6] hover:bg-[#3B82F6]/5"
              :class="theme.theme === 'dark' ? 'border-[#242C3D]' : 'border-gray-200'"
            >
              <PhBuildings :size="48" class="text-[#3B82F6] mb-4" weight="light" />
              <h2 class="font-bold text-lg mb-2">Soy empresa</h2>
              <p class="text-sm" :class="theme.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'">
                Quiero publicar ofertas y encontrar talento local.
              </p>
            </button>
          </div>
        </div>

        <!-- STEP 2: FORM -->
        <div v-else-if="step === 2">
          <button
            @click="step = 1"
            class="flex items-center gap-1.5 text-sm mb-6 hover:text-[#3B82F6] transition-colors"
            :class="theme.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'"
          >
            <PhArrowLeft :size="16" /> Volver
          </button>
          
          <h1 class="font-heading text-2xl font-bold mb-6">
            {{ role === 'candidate' ? 'Crea tu perfil profesional' : 'Registra tu empresa' }}
          </h1>

          <form @submit.prevent="nextStep" class="space-y-4">
            
            <template v-if="role === 'candidate'">
              <div>
                <label class="block text-sm font-semibold mb-1.5">Nombre completo</label>
                <input v-model="form.name" type="text" class="input-field" :class="{ error: errors.name }" placeholder="Juan Pérez" />
                <p v-if="errors.name" class="text-xs text-red-400 mt-1">{{ errors.name }}</p>
              </div>
            </template>

            <template v-if="role === 'company'">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-1.5">Nombre de la empresa</label>
                  <input v-model="form.companyName" type="text" class="input-field" :class="{ error: errors.companyName }" placeholder="Tech Nica S.A." />
                  <p v-if="errors.companyName" class="text-xs text-red-400 mt-1">{{ errors.companyName }}</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1.5">Nombre del contacto</label>
                  <input v-model="form.contactName" type="text" class="input-field" :class="{ error: errors.contactName }" placeholder="María Silva" />
                  <p v-if="errors.contactName" class="text-xs text-red-400 mt-1">{{ errors.contactName }}</p>
                </div>
              </div>
            </template>

            <div>
              <label class="block text-sm font-semibold mb-1.5">Correo electrónico</label>
              <input v-model="form.email" type="email" class="input-field" :class="{ error: errors.email }" placeholder="correo@ejemplo.com" />
              <p v-if="errors.email" class="text-xs text-red-400 mt-1">{{ errors.email }}</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold mb-1.5">Contraseña</label>
                <div class="relative">
                  <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="input-field pr-10" :class="{ error: errors.password }" placeholder="••••••••" />
                  <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <PhEyeSlash v-if="showPassword" :size="15" />
                    <PhEye v-else :size="15" />
                  </button>
                </div>
                <p v-if="errors.password" class="text-xs text-red-400 mt-1">{{ errors.password }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5">Confirmar contraseña</label>
                <div class="relative">
                  <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="input-field pr-10" :class="{ error: errors.confirmPassword }" placeholder="••••••••" />
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <PhEyeSlash v-if="showConfirmPassword" :size="15" />
                    <PhEye v-else :size="15" />
                  </button>
                </div>
                <p v-if="errors.confirmPassword" class="text-xs text-red-400 mt-1">{{ errors.confirmPassword }}</p>
              </div>
            </div>

            <template v-if="role === 'candidate'">
              <div>
                <label class="block text-sm font-semibold mb-1.5">Título profesional</label>
                <input v-model="form.title" type="text" class="input-field" :class="{ error: errors.title }" placeholder="Ej: Desarrollador Frontend" />
                <p v-if="errors.title" class="text-xs text-red-400 mt-1">{{ errors.title }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5">Ubicación</label>
                <input v-model="form.location" type="text" class="input-field" :class="{ error: errors.location }" placeholder="Ej: Jinotega, Nicaragua" />
                <p v-if="errors.location" class="text-xs text-red-400 mt-1">{{ errors.location }}</p>
              </div>
            </template>

            <template v-if="role === 'company'">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-1.5">Industria</label>
                  <select v-model="form.industry" class="input-field" :class="{ error: errors.industry }">
                    <option value="" disabled>Selecciona una...</option>
                    <option v-for="ind in ['Tecnología', 'Agricultura', 'Finanzas', 'Educación', 'Salud', 'Comercio', 'Servicios', 'Otro']" :key="ind" :value="ind">{{ ind }}</option>
                  </select>
                  <p v-if="errors.industry" class="text-xs text-red-400 mt-1">{{ errors.industry }}</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1.5">Tamaño de empresa</label>
                  <select v-model="form.companySize" class="input-field" :class="{ error: errors.companySize }">
                    <option value="" disabled>Selecciona...</option>
                    <option v-for="size in ['1-10', '11-50', '51-200', '200+']" :key="size" :value="size">{{ size }} empleados</option>
                  </select>
                  <p v-if="errors.companySize" class="text-xs text-red-400 mt-1">{{ errors.companySize }}</p>
                </div>
              </div>
            </template>

            <button type="submit" class="btn-primary w-full mt-4 text-base py-3">
              {{ role === 'candidate' ? 'Continuar' : 'Crear cuenta de empresa' }}
            </button>
          </form>
        </div>

        <!-- STEP 3: CANDIDATE INTERESTS (Optional) -->
        <div v-else-if="step === 3">
          <h1 class="font-heading text-2xl font-bold mb-2">Selecciona tus intereses</h1>
          <p class="text-sm mb-6" :class="theme.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'">
            Esto nos ayudará a recomendarte las mejores ofertas. (Opcional)
          </p>

          <div class="grid grid-cols-2 gap-3 mb-8">
            <label
              v-for="area in PROFESSIONAL_AREAS"
              :key="area.id"
              class="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1A2235] transition-colors"
              :class="theme.theme === 'dark' ? 'border-[#242C3D]' : 'border-gray-200'"
            >
              <input type="checkbox" v-model="form.interests" :value="area.id" class="w-4 h-4 rounded text-[#3B82F6]" />
              <span class="text-sm font-medium">{{ area.name }}</span>
            </label>
          </div>

          <div class="flex gap-4">
            <button @click="submit" class="btn-outline flex-1 py-3" :disabled="isLoading">Saltar</button>
            <button @click="submit" class="btn-primary flex-1 py-3" :disabled="isLoading">
              {{ isLoading ? 'Creando...' : 'Finalizar registro' }}
            </button>
          </div>
        </div>

        <!-- Footer link -->
        <div class="mt-8 pt-6 border-t text-center text-sm" :class="theme.theme === 'dark' ? 'border-[#242C3D] text-[#9CA3AF]' : 'border-gray-100 text-gray-500'">
          ¿Ya tienes cuenta? 
          <router-link to="/login" class="font-semibold text-[#3B82F6] hover:underline">
            Inicia sesión
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>
