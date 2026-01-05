# 🚀 Asome - Astro Corporate Website

Este es el repositorio del sitio web corporativo desarrollado con **Astro**, **Tailwind CSS** y **TypeScript**. El contenido es gestionado dinámicamente a través de un CMS **Strapi**.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.14.1 o superior.
- **npm** (o yarn/pnpm).
- **Backend Strapi**: Debes tener una instancia de Strapi corriendo localmente o en producción.

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-de-tu-repo>
cd <nombre-de-la-carpeta>
2. Instalar dependencias
Bash

npm install
3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto (puedes copiar el .env.example si existe) y define la URL de tu API de Strapi.

Archivo .env:

Fragmento de código

# URL de tu backend Strapi (Local o Producción)
PUBLIC_STRAPI_URL=http://localhost:1337
Nota: Es importante el prefijo PUBLIC_ para que Astro pueda acceder a la variable en el cliente si es necesario, aunque principalmente se usa en tiempo de compilación (build time).

4. Configurar Fuentes (Tipografía)
El proyecto utiliza la fuente Maax. Debido a licencias, los archivos de fuente no siempre se incluyen en el repositorio público.

Asegúrate de tener los archivos .otf (o .woff2) en la siguiente ruta: public/fonts/

MaaxTrial-Normal.otf (Peso 400)

MaaxTrial-Medium.otf (Peso 500)

MaaxTrial-Bold.otf (Peso 700)

etc.

▶️ Ejecutar en Desarrollo
Para iniciar el servidor de desarrollo local:

Bash

npm run dev
El sitio estará disponible en http://localhost:4321.

🏗️ Construcción para Producción
Astro es un generador de sitios estáticos (SSG) por defecto (a menos que hayas activado SSR). Para generar los archivos estáticos finales:

Bash

npm run build
Esto creará una carpeta dist/ lista para ser desplegada en Vercel, Netlify, AWS S3, etc.

Para previsualizar la build localmente:

Bash

npm run preview
```
