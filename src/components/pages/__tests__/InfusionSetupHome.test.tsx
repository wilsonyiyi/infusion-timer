import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/preact'
import { InfusionSetupHome } from '../InfusionSetupHome'
import { useStore } from '../../../store/useStore'

vi.mock('../../../store/useStore')

describe('InfusionSetupHome - Volume Selection', () => {
  const mockSetVolumePreset = vi.fn()
  const mockSetCustomVolume = vi.fn()
  const mockSetPage = vi.fn()
  const mockSetSpeedLevel = vi.fn()
  const mockStartInfusion = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useStore).mockReturnValue({
      volumePreset: '200',
      customVolume: 200,
      speedLevel: 'medium',
      setPage: mockSetPage,
      setVolumePreset: mockSetVolumePreset,
      setCustomVolume: mockSetCustomVolume,
      setSpeedLevel: mockSetSpeedLevel,
      startInfusion: mockStartInfusion,
      volume: 200,
      isRunning: false,
      isPaused: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      dropFactor: 20,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0,
      pauseInfusion: vi.fn(),
      resumeInfusion: vi.fn(),
      stopInfusion: vi.fn(),
      adjustEstimate: vi.fn(),
      setCalibration: vi.fn(),
      setDropFactor: vi.fn(),
      tapForSpeed: vi.fn(),
      resetTapCount: vi.fn(),
      calculateEstimatedMinutes: vi.fn(),
    })
  })

  it('renders volume selection options', () => {
    render(<InfusionSetupHome />)

    expect(screen.getByText('100ml')).toBeInTheDocument()
    expect(screen.getByText('200ml')).toBeInTheDocument()
    expect(screen.getByText('自定义')).toBeInTheDocument()
  })

  it('highlights currently selected volume preset', () => {
    vi.mocked(useStore).mockReturnValue({
      volumePreset: '100',
      customVolume: 100,
      speedLevel: 'medium',
      setPage: mockSetPage,
      setVolumePreset: mockSetVolumePreset,
      setCustomVolume: mockSetCustomVolume,
      setSpeedLevel: mockSetSpeedLevel,
      startInfusion: mockStartInfusion,
      volume: 100,
      isRunning: false,
      isPaused: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      dropFactor: 20,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0,
      pauseInfusion: vi.fn(),
      resumeInfusion: vi.fn(),
      stopInfusion: vi.fn(),
      adjustEstimate: vi.fn(),
      setCalibration: vi.fn(),
      setDropFactor: vi.fn(),
      tapForSpeed: vi.fn(),
      resetTapCount: vi.fn(),
      calculateEstimatedMinutes: vi.fn(),
    })

    const { container } = render(<InfusionSetupHome />)

    const radio100 = container.querySelector('input[value="100"]') as HTMLInputElement
    const radio200 = container.querySelector('input[value="200"]') as HTMLInputElement
    const radioCustom = container.querySelector('input[value="custom"]') as HTMLInputElement

    expect(radio100.checked).toBe(true)
    expect(radio200.checked).toBe(false)
    expect(radioCustom.checked).toBe(false)
  })

  it('updates volumePreset when clicking 100ml option', () => {
    render(<InfusionSetupHome />)

    fireEvent.click(screen.getByText('100ml'))

    expect(mockSetVolumePreset).toHaveBeenCalledWith('100')
    expect(mockSetCustomVolume).toHaveBeenCalledWith(100)
  })

  it('updates volumePreset when clicking 200ml option', () => {
    vi.mocked(useStore).mockReturnValue({
      volumePreset: '100',
      customVolume: 100,
      speedLevel: 'medium',
      setPage: mockSetPage,
      setVolumePreset: mockSetVolumePreset,
      setCustomVolume: mockSetCustomVolume,
      setSpeedLevel: mockSetSpeedLevel,
      startInfusion: mockStartInfusion,
      volume: 100,
      isRunning: false,
      isPaused: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      dropFactor: 20,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0,
      pauseInfusion: vi.fn(),
      resumeInfusion: vi.fn(),
      stopInfusion: vi.fn(),
      adjustEstimate: vi.fn(),
      setCalibration: vi.fn(),
      setDropFactor: vi.fn(),
      tapForSpeed: vi.fn(),
      resetTapCount: vi.fn(),
      calculateEstimatedMinutes: vi.fn(),
    })

    render(<InfusionSetupHome />)

    fireEvent.click(screen.getByText('200ml'))

    expect(mockSetVolumePreset).toHaveBeenCalledWith('200')
    expect(mockSetCustomVolume).toHaveBeenCalledWith(200)
  })

  it('updates volumePreset to custom when clicking custom option', () => {
    render(<InfusionSetupHome />)

    fireEvent.click(screen.getByText('自定义'))

    expect(mockSetVolumePreset).toHaveBeenCalledWith('custom')
    expect(mockSetCustomVolume).not.toHaveBeenCalled()
  })

  it('shows custom volume input when custom preset is selected', () => {
    vi.mocked(useStore).mockReturnValue({
      volumePreset: 'custom',
      customVolume: 150,
      speedLevel: 'medium',
      setPage: mockSetPage,
      setVolumePreset: mockSetVolumePreset,
      setCustomVolume: mockSetCustomVolume,
      setSpeedLevel: mockSetSpeedLevel,
      startInfusion: mockStartInfusion,
      volume: 150,
      isRunning: false,
      isPaused: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      dropFactor: 20,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0,
      pauseInfusion: vi.fn(),
      resumeInfusion: vi.fn(),
      stopInfusion: vi.fn(),
      adjustEstimate: vi.fn(),
      setCalibration: vi.fn(),
      setDropFactor: vi.fn(),
      tapForSpeed: vi.fn(),
      resetTapCount: vi.fn(),
      calculateEstimatedMinutes: vi.fn(),
    })

    render(<InfusionSetupHome />)

    const customInput = screen.getByPlaceholderText('输入毫升数')
    expect(customInput).toBeInTheDocument()
    expect(customInput).toHaveValue(150)
  })

  it('hides custom volume input when custom preset is not selected', () => {
    render(<InfusionSetupHome />)

    const customInput = screen.queryByPlaceholderText('输入毫升数')
    expect(customInput).not.toBeInTheDocument()
  })

  it('updates custom volume when input value changes', () => {
    vi.mocked(useStore).mockReturnValue({
      volumePreset: 'custom',
      customVolume: 150,
      speedLevel: 'medium',
      setPage: mockSetPage,
      setVolumePreset: mockSetVolumePreset,
      setCustomVolume: mockSetCustomVolume,
      setSpeedLevel: mockSetSpeedLevel,
      startInfusion: mockStartInfusion,
      volume: 150,
      isRunning: false,
      isPaused: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      dropFactor: 20,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0,
      pauseInfusion: vi.fn(),
      resumeInfusion: vi.fn(),
      stopInfusion: vi.fn(),
      adjustEstimate: vi.fn(),
      setCalibration: vi.fn(),
      setDropFactor: vi.fn(),
      tapForSpeed: vi.fn(),
      resetTapCount: vi.fn(),
      calculateEstimatedMinutes: vi.fn(),
    })

    render(<InfusionSetupHome />)

    const customInput = screen.getByPlaceholderText('输入毫升数') as HTMLInputElement
    fireEvent.input(customInput, { target: { value: '300' } })

    expect(mockSetCustomVolume).toHaveBeenCalledWith(300)
  })

  it('switches volume presets correctly', () => {
    let currentPreset: '100' | '200' | 'custom' = '100'

    vi.mocked(useStore).mockImplementation(() => ({
      volumePreset: currentPreset,
      customVolume: 100,
      speedLevel: 'medium',
      setPage: mockSetPage,
      setVolumePreset: (preset: '100' | '200' | 'custom') => {
        currentPreset = preset
        mockSetVolumePreset(preset)
      },
      setCustomVolume: mockSetCustomVolume,
      setSpeedLevel: mockSetSpeedLevel,
      startInfusion: mockStartInfusion,
      volume: 100,
      isRunning: false,
      isPaused: false,
      startTime: null,
      pauseTime: null,
      totalPausedDuration: 0,
      estimatedMinutes: 0,
      calibration: null,
      dropFactor: 20,
      tapCount: 0,
      firstTapTime: null,
      lastTapTime: null,
      measuredDropsPerMinute: 0,
      pauseInfusion: vi.fn(),
      resumeInfusion: vi.fn(),
      stopInfusion: vi.fn(),
      adjustEstimate: vi.fn(),
      setCalibration: vi.fn(),
      setDropFactor: vi.fn(),
      tapForSpeed: vi.fn(),
      resetTapCount: vi.fn(),
      calculateEstimatedMinutes: vi.fn(),
    }))

    render(<InfusionSetupHome />)

    fireEvent.click(screen.getByText('200ml'))

    expect(mockSetVolumePreset).toHaveBeenCalledWith('200')
    expect(mockSetCustomVolume).toHaveBeenCalledWith(200)
  })
})
