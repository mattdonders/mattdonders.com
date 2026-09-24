import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { appGroup, listedApps, listedServices, projects, statusLabel, type Project } from '../src/data/projects.ts';

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

test('every public entry has an icon file, a page, and a status label', () => {
  for (const p of projects.filter(p => !p.draft)) {
    assert.ok(p.icon, `${p.name} has no icon`);
    assert.ok(existsSync(new URL(`../public${p.icon}`, import.meta.url)), `${p.name} icon missing: ${p.icon}`);
    assert.ok(p.url, `${p.name} has no url`);
    if (p.url!.startsWith('/')) {
      assert.ok(existsSync(new URL(`../src/pages${p.url}/index.astro`, import.meta.url)), `${p.name} page missing: ${p.url}`);
    }
    assert.ok(statusLabel[p.status], `${p.name} status has no label`);
  }
});

test('live apps link to the App Store', () => {
  for (const p of listedApps().filter(p => p.status === 'live')) {
    assert.match(p.appStore ?? '', /^https:\/\/apps\.apple\.com\//, `${p.name} is live without an App Store link`);
  }
});
