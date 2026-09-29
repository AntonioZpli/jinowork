<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore'
import { useRouter } from 'vue-router'
import {
  PhArrowRight,
  PhBriefcase,
  PhUserCircle,
  PhCoffee,
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
        <!-- Label -->
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-semibold mb-8 tracking-wide uppercase"
          :class="
            theme.theme === 'dark'
              ? 'border-[#242C3D] text-[#9CA3AF] bg-[#151A27]'
              : 'border-gray-200 text-gray-500 bg-white'
          "
        >
          <PhCoffee :size="13" weight="bold" class="text-amber-500" />
          Oportunidades para todo tipo de talento · Nicaragua 🇳🇮
        </div>

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

    <!-- ── Divider ─────────────────────────────────────────────────── -->
    <div
      class="border-t max-w-7xl mx-auto"
      :class="theme.theme === 'dark' ? 'border-[#242C3D]' : 'border-gray-100'"
    ></div>

    <!-- ── Stats footer ───────────────────────────────────────────── -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-wrap items-center gap-x-12 gap-y-6">
        <div>
          <div
            class="font-heading text-3xl font-bold tabular-nums"
            :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
          >
            +4,500
          </div>
          <div
            class="text-xs mt-1 uppercase tracking-wider font-medium"
            :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
          >
            Profesionales Nicas
          </div>
        </div>
        <div
          class="w-px h-10 hidden sm:block"
          :class="theme.theme === 'dark' ? 'bg-[#242C3D]' : 'bg-gray-200'"
        ></div>
        <div>
          <div
            class="font-heading text-3xl font-bold tabular-nums"
            :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
          >
            +180
          </div>
          <div
            class="text-xs mt-1 uppercase tracking-wider font-medium"
            :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
          >
            Empresas & Cooperativas
          </div>
        </div>
        <div
          class="w-px h-10 hidden sm:block"
          :class="theme.theme === 'dark' ? 'bg-[#242C3D]' : 'bg-gray-200'"
        ></div>
        <div>
          <div
            class="font-heading text-3xl font-bold tabular-nums"
            :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
          >
            Jinotega
          </div>
          <div
            class="text-xs mt-1 uppercase tracking-wider font-medium"
            :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
          >
            & Toda Nicaragua
          </div>
        </div>
        <div class="flex-1 hidden lg:block"></div>
        <div
          class="text-xs"
          :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-400'"
        >
          +4,500 profesionales · +180 empresas · Jinotega y toda Nicaragua
        </div>
      </div>
    </section>

    <!-- ── Features grid ──────────────────────────────────────────── -->
    <section
      class="border-t"
      :class="theme.theme === 'dark' ? 'border-[#242C3D]' : 'border-gray-100'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="mb-12">
          <h2
            class="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3"
            :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
          >
            Impulsando el talento de Jinotega y Nicaragua
          </h2>
          <p
            class="text-sm max-w-lg"
            :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
          >
            Una plataforma diseñada para visibilizar el talento local y conectar con oportunidades reales.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 rounded-lg border"
            :class="
              theme.theme === 'dark'
                ? 'border-[#242C3D] bg-[#151A27]'
                : 'border-gray-100 bg-white'
            "
          >
            <div
              class="w-9 h-9 rounded-md border flex items-center justify-center mb-4"
              :class="
                theme.theme === 'dark'
                  ? 'border-[#242C3D] bg-[#3B82F6]/10 text-[#3B82F6]'
                  : 'border-blue-100 bg-blue-50 text-[#3B82F6]'
              "
            >
              <component :is="feature.icon" :size="17" weight="regular" />
            </div>
            <h3
              class="font-semibold text-sm mb-1.5"
              :class="theme.theme === 'dark' ? 'text-[#F3F4F6]' : 'text-gray-900'"
            >
              {{ feature.title }}
            </h3>
            <p
              class="text-xs leading-relaxed"
              :class="theme.theme === 'dark' ? 'text-[#9CA3AF]' : 'text-gray-500'"
            >
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  PhMapPin,
  PhShieldCheck,
  PhChartLine,
  PhCoffee,
  PhBuildings,
  PhCode,
} from '@phosphor-icons/vue'

export default {
  data() {
    return {
      features: [
        {
          icon: PhMapPin,
          title: 'Desde Jinotega para el Mundo',
          desc: 'Conectamos a profesionales de Jinotega, Matagalpa, Estelí y Managua con empleos remotos y presenciales.',
        },
        {
          icon: PhCoffee,
          title: 'AgroTech & Sector Cafetalero',
          desc: 'Software para trazabilidad de cosechas, subastas de microlotes y digitalización de cooperativas agrícolas.',
        },
        {
          icon: PhChartLine,
          title: 'Salarios en USD y Córdobas',
          desc: 'Claridad en las propuestas económicas con rangos remunerados en dólares (USD) o córdobas nicaragüenses (NIO).',
        },
        {
          icon: PhBuildings,
          title: 'Empresas & Cooperativas',
          desc: 'Posiciones en firmas de tecnología, entidades financieras de Nicaragua y empresas exportadoras.',
        },
        {
          icon: PhShieldCheck,
          title: 'Procesos Verificados',
          desc: 'Ofertas revisadas con condiciones transparentes, sin ofertas dudosas ni intermediarios opacos.',
        },
        {
          icon: PhCode,
          title: 'Oportunidades para todos',
          desc: 'Vacantes en tecnología, educación, agricultura, administración, ventas, finanzas y muchos otros sectores.',
        },
      ],
    }
  },
}
</script>
