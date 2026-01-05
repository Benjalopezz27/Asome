import fetchApi from './strapi';
import { type CategoryData, type HeroPageData, type MenuItem, type NavbarLink, type NewsletterBlock, type Project, type Service } from '../types';
import { type HomePageData, type AnyBlock  } from '../types';

const DEFAULT_LANG = 'es-AR'

export async function getCategories(lang: string = DEFAULT_LANG): Promise<CategoryData[]> {
  try {
    const data = await fetchApi({
      endpoint: 'service-categories',
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 New
      }
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error loading categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string, lang: string = 'es'): Promise<CategoryData | null> {
  try {
    const data = await fetchApi({
      endpoint: 'service-categories',
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 New
        'filters[slug][$eq]': slug,
      }
    });
    return Array.isArray(data) ? data[0] : null;
  } catch (error) {
    return null;
  }
}

export async function getServicesByCategory(category: string, lang: string = DEFAULT_LANG): Promise<Service[]> {
  try {
    const data = await fetchApi({
      endpoint: 'services', 
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 New
        'filters[category][$eq]': category,
        'populate[coverImage][fields]': 'url',
        'populate[tags][populate]': '*',
      }
    });
    return Array.isArray(data) ? data : [data];
    
  } catch (error) {
    console.error(`Error fetching services for category ${category}:`, error);
    return [];
  }
}