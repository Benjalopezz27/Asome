/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				// Opción A: Crear una clase específica 'font-maax'
				maax: ['"Maax Regular"', 'sans-serif'],
				
				// Opción B: Si quieres que sea la fuente principal de todo el sitio,
				// reemplaza la 'sans' por defecto:
				//sans: ['"Maax Regular"', 'sans-serif'],
			},
		},
	},
	plugins: [],
}