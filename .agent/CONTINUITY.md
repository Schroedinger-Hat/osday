# CONTINUITY

## [OUTCOMES] 2026-04-24T12:50Z [CODE]

**Schedule mobile tabs: day + track filtering**

- `src/components/molecules/schedule-view.tsx`: added mobile tab model (`Day N · Track A/B`) with separate mobile state and filtering path by both day and track.
- Shared-track events now use explicit helper logic and are included in both mobile track tabs for the selected day.
- Desktop flow preserved: day tabs + existing two-column slot rendering remain unchanged under `sm` and up.
- Validation: `ReadLints` (targeted file) clean, `npm run typecheck` passed.

## [OUTCOMES] 2026-04-21T12:00Z [CODE]

**Tickets: Tito `coupon` query → `discount-code`**

- `src/app/(website)/(main)/tickets/page.tsx`: read `searchParams` (Next 15 Promise), map `?coupon=` to `discount-code` on `<tito-widget>` when non-empty after trim; omit attribute otherwise.
- `src/types/tito-widget.d.ts`: `declare module "react"` JSX intrinsic for `tito-widget` (replaces non-functional JSX comment suppressions).

`npm run typecheck` passed.

## [OUTCOMES] 2026-03-04T00:00Z [CODE]

**Schedule page redesign — modern card layout**

Completed full rewrite of `src/components/molecules/schedule-view.tsx`:

- Dropped all background images / gradient overlays (`TimelineCard` removed)
- New `ScheduleCard`: left border accent per type, inline 16px type icon, time range, 2-line clamped title, author name + 28px avatar (photo or initials fallback)
- Break/logistic/drink cards: not wrapped in `Link`, no hover effect
- Layout mirrors `TalksTable`: minute-precision slot rows, `durationToPx` height, parallel tracks side-by-side
- Carried over `getMinutesInDay` / `durationToPx` from `talks-table.tsx`

Updated `src/app/(website)/(main)/schedule/page.tsx`:

- Added `photo` to GROQ author sub-projection

`npx tsc --noEmit` passed clean.
