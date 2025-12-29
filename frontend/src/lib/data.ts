// src/lib/data.ts
import fetchApi from './strapi';
import { type MenuItem, type NavbarLink } from '../types';



export async function getNavbarData() {
  try {
    const response = await fetchApi({
      endpoint: 'global',
      wrappedByKey: 'data',
      query: {
        'populate[navbarCta][populate]': '*',
        'populate[mainMenu][on][elements.navbar-links][populate]': '*',
        'populate[mainMenu][on][elements.dropdown][populate][Links]': '*'
      }
    });

    // ⚠️ DEBUG: Descomenta esto si sigue sin salir nada y mira la consola de la terminal
    // console.log("Datos recibidos de Strapi:", JSON.stringify(response, null, 2));

    // CORRECCIÓN PARA STRAPI 5:
    // Strapi 5 devuelve los datos planos, Strapi 4 dentro de 'attributes'.
    // Esta línea maneja ambos casos:
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