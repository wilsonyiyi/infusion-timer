import { useStore } from '../../store/useStore'
import { useLocation } from 'wouter-preact'

export function AdvancedSettings() {
  const { setDropFactor, dropFactor, measuredDropsPerMinute, tapForSpeed, resetTapCount } = useStore()
  const [, navigate] = useLocation()

  return (
    <div class="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-display">
      <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div class="flex items-center p-4 justify-between max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            class="flex items-center text-primary active:opacity-50 transition-opacity"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="text-base font-medium">返回</span>
          </button>
          <h2 class="text-lg font-semibold leading-tight flex-1 text-center pr-10">高级设置</h2>
        </div>
      </header>

      <main class="max-w-md mx-auto pb-12 w-full">
        <section class="mt-6">
          <h3 class="text-slate-500 text-xs font-semibold uppercase tracking-wider px-5 pb-2">滴系数设置</h3>
          <div class="bg-white border-y border-slate-200">
            <div class="flex items-center gap-4 px-5 min-h-16 justify-between">
              <div class="flex flex-col py-3">
                <p class="text-base font-normal">每毫升滴数 (gtt/mL)</p>
                <p class="text-xs text-slate-400">标准输液管通常为 20 gtt/mL</p>
              </div>
              <div class="shrink-0">
                <div class="flex items-center gap-3 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setDropFactor(Math.max(10, dropFactor - 1))}
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm text-primary active:bg-slate-50 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={dropFactor}
                    onChange={(e) => setDropFactor(Number((e.target as HTMLInputElement).value) || 20)}
                    class="text-lg font-bold w-10 p-0 text-center bg-transparent focus:outline-none focus:ring-0 border-none"
                  />
                  <button
                    onClick={() => setDropFactor(Math.min(60, dropFactor + 1))}
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm text-primary active:bg-slate-50 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-8">
          <div class="px-5 pb-2 flex justify-between items-end">
            <h3 class="text-slate-500 text-xs font-semibold uppercase tracking-wider">实测滴速</h3>
            <span class="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">优先于预设速度</span>
          </div>
          <div class="bg-white border-y border-slate-200 p-8 flex flex-col items-center gap-6">
            <div class="text-center space-y-1">
              <p class="text-sm font-medium text-slate-400">每滴落下一滴时点击下方按钮</p>
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-5xl font-display font-bold text-primary">{measuredDropsPerMinute}</span>
                <span class="text-base font-medium text-slate-400">滴/分钟</span>
              </div>
            </div>
            <button
              onClick={tapForSpeed}
              class="relative flex items-center justify-center size-44 rounded-full bg-slate-50 border-4 border-slate-100 active:scale-95 transition-all shadow-sm"
            >
              <div class="absolute inset-2 rounded-full border border-dashed border-primary/20"></div>
              <div class="size-32 rounded-full bg-primary/5 flex items-center justify-center">
                <span class="text-primary text-6xl">💧</span>
              </div>
            </button>
            <button
              onClick={resetTapCount}
              class="text-sm font-medium text-primary/80 active:opacity-50"
            >
              重置计数
            </button>
          </div>
        </section>

        <section class="mt-8 px-5">
          <div class="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 flex gap-4">
            <div class="shrink-0 text-amber-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-800 mb-1">使用说明</h4>
              <p class="text-xs leading-relaxed text-slate-500">
                滴系数用于计算时间，实测滴速优先于预设速度。如需微调预估时间，可在计时页面使用"感觉变慢/变快"功能。
              </p>
            </div>
          </div>
        </section>

        <section class="mt-10 px-5">
          <div class="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-4">
            <div class="shrink-0 text-primary">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-800 mb-1">免责声明</h4>
              <p class="text-xs leading-relaxed text-slate-500">
                本工具仅用于估算和辅助监测，非医疗器械。请始终遵循医护人员的指导，并直接观察物理输液设备。如有差异，请以临床判断和医护人员要求为准。
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer class="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div class="max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            class="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all text-lg"
          >
            返回首页
          </button>
        </div>
      </footer>
    </div>
  )
}
