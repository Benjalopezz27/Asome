import fetchApi from './strapi';
import { type CategoryData, type HeroPageData, type MenuItem, type NavbarLink, type NewsletterBlock, type Project, type Service } from '../types';
import { type HomePageData, type AnyBlock  } from '../types';

const DEFAULT_LANG = 'es-AR'
// 👇 1. Receive the language (default to 'es')
export async function getHeroPages(lang: string = DEFAULT_LANG): Promise<HeroPageData[]>{
  try {
    const response = await fetchApi({
      endpoint: 'global',
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 2. Request specific locale from Strapi
        'populate[HeroPages][populate]': 'backgroundImage',
      }
    })
    const data = response?.attributes || response
    return data?.HeroPages || []
    
  } catch (error) {
    console.error("Error fetching Global Hero:", error);
    return [];
  }
}
export async function getNavbarData(lang: string = DEFAULT_LANG): Promise<{ menuItems: MenuItem[]; cta: NavbarLink | null }> {
  try {
    const response = await fetchApi({
      endpoint: 'global',
      wrappedByKey: 'data',
      query: {
        locale: lang, // 👈 New: Fetch localized menu
        'populate[navbarCta][populate]': '*',
        'populate[mainMenu][on][elements.navbar-links][populate]': '*',
        'populate[mainMenu][on][elements.dropdown][populate][Links]': '*',
      }
    });

    const data = response?.attributes || response;

    return {
      menuItems: (data?.mainMenu || []) as MenuItem[],
      cta: data?.navbarCta as NavbarLink | null
    };
  } catch (error) {
    console.error("Error loading Navbar:", error);
    return { menuItems: [], cta: null };
  }
}
