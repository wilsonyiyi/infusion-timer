# AGENTS.md

## Build, Lint, and Test Commands

### Development
- `pnpm dev` - Start Vite dev server (host: 0.0.0.0, port: 5173)
- `pnpm build` - Type check and build for production
- `pnpm preview` - Preview production build locally

### Testing
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:run` - Run tests once without watch
- `pnpm test path/to/test.test.tsx` - Run specific test file
- `pnpm test -- --run path/to/test.test.tsx` - Run specific test file once

## Code Style Guidelines

### Imports
- External libraries: Direct imports from node_modules (e.g., `import { useState } from 'preact/hooks'`)
- Internal imports: Relative paths from current file location (e.g., `import { useStore } from '../../store/useStore'`)
- CSS files: Standard imports at appropriate location (e.g., `import './index.css'`)
- Order: External libraries → internal imports → CSS files
- No absolute path aliases currently configured (use relative paths)

### Component Structure
- Function components only (no class components)
- Preact with @preact/preset-vite
- Return JSX directly, use fragments only when necessary
- Inline prop typing for simple props, separate interfaces for complex ones
- Example:
  ```tsx
  export function ComponentName() {
    const { storeValue, storeAction } = useStore()
    const [localState, setLocalState] = useState(0)

    const handleClick = () => storeAction()

    return (
      <div class="p-4">
        <button onClick={handleClick}>Click</button>
      </div>
    )
  }
  ```

### State Management
- Primary state via Zustand store (`src/store/useStore.ts`)
- Store interface: State + Actions separated into two interfaces
- Store actions: Functions that use `set` and `get` from Zustand
- Local component state: `useState` from 'preact/hooks'
- Derived state: Computed in useEffect or inline

### JSX/HTML Patterns
- **CRITICAL**: Use `class` instead of `className` (Preact convention)
- Tailwind CSS for all styling
- Inline styles via style prop: `style={{ color: 'red', fontSize: '14px' }}`
- SVG icons inline (no external icon library)
- Conditional rendering: `{condition && <Component />}`
- Dynamic class: `class={isActive ? 'active' : 'inactive'}`

### TypeScript
- Strict mode enabled
- Type exports from store (e.g., `export type SpeedLevel = 'slow' | 'medium' | 'fast'`)
- Explicit interfaces for store state and actions
- Type inference preferred where possible
- **NEVER** use `any`, `@ts-ignore`, or `@ts-expect-error`
- Use `as` for type assertions sparingly (e.g., `e.target as HTMLInputElement`)

### Testing
- Vitest with jsdom environment
- @testing-library/preact for component rendering
- Mock Zustand store: `vi.mock('../../../store/useStore')`
- Clear mocks in `beforeEach`
- Test organization: `describe('Component - Feature', () => { it('should...', () => { ... }) })`
- Event simulation: `fireEvent.click(screen.getByText('Click'))`
- Assertions with jest-dom: `expect(screen.getByText('Content')).toBeInTheDocument()`

### File Organization
```
src/
  app.tsx              # Main app component
  main.tsx             # Entry point
  index.css            # Global styles
  components/
    pages/             # Page-level components
      InfusionSetupHome.tsx
      ActiveInfusionTimer.tsx
      AdvancedSettings.tsx
      __tests__/       # Component tests
  store/
    useStore.ts        # Zustand store
  test/
    setup.ts           # Vitest setup
```

### Naming Conventions
- Components: PascalCase (e.g., `InfusionSetupHome`)
- Functions/variables: camelCase (e.g., `handleVolumeChange`, `remainingMinutes`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `SAFETY_FACTOR`, `SPEED_RANGES`)
- Types: PascalCase (e.g., `Page`, `SpeedLevel`)

### Error Handling
- Guard clauses in store actions (return early on invalid conditions)
- Example:
  ```ts
  pauseInfusion: () => {
    if (!get().isRunning || get().isPaused) return
    set({ isPaused: true, pauseTime: Date.now() })
  }
  ```
- No try-catch for normal control flow
- Defensive checks for null/undefined values

### Additional Guidelines
- Package manager: pnpm
- Framework: Preact 10.x with React 19 compatibility layer
- State: Zustand 5.x
- CSS: Tailwind 3.x with custom theme (colors: primary, medical-bg, liquid-cyan)
- Font: Lexend (display font)
- Dark mode supported via class-based toggle
- Mobile-first responsive design (max-w-md centered containers)
