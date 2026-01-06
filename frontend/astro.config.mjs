// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: true
    }
  },
  integrations: [react()],
  i18n: {
    defaultLocale: 'es-AR',
    locales: ['es-AR', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
});