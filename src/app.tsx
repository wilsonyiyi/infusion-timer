import { Router, Route } from 'wouter-preact'
import { InfusionSetupHome } from './components/pages/InfusionSetupHome'
import { ActiveInfusionTimer } from './components/pages/ActiveInfusionTimer'
import { AdvancedSettings } from './components/pages/AdvancedSettings'

export function App() {
  return (
    <Router>
      <Route path="/" component={InfusionSetupHome} />
      <Route path="/timer" component={ActiveInfusionTimer} />
      <Route path="/settings" component={AdvancedSettings} />
    </Router>
  )
}
