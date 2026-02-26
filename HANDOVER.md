# HANDOVER.md

Session-change report for mattdonders.com. Read this before starting any new work.

---

## Session Summary

Two sessions combined here. The first session built the entire site from scratch and wired up deployment. The second session (this one) picked up from a context overflow and finished the project draft system.

### What Was Built (Session 1)
- Full Astro v5 site replacing an unmaintained WordPress install
- Dark theme, custom CSS design system (no framework)
- Pages: Home (hero + featured projects + recent posts), Projects, About, Blog listing, Blog post, 404
- Blog with Astro Content Collections (Markdown, draft support)
- Cloudflare Pages deployment via Worker pipeline (auto-deploys on git push to `main`)
- DNS migration from IONOS to Cloudflare
- SPF + DKIM email auth configured for Google Workspace
- First blog post live: "New site, new stack, and building faster with AI"
- Hockey Game Bot added as first real project entry

### What Was Done (Session 2)
- Added `draft?: boolean` to `Project` interface in `src/data/projects.ts`
- Filtered draft projects from homepage (`index.astro`) and projects page (`projects.astro`)
- Replaced 3 placeholder entries with 4 real staged projects (all `draft: true`)
- Pushed and deployed — clean build, all changes live

---

## Current State

**Site is live at https://mattdonders.com**

Publicly visible projects:
- Hockey Game Bot ✅ (live, featured)

Staged as drafts (hidden from public, ready to publish):
- HGB App — iOS/Android companion app for Hockey Game Bot
- DevMap — personal project management dashboard (macOS)
- Allowance Autopilot — family chores/allowance app (iOS + Android, awaiting Apple review)
- Cool Haven — cooling/warming center finder (iOS + Android, awaiting Apple review)

---

## Key Decisions Made

| Decision | Reasoning |
|---|---|
| `draft?: boolean` on Project (not a separate list) | Mirrors how Astro Content Collections already handles blog drafts — consistent pattern |
| Draft filter applied at page level, not in data | Allows data file to hold all projects; pages decide what to show |
| All 4 new projects start as `draft: true` | Ship when ready, not when staged |
| `status: 'development'` for Allowance Autopilot and Cool Haven | User described them as "in development (waiting for Apple)" — `beta` would imply public beta |

---

## What Worked & What Didn't

### Worked
- Astro build is fast (~800ms locally, ~3s on Cloudflare)
- Git push → auto-deploy pipeline is solid
- CNAME Flattening at root domain (Cloudflare-specific feature — lets you CNAME `@`)

### Pain Points
- Cloudflare Pages setup was genuinely confusing:
  - New unified UI is built for Workers, not static Pages
  - `wrangler pages deploy` won't auto-create the Pages project — must pre-create it
  - Deploy command must include `--project-name mattdonders-com`
  - Auto-generated API token lacks Pages permissions — had to manually edit token
- IONOS DNS HTML export required manual parsing to find all records (no clean export)
- Edge propagation after deploy can take ~60s — don't panic if changes aren't instant

---

## Lessons Learned & Gotchas

- **Cloudflare project name cannot contain dots** — `mattdonders.com` → `mattdonders-com`
- **Two entries in Cloudflare dashboard** is normal and correct:
  1. Pages project (`mattdonders-com.pages.dev`) — the actual site host
  2. Worker pipeline (GitHub-connected) — triggers builds, calls wrangler deploy
- **DKIM timing**: Google Workspace authentication takes a few minutes after clicking "Start Authentication" — not instant
- **Draft filtering**: Both `index.astro` and `projects.astro` must be updated when changing filter logic — they each filter independently

---

## Immediate Next Steps (Priority Order)

1. **Dev-mode draft visibility** — Make draft projects visible in local dev but hidden in production. User asked about this; offered the fix but hadn't responded yet. One-liner change per page:
   ```ts
   // index.astro
   projects.filter(p => p.featured && (import.meta.env.DEV || !p.draft))
   // projects.astro
   projects.filter(p => p.status === status && (import.meta.env.DEV || !p.draft))
   ```

2. **About page bio** — `src/pages/about.astro` has placeholder bio text. Needs real content.

3. **Publish HGB App** when ready — remove `draft: true` from HGB App entry in `src/data/projects.ts`, push

4. **Publish DevMap** — same, remove `draft: true`

5. **Allowance Autopilot + Cool Haven** — publish once Apple approves. Consider adding `appStore` link once live.

6. **DMARC record** — Cloudflare flagged this. Add `_dmarc` TXT record when ready:
   ```
   v=DMARC1; p=none; rua=mailto:dmarc@mattdonders.com
   ```
   Start with `p=none` (monitor only) before moving to `p=quarantine`.

7. **Delete placeholder blog post** — `src/content/blog/hello-world.md` is `draft: true` and can be removed anytime.

---

## Key Files

| File | Purpose |
|---|---|
| `src/data/projects.ts` | All project data — add/edit/publish projects here |
| `src/pages/index.astro` | Homepage — hero, featured projects, recent posts |
| `src/pages/projects.astro` | All projects grouped by status |
| `src/pages/about.astro` | Bio + skills — needs real content |
| `src/content/blog/` | Drop `.md` files here for blog posts |
| `src/styles/global.css` | All CSS — design tokens, components, layout |
| `src/components/ProjectCard.astro` | Project card component |
| `src/layouts/BaseLayout.astro` | HTML shell, OG tags, imports Header/Footer |
| `wrangler.toml` | Cloudflare Pages config (`pages_build_output_dir = "./dist"`) |
| `public/_headers` | Security headers (X-Frame-Options, CSP, etc.) |

---

## Publishing a Draft Project (Cheatsheet)

1. Open `src/data/projects.ts`
2. Find the project, remove the `draft: true` line
3. Optionally add `appStore`, `playStore`, `github`, or `url` fields
4. `git add src/data/projects.ts && git commit -m "publish: ProjectName" && git push`
5. Wait ~60s for edge propagation
