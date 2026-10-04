<script setup lang="ts">
import { PhWarning } from '@phosphor-icons/vue'
import { useUiStore } from '@/stores/useUiStore'

const ui = useUiStore()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ui.confirmState"
      class="fixed inset-0 z-[130] flex items-center justify-center bg-[#020817]/70 p-4 backdrop-blur-sm"
      @click="ui.closeConfirm(false)"
    >
      <div
        class="w-full max-w-md rounded-2xl border border-[#2A3A52] bg-[#111A2A] p-5 shadow-2xl"
        @click.stop
      >
        <div class="flex items-start gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300">
            <PhWarning :size="20" weight="fill" />
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-lg font-semibold text-white">{{ ui.confirmState.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-300">{{ ui.confirmState.message }}</p>
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-3">
          <button
            type="button"
            class="rounded-lg border border-[#34445b] px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-[#5573A7] hover:text-white"
            @click="ui.closeConfirm(false)"
          >
            {{ ui.confirmState.cancelText }}
          </button>
          <button
            type="button"
            class="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
            @click="ui.closeConfirm(true)"
          >
            {{ ui.confirmState.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
