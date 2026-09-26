// Cron Worker: POST to the Pages deploy hook, which builds main again.

export interface Env {
  DEPLOY_HOOK_URL?: string;
}

export async function triggerRebuild(env: Env, fetchImpl: typeof fetch = fetch): Promise<void> {
  if (!env.DEPLOY_HOOK_URL) throw new Error('DEPLOY_HOOK_URL is not set');
  const res = await fetchImpl(env.DEPLOY_HOOK_URL, { method: 'POST' });
  // Throwing marks the cron run as failed in the Workers dashboard instead of passing quietly.
  if (!res.ok) throw new Error(`Deploy hook returned HTTP ${res.status}: ${await res.text()}`);
}

export default {
  async scheduled(_controller: unknown, env: Env): Promise<void> {
    await triggerRebuild(env);
  },
};
