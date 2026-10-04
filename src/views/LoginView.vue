<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore'
import { useAuth } from '@/controllers/useAuth'
import {
  PhEnvelope,
  PhLockKey,
  PhEye,
  PhEyeSlash,
  PhArrowRight,
  PhWarning,
  PhBriefcase,
} from '@phosphor-icons/vue'

const theme = useThemeStore()
const { handleLogin, authError, isLoading, clearError } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const localErrors = ref<{ email?: string; password?: string }>({})

function validate(): boolean {
  localErrors.value = {}
  if (!email.value.trim()) {
    localErrors.value.email = 'Ingresa tu correo electrónico.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    localErrors.value.email = 'Formato de correo no válido.'
  }
  if (!password.value) {
    localErrors.value.password = 'Ingresa tu contraseña.'
  } else if (password.value.length < 4) {
    localErrors.value.password = 'Mínimo 4 caracteres.'
  }
  return Object.keys(localErrors.value).length === 0
}

async function submit() {
  clearError()
  if (!validate()) return
  await handleLogin(email.value, password.value)
}
</script>

<template>
  <div
    class="min-h-[calc(100vh-64px)] flex items-center justify-center p-4"
    :class="theme.theme === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'"
  >
    <div class="w-full max-w-md">
      <!-- Logo mark -->
      <div class="flex items-center gap-2.5 mb-8">
        <div class="w-8 h-8 rounded-md bg-[#3B82F6] flex items-center justify-center">
          <PhBriefcase :size="16" weight="bold" class="text-white" />
        </div>
        <span
          class="font-heading text-lg font-bold tracking-tight"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          Jino<span class="text-[#3B82F6]">work</span>
        </span>
      </div>

      <!-- Card -->
      <div
        class="rounded-lg border p-7"
        :class="
          theme.theme === 'dark'
            ? 'bg-[#151A27] border-[#242C3D]'
            : 'bg-white border-gray-200'
        "
      >
        <h1
          class="font-heading text-2xl font-bold tracking-tight mb-1"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          Iniciar sesión
        </h1>
        <p
          class="text-sm mb-6"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
        >
          Ingresa tus credenciales para acceder a la plataforma.
        </p>

        <!-- Global auth error -->
        <div
          v-if="authError"
          class="flex items-start gap-2.5 p-3 rounded-md border mb-5 text-sm"
          :class="
            theme.theme === 'dark'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-red-50 border-red-200 text-red-600'
          "
        >
          <PhWarning :size="15" weight="fill" class="flex-shrink-0 mt-0.5" />
          <span>{{ authError }}</span>
        </div>

        <form @submit.prevent="submit" class="space-y-4">
          <!-- Email field -->
          <div>
            <label
              for="email"
              class="block text-sm font-semibold mb-1.5"
              :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-700'"
            >
              Correo electrónico
            </label>
            <div class="relative">
              <PhEnvelope
                :size="15"
                class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
              />
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="yamir@jinowork.com"
                class="input-field pl-9"
                :class="{ error: localErrors.email }"
              />
            </div>
            <p v-if="localErrors.email" class="text-xs text-red-400 mt-1">
              {{ localErrors.email }}
            </p>
          </div>

          <!-- Password field -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label
                for="password"
                class="block text-sm font-semibold"
                :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-700'"
              >
                Contraseña
              </label>
              <a
                href="#"
                class="text-xs text-[#3B82F6] hover:text-[#2563EB] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div class="relative">
              <PhLockKey
                :size="15"
                class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
              />
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                class="input-field pl-9 pr-10"
                :class="{ error: localErrors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                :class="theme.theme === 'dark' ? 'text-[#9CA3AF] hover:text-[#F3F4F6]' : 'text-gray-400 hover:text-gray-600'"
              >
                <PhEyeSlash v-if="showPassword" :size="15" />
                <PhEye v-else :size="15" />
              </button>
            </div>
            <p v-if="localErrors.password" class="text-xs text-red-400 mt-1">
              {{ localErrors.password }}
            </p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full mt-2"
          >
            <span>{{ isLoading ? 'Verificando...' : 'Iniciar sesión' }}</span>
            <PhArrowRight v-if="!isLoading" :size="15" weight="bold" />
            <svg
              v-else
              class="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </button>
        </form>

        <!-- Footer links -->
        <div
          class="mt-5 pt-5 border-t text-center text-sm"
          :class="
            theme.theme === 'dark'
              ? 'border-[#242C3D] text-[#9CA3AF]'
              : 'border-gray-100 text-gray-500'
          "
        >
          ¿No tienes cuenta?
          <router-link to="/registro" class="ml-1 font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors">
            Regístrate gratis
          </router-link>
        </div>
      </div>

      <!-- Hint -->
      <div
        class="mt-4 rounded-lg border p-4 text-sm"
        :class="theme.theme === 'dark' ? 'border-[#242C3D] bg-[#151A27] text-[#9CA3AF]' : 'border-gray-200 bg-white text-gray-500'"
      >
        <p class="font-semibold mb-2">Credenciales de demostración</p>
        <p>Candidato: <span class="font-mono">yamir@jinowork.com</span> / <span class="font-mono">1234</span></p>
        <p class="mt-1">Empresa: <span class="font-mono">empresa@nicotech.com</span> / <span class="font-mono">1234</span></p>
      </div>
    </div>
  </div>
</template>
