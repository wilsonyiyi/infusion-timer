import { useStore } from '../../store/useStore'
import { useLocation } from 'wouter-preact'

export function AdvancedSettings() {
  const { measuredDropsPerMinute, tapForSpeed, resetTapCount, applyAdvancedSettings, tapCount } = useStore()
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
          <div class="px-5 pb-2">
            <h3 class="text-slate-500 text-xs font-semibold uppercase tracking-wider">滴速设置</h3>
          </div>
          <div class="bg-white border-y border-slate-200 p-8 flex flex-col items-center gap-6">
            <div class="text-center space-y-2">
              <p class="text-sm font-medium text-slate-400">当前设置的滴速</p>
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-5xl font-display font-bold text-primary">{measuredDropsPerMinute || 0}</span>
                <span class="text-base font-medium text-slate-400">滴/分钟</span>
              </div>
              {measuredDropsPerMinute > 0 ? (
                <p class="text-xs text-slate-400">点击下方按钮应用设置</p>
              ) : (
                <p class="text-xs text-slate-400">请测量您的实际滴速</p>
              )}
            </div>
            <div class="text-center space-y-3">
              <p class="text-sm font-medium text-slate-600">测量方法</p>
              <p class="text-xs text-slate-400 leading-relaxed">每当看到一滴药液落下时，点击下方按钮开始测量。需要至少点击 6 次并持续至少 3 秒以获得准确结果。</p>
            </div>
            <button
              onClick={tapForSpeed}
              class="relative flex items-center justify-center size-44 rounded-full bg-slate-50 border-4 border-slate-100 active:scale-95 transition-all shadow-sm"
            >
              <div class="absolute inset-2 rounded-full border border-dashed border-primary/20"></div>
              <div class="size-32 rounded-full bg-primary/5 flex items-center justify-center">
                <span class="text-primary text-6xl">💧</span>
              </div>
              {tapCount > 0 && (
                <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {tapCount}
                </div>
              )}
            </button>
            <button
              onClick={resetTapCount}
              class="text-sm font-medium text-primary/80 active:opacity-50"
            >
              重置并重新测量
            </button>
          </div>
        </section>

        <section class="mt-8 px-5">
          <div class="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-4">
            <div class="shrink-0 text-primary">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-800 mb-1">设置说明</h4>
              <p class="text-xs leading-relaxed text-slate-500">
                通过测量实际滴速来精确计算输液时间。测量完成后，系统将使用您测量的滴速进行计时估算。如需微调，可在计时页面使用"感觉变慢/变快"功能。
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
        <div class="max-w-md mx-auto space-y-3">
          {measuredDropsPerMinute > 0 && (
            <div class="text-center">
              <p class="text-xs text-slate-500 mb-1">将应用以下设置</p>
              <p class="text-sm font-semibold text-primary">{measuredDropsPerMinute} 滴/分钟</p>
            </div>
          )}
          <button
            onClick={() => {
              if (measuredDropsPerMinute > 0) {
                applyAdvancedSettings()
              }
              navigate('/')
            }}
            class="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all text-lg"
          >
            {measuredDropsPerMinute > 0 ? '应用设置并返回' : '返回'}
          </button>
        </div>
      </footer>
    </div>
  )
}
