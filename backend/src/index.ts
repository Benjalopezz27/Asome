import {
  homePageSeedData,
  projectsSeedData,
  // teamSeedData, // ⚠️ Si 'Members' no está en tu lista, coméntalo o agrégalo a 'aboutPage'
  servicesSeedData,
  tagsSeedData,
  navbarSeedData 
} from '../../backend/src/seeds/data'; 
import type { Core } from '@strapi/strapi';

export default {
  register(/*{ strapi }*/) {},

  // Usamos Core.Strapi
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    
    // --- FUNCIÓN HELPER ---
    const shouldSeed = async (uid: string) => {
      try {
        const count = await strapi.entityService.count(uid as any);
        return count === 0;
      } catch (error) {
        console.error(`❌ Error verificando UID ${uid}.`, error);
        return false;
      }
    };

    console.log("🌱 [SEED] Iniciando carga de datos para ASOME...");

    try {
      // ============================================================
      // 1. SEED DE TAGS (Collection Type)
      // UID: api::tag.tag
      // ============================================================
      if (await shouldSeed("api::tag.tag")) {
        console.log("   Creating Tags...");
        for (const tag of tagsSeedData) {
          await strapi.entityService.create("api::tag.tag", { data: tag });
        }
      }

      // ============================================================
      // 2. SEED DE SERVICE CATEGORIES (Opcional - Si tienes datos)
      // UID: api::service-category.service-category
      // ============================================================
      // Si tienes categorías definidas, deberías crearlas aquí antes que los servicios.
      
      // ============================================================
      // 3. SEED DE SERVICES (Collection Type)
      // UID: api::service.service
      // ============================================================
      if (await shouldSeed("api::service.service")) {
        console.log("   Creating Services...");
        for (const service of servicesSeedData) {
          await strapi.entityService.create("api::service.service", { data: service as any });
        }
      }

      // ============================================================
      // 4. SEED DE PROJECTS (Collection Type)
      // UID: api::project.project
      // ============================================================
      if (await shouldSeed("api::project.project")) {
        console.log("   Creating Projects...");
        for (const project of projectsSeedData) {
          await strapi.entityService.create("api::project.project", { data: project as any });
        }
      }

      // ============================================================
      // 5. SEED DE HOME PAGE (Collection Type según tu imagen)
      // UID: api::home-page.home-page
      // ============================================================
      // Al ser Collection Type, usamos create si el count es 0.
      if (await shouldSeed("api::home-page.home-page")) {
        console.log("   Creating Home Page...");
        await strapi.entityService.create("api::home-page.home-page" as any, {
          data: homePageSeedData as any,
        });
      }

      // ============================================================
      // 6. SEED DE ABOUT PAGE (Collection Type)
      // UID: api::about-page.about-page
      // ============================================================
      if (await shouldSeed("api::about-page.about-page")) {
         console.log("   Creating About Page...");
         // Necesitas definir aboutPageSeedData en tu data.ts o usar un placeholder
         await strapi.entityService.create("api::about-page.about-page" as any, {
           data: {
             title: "Nosotros",
             description: "Somos Asome...",
             // ... otros campos obligatorios
           }
         });
      }

      // ============================================================
      // 7. SEED DE GLOBAL (Single Type)
      // UID: api::global.global
      // Contiene: Navbar, Footer, SEO Global
      // ============================================================
      const global = await strapi.entityService.findMany("api::global.global");
      
      if (!global) {
        console.log("   Creating Global (Navbar & Footer)...");
        await strapi.entityService.create("api::global.global" as any, {
          data: {
            siteName: "Asome",
            favicon: null, // O tu imagen
            // Aquí inyectamos la Navbar dentro del componente Global
            // Asegúrate que el campo se llame 'navbar' o 'menuItems' según tu Schema
            
          },
        });
      }

      console.log("✅ [SEED] Proceso completado con éxito.");

    } catch (error) {
      console.error("❌ [SEED] Error fatal:", error);
    }
  },
};