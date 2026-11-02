// Carry the visitor's origin (e.g. chatgpt.com) into a Google Play link's `referrer`
// parameter so Play Console lists it as its own UTM source.

const clean = (v: string | null | undefined): string =>
  (v ?? '').toLowerCase().replace(/^www\./, '').replace(/[^a-z0-9._-]/g, '').slice(0, 40);

/** Origin label for the current visit: ?utm_source wins, else an external referrer's host, else ''. */
export function visitSource(search: string, documentReferrer: string, ownHost: string): string {
  const fromQuery = clean(new URLSearchParams(search).get('utm_source'));
  if (fromQuery) return fromQuery;
  try {
    const host = clean(new URL(documentReferrer).hostname);
    return host && host !== clean(ownHost) ? host : '';
  } catch {
    return '';
  }
}

/** Rewrite the utm_source inside a Play URL's referrer param; no-op when there is no source or no referrer param. */
export function withPlaySource(playUrl: string, source: string): string {
  if (!source) return playUrl;
  const url = new URL(playUrl);
  const ref = url.searchParams.get('referrer');
  if (!ref) return playUrl;
  const inner = new URLSearchParams(ref);
  inner.set('utm_source', source);
  url.searchParams.set('referrer', inner.toString());
  return url.toString();
}
