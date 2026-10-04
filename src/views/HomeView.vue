<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore'
import { useRouter } from 'vue-router'
import {
  PhArrowRight,
  PhBriefcase,
  PhUserCircle,
} from '@phosphor-icons/vue'

const theme = useThemeStore()
const router = useRouter()
</script>

<template>
  <div
    class="min-h-screen"
    :class="theme.theme === 'dark' ? 'bg-[#0B0F19]' : 'bg-[#FAFAFA]'"
  >
    <!-- ── Hero ──────────────────────────────────────────────────────── -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
      <div class="max-w-3xl">
        <!-- removed redundant hero label for simplified design -->

        <!-- Headline -->
        <h1
          class="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
        >
          El trabajo que buscas.<br />
          <span class="text-[#3B82F6]">El talento que necesitas.</span>
        </h1>

        <p
          class="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-600'"
        >
          Jinowork conecta a profesionales de distintas áreas con empresas, cooperativas y organizaciones de Jinotega y toda Nicaragua.
        </p>

        <!-- CTA cards (two distinct actions) -->
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Candidato — Outline -->
          <button
            @click="router.push('/login')"
            class="group flex-1 flex items-center gap-4 p-5 rounded-lg border text-left transition-all duration-200"
            :class="
              theme.theme === 'dark'
                ? 'border-[#242C3D] bg-[#151A27] hover:border-[#3B82F6]/60 text-[#F3F4F6]'
                : 'border-gray-200 bg-white hover:border-[#3B82F6]/60 text-gray-900'
            "
          >
            <div
              class="w-10 h-10 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors group-hover:border-[#3B82F6] group-hover:text-[#3B82F6]"
              :class="
                theme.theme === 'dark'
                  ? 'border-[#242C3D] text-[#9CA3AF]'
                  : 'border-gray-200 text-gray-500'
              "
            >
              <PhUserCircle :size="20" weight="regular" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm mb-0.5">Soy candidato</div>
              <div
                class="text-xs"
                :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
              >
                Encuentra tu oportunidad en Nicaragua
              </div>
            </div>
            <PhArrowRight
              :size="16"
              class="transition-transform group-hover:translate-x-1 flex-shrink-0"
              :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
            />
          </button>

          <!-- Empresa — Solid primary -->
          <button
            @click="router.push('/login')"
            class="group flex-1 flex items-center gap-4 p-5 rounded-lg border border-[#3B82F6] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-left transition-all duration-200"
          >
            <div
              class="w-10 h-10 rounded-md bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0"
            >
              <PhBriefcase :size="20" weight="regular" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm mb-0.5">Soy empresa</div>
              <div class="text-xs text-blue-100">
                Publica ofertas, contrata talento nica
              </div>
            </div>
            <PhArrowRight
              :size="16"
              class="transition-transform group-hover:translate-x-1 flex-shrink-0 text-white/70"
            />
          </button>
        </div>
      </div>
    </section>

  </div>
</template>
