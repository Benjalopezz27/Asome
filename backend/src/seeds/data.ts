// src/seeds/data.ts
import type { 
  NavbarLink, 
  NavbarDropdown, 
  HomePageData, 
  Project, 
  TeamMember,
  Service,
  HeroPageData,
  Tag
} from '../seeds/types';

// =====================================================================
// 1. NAVBAR DATA
// =====================================================================


export const navbarSeedData: (Omit<NavbarLink, 'id'> | Omit<NavbarDropdown, 'id'>)[] = [
  {
    __component: 'elements.dropdown',
    label: 'Servicios',
    Links: [
      {
        id: 0,
        __component: 'elements.navbar-links',
        label: 'Software',
        url: '/services/software',
        isExternal: false,
      },
      {
        id: 0,
        __component: 'elements.navbar-links',
        label: 'Diseño ',
        url: '/services/design',
        isExternal: false,
      },
      {
        id: 0,
        __component: 'elements.navbar-links',
        label: 'Marketing',
        url: '/services/marketing',
        isExternal: false,
      }
    ],
  },
  {
    __component: 'elements.navbar-links',
    label: 'Proyectos',
    url: '/projects',
    isExternal: false,
  },
  {
    __component: 'elements.dropdown',
    label: 'nosotros',
    Links: [
      {id: 0,
        __component: 'elements.navbar-links',
        label: 'Por qué Asome?',
        url: '/about',
        isExternal: false,
      },
      {id: 0,
        __component: 'elements.navbar-links',
        label: 'Trabajá con nosotros',
        url: '/about/work-with-us',
        isExternal: false,
      }
    ],
  },
  {
    __component: 'elements.navbar-links',
    label: 'Contacto',
    url: '/contact',
    isExternal: false,
  },
];

// =====================================================================
// 2. HOME PAGE DATA (Dynamic Zone Blocks)
// =====================================================================

export const homePageSeedData: Omit<HomePageData, 'id'> = {
  metaTitle: 'Asome - Automatización y Software',
  blocks: [
    // --- BLOCK: HERO ---
    {
      __component: 'blocks.hero',
      id: 0, // Placeholder
      titleImage: { url: '/uploads/hero-title.png' }, // Sube esta imagen manualmente o por script
      subtitle: 'Deja de pelear con tus procesos. Empieza a escalar con automatización.',
      backgroundImage: { url: '/uploads/hero-bg.jpg' },
      buttonText: 'Agenda tu asesoría',
      buttonLink: '/contact',
      badge: 'Software, diseño y marketing para escalar tu empresa.',
    },
    // --- BLOCK: LOGO SLIDER ---
    {
      __component: 'blocks.logo-slider',
      id: 0,
      title: 'Marcas que ya trabajaron con nosotros',
      logos: [
        { id: 0, name: 'KTM', image: { url: '/uploads/logo1.png' } },
        { id: 0, name: 'Husqavarna', image: { url: '/uploads/logo2.png' } },
        { id: 0, name: 'Zeitune Inmobiliaria', image: { url: '/uploads/logo2.png' } },
        { id: 0, name: 'Flexigom', image: { url: '/uploads/logo2.png' } },
      ],
    },
     // --- BLOCK: STATS SECTION ---
    {
      __component: 'blocks.stats-section',
      id: 0,
      title: 'Transformamos marcas en experiencias digitales.',
      description: 'Combinamos ingeniería, estrategia y diseño para impulsar tu escalabilidad.',
      stats: [
        { id: 0, number: 15, suffix: '+', label: 'Clientes' },
        { id: 0, number: 10, suffix: '+', label: 'Operaciones Transformadas' },
        { id: 0, number: 35, suffix: '+', label: 'Especialistas' },
      ],
      buttonText: 'Casos de Éxito',
      buttonUrl: '/projects',
    },
    // --- BLOCK: FEATURE GRID ---
    {
      __component: 'blocks.feature-grid',
      id: 0,
      title: '¿Por qué elegirnos?',
      badge: 'Nuestros Valores',
      features: [
        { id: 0, title: 'Velocidad', description: 'Entregas rápidas y eficientes.' },
        { id: 0, title: 'Calidad', description: 'Código limpio y escalable.' },
        { id: 0, title: 'Soporte', description: 'Acompañamiento post-venta.' },
      ],
    },
   
    // --- BLOCK: NEWSLETTER ---
    {
      __component: 'blocks.newsletter',
      id: 0,
      title: 'Recibí herramientas para crecer tu negocio.',
      description: 'Sumérgete en una selección exclusiva de artículos que te ayudarán a potenciar tu empresa.',
      placeholder: 'Email',
      buttonText: 'Suscribirse',
    },
  ],
};

// =====================================================================
// 3. PROJECTS DATA (Collection Type)
// =====================================================================

export const projectsSeedData: Omit<Project, 'id'>[] = [
  {
    title: 'Plataforma Médica Integral',
    slug: 'plataforma-medica',
    introduction: 'Sistema de gestión para insumos ortopédicos.',
    description: 'Desarrollamos una plataforma completa que permite gestionar stock...',
    url: 'https://cliente.com',
    buttonText: 'Ver Sitio Web',
    buttonIcon: 'arrow-right',
    imagePosition: 'right',
    image: { url: '/uploads/project1-main.jpg' },
    imageDescription: { url: '/uploads/project1-detail.jpg', alternativeText: 'Detalle del dashboard' },
    tags: [
      { id: 0, name: 'Angular', icon: 'angular-icon' },
      { id: 0, name: 'NestJS', icon: 'nestjs-icon' },
    ],
    phases: [
      {
        id: 0,
        PhaseName: 'Discovery',
        description: 'Análisis de requerimientos y diseño UX.',
        descriptionPosition: 'left',
        IconText: [
          { id: 0, text: 'Brainstorming', icon: 'brain' },
          { id: 0, text: 'Wireframing', icon: 'pencil' },
        ],
      },
      {
        id: 0,
        PhaseName: 'Desarrollo',
        description: 'Implementación del código frontend y backend.',
        descriptionPosition: 'right',
        IconText: [
          { id: 0, text: 'Frontend', icon: 'code' },
          { id: 0, text: 'API Rest', icon: 'server' },
        ],
      },
    ],
  },
  {
    title: 'E-commerce Genérico',
    slug: 'ecommerce-app',
    introduction: 'Tienda online escalable con pasarela de pagos.',
    description: 'Una solución robusta para ventas online...',
    imagePosition: 'left',
    image: { url: '/uploads/project2-main.jpg' },
    phases: [], // Sin fases detalladas
    tags: [],
  }
];

// =====================================================================
// 4. TEAM MEMBERS DATA (Collection Type)
// =====================================================================

export const teamSeedData: Omit<TeamMember, 'id'>[] = [
  {
    name: 'Juan Pablo',
    role: 'CEO & Founder',
    linkedinUrl: 'https://linkedin.com/in/tu-perfil',
    linkedinIcon: 'linkedin',
    memberPicture: {
      data: {
        attributes: {
          url: '/uploads/juanpablo.jpg',
          alternativeText: 'Foto de Juan Pablo',
        },
      },
    },
  },
  {
    name: 'Andres',
    role: 'Analista de Marketing',
    linkedinUrl: 'https://linkedin.com',
    linkedinIcon: 'linkedin',
    memberPicture: {
      data: {
        attributes: {
          url: '/uploads/member2.jpg',
          alternativeText: 'Foto de desarrollador',
        },
      },
    },
  },
  {
    name: 'Felicitas',
    role: 'Diseñadora',
    linkedinUrl: 'https://linkedin.com',
    linkedinIcon: 'linkedin',
    memberPicture: {
      data: {
        attributes: {
          url: '/uploads/member3.jpg',
          alternativeText: 'Foto de Felicitas',
        },
      },
    },
  },
  {
    name: 'Solana',
    role: 'Creadora de Contenido',
    linkedinUrl: 'https://linkedin.com',
    linkedinIcon: 'linkedin',
    memberPicture: {
      data: {
        attributes: {
          url: '/uploads/member4.jpg',
          alternativeText: 'Foto de Solana',
        },
      },
    },
  }
];

// =====================================================================
// 5. SERVICES DATA (Si son Collection Type)
// =====================================================================

export const servicesSeedData: Omit<Service, 'id'>[] = [
  {
    title: 'Apps Móviles',
    slug: 'apps-moviles',
    category: 'software',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [], 
  },
  {
    title: 'Apps Móviles',
    slug: 'apps-moviles',
    category: 'design',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [], 
  },
  {
    title: 'Cloud Computing',
    slug: 'cloud-computing',
    category: 'software',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'Diseño Gráfico',
    slug: 'diseno-grafico',
    category: 'none',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'IA & Automation',
    slug: 'ia-automation',
    category: 'software',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'Manejo de Redes Sociales',
    slug: 'manejo-redes-sociales',
    category: 'marketing',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'Manuales de marca',
    slug: 'manuales-marca',
    category: 'design',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'Marketing Digital',
    slug: 'marketing-digital',
    category: 'none',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'SEM',
    slug: 'sem',
    category: 'marketing',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'SEO',
    slug: 'seo',
    category: 'marketing',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'Sistemas y Desarrollo a Medida',
    slug: 'sistemas-desarrollo-medida',
    category: 'none',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'UX/UI',
    slug: 'ux-ui',
    category: 'design',
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
];

// =====================================================================
// 6. TAGS DATA (Collection Type)
// =====================================================================

export const tagsSeedData: Omit<Tag, 'id'>[] = [
  { name: 'Apps móviles', icon: 'smartphone' },
  { name: 'Branding e identidad visual', icon: 'brush' },
  { name: 'Cloud Computing', icon: 'cloud' },
  { name: 'Consultoria', icon: 'chartPie' },
  { name: 'Diseño de contenido gráfico', icon: 'brush' },
  { name: 'Diseño de RRSS', icon: 'cube' },
  { name: 'Diseño Publicitario', icon: 'image' },
  { name: 'Diseño UI', icon: 'image' },
  { name: 'Ecommerce', icon: 'ecommerce' },
  { name: 'Estrategia Digital', icon: 'stadistics' },
  { name: 'IA & Automation', icon: 'bot' },
  { name: 'Identidad visual', icon: 'brush' },
  { name: 'Paid Media', icon: 'chartPie' },
  { name: 'SEO', icon: 'seo' },
  { name: 'Sitios Web personalizados', icon: 'screen' },
  { name: 'Social Media', icon: 'cube' },
  { name: 'Tiendas Online', icon: 'ecommerce' },
];