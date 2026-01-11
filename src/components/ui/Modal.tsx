import { useState } from 'preact/hooks'

interface ModalProps {
  isOpen: boolean
  title: string
  children: any
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  confirmButtonClass?: string
  cancelButtonClass?: string
}

export function Modal({
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = '确认',
  cancelText = '取消',
  confirmButtonClass = 'bg-primary text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all',
  cancelButtonClass = 'bg-white text-slate-700 font-semibold py-3 px-6 rounded-2xl border border-slate-200 shadow-sm active:scale-[0.98] transition-all hover:bg-slate-50'
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-md mx-4 w-full overflow-hidden">
        {/* Header */}
        <div class="px-6 py-5 border-b border-slate-100">
          <h2 class="text-lg font-bold text-slate-900 text-center">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div class="px-6 py-4">
          <div class="text-slate-600 text-center leading-relaxed">
            {children}
          </div>
        </div>

        {/* Actions */}
        <div class="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            class={`flex-1 ${cancelButtonClass}`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            class={`flex-1 ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Hook for managing modal state
export function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close
  }
}