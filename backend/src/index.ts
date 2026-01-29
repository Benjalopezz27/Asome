import type { Core } from '@strapi/strapi';
import { aboutPageSeedData, globalSeedData, homePageSeedData, navbarSeedData, servicesCategorySeedData, servicesSeedData, tagsSeedData } from './seeds/data';

// 🇦🇷 CONSTANTE PARA EL IDIOMA
const TARGET_LOCALE = 'es-AR';

const seedGlobal = async () => {
  const uid = "api::global.global";

  try {
    // 1. Buscamos si ya existe la versión en es-AR específicamente
    const existingGlobal = await strapi.entityService.findMany(uid, {
      populate: "*",
      locale: TARGET_LOCALE, // 👈 IMPORTANTE: Buscamos solo en este idioma
    });
    
    const globalEntry = Array.isArray(existingGlobal) ? existingGlobal[0] : existingGlobal;

    // --- LIMPIEZA DE DATOS ---
    

    // 3. Preparamos el Payload
    const payload = {
        ...globalSeedData,
      // 👇 AQUI FORZAMOS EL IDIOMA
      locale: TARGET_LOCALE, 
      
      publishedAt: new Date(),
    };

    // --- GUARDADO ---

    if (!globalEntry) {
      console.log(`🌍 [SEED] Creando Global (${TARGET_LOCALE})...`);
      await strapi.entityService.create(uid, {
        data: payload,
      });
      console.log("✅ [SEED] Global creado correctamente.");
    } else {
      console.log(`🌍 [SEED] Actualizando Global (${TARGET_LOCALE})...`);
      await strapi.entityService.update(uid, globalEntry.id, {
        data: payload,
      });
      console.log("✅ [SEED] Global actualizado correctamente.");
    }

  } catch (error) {
    console.error("❌ Error FATAL en seedGlobal:", error);
    if ((error as any).details) {
      console.error("🔍 Detalles del error:", JSON.stringify((error as any).details, null, 2));
    }
  }
};

const seedHome = async () => {
  const uid = "api::home-page.home-page";

  try {
    console.log(`🏠 [SEED] Iniciando carga de Home Page (${TARGET_LOCALE})...`);

    // 1. Buscamos los servicios reales
    // Nota: Asumimos que los servicios ya existen. Si los servicios tienen idioma, 
    // idealmente deberías filtrar también por locale aquí, pero por ahora lo dejamos genérico.
    const dbServices = await strapi.entityService.findMany("api::service.service");

    // 2. Procesamos y limpiamos los bloques
    const formattedBlocks = homePageSeedData.blocks.map((block: any) => {
      
      // --- LIMPIEZA GENERAL ---
      const { id, ...blockWithoutId } = block;

      // --- LOGICA ESPECÍFICA ---

      // A. HERO
      if (block.__component === "blocks.hero") {
        const { backgroundImage, titleImage, ...rest } = blockWithoutId;
        return rest;
      }

      // B. LOGO SLIDER
      if (block.__component === "blocks.logo-slider") {
        const cleanLogos = block.logos.map((item: any) => {
          const { id, image, ...restLogo } = item; 
          return restLogo;
        });
        return { ...blockWithoutId, logos: cleanLogos };
      }

      // C. SERVICE SECTION
      if (block.__component === "blocks.service-section") {
        const seedTitles = block.services.map((s: any) => s.title);
        
        const relatedIds = dbServices
          .filter((dbS) => seedTitles.includes(dbS.title))
          .map((dbS) => dbS.id);

        return { 
          ...blockWithoutId, 
          services: relatedIds 
        };
      }

      // D. STATS SECTION
      if (block.__component === "blocks.stats-section") {
        const cleanStats = block.stats.map((item: any) => {
          const { id, ...restStat } = item;
          return restStat;
        });
        return { ...blockWithoutId, stats: cleanStats };
      }

      // E. FEATURE GRID
      if (block.__component === "blocks.feature-grid") {
        const cleanFeatures = block.features.map((item: any) => {
          const { id, ...restFeature } = item;
          return restFeature;
        });
        return { ...blockWithoutId, features: cleanFeatures };
      }

      return blockWithoutId;
    });

    // 3. Preparamos el Payload
    const payload = {
      metaTitle: homePageSeedData.metaTitle,
      blocks: formattedBlocks,
      
      // 👇 AQUI FORZAMOS EL IDIOMA
      locale: TARGET_LOCALE,
      
      publishedAt: new Date(),
    };

    // 4. Guardar en Base de Datos (Buscando la versión en Español)
    const existingHome = await strapi.entityService.findMany(uid, { 
      populate: "*",
      locale: TARGET_LOCALE // 👈 Importante para no sobreescribir la versión en inglés si existiera
    });
    
    const homeEntry = Array.isArray(existingHome) ? existingHome[0] : existingHome;

    if (!homeEntry) {
      await strapi.entityService.create(uid, { data: payload });
      console.log("✅ [SEED] Home Page creada exitosamente.");
    } else {
      await strapi.entityService.update(uid, homeEntry.id, { data: payload });
      console.log("✅ [SEED] Home Page actualizada exitosamente.");
    }

  } catch (error) {
    console.error("❌ Error FATAL en seedHome:", error);
    if ((error as any).details) {
      console.error("🔍 Detalles del error:", JSON.stringify((error as any).details, null, 2));
    }
  }
};
const seedTags = async () => {
  const uid = "api::tag.tag";

  try {
    console.log(`🏷️ [SEED] Verificando Tags (${TARGET_LOCALE})...`);
    
    let createdCount = 0;

    for (const tag of tagsSeedData) {
      // 1. Verificamos si ya existe un tag con ese nombre Y en ese idioma
      const existingTags = await strapi.entityService.findMany(uid, {
        filters: {
          name: tag.name,
          locale: TARGET_LOCALE
        },
        locale: TARGET_LOCALE
      });

      // 2. Si NO existe (array vacío), lo creamos
      if (Array.isArray(existingTags) && existingTags.length === 0) {
        await strapi.entityService.create(uid, {
          data: {
            ...tag,
            locale: TARGET_LOCALE,
            publishedAt: new Date(),
          },
        });
        createdCount++;
      }
      // Si ya existe, no hacemos nada (el bucle continúa)
    }

    if (createdCount > 0) {
      console.log(`✅ [SEED] Se crearon ${createdCount} nuevos Tags.`);
    } else {
      console.log(`ℹ️ [SEED] Todos los Tags ya existían. No se hicieron cambios.`);
    }

  } catch (error) {
    console.error("❌ Error en seedTags:", error);
  }
};

// ==========================================
// 2. SEED SERVICES (Idempotente)
// ==========================================
const seedServices = async () => {
  const uid = "api::service.service";

  try {
    console.log(`💼 [SEED] Verificando Services (${TARGET_LOCALE})...`);

    let createdCount = 0;

    for (const service of servicesSeedData) {
      // 1. Verificamos existencia usando el SLUG (que debe ser único)
      const existingServices = await strapi.entityService.findMany(uid, {
        filters: {
          slug: service.slug,
          locale: TARGET_LOCALE
        },
        locale: TARGET_LOCALE
      });

      // 2. Si NO existe, preparamos datos y creamos
      if (Array.isArray(existingServices) && existingServices.length === 0) {
        
        // ⚠️ LIMPIEZA CRÍTICA:
        // Strapi falla si le pasas { coverImage: { url: '...' } } al crear.
        // Debemos quitar la propiedad coverImage del objeto antes de enviarlo.
        // También quitamos 'tags' porque en tu seed están vacíos, 
        // y si tuvieran datos, necesitaríamos IDs, no objetos.
        const { coverImage, tags, ...cleanServiceData } = service;

        await strapi.entityService.create(uid, {
          data: {
            ...cleanServiceData,
            // Si quisieras conectar tags aquí, deberías buscar sus IDs primero
            // tags: [], 
            locale: TARGET_LOCALE,
            publishedAt: new Date(),
          },
        });
        createdCount++;
      }
    }

    if (createdCount > 0) {
      console.log(`✅ [SEED] Se crearon ${createdCount} nuevos Servicios.`);
    } else {
      console.log(`ℹ️ [SEED] Todos los Servicios ya existían. No se hicieron cambios.`);
    }

  } catch (error) {
    console.error("❌ Error en seedServices:", error);
  }
};
const seedServiceCategories = async () => {
  // ⚠️ Verifica que este sea el UID real. 
  // Si tu carpeta es "service-category", suele ser este.
  const uid = "api::service-category.service-category"; 

  try {
    console.log(`🗂️ [SEED] Verificando Service Categories (${TARGET_LOCALE})...`);

    let createdCount = 0;

    for (const category of servicesCategorySeedData) {
      // 1. Buscamos si ya existe por SLUG y LOCALE
      const existingCategories = await strapi.entityService.findMany(uid, {
        filters: {
          slug: category.slug,
          locale: TARGET_LOCALE
        },
        locale: TARGET_LOCALE
      });

      // 2. Si no existe, la creamos
      if (Array.isArray(existingCategories) && existingCategories.length === 0) {
        await strapi.entityService.create(uid, {
          data: {
            ...category, // slug, badge, title, metaTitle
            locale: TARGET_LOCALE,
            publishedAt: new Date(), // Publicar inmediatamente
          },
        });
        createdCount++;
      }
    }

    if (createdCount > 0) {
      console.log(`✅ [SEED] Se crearon ${createdCount} nuevas Categorías.`);
    } else {
      console.log(`ℹ️ [SEED] Todas las Categorías ya existían.`);
    }

  } catch (error) {
    console.error("❌ Error en seedServiceCategories:", error);
    // Tip de debug por si el UID está mal
    console.log("👉 Si el error es 'model not found', revisa el string 'api::service-category.service-category'");
  }
};

const seedAboutPage = async () => {
  const uid = "api::about-page.about-page";

  try {
    console.log(`📖 [SEED] Verificando About Page (es-AR)...`);

    const existingPages = await strapi.entityService.findMany(uid, {
      filters: {
        locale: 'es-AR'
      },
      locale: 'es-AR',
      populate: "*" 
    });

    const aboutEntry = Array.isArray(existingPages) ? existingPages[0] : existingPages;

    // 2. LIMPIEZA Y TRANSFORMACIÓN
    const formattedBlocks = aboutPageSeedData.blocks.map((block: any) => {
      const { id, ...blockWithoutId } = block;

      // CASO 1: MEMBERS SECTION
      if (block.__component === 'blocks.members-section') {
        const cleanMembers = block.members?.map((member: any) => {
          // ⚠️ AQUÍ ESTÁ EL ARREGLO DEL ERROR 2:
          // Agregamos 'memberPicture' a la lista de cosas para eliminar.
          const { id, photo, image, avatar, memberPicture, ...restMember } = member;
          return restMember;
        }) || [];
        
        return { ...blockWithoutId, members: cleanMembers };
      }

      // CASO 2: MISSION BLOCK (Recuerda cambiar el nombre en data.ts a mission-vision)
      // Aquí aceptamos ambos nombres por seguridad en el if
      if (block.__component === 'blocks.mission-block' || block.__component === 'blocks.mission-vision') {
        
        const cleanMission = block.mission?.map((item: any) => {
          const { id, backGroundImage, ...rest } = item; 
          return rest;
        }) || [];

        const cleanVision = block.vision?.map((item: any) => {
          const { id, backGroundImage, ...rest } = item;
          return rest;
        }) || [];

        return { 
          ...blockWithoutId, 
          // Aseguramos que el componente tenga el nombre correcto para la DB
          __component: 'blocks.mission-vision', 
          mission: cleanMission, 
          vision: cleanVision 
        };
      }

      // CASO 3: FEATURE GRID
      if (block.__component === 'blocks.feature-grid') {
        const cleanFeatures = block.features?.map((feat: any) => {
          const { id, ...restFeat } = feat;
          return restFeat;
        }) || [];

        return { ...blockWithoutId, features: cleanFeatures };
      }

      return blockWithoutId;
    });

    const payload = {
      blocks: formattedBlocks,
      locale: 'es-AR',
      publishedAt: new Date(),
    };

    if (!aboutEntry) {
      console.log(`📖 [SEED] Creando About Page...`);
      await strapi.entityService.create(uid, { data: payload });
      console.log("✅ [SEED] About Page creada.");
    } else {
      console.log(`📖 [SEED] Actualizando About Page existente...`);
      await strapi.entityService.update(uid, aboutEntry.id, { data: payload });
      console.log("✅ [SEED] About Page actualizada.");
    }

  } catch (error) {
    console.error("❌ Error FATAL en seedAboutPage:", error);
    if ((error as any).details) {
      console.error("🔍 Detalles del error:", JSON.stringify((error as any).details, null, 2));
    }
  }
};
export default {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Es recomendable esperar a que terminen
    await seedTags();
    await seedServiceCategories();
    await seedServices();
    await seedGlobal();
    await seedHome();
    await seedAboutPage();
  }
};