import { useStore } from '../../store/useStore'
import { useLocation } from 'wouter-preact'

export function InfusionSetupHome() {
  const { setVolumePreset, setSpeedLevel, startInfusion, volumePreset, customVolume, speedLevel } = useStore()
  const [, navigate] = useLocation()

  const handleVolumeChange = (preset: '100' | '200' | 'custom') => {
    setVolumePreset(preset)
  }

  const handleCustomVolumeChange = (volume: number) => {
    useStore.setState({ customVolume: volume, volumePreset: 'custom', volume })
  }

  return (
    <div class="min-h-screen flex flex-col bg-medical-light dark:bg-medical-dark text-slate-900 dark:text-slate-100 font-display">
      <header class="flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
        <div class="w-12"></div>
        <h1 class="text-[17px] font-semibold flex-1 text-center tracking-tight">输液设置</h1>
        <div class="flex w-12 items-center justify-end">
          <button
            onClick={() => navigate('/settings')}
            class="flex items-center justify-center rounded-full h-10 w-10 text-slate-400 active:bg-slate-100 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      <main class="flex-1 flex flex-col px-5 pt-8 space-y-10 max-w-md mx-auto w-full">
        <section class="flex flex-col gap-4">
          <div class="flex items-center gap-2 px-1">
            <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <h3 class="text-base font-semibold text-slate-700 dark:text-slate-300">选择药液总量</h3>
          </div>
          <div class="flex h-12 items-center justify-center rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 p-1">
            <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium transition-all">
              <span>100ml</span>
              <input
                type="radio"
                name="volume"
                value="100"
                checked={volumePreset === '100'}
                onChange={() => handleVolumeChange('100')}
                class="sr-only"
              />
            </label>
            <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium transition-all">
              <span>200ml</span>
              <input
                type="radio"
                name="volume"
                value="200"
                checked={volumePreset === '200'}
                onChange={() => handleVolumeChange('200')}
                class="sr-only"
              />
            </label>
            <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium transition-all">
              <span>自定义</span>
              <input
                type="radio"
                name="volume"
                value="custom"
                checked={volumePreset === 'custom'}
                onChange={() => handleVolumeChange('custom')}
                class="sr-only"
              />
            </label>
          </div>
          {volumePreset === 'custom' && (
            <input
              type="number"
              value={customVolume}
              onInput={(e) => handleCustomVolumeChange(Number((e.target as HTMLInputElement).value) || 0)}
              placeholder="输入毫升数"
              class="w-full h-12 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          )}
        </section>

        <section class="flex flex-col gap-4">
          <div class="flex items-center gap-2 px-1">
            <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.85l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-.27-10.44z" />
              <path d="M10.59 15.41a2 2 0 002.83 0l5.66-8.49-8.49 5.66a2 2 0 000 2.83z" />
            </svg>
            <h3 class="text-base font-semibold text-slate-700 dark:text-slate-300">调节滴注速度</h3>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <label class="relative cursor-pointer group">
              <input
                type="radio"
                name="speed"
                value="slow"
                checked={speedLevel === 'slow'}
                onChange={() => setSpeedLevel('slow')}
                class="peer sr-only"
              />
              <div class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-transparent bg-white dark:bg-slate-800 p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                <span class="text-3xl">🐢</span>
                <div class="text-center">
                  <p class="text-sm font-bold">龟速</p>
                  <p class="text-[11px] text-slate-400">（慢）</p>
                </div>
              </div>
            </label>
            <label class="relative cursor-pointer group">
              <input
                type="radio"
                name="speed"
                value="medium"
                checked={speedLevel === 'medium'}
                onChange={() => setSpeedLevel('medium')}
                class="peer sr-only"
              />
              <div class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-transparent bg-white dark:bg-slate-800 p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                <span class="text-3xl">🚶</span>
                <div class="text-center">
                  <p class="text-sm font-bold">常速</p>
                  <p class="text-[11px] text-slate-400">（中）</p>
                </div>
              </div>
            </label>
            <label class="relative cursor-pointer group">
              <input
                type="radio"
                name="speed"
                value="fast"
                checked={speedLevel === 'fast'}
                onChange={() => setSpeedLevel('fast')}
                class="peer sr-only"
              />
              <div class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-transparent bg-white dark:bg-slate-800 p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                <span class="text-3xl">🐇</span>
                <div class="text-center">
                  <p class="text-sm font-bold">极速</p>
                  <p class="text-[11px] text-slate-400">（快）</p>
                </div>
              </div>
            </label>
          </div>
        </section>

        <div class="flex-1 flex flex-col items-center justify-center py-4 space-y-4">
          <div class="w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center">
            <svg class="w-16 h-16 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
            </svg>
          </div>
          <p class="text-slate-400 text-xs">设置完成后系统将为您实时估算</p>
        </div>
      </main>

      <footer class="p-6 pb-10 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-5">
        <button
          onClick={startInfusion}
          class="w-full h-[56px] bg-primary text-white font-semibold text-[17px] rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
        >
          <span>开始输液</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>
        <div class="flex flex-col items-center gap-1">
          <p class="text-center text-[11px] text-slate-400 dark:text-slate-500 font-medium px-10 leading-relaxed">
            * 估算数值仅供参考。请务必人工观察滴数，并以医疗专业人员指导为准。
          </p>
        </div>
      </footer>
    </div>
  )
}
