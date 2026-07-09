import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest runs with `globals: false`, so @testing-library/react's auto-cleanup
// hook is not registered automatically. Register it explicitly.
afterEach(() => {
  cleanup()
})
