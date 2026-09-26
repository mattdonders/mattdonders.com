import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { appCategories, appGroup, appsByCategory, listedApps, listedServices, projects, statusLabel, type Project } from '../src/data/projects.ts';

const app = (name: string, status: Project['status'], extra: Partial<Project> = {}): Project => ({
  name, status, tagline: '', description: '', platforms: ['iOS'], tags: [], ...extra,
});

test('listedApps puts live apps first and keeps data order within a status', () => {
  const sample = [
    app('Soon A', 'development'),
    app('Review A', 'review'),
    app('Live A', 'live'),
    app('Review B', 'review'),
    app('Live B', 'live'),
  ];
  assert.deepEqual(listedApps(sample).map(p => p.name), ['Live A', 'Live B', 'Review A', 'Review B', 'Soon A']);
});

test('listedApps hides drafts and services; listedServices keeps only public services', () => {
  const sample = [
    app('Draft', 'live', { draft: true }),
    app('Bot', 'live', { kind: 'service' }),
    app('Hidden bot', 'live', { kind: 'service', draft: true }),
    app('App', 'live'),
  ];
  assert.deepEqual(listedApps(sample).map(p => p.name), ['App']);
  assert.deepEqual(listedServices(sample).map(p => p.name), ['Bot']);
});

test('only live apps land in the Live filter', () => {
  assert.equal(appGroup('live'), 'live');
  for (const status of ['review', 'beta', 'development', 'planned'] as const) {
    assert.equal(appGroup(status), 'soon');
  }
});

test('every public entry has an icon file, a page, and a status label', async () => {
  const { appPageFor } = await import('../src/data/app-pages.ts');
  for (const p of projects.filter(p => !p.draft)) {
    assert.ok(p.icon, `${p.name} has no icon`);
    assert.ok(existsSync(new URL(`../public${p.icon}`, import.meta.url)), `${p.name} icon missing: ${p.icon}`);
    assert.ok(p.url, `${p.name} has no url`);
    if (p.url!.startsWith('/')) {
      const hasTemplatePage = p.url!.startsWith('/apps/') && !!appPageFor(p.url!.slice('/apps/'.length));
      assert.ok(hasTemplatePage || existsSync(new URL(`../src/pages${p.url}/index.astro`, import.meta.url)), `${p.name} page missing: ${p.url}`);
    }
    assert.ok(statusLabel[p.status], `${p.name} status has no label`);
  }
});

test('live apps link to the App Store', () => {
  for (const p of listedApps().filter(p => p.status === 'live')) {
    assert.match(p.appStore ?? '', /^https:\/\/apps\.apple\.com\//, `${p.name} is live without an App Store link`);
  }
});

test('spotlightApp returns the listed app carrying a pitch', async () => {
  const { spotlightApp } = await import('../src/data/projects.ts');
  assert.equal(spotlightApp([app('A', 'live'), app('B', 'review', { spotlight: 'Pitch' })])?.name, 'B');
  assert.equal(spotlightApp([app('A', 'live'), app('C', 'review', { spotlight: 'Pitch', draft: true })]), undefined);
  assert.ok(spotlightApp(), 'the real data has a spotlight app');
});

test('inWords spells small counts and falls back to digits', async () => {
  const { inWords } = await import('../src/data/projects.ts');
  assert.equal(inWords(0), 'no');
  assert.equal(inWords(6), 'six');
  assert.equal(inWords(40), '40');
});

test('applyStoreStatus promotes an app Apple lists as live and never demotes one', async () => {
  const { applyStoreStatus } = await import('../src/data/store-status.ts');
  const sample = [
    app('Pending', 'review', { appStoreId: '1' }),
    app('Live', 'live', { appStoreId: '2', appStore: 'https://apps.apple.com/app/id2' }),
    app('No id', 'development'),
  ];
  const out = applyStoreStatus(sample, new Map([['1', { trackViewUrl: 'https://apps.apple.com/us/app/pending/id1?uo=4' }]]));
  assert.equal(out[0].status, 'live');
  assert.equal(out[0].appStore, 'https://apps.apple.com/us/app/pending/id1');
  assert.equal(out[1].status, 'live', 'a live app missing from the lookup stays live');
  assert.equal(out[2].status, 'development');
  assert.equal(sample[0].status, 'review', 'input is not mutated');
});

test('fetchStoreListings falls back to an empty map when the lookup fails', async () => {
  const { fetchStoreListings } = await import('../src/data/store-status.ts');
  const failing = (async () => { throw new Error('offline'); }) as unknown as typeof fetch;
  const warn = console.warn; console.warn = () => {};
  try {
    const listings = await fetchStoreListings([app('A', 'review', { appStoreId: '1' })], failing);
    assert.equal(listings.size, 0);
  } finally { console.warn = warn; }
});

test('fetchStoreListings parses Apple results by track id', async () => {
  const { fetchStoreListings } = await import('../src/data/store-status.ts');
  let calledWith = '';
  const fake = (async (url: string) => { calledWith = url; return new Response(JSON.stringify({ results: [{ trackId: 1, trackViewUrl: 'u1' }] })); }) as unknown as typeof fetch;
  const listings = await fetchStoreListings([app('A', 'review', { appStoreId: '1' }), app('D', 'review', { appStoreId: '9', draft: true })], fake);
  assert.match(calledWith, /id=1&/);
  assert.deepEqual([...listings.keys()], ['1']);
});

test('every listed app with a local page has page content, and every page has an app', async () => {
  const { appPages } = await import('../src/data/app-pages.ts');
  const exists = (path: string) => existsSync(new URL(`../${path}`, import.meta.url));
  for (const page of appPages) {
    assert.ok(projects.find(p => p.url === `/apps/${page.slug}`), `${page.slug} has no project entry`);
    assert.ok(!exists(`src/pages/apps/${page.slug}/index.astro`), `${page.slug} still has an old index.astro`);
    assert.ok(page.features.items.length >= 3, `${page.slug} needs at least 3 features`);
    assert.ok(page.support.subject || page.support.url, `${page.slug} needs a support route`);
    if (!/^https?:/.test(page.privacy)) assert.ok(exists(`src/pages${page.privacy}.astro`), `${page.slug} privacy page missing`);
  }
});

test('every listed app sits in a category', () => {
  for (const p of listedApps()) {
    assert.ok(p.category && appCategories.includes(p.category), `${p.name} needs a category`);
  }
});

test('appsByCategory keeps category order, keeps list order inside a group, and drops empty groups', () => {
  const apps = [
    app('Boat', 'review', { category: 'Outdoors' }),
    app('Calc', 'live', { category: 'Everyday tools' }),
    app('Timer', 'review', { category: 'Everyday tools' }),
  ];
  const groups = appsByCategory(apps);
  assert.deepEqual(groups.map(g => g.category), ['Everyday tools', 'Outdoors']);
  assert.deepEqual(groups[0].apps.map(p => p.name), ['Calc', 'Timer']);
});

test('Puck Passport tops the app list', () => {
  assert.equal(appsByCategory(listedApps())[0].apps[0].name, 'Puck Passport');
});

test('tierPrice shows a promo until its end date, then the regular price', async () => {
  const { tierPrice } = await import('../src/data/app-pages.ts');
  const tier = { name: 'Pro', price: '$24.99', items: [], promo: { price: '$19.99', label: 'Launch price', until: '2026-10-25' } };
  assert.deepEqual(tierPrice(tier, '2026-09-25'), { price: '$19.99', was: '$24.99', note: 'Launch price until October 25' });
  assert.deepEqual(tierPrice(tier, '2026-10-24'), { price: '$19.99', was: '$24.99', note: 'Launch price until October 25' });
  assert.deepEqual(tierPrice(tier, '2026-10-25'), { price: '$24.99' });
  assert.deepEqual(tierPrice({ name: 'Free', price: '$0', items: [] }, '2026-09-25'), { price: '$0' });
});

test('buildDay is the UTC calendar date', async () => {
  const { buildDay } = await import('../src/data/app-pages.ts');
  assert.equal(buildDay(new Date('2026-10-25T03:00:00Z')), '2026-10-25');
});
