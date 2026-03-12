# The Museum of Ordinary Things

## Current State
The app has a React frontend with:
- Gallery page fetching artifacts from the Motoko backend actor via `useActor` and `@tanstack/react-query`
- Donate page submitting to Formspree (native form POST, no JS)
- Exhibit page fetching a single artifact from the Motoko actor by BigInt ID
- Home page showing latest artifacts from the actor
- Artifact type from `backend.d.ts` with fields: id (bigint), objectName, story, imageId, contributorName, moodTag, submittedAt

## Requested Changes (Diff)

### Add
- `@supabase/supabase-js` as a frontend dependency
- `src/frontend/src/lib/supabase.ts` — Supabase client initialized with the provided project URL and anon key
- Supabase artifact type: `{ id: string, object_name: string, story: string, image_url: string | null, contributor_name: string | null, created_at: string }`

### Modify
- **Gallery.tsx** — Replace actor query with Supabase fetch from the `artifacts` table, ordered by `created_at` desc. Keep mood filter tabs (filter by `mood` column if present, otherwise show all). Keep Random Artifact button (pick random from fetched list client-side). Artifact IDs are now UUID strings.
- **Donate.tsx** — Replace Formspree native POST with a React-controlled form that on submit: (1) inserts a row into Supabase `artifacts` table with fields `object_name`, `story`, `image_url`, `contributor_name`, `created_at`; (2) on success, shows the confirmation message "Artifact successfully donated to the museum." and invalidates the gallery query so the collection updates immediately. Photo field: accept an image URL text input (for simplicity, since Supabase Storage is not configured). Keep all existing design/styling.
- **Exhibit.tsx** — Replace actor query with Supabase fetch from `artifacts` where `id = param`. ID is now a UUID string. Map Supabase fields to existing display logic.
- **Home.tsx** — Replace actor query with Supabase fetch of latest 6 artifacts.
- Remove all `useActor` / actor imports from Gallery, Donate, Exhibit, Home since Supabase replaces the backend.

### Remove
- Formspree form action, `_next` hidden input, `encType`, `method` from Donate form
- BigInt usage in artifact IDs throughout

## Implementation Plan
1. Install `@supabase/supabase-js` in `src/frontend/package.json`
2. Create `src/frontend/src/lib/supabase.ts` with client
3. Rewrite Gallery.tsx: Supabase query, string IDs, client-side random
4. Rewrite Donate.tsx: controlled form with Supabase insert, success state, query invalidation
5. Rewrite Exhibit.tsx: Supabase fetch by UUID, map fields
6. Rewrite Home.tsx: Supabase fetch latest 6 artifacts
7. Validate build
