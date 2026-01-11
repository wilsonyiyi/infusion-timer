import { create } from 'zustand'
import { loadInfusionData, saveInfusionData, type StoredInfusionData } from '../utils/storage'

export type SpeedLevel = 'slow' | 'medium' | 'fast'
export type VolumePreset = '100' | '200' | 'custom'
export type CalibrationLevel = 'high' | 'half' | 'low'

interface InfusionState {
  volume: number
  volumePreset: VolumePreset
  customVolume: number
  speedLevel: SpeedLevel
  dropFactor: number
  isRunning: boolean
  isPaused: boolean
  isCompleted: boolean
  startTime: number | null
  pauseTime: number | null
  totalPausedDuration: number
  estimatedMinutes: number
  calibration: CalibrationLevel | null
  tapCount: number
  firstTapTime: number | null
  lastTapTime: number | null
  measuredDropsPerMinute: number
}

interface InfusionActions {
  setVolumePreset: (preset: VolumePreset) => void
  setCustomVolume: (volume: number) => void
  setSpeedLevel: (level: SpeedLevel) => void
  setDropFactor: (factor: number) => void
  startInfusion: () => void
  pauseInfusion: () => void
  resumeInfusion: () => void
  stopInfusion: () => void
  completeInfusion: () => void
  clearCurrentRecord: () => void
  adjustEstimate: (minutes: number) => void
  setCalibration: (level: CalibrationLevel) => void
  tapForSpeed: () => void
  resetTapCount: () => void
  calculateEstimatedMinutes: () => void
}

const SPEED_RANGES = {
  slow: { min: 15, max: 30, avg: 20 },
  medium: { min: 40, max: 60, avg: 50 },
  fast: { min: 70, max: 100, avg: 85 },
}

const SAFETY_FACTOR = 1.1

type Store = InfusionState & InfusionActions

const INITIAL_STATE: InfusionState = {
  volume: 200,
  volumePreset: '200',
  customVolume: 200,
  speedLevel: 'medium',
  dropFactor: 20,
  isRunning: false,
  isPaused: false,
  isCompleted: false,
  startTime: null,
  pauseTime: null,
  totalPausedDuration: 0,
  estimatedMinutes: 0,
  calibration: null,
  tapCount: 0,
  firstTapTime: null,
  lastTapTime: null,
  measuredDropsPerMinute: 0,
}

const loadedData = loadInfusionData()
const initialState = loadedData
  ? {
      volume: loadedData.volume,
      volumePreset: loadedData.volumePreset,
      customVolume: loadedData.customVolume,
      speedLevel: loadedData.speedLevel,
      dropFactor: loadedData.dropFactor,
      isRunning: loadedData.isRunning,
      isPaused: loadedData.isPaused,
      isCompleted: loadedData.isCompleted,
      startTime: loadedData.startTime,
      pauseTime: loadedData.pauseTime,
      totalPausedDuration: loadedData.totalPausedDuration,
      estimatedMinutes: loadedData.estimatedMinutes,
      calibration: loadedData.calibration,
      tapCount: loadedData.tapCount,
      firstTapTime: loadedData.firstTapTime,
      lastTapTime: loadedData.lastTapTime,
      measuredDropsPerMinute: loadedData.measuredDropsPerMinute,
    }
  : INITIAL_STATE

export const useStore = create<Store>((set, get, api) => {
  // Subscribe to state changes and auto-persist
  api.subscribe((state) => {
    const stateToSave: Omit<StoredInfusionData, 'timestamp'> = {
      volume: state.volume,
      volumePreset: state.volumePreset,
      customVolume: state.customVolume,
      speedLevel: state.speedLevel,
      dropFactor: state.dropFactor,
      isRunning: state.isRunning,
      isPaused: state.isPaused,
      isCompleted: state.isCompleted,
      startTime: state.startTime,
      pauseTime: state.pauseTime,
      totalPausedDuration: state.totalPausedDuration,
      estimatedMinutes: state.estimatedMinutes,
      calibration: state.calibration,
      tapCount: state.tapCount,
      firstTapTime: state.firstTapTime,
      lastTapTime: state.lastTapTime,
      measuredDropsPerMinute: state.measuredDropsPerMinute,
    }
    saveInfusionData(stateToSave)
  })

  return {
    ...initialState,

    setVolumePreset: (preset) => {
      const volumes = { '100': 100, '200': 200, 'custom': get().customVolume }
      set({ volumePreset: preset, volume: volumes[preset] })
    },

    setCustomVolume: (volume) => {
      set({ customVolume: volume, volume })
    },

    setSpeedLevel: (level) => {
      set({ speedLevel: level })
    },

    setDropFactor: (factor) => {
      set({ dropFactor: factor })
    },

    startInfusion: () => {
      const { calculateEstimatedMinutes } = get()
      calculateEstimatedMinutes()
      set({
        isRunning: true,
        isPaused: false,
        startTime: Date.now(),
        pauseTime: null,
        totalPausedDuration: 0,
        calibration: null
      })
    },

    pauseInfusion: () => {
      if (!get().isRunning || get().isPaused) return
      set({ isPaused: true, pauseTime: Date.now() })
    },

    resumeInfusion: () => {
      const { pauseTime, totalPausedDuration } = get()
      if (!get().isRunning || !get().isPaused || !pauseTime) return
      set({
        isPaused: false,
        pauseTime: null,
        totalPausedDuration: totalPausedDuration + (Date.now() - pauseTime)
      })
    },

  stopInfusion: () => {
    set({
      isRunning: false,
      isPaused: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0
    })
  },

  clearCurrentRecord: () => {
    set({
      isRunning: false,
      isPaused: false,
      isCompleted: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0
    })
  },

    completeInfusion: () => {
      set({
        isRunning: false,
        isPaused: false,
        isCompleted: true
      })
    },

    adjustEstimate: (minutes) => {
      const { estimatedMinutes } = get()
      set({ estimatedMinutes: Math.max(0, estimatedMinutes + minutes) })
    },

    setCalibration: (level) => {
      const { volume, estimatedMinutes, startTime, totalPausedDuration } = get()
      if (!startTime) return

      const elapsedMinutes = (Date.now() - startTime - totalPausedDuration) / 60000
      let newEstimatedMinutes = estimatedMinutes

      if (level === 'high') {
        const remainingRatio = 0.75
        const usedRatio = 0.25
        const currentRate = (volume * usedRatio) / elapsedMinutes
        newEstimatedMinutes = (volume * remainingRatio) / currentRate
      } else if (level === 'half') {
        newEstimatedMinutes = estimatedMinutes
      } else if (level === 'low') {
        const remainingRatio = 0.25
        const usedRatio = 0.75
        const currentRate = (volume * usedRatio) / elapsedMinutes
        newEstimatedMinutes = (volume * remainingRatio) / currentRate
      }

      set({ calibration: level, estimatedMinutes: Math.max(0, newEstimatedMinutes * SAFETY_FACTOR) })
    },

    tapForSpeed: () => {
      const state = get()
      const now = Date.now()

      if (state.firstTapTime === null) {
        set({ firstTapTime: now, tapCount: 1, lastTapTime: now })
      } else {
        const newTapCount = state.tapCount + 1
        const timeDiff = (now - state.firstTapTime) / 60000
        if (timeDiff >= 0.1) {
          const dropsPerMinute = newTapCount / timeDiff
          set({
            tapCount: newTapCount,
            lastTapTime: now,
            measuredDropsPerMinute: Math.round(dropsPerMinute)
          })
        }
      }
    },

    resetTapCount: () => {
      set({ tapCount: 0, firstTapTime: null, lastTapTime: null, measuredDropsPerMinute: 0 })
    },

    calculateEstimatedMinutes: () => {
      const { volume, speedLevel, dropFactor, measuredDropsPerMinute } = get()

      let dropsPerMinute
      if (measuredDropsPerMinute > 0) {
        dropsPerMinute = measuredDropsPerMinute
      } else {
        dropsPerMinute = SPEED_RANGES[speedLevel].avg
      }

      const dropsPerMl = dropFactor
      const totalDrops = volume * dropsPerMl
      const estimatedMinutes = (totalDrops / dropsPerMinute) * SAFETY_FACTOR

      set({ estimatedMinutes: Math.round(estimatedMinutes) })
    }
  }
})
