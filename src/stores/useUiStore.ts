import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UiToastType = 'success' | 'error' | 'info' | 'warning'

export interface UiToast {
  id: number
  type: UiToastType
  title: string
  message?: string
  duration?: number
}

interface ConfirmDialogState {
  title: string
  message: string
  confirmText: string
  cancelText: string
  resolve: (value: boolean) => void
}

export const useUiStore = defineStore('ui', () => {
  const toasts = ref<UiToast[]>([])
  const confirmState = ref<ConfirmDialogState | null>(null)

  function pushToast(toast: Omit<UiToast, 'id'>) {
    const id = Date.now() + Math.random()
    const entry = { ...toast, id, duration: toast.duration ?? 3200 }
    toasts.value = [...toasts.value, entry]
    if (entry.duration > 0) {
      window.setTimeout(() => {
        toasts.value = toasts.value.filter(item => item.id !== id)
      }, entry.duration)
    }
    return id
  }

  function notifySuccess(title: string, message?: string) {
    pushToast({ type: 'success', title, message, duration: 3200 })
  }

  function notifyInfo(title: string, message?: string) {
    pushToast({ type: 'info', title, message, duration: 3200 })
  }

  function notifyError(title: string, message?: string) {
    pushToast({ type: 'error', title, message, duration: 4200 })
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter(item => item.id !== id)
  }

  function askConfirm(options: { title: string; message: string; confirmText?: string; cancelText?: string }) {
    return new Promise<boolean>((resolve) => {
      confirmState.value = {
        title: options.title,
        message: options.message,
        confirmText: options.confirmText ?? 'Confirmar',
        cancelText: options.cancelText ?? 'Cancelar',
        resolve,
      }
    })
  }

  function closeConfirm(value: boolean) {
    if (!confirmState.value) return
    const { resolve } = confirmState.value
    confirmState.value = null
    resolve(value)
  }

  return {
    toasts,
    confirmState,
    pushToast,
    notifySuccess,
    notifyInfo,
    notifyError,
    removeToast,
    askConfirm,
    closeConfirm,
  }
})
