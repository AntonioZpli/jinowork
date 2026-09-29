<script setup lang="ts">
import { useThemeStore } from '@/stores/useThemeStore'
import AppNavbar from '@/components/layout/AppNavbar.vue'

// Init theme store on mount (applies class to html)
useThemeStore()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>