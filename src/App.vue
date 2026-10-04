<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import ToastStack from '@/components/ui/ToastStack.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const theme = useThemeStore()
// Init theme store on mount (applies class to html)
useThemeStore()
</script>

<template>
  <div
    class="min-h-screen flex flex-col antialiased"
    :class="theme.theme === 'dark' ? 'bg-[#0B0F19] text-[#F3F4F6]' : 'bg-[#FAFAFA] text-gray-900'"
  >
    <AppNavbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <ToastStack />
    <ConfirmDialog />
  </div>
</template>