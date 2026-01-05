interface Props {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchApi({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props) {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const STRAPI_URL = import.meta.env.STRAPI_URL || "http://localhost:1337";
  
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
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

    if (!res.ok) {
      let errorMessage = `Error HTTP ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData?.error?.message || errorData?.message || errorMessage;
        
        console.error(`\n🚨 ERROR DE STRAPI (${res.status})`);
        console.error(`➤ Mensaje: ${errorMessage}`);
        console.error(`➤ URL: ${url.toString()}`);
        console.error(`➤ Detalles:`, JSON.stringify(errorData?.error?.details, null, 2));
        
      } catch (e) {
        console.error(`Error en la petición: ${res.statusText}`);
      }
      
      throw new Error(errorMessage);
    }

    let data = await res.json();

    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    if (wrappedByList) {
      data = data[0];
    }

    return data;

  } catch (error) {
    if (error instanceof TypeError) {
        console.error(`❌ Error de Red o URL inválida:`, error);
    }
    return wrappedByList ? [] : null;
  }
}