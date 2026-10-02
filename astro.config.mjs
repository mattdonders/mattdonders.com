import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://mattdonders.com',
  // Unlisted pages (OAuth-required privacy policies, Fifty-Two until launch) stay out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/apps/littleappco/') && !page.includes('/apps/fifty-two/') })],
});
