// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import vercel from '@astrojs/vercel';

const SITE_URL = 'https://atingehub.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    robotsTxt({
      policy: [
        { userAgent: '*', allow: '/', disallow: ['/_astro/'] },
      ],
      sitemap: true,
    }),
  ],
});
