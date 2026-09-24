// At build time, ask Apple's public lookup API which apps are live, so an app that goes live
// between edits moves to "Live" on the next build without a code change. No credentials needed.
// Apple only returns apps that are on sale, so this can promote an app to live but never demote one:
// a missing result could just as well be a network hiccup.
import type { Project } from './projects.ts';

export interface StoreListing {
  trackViewUrl: string;
}

const LOOKUP_URL = 'https://itunes.apple.com/lookup';

export function applyStoreStatus(all: Project[], listings: Map<string, StoreListing>): Project[] {
  return all.map(p => {
    const listing = p.appStoreId ? listings.get(p.appStoreId) : undefined;
    if (!listing) return p;
    return { ...p, status: 'live', appStore: p.appStore ?? listing.trackViewUrl.replace(/\?.*$/, '') };
  });
}

export async function fetchStoreListings(
  all: Project[],
  fetchImpl: typeof fetch = fetch,
): Promise<Map<string, StoreListing>> {
  const ids = all.filter(p => p.appStoreId && !p.draft).map(p => p.appStoreId);
  const listings = new Map<string, StoreListing>();
  if (ids.length === 0) return listings;
  try {
    const res = await fetchImpl(`${LOOKUP_URL}?id=${ids.join(',')}&country=us`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as { results?: { trackId?: number; trackViewUrl?: string }[] };
    for (const r of body.results ?? []) {
      if (r.trackId && r.trackViewUrl) listings.set(String(r.trackId), { trackViewUrl: r.trackViewUrl });
    }
  } catch (err) {
    // The site still builds from the statuses in projects.ts; say so loudly in the build log.
    console.warn(`[store-status] App Store lookup failed, using statuses from projects.ts: ${(err as Error).message}`);
  }
  return listings;
}
