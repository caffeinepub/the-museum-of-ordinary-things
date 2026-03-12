# The Museum of Ordinary Things

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full-stack digital museum app where visitors can submit photos of ordinary objects with personal stories
- Home page: title, poetic description, "Latest Exhibits" section, "Browse the Museum" and "Donate an Artifact" CTAs, "Artifact of the Day", stats counter
- Gallery page: grid layout of all artifacts with photo, object name, story preview; mood filters; "Random Artifact" button
- Exhibit page: individual artifact view with large photo, full story, submission date, mood tag, contributor name
- Submit/Donate page: form with photo upload, object name, story (100–300 words), optional mood tag, optional contributor name
- Mood tags: nostalgic, funny, bittersweet, love, childhood
- Museum-style language throughout (Donate an Artifact, Exhibit, Contributors)

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend (Motoko):
   - Artifact data model: id, imageId (blob), objectName, story, moodTag (optional), contributorName (optional/Anonymous), submittedAt
   - CRUD: submitArtifact, getArtifacts, getArtifact(id), getArtifactOfTheDay, getRandomArtifact, getArtifactsByMood, getStats (total count, today count)
   - Blob storage integration for photo uploads

2. Frontend:
   - React Router pages: Home, Gallery, Exhibit/:id, Donate
   - Polaroid-style photo frames with cream/beige/paper-white palette
   - Serif/typewriter fonts (Google Fonts: Playfair Display + Special Elite or similar)
   - Mood filter tabs on gallery
   - Stats counter on home
   - Artifact of the Day section
   - Random Artifact button
   - Sample seed data for initial display
