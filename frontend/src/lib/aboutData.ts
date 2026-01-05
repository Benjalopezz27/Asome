// src/lib/data.ts
import fetchApi from './strapi';


const DEFAULT_LANG = 'es-AR'


export async function getAboutPageData(lang: string = DEFAULT_LANG) {
  try {
    const data = await fetchApi({
      endpoint: 'about-pages', 
      wrappedByKey: 'data',
      query: {
        locale: lang,
        
        'populate[blocks][on][blocks.members-section][populate][members][populate][memberPicture][fields]': 'url',
        'populate[blocks][on][blocks.mission-vision][populate][mission][populate]': '*',
        'populate[blocks][on][blocks.mission-vision][populate][backgroundImage][fields]': 'url',
        'populate[blocks][on][blocks.mission-vision][populate][vision][populate]': '*',
        'populate[blocks][on][blocks.feature-grid][populate][features][populate]': '*',
      }
    });

    const pageData = Array.isArray(data) ? data[0] : data;
    const attributes = pageData?.attributes || pageData;

    return {
      blocks: attributes?.blocks || [],
      metaTitle: attributes?.title || 'About Us'
    };

  } catch (error) {
    console.error("Error loading AboutPage data:", error);
    return { blocks: [], metaTitle: 'About Us' };
  }
}