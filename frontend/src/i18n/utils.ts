// src/i18n/utils.ts
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getLocalizedPath(path: string | null | undefined, lang: string) {
  
  if (!path) {
    return '#'; 
  }

  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`
}