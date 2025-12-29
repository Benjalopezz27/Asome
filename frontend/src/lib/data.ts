// src/lib/data.ts
import fetchApi from './strapi';
import { type HeroPageData, type MenuItem, type NavbarLink, type NewsletterBlock, type Project, type Service } from '../types';
import { type HomePageData, type AnyBlock  } from '../types';

export async function getHeroPages(): Promise<HeroPageData[]>{
  try {
    const response = await fetchApi({
      endpoint: 'global',
      wrappedByKey: 'data',
      query: {
        'populate[HeroPages][populate]': 'backgroundImage',
      }
    })
    const data = response?.attributes || response
    return data?.HeroPages || []
    
  } catch (error) {
    console.error("Error obteniendo Hero Global:", error);
    return [];
  }
  
}
export async function getNavbarData() {
  try {
    const response = await fetchApi({
      endpoint: 'global',
      wrappedByKey: 'data',
      query: {
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
    console.error("Error cargando Navbar:", error);
    return { menuItems: [], cta: null };
  }
}
export async function getHomePageData(): Promise<HomePageData> {
  try {
    const data = await fetchApi({
      endpoint: 'home-pages', 
      wrappedByKey: 'data',
      query: {
        'populate[blocks][on][blocks.feature-grid][populate][features][populate]': '*',
        'populate[blocks][on][blocks.stats-section][populate][stats][populate]': '*',
        'populate[blocks][on][blocks.service-section][populate][services][populate][coverImage][fields]': 'url',
        'populate[blocks][on][blocks.service-section][populate][services][populate][tags][populate]': '*',
        'populate[blocks][on][blocks.logo-slider][populate][logos][populate][image][fields]': 'url',
        'populate[blocks][on][blocks.hero][populate][titleImage][fields][0]': 'url',
        'populate[blocks][on][blocks.hero][populate][titleImage][fields][1]': 'alternativeText',
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
    console.error("Error cargando HomePage:", error);
    return { blocks: [], metaTitle: 'Home' };
  }
}
export async function getNewsletterData(): Promise<NewsletterBlock | null> {
  const homeData = await getHomePageData();
  
  const newsletterBlock = homeData.blocks.find(
    (block): block is NewsletterBlock => block.__component === 'blocks.newsletter'
  );

  return newsletterBlock || null;
}

export async function getServicesByCategory(category: string): Promise<Service[]> {
  try {
    const data = await fetchApi({
      endpoint: 'services', // Nombre de tu colección en plural
      wrappedByKey: 'data',
      query: {
        
        'filters[category][$eq]': category,
        
        'populate[coverImage][fields]': 'url',
        'populate[tags][populate]': '*',
      }
    });
    return Array.isArray(data) ? data : [data];
    
  } catch (error) {
    console.error(`Error buscando servicios de la categoría ${category}:`, error);
    return [];
  }
}
export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fetchApi({
      endpoint: 'projects',
      wrappedByKey: 'data',
      query: {
        // 1. Datos básicos del proyecto
        'populate[image][populate]': '*',
        'populate[tags][populate]': '*',
        
        // 2. NIVEL 1: Poblar el componente ProjectPhase (asumimos que el campo se llama 'phases')
        'populate[phases][populate][IconText][populate]': '*',
        
        // EXPLICACIÓN DE LA LÍNEA DE ARRIBA:
        // [phases] -> Entra al campo del proyecto
        // [populate][items] -> Entra al campo repetible dentro de la fase (IconText)
        // [populate] = '*' -> Trae el icono y el texto
      }
    });

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error cargando proyectos:", error);
    return [];
  }
}

// BONUS: Función para traer UN proyecto por Slug (para la página de detalle)
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const data = await fetchApi({
      endpoint: 'projects',
      wrappedByKey: 'data',
      query: {
        'filters[slug][$eq]': slug,
        'populate[image][fields]': 'url',
        'populate[tags][populate]': '*',
        'populate[phases][populate][IconText][populate]': '*', 
      }
    });

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error(`Error cargando proyecto ${slug}:`, error);
    return null;
  }
}