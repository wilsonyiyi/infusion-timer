import { useStore } from './store/useStore'
import { InfusionSetupHome } from './components/pages/InfusionSetupHome'
import { ActiveInfusionTimer } from './components/pages/ActiveInfusionTimer'
import { AdvancedSettings } from './components/pages/AdvancedSettings'

export function App() {
  const { page } = useStore()

  return (
    <>
      {page === 'setup' && <InfusionSetupHome />}
      {page === 'timer' && <ActiveInfusionTimer />}
      {page === 'settings' && <AdvancedSettings />}
    </>
  )
}
