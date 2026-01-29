import fetchApi from './strapi';
import { type CategoryData, type HeroPageData, type MenuItem, type NavbarLink, type NewsletterBlock, type Project, type Service } from '../types';
import { type HomePageData, type AnyBlock  } from '../types';

const DEFAULT_LANG = 'es-AR'


export async function getHomePageData(lang: string = DEFAULT_LANG): Promise<HomePageData> {
  try {
    const data = await fetchApi({
      endpoint: 'home-pages', 
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 New: Fetch localized home page
        'populate[blocks][on][blocks.feature-grid][populate][features][populate]': '*',
        'populate[blocks][on][blocks.stats-section][populate][stats][populate]': '*',
        'populate[blocks][on][blocks.service-section][populate][services][populate][coverImage][fields]': 'url',
        'populate[blocks][on][blocks.service-section][populate][services][populate][tags][populate]': '*',
        'populate[blocks][on][blocks.logo-slider][populate][logos][populate][image][fields]': 'url',
        'populate[blocks][on][blocks.hero][populate][backgroundImage][fields]': 'url',
        'populate[blocks][on][blocks.newsletter][populate]': '*'
      }
    });

    const homePage = Array.isArray(data) ? data[0] : data;
    const attributes = homePage?.attributes || homePage;

    return {
      blocks: (attributes?.blocks || []) as AnyBlock[],
      metaTitle: attributes?.title || 'Home'
    };

  } catch (error) {
    console.error("Error loading HomePage:", error);
    return { blocks: [], metaTitle: 'Home' };
  }
}

export async function getNewsletterData(lang: string = DEFAULT_LANG): Promise<NewsletterBlock | null> {
  // Pass the language to the home function to get the localized newsletter block
  const homeData = await getHomePageData(lang); 
  
  const newsletterBlock = homeData.blocks.find(
    (block): block is NewsletterBlock => block.__component === 'blocks.newsletter'
  );

  return newsletterBlock || null;
}

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