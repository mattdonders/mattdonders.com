import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://mattdonders.com',
  // Unlisted pages (e.g. OAuth-required privacy policies) stay out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/apps/littleappco/') })],
});
