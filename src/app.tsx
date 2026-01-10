import { useStore } from './store/useStore'

export function App() {
  const { count, increment, decrement } = useStore()

  return (
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            infusion-timer
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Preact + TypeScript + Zustand + TailwindCSS
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
          <div class="text-center">
            <div class="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {count}
            </div>
            <div class="flex gap-4 justify-center">
              <button
                onClick={decrement}
                class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors active:scale-95 touch-manipulation"
              >
                -
              </button>
              <button
                onClick={increment}
                class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors active:scale-95 touch-manipulation"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>编辑 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">src/app.tsx</code> 开始开发</p>
        </div>
      </div>
    </div>
  )
}
