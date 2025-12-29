interface Props {
  endpoint: string;
  query?: Record<string, any>; // Cambiado a 'any' para permitir números o booleanos
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchApi({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props) {
  // Limpieza de endpoint (quita barra inicial si existe)
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  // URL Base con fallback
  const STRAPI_URL = import.meta.env.STRAPI_URL || "http://localhost:1337";
  
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

  // Construcción de Query Params
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      // Si el valor es undefined o null, no lo enviamos
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.STRAPI_API_TOKEN || ""}`,
        "Content-Type": "application/json",
      },
    });

    // MEJORA CLAVE: Captura el error detallado de Strapi
    if (!res.ok) {
      let errorMessage = `Error HTTP ${res.status}`;
      try {
        const errorData = await res.json();
        // Strapi suele enviar el detalle en error.message
        errorMessage = errorData?.error?.message || errorData?.message || errorMessage;
        
        // Logueamos detalles técnicos para ayudarte a depurar
        console.error(`\n🚨 ERROR DE STRAPI (${res.status})`);
        console.error(`➤ Mensaje: ${errorMessage}`);
        console.error(`➤ URL: ${url.toString()}`);
        console.error(`➤ Detalles:`, JSON.stringify(errorData?.error?.details, null, 2));
        
      } catch (e) {
        // Si no es JSON, usamos el texto plano
        console.error(`Error en la petición: ${res.statusText}`);
      }
      
      throw new Error(errorMessage);
    }

    let data = await res.json();

    // Desempaquetado de datos
    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    if (wrappedByList) {
      data = data[0];
    }

    return data;

  } catch (error) {
    // Solo logueamos si es un error grave de red, los de Strapi ya se loguearon arriba
    if (error instanceof TypeError) {
        console.error(`❌ Error de Red o URL inválida:`, error);
    }
    // Retornamos null para no romper la UI, pero ya habrás visto el error en consola
    return wrappedByList ? [] : null;
  }
}