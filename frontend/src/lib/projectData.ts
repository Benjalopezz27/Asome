import fetchApi from './strapi';
import { type CategoryData, type HeroPageData, type MenuItem, type NavbarLink, type NewsletterBlock, type Project, type Service } from '../types';
import { type HomePageData, type AnyBlock  } from '../types';

const DEFAULT_LANG = 'es-AR'

export async function getProjects(lang: string = 'es'): Promise<Project[]> {
  try {
    const data = await fetchApi({
      endpoint: 'projects',
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 New
        'populate[image][populate]': '*',
        'populate[imageDescription][populate]': '*',
        'populate[tags][populate]': '*',
        'populate[phases][populate][IconText][populate]': '*',
      }
    });

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string, lang: string = DEFAULT_LANG): Promise<Project | null> {
  try {
    const data = await fetchApi({
      endpoint: 'projects',
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 New
        'filters[slug][$eq]': slug,
        'populate[image][fields]': 'url',
        'populate[tags][populate]': '*',
        'populate[phases][populate][IconText][populate]': '*', 
      }
    });

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}