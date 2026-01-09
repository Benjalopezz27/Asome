// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
  site: 'https://asome-front-production.up.railway.app',
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: ['https://asome-front-production.up.railway.app']
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
      }
      
    }
  )],
  
});