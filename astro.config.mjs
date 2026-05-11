// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import robotsTxt from 'astro-robots-txt';

const SITE_URL = 'https://atingehub.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    mdx(),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/draft/', '/_astro/'],
        },
      ],
      sitemap: true,
    }),
  ],
});
