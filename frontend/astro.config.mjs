// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: ['asomelab.com']
    }
  },
  integrations: [react(), sitemap(
    {
      i18n: {
        defaultLocale: 'es-AR',
        locales: {
          'es-AR': 'es-AR',
          'en': 'en',
        }
      },
      // @ts-ignore
      routing: {
        prefixDefaultLocale: true,
        redirectToDefaultLocale: true
      }
    }
  )],
  
});