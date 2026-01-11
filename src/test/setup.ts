import { cleanup } from '@testing-library/preact'
import '@testing-library/jest-dom'

import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
