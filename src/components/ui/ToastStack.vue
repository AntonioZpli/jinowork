<script setup lang="ts">
import { computed } from 'vue'
import {
  PhCheckCircle,
  PhInfo,
  PhWarning,
  PhX,
  PhXCircle,
} from '@phosphor-icons/vue'
import { useUiStore } from '@/stores/useUiStore'

const ui = useUiStore()

const toneStyles = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
  error: 'border-red-500/30 bg-red-500/10 text-red-100',
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-100',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
} as const

const toneIcon = {
  success: PhCheckCircle,
  error: PhXCircle,
  info: PhInfo,
  warning: PhWarning,
} as const

const visibleToasts = computed(() => ui.toasts.slice(-3))
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed right-4 top-20 z-[120] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      <div
        v-for="toast in visibleToasts"
        :key="toast.id"
        class="pointer-events-auto rounded-xl border p-3 shadow-lg backdrop-blur-sm"
        :class="toneStyles[toast.type]"
      >
        <div class="flex items-start gap-3">
          <component :is="toneIcon[toast.type]" :size="18" class="mt-0.5 flex-shrink-0" weight="fill" />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold leading-5">{{ toast.title }}</p>
            <p v-if="toast.message" class="mt-1 text-xs leading-5 text-current/80">{{ toast.message }}</p>
          </div>
          <button
            type="button"
            aria-label="Cerrar notificación"
            class="ml-1 rounded-md p-1 text-current/70 transition-colors hover:text-current"
            @click="ui.removeToast(toast.id)"
          >
            <PhX :size="14" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
