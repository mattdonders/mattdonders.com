import { test } from 'node:test';
import assert from 'node:assert/strict';
import { triggerRebuild } from '../workers/daily-rebuild/src/index.ts';

test('daily rebuild POSTs to the deploy hook', async () => {
  const calls: [string, RequestInit | undefined][] = [];
  const fakeFetch = (async (url: string, init?: RequestInit) => {
    calls.push([url, init]);
    return new Response('{"success":true}', { status: 200 });
  }) as typeof fetch;
  await triggerRebuild({ DEPLOY_HOOK_URL: 'https://hook.example/abc' }, fakeFetch);
  assert.deepEqual(calls.map(([url, init]) => [url, init?.method]), [['https://hook.example/abc', 'POST']]);
});

test('daily rebuild fails loudly when the hook rejects', async () => {
  const fakeFetch = (async () => new Response('nope', { status: 404 })) as typeof fetch;
  await assert.rejects(triggerRebuild({ DEPLOY_HOOK_URL: 'https://hook.example/abc' }, fakeFetch), /HTTP 404/);
});

test('daily rebuild fails loudly without a hook URL', async () => {
  await assert.rejects(triggerRebuild({}), /DEPLOY_HOOK_URL/);
});
