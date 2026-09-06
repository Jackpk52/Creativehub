# CreativeHub — Creativity & Skills Activity Hub for Under-18s

> "Your imagination is your superpower."

CreativeHub is a safe, simple, engaging digital activity hub designed for children and teenagers under 18. It helps young people strengthen creativity, imagination, problem-solving, curiosity, communication, and independent thinking.

This is the **functional MVP** — not a visual mockup.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

The app runs at `http://localhost:5173` by default.

No API keys, external services, or backend required.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Vanilla CSS (CSS custom properties) |
| Routing | React Router DOM |
| Testing | Vitest + Testing Library |
| Storage | Local Storage (browser) |

---

## Project Structure

```
CreativeHub/
├── public/
├── src/
│   ├── components/       # Reusable UI: Layout, ActivityCard, RandomIdea, etc.
│   ├── context/          # AppProvider and AppContext
│   ├── data/             # Activity catalog, prompt library, achievements
│   ├── pages/            # All route-level pages
│   ├── storage/          # LocalStorageRepository (swappable backend)
│   ├── styles/           # global.css (design tokens, responsive, accessible)
│   ├── types/            # TypeScript models: Activity, Creation, Progress, etc.
│   ├── utils/            # Progress calculation, streak, achievement logic
│   ├── main.tsx          # App entry + router setup
│   ├── vite-env.d.ts     # Vite type declarations
│   └── testSetup.ts      # Vitest + jest-dom setup
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

---

## Architecture

### Storage Abstraction

All persistence goes through `src/storage/storage.ts`. The `StorageRepository` interface has three methods:

```typescript
interface StorageRepository {
  load(): AppData
  save(data: AppData): void
  clear(): void
}
```

The current implementation uses `localStorage`. To switch to a backend later (Supabase, Firebase, PostgreSQL), implement `StorageRepository` and update the single export in `storage.ts`. No other code changes required.

### Data Flow

```
User Action
    ↓
AppContext (saveCreation, deleteCreation, etc.)
    ↓
StorageRepository.save()
    ↓
localStorage (or future backend)
    ↓
React state update
    ↓
UI re-renders
```

### Activity System

Activities are defined as data objects in `src/data/catalog.ts`. Each activity specifies:
- `activityType`: determines which workspace fields appear (`idea`, `story`, `design`, `brain`, `code`)
- `prompts`: creative thinking prompts shown alongside the workspace
- `instructions`: step-by-step guidance
- `difficulty`: Beginner / Explorer / Creator (complexity, not ability)

The workspace form in `CreatePage.tsx` reads the activity's `activityType` and renders the appropriate fields from `workspaceFields`.

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero, daily challenge, category explorer, random idea, continue creating, skill cloud |
| `/activities` | ActivitiesPage | Filterable grid of all 20 activities |
| `/activity/:id` | ActivityDetailPage | Full activity detail with instructions, prompts, and start button |
| `/create/:id` | CreatePage | Schema-specific creation workspace |
| `/creations` | CreationsPage | All saved creations (filterable by status) |
| `/progress` | ProgressPage | Completion stats, skill meters, streak, achievements |
| `/settings` | SettingsPage | Accessibility toggles, data management, help |
| `/about` | InfoPage | About CreativeHub |
| `/privacy` | InfoPage | Privacy policy |
| `/safety` | InfoPage | Safety information |
| `/help` | InfoPage | Help and troubleshooting |
| `*` | NotFoundPage | Friendly 404 |

---

## Features Implemented

### Core Loop (MVP Complete)
- **Discover** → Home page daily challenge, category grid, random idea generator
- **Choose** → Activity library with category/difficulty filters
- **Create** → Schema-specific workspace (idea, story, design, brain, code)
- **Save** → Save in-progress or completed creations
- **Edit** → Re-open any saved creation and continue
- **Delete** → Remove any creation with confirmation
- **Complete** → Mark as finished, update progress
- **Progress** → Activity count, categories explored, skill meters, streak
- **Achievements** → 8 exploration-based achievements that unlock automatically

### Privacy & Safety
- All data stored locally in browser only
- No accounts, no names, no personal info required
- No public profiles, no social features, no ads
- No manipulative mechanics (no endless feeds, no streak pressure)
- Private creations by default

### Accessibility
- Semantic HTML throughout
- Keyboard navigation with visible focus indicators
- 44px minimum touch targets
- Screen reader support (aria-live regions, roles, labels)
- Large text mode in settings
- Reduced motion support
- Good color contrast
- Meaningful error messages

### Responsive Design
- Mobile-first CSS with breakpoints at 680px and 900px
- Collapsible mobile navigation
- Touch-friendly buttons and controls
- Fluid typography with `clamp()`

### Error Handling
- Friendly error messages (no "500 Internal Server Error")
- Storage failure recovery
- Corrupted data detection and reset
- 404 pages for invalid routes
- Empty state guidance

---

## Activity Catalog (20 Activities)

| # | Title | Category | Type | Difficulty |
|---|-------|----------|------|-----------|
| 1 | Invent a Robot | Art & Design | design | Beginner |
| 2 | Design a Future City | Art & Design | design | Explorer |
| 3 | Create a Fictional Character | Art & Design | design | Beginner |
| 4 | Redesign an Everyday Object | Art & Design | design | Explorer |
| 5 | Invent a Helpful Robot | Idea Lab | idea | Beginner |
| 6 | Design a Future School | Idea Lab | idea | Explorer |
| 7 | Invent a New App | Idea Lab | idea | Creator |
| 8 | Solve an Everyday Problem | Idea Lab | idea | Explorer |
| 9 | Logic Challenge | Brain Challenges | brain | Explorer |
| 10 | Pattern Challenge | Brain Challenges | brain | Beginner |
| 11 | Lateral Thinking Challenge | Brain Challenges | brain | Creator |
| 12 | Create a Mystery Story | Story Studio | story | Explorer |
| 13 | Build a New Planet | Story Studio | story | Explorer |
| 14 | Create an Adventure | Story Studio | story | Beginner |
| 15 | Invent a Fictional World | Story Studio | story | Creator |
| 16 | Design a Simple Website | Code Lab | code | Beginner |
| 17 | Plan a Mini Game | Code Lab | code | Explorer |
| 18 | Design a Space Station | Discovery Lab | design | Creator |
| 19 | Invent an Eco-Friendly Machine | Discovery Lab | idea | Explorer |
| 20 | Design Future Transportation | Discovery Lab | design | Explorer |

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_STORAGE_MODE` | `local` | Storage backend. `local` uses browser localStorage. Future values: `supabase`, `firebase` |

No secrets or API keys are required for the MVP.

---

## Testing

```bash
npm run test          # Run all tests
npm run test -- --watch  # Watch mode
```

### Test Coverage

| Suite | Tests | What it covers |
|-------|-------|----------------|
| `catalog.test.ts` | 12 | Activity count, unique IDs, categories, prompts, instructions, brain explanations |
| `storage.test.ts` | 4 | Default data, round-trip persistence, corruption recovery, clear |
| `progress.test.ts` | 11 | Achievement IDs, merging, streak calculation, empty/gap scenarios |
| **Total** | **27** | |

---

## Building for Production

```bash
npm run build    # Output: dist/
npm run preview  # Preview the build locally
```

The production build is ~280KB JS (88KB gzipped) + ~19KB CSS (5KB gzipped).

---

## Known Limitations

1. **No cloud sync** — Data stays on one browser/device
2. **No drawing canvas** — All creation is text-based in MVP
3. **No real code editor** — Code activities use planning fields
4. **Daily challenge is deterministic** — Based on day index, not randomized server-side
5. **No undo/redo** in workspace — Clear requires confirmation
6. **No import/export** — Cannot move creations between devices

---

## Future Roadmap

### Phase 2
- Optional accounts with secure cloud sync
- AI Creative Coach (thinking helper, not auto-completer)
- Advanced drawing canvas
- Real code editor (Monaco or CodeMirror)
- Personalized activity recommendations
- More activities

### Phase 3
- Guardian controls
- Collaborative projects
- Carefully moderated community
- Larger project-based challenges
- Advanced educational experiences

---

## Architecture Decisions for Phase 2

1. **StorageRepository pattern** — Swap localStorage for Supabase/Firebase by implementing the interface
2. **Activity data is static** — Can be moved to a CMS or database without UI changes
3. **No global state library** — React Context is sufficient for MVP; can migrate to Zustand or similar if needed
4. **No CSS framework** — Pure CSS keeps bundle small; can add Tailwind if complexity grows
5. **Activity types drive workspace** — New activity types require only a new entry in `workspaceFields`

---

## License

This project is private. All rights reserved.
