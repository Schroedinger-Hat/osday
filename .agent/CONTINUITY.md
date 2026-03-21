# CONTINUITY

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
