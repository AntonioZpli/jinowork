<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'
import {
  PhBriefcase,
  PhUser,
  PhMagnifyingGlass,
  PhBuildings,
  PhList,
  PhX,
  PhSun,
  PhMoon,
  PhSignOut,
  PhCaretDown,
} from '@phosphor-icons/vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const theme = useThemeStore()

const mobileOpen = ref(false)
const dropdownOpen = ref(false)

function isActive(path: string) {
  return route.path === path
}

function handleLogout() {
  auth.logout()
  dropdownOpen.value = false
  mobileOpen.value = false
  router.push('/')
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-colors duration-200"
    :class="[
      theme.theme === 'dark'
        ? 'bg-[#0B0F19]/95 border-[#242C3D]'
        : 'bg-white/95 border-gray-200',
    ]"
    style="backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px)"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2.5 group">
          <div
            class="w-8 h-8 rounded-md bg-[#3B82F6] flex items-center justify-center flex-shrink-0"
          >
            <PhBriefcase :size="16" weight="bold" class="text-white" />
          </div>
          <span
            class="font-heading text-xl font-bold tracking-tight"
            :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
          >
            Jino<span class="text-[#3B82F6]">work</span>
          </span>
        </router-link>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <!-- Candidate Links -->
          <template v-if="auth.isAuthenticated && (!auth.user?.role || auth.user.role === 'candidate')">
            <router-link
              to="/panel"
              class="flex items-center gap-1.5 px-3 py-2.5 rounded-md text-base font-medium transition-colors"
              :class="[
                isActive('/panel')
                  ? 'text-[#3B82F6] bg-[#3B82F6]/10'
                  : theme.theme === 'dark'
                    ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
              ]"
            >
              <PhUser :size="16" weight="regular" />
              Mi Perfil
            </router-link>
            <router-link
              to="/empleos"
              class="flex items-center gap-1.5 px-3 py-2.5 rounded-md text-base font-medium transition-colors"
              :class="[
                isActive('/empleos')
                  ? 'text-[#3B82F6] bg-[#3B82F6]/10'
                  : theme.theme === 'dark'
                    ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
              ]"
            >
              <PhMagnifyingGlass :size="16" weight="regular" />
              Ofertas
            </router-link>
          </template>

          <!-- Company Links -->
          <template v-if="auth.isAuthenticated && auth.user?.role === 'company'">
            <router-link
              to="/panel"
              class="flex items-center gap-1.5 px-3 py-2.5 rounded-md text-base font-medium transition-colors"
              :class="[
                isActive('/panel')
                  ? 'text-[#3B82F6] bg-[#3B82F6]/10'
                  : theme.theme === 'dark'
                    ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
              ]"
            >
              <PhBuildings :size="16" weight="regular" />
              Mi Panel
            </router-link>
            <router-link to="/empresa/ofertas" class="flex items-center gap-1.5 px-3 py-2.5 rounded-md text-base font-medium transition-colors" :class="theme.theme === 'dark' ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"><PhBriefcase :size="16" /> Mis ofertas</router-link>
            <router-link to="/empresa/postulantes" class="flex items-center gap-1.5 px-3 py-2.5 rounded-md text-base font-medium transition-colors" :class="theme.theme === 'dark' ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"><PhUser :size="16" /> Postulantes</router-link>
            <router-link to="/empresa/perfiles" class="flex items-center gap-1.5 px-3 py-2.5 rounded-md text-base font-medium transition-colors" :class="theme.theme === 'dark' ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"><PhMagnifyingGlass :size="16" /> Buscar perfiles</router-link>
          </template>
        </nav>

        <!-- Right actions -->
        <div class="hidden md:flex items-center gap-2">
          <!-- Theme toggle -->
          <button
            @click="theme.toggle()"
            class="p-2 rounded-md transition-colors"
            :class="
              theme.theme === 'dark'
                ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            "
            :title="theme.theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
          >
            <PhSun v-if="theme.theme === 'dark'" :size="17" weight="regular" />
            <PhMoon v-else :size="17" weight="regular" />
          </button>

          <!-- Auth: unauthenticated -->
          <template v-if="!auth.isAuthenticated">
            <router-link
              to="/login"
              class="px-3.5 py-2 text-base font-medium rounded-md transition-colors"
              :class="
                theme.theme === 'dark'
                  ? 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              Iniciar sesión
            </router-link>
          </template>

          <!-- Auth: authenticated -->
          <template v-else>
            <div class="relative">
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-md border transition-colors"
                :class="
                  theme.theme === 'dark'
                    ? 'border-[#242C3D] hover:border-[#3B82F6]/50 text-[#F3F4F6]'
                    : 'border-gray-200 hover:border-[#3B82F6]/50 text-gray-900'
                "
              >
                <div
                  class="w-6 h-6 rounded-sm bg-[#3B82F6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                >
                  {{ auth.userInitial }}
                </div>
                <span class="text-xs font-medium max-w-[80px] truncate">{{ auth.user?.name }}</span>
                <PhCaretDown :size="12" weight="bold" :class="{ 'rotate-180': dropdownOpen }" class="transition-transform text-[#9CA3AF]" />
              </button>

              <!-- Dropdown -->
              <div
                v-if="dropdownOpen"
                class="absolute right-0 top-full mt-1.5 w-56 rounded-md border py-1 z-50 shadow-xl"
                :class="
                  theme.theme === 'dark'
                    ? 'bg-[#151A27] border-[#242C3D]'
                    : 'bg-white border-gray-200'
                "
              >
                <div
                  class="px-3 py-2 border-b text-xs flex items-center justify-between gap-2"
                  :class="
                    theme.theme === 'dark'
                      ? 'border-[#242C3D] text-[#9CA3AF]'
                      : 'border-gray-100 text-gray-500'
                  "
                >
                  <span class="truncate">{{ auth.user?.email }}</span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#3B82F6]/10 text-[#3B82F6]">
                    {{ auth.user?.role === 'company' ? 'Empresa' : 'Candidato' }}
                  </span>
                </div>

                <!-- Candidate Dropdown Links -->
                <template v-if="!auth.user?.role || auth.user.role === 'candidate'">
                  <router-link
                    to="/panel"
                    @click="dropdownOpen = false"
                    class="flex items-center gap-2 px-3 py-2.5 text-sm transition-colors"
                    :class="
                      theme.theme === 'dark'
                        ? 'text-[#F3F4F6] hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-50'
                    "
                  >
                    <PhUser :size="16" /> Mi Perfil
                  </router-link>
                  <router-link
                    to="/empleos"
                    @click="dropdownOpen = false"
                    class="flex items-center gap-2 px-3 py-2.5 text-sm transition-colors"
                    :class="
                      theme.theme === 'dark'
                        ? 'text-[#F3F4F6] hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-50'
                    "
                  >
                    <PhMagnifyingGlass :size="16" /> Ofertas de empleo
                  </router-link>
                </template>

                <!-- Company Dropdown Links -->
                <template v-if="auth.user?.role === 'company'">
                  <router-link
                    to="/panel"
                    @click="dropdownOpen = false"
                    class="flex items-center gap-2 px-3 py-2.5 text-sm transition-colors"
                    :class="
                      theme.theme === 'dark'
                        ? 'text-[#F3F4F6] hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-50'
                    "
                  >
                    <PhBuildings :size="16" /> Mi Panel
                  </router-link>
                </template>

                <div
                  class="border-t mt-1"
                  :class="theme.theme === 'dark' ? 'border-[#242C3D]' : 'border-gray-100'"
                ></div>
                <button
                  @click="handleLogout"
                  class="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-400 transition-colors"
                  :class="theme.theme === 'dark' ? 'hover:bg-red-500/10' : 'hover:bg-red-50'"
                >
                  <PhSignOut :size="16" /> Cerrar sesión
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile toggle -->
        <div class="flex md:hidden items-center gap-2">
          <button
            @click="theme.toggle()"
            class="p-2 rounded-md transition-colors min-h-[44px]"
            :class="
              theme.theme === 'dark'
                ? 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                : 'text-gray-500 hover:text-gray-900'
            "
          >
            <PhSun v-if="theme.theme === 'dark'" :size="20" />
            <PhMoon v-else :size="20" />
          </button>
          <button
            @click="mobileOpen = !mobileOpen"
            class="p-2 rounded-md transition-colors min-h-[44px]"
            :class="
              theme.theme === 'dark'
                ? 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            "
          >
            <PhX v-if="mobileOpen" :size="24" />
            <PhList v-else :size="24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="mobileOpen"
      class="md:hidden border-t px-4 pb-4 pt-2 space-y-1"
      :class="
        theme.theme === 'dark'
          ? 'bg-[#0B0F19] border-[#242C3D]'
          : 'bg-white border-gray-200'
      "
    >
      <template v-if="auth.isAuthenticated">
        <template v-if="!auth.user?.role || auth.user.role === 'candidate'">
          <router-link
            to="/panel"
            @click="mobileOpen = false"
            class="flex items-center gap-2 px-3 py-3 min-h-[44px] rounded-md text-base font-medium"
            :class="
              theme.theme === 'dark'
                ? 'text-[#F3F4F6] hover:bg-white/5'
                : 'text-gray-700 hover:bg-gray-100'
            "
          >
            <PhUser :size="20" /> Mi Perfil
          </router-link>
          <router-link
            to="/empleos"
            @click="mobileOpen = false"
            class="flex items-center gap-2 px-3 py-3 min-h-[44px] rounded-md text-base font-medium"
            :class="
              theme.theme === 'dark'
                ? 'text-[#F3F4F6] hover:bg-white/5'
                : 'text-gray-700 hover:bg-gray-100'
            "
          >
            <PhMagnifyingGlass :size="20" /> Ofertas
          </router-link>
        </template>
        
        <template v-if="auth.user?.role === 'company'">
          <router-link
            to="/panel"
            @click="mobileOpen = false"
            class="flex items-center gap-2 px-3 py-3 min-h-[44px] rounded-md text-base font-medium"
            :class="
              theme.theme === 'dark'
                ? 'text-[#F3F4F6] hover:bg-white/5'
                : 'text-gray-700 hover:bg-gray-100'
            "
          >
            <PhBuildings :size="20" /> Mi Panel
          </router-link>
          <router-link v-for="link in [{ to: '/empresa/ofertas', label: 'Mis ofertas' }, { to: '/empresa/postulantes', label: 'Postulantes' }, { to: '/empresa/perfiles', label: 'Buscar perfiles' }]" :key="link.to" :to="link.to" @click="mobileOpen = false" class="flex items-center gap-2 px-3 py-3 min-h-[44px] rounded-md text-base font-medium" :class="theme.theme === 'dark' ? 'text-[#F3F4F6] hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'"><PhBriefcase :size="20" /> {{ link.label }}</router-link>
        </template>

        <button
          @click="handleLogout"
          class="flex items-center gap-2 w-full px-3 py-3 min-h-[44px] rounded-md text-base text-red-400 font-medium"
        >
          <PhSignOut :size="20" /> Cerrar sesión
        </button>
      </template>
      <template v-else>
        <router-link
          to="/login"
          @click="mobileOpen = false"
          class="block px-3 py-3 min-h-[44px] rounded-md text-base font-medium text-center btn-primary"
        >
          Iniciar sesión
        </router-link>
      </template>
    </div>
  </header>
</template>
