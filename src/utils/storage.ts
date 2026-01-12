export interface StoredInfusionData {
  volume: number
  volumePreset: '100' | '200' | 'custom'
  customVolume: number
  speedLevel: 'slow' | 'medium' | 'fast'
  isRunning: boolean
  isPaused: boolean
  isCompleted: boolean
  startTime: number | null
  pauseTime: number | null
  totalPausedDuration: number
  estimatedMinutes: number
  calibration: 'high' | 'half' | 'low' | null
  tapCount: number
  firstTapTime: number | null
  lastTapTime: number | null
  measuredDropsPerMinute: number
  timestamp: number
}

const STORAGE_KEY = 'infusion-timer-data'

function validateStoredData(data: unknown): data is StoredInfusionData {
  if (!data || typeof data !== 'object') {
    return false
  }

  const parsed = data as Record<string, unknown>

  // Check required fields
  const requiredFields: (keyof StoredInfusionData)[] = [
    'volume',
    'volumePreset',
    'customVolume',
    'speedLevel',
    'isRunning',
    'isPaused',
    'isCompleted',
    'startTime',
    'pauseTime',
    'totalPausedDuration',
    'estimatedMinutes',
    'calibration',
    'tapCount',
    'firstTapTime',
    'lastTapTime',
    'measuredDropsPerMinute',
  ]

  for (const field of requiredFields) {
    if (!(field in parsed)) {
      return false
    }
  }

  if (typeof parsed.volume !== 'number' || isNaN(parsed.volume) || parsed.volume < 0) {
    return false
  }

  if (
    !['100', '200', 'custom'].includes(parsed.volumePreset as string)
  ) {
    return false
  }

  if (typeof parsed.customVolume !== 'number' || isNaN(parsed.customVolume) || parsed.customVolume < 0) {
    return false
  }

  if (
    !['slow', 'medium', 'fast'].includes(parsed.speedLevel as string)
  ) {
    return false
  }

  if (typeof parsed.isRunning !== 'boolean') {
    return false
  }

  if (typeof parsed.isPaused !== 'boolean') {
    return false
  }

  if (typeof parsed.isCompleted !== 'boolean') {
    return false
  }

  if (parsed.startTime !== null && (typeof parsed.startTime !== 'number' || parsed.startTime <= 0)) {
    return false
  }

  if (parsed.pauseTime !== null && (typeof parsed.pauseTime !== 'number' || parsed.pauseTime <= 0)) {
    return false
  }

  if (typeof parsed.totalPausedDuration !== 'number' || isNaN(parsed.totalPausedDuration) || parsed.totalPausedDuration < 0) {
    return false
  }

  if (typeof parsed.estimatedMinutes !== 'number' || isNaN(parsed.estimatedMinutes) || parsed.estimatedMinutes < 0) {
    return false
  }

  if (parsed.calibration !== null && !['high', 'half', 'low'].includes(parsed.calibration as string)) {
    return false
  }

  if (typeof parsed.tapCount !== 'number' || isNaN(parsed.tapCount) || parsed.tapCount < 0) {
    return false
  }

  if (parsed.firstTapTime !== null && (typeof parsed.firstTapTime !== 'number' || parsed.firstTapTime <= 0)) {
    return false
  }

  if (parsed.lastTapTime !== null && (typeof parsed.lastTapTime !== 'number' || parsed.lastTapTime <= 0)) {
    return false
  }

  if (
    typeof parsed.measuredDropsPerMinute !== 'number' ||
    isNaN(parsed.measuredDropsPerMinute) ||
    parsed.measuredDropsPerMinute < 0
  ) {
    return false
  }

  if (typeof parsed.timestamp !== 'number' || parsed.timestamp <= 0) {
    return false
  }

  const MAX_AGE_MS = 24 * 60 * 60 * 1000
  if (Date.now() - parsed.timestamp > MAX_AGE_MS) {
    return false
  }

  return true
}

export function saveInfusionData(data: Omit<StoredInfusionData, 'timestamp'>): void {
  try {
    const dataToStore: StoredInfusionData = {
      ...data,
      timestamp: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore))
  } catch (error) {
    console.error('Failed to save infusion data:', error)
  }
}

export function loadInfusionData(): StoredInfusionData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored)

    if (!validateStoredData(parsed)) {
      console.warn('Invalid infusion data in storage, clearing...')
      clearInfusionData()
      return null
    }

    if (typeof parsed.timestamp !== 'number' || parsed.timestamp <= 0) {
      console.warn('Invalid timestamp in infusion data, clearing...')
      clearInfusionData()
      return null
    }

    const MAX_AGE_MS = 24 * 60 * 60 * 1000
    if (Date.now() - parsed.timestamp > MAX_AGE_MS) {
      console.warn('Expired infusion data in storage, clearing...')
      clearInfusionData()
      return null
    }

    return parsed as StoredInfusionData
  } catch (error) {
    console.error('Failed to load infusion data:', error)
    return null
  }
}

export function clearInfusionData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear infusion data:', error)
  }
}

export function hasValidStoredData(): boolean {
  const data = loadInfusionData()
  return data !== null
}
