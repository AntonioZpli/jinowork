// ─── Controller: useAuth ────────────────────────────────────────────────────
// Composable wrapping auth store for use in Views.
// Views import ONLY this composable, never the store directly.

import { useAuthStore } from '@/stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'
import { useRouter } from 'vue-router'

export function useAuth() {
  const store = useAuthStore()
  const ui = useUiStore()
  const router = useRouter()

  async function handleLogin(email: string, password: string) {
    const success = await store.login(email, password)
    if (success) {
      ui.notifySuccess('Sesión iniciada', `Bienvenido${store.user?.role === 'company' ? ' a tu panel de empresa' : ' de nuevo'}.`)
      router.push('/panel')
    }
    return success
  }

  async function handleRegister(data: { role: 'candidate' | 'company', name: string, email: string, password: string, title?: string, location?: string, companyName?: string, industry?: string, companySize?: string, interests?: string[] }) {
    const success = await store.register(data)
    if (success) {
      ui.notifySuccess('Cuenta creada', 'Tu perfil ya está listo para empezar.')
      router.push('/panel')
    }
    return success
  }

  function handleLogout() {
    store.logout()
    ui.notifyInfo('Sesión cerrada', 'Has salido de tu cuenta.')
    router.push('/')
  }

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    authError: store.authError,
    isLoading: store.isLoading,
    userInitial: store.userInitial,
    handleLogin,
    handleRegister,
    handleLogout,
    clearError: store.clearError,
  }
}
