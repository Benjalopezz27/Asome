import { HeroBlock, StatsSectionBlock, FeatureGridBlock, NewsletterBlock, aboutBlocks } from './types';
// src/seeds/data.ts
import type { 
  navbarCta,
  NavbarLink, 
  NavbarDropdown, 
  HomePageData, 
  Project, 
  TeamMember,
  Service,
  HeroPageData,
  Tag,
  globalBlocks,
  homeBlocks,
  CategoryData,
  MissionItem,
  aboutPageData,
  
} from './types'; // 👈 Asegúrate que apunte a tu archivo local de types

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
        label: 'Diseño',
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
      {
        id: 0,
        __component: 'elements.navbar-links',
        label: 'Por qué Asome?',
        url: '/about',
        isExternal: false,
      },
      {
        id: 0,
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
// 3. GLOBAL DATA
// =====================================================================

export const globalSeedData: Omit<globalBlocks, 'id'> = {
  navbarCta: {
    label: 'Contacto',
    url: '/contact',
    isExternal: false,
  },
  mainMenu: navbarSeedData,
  HeroPages: [
      {
        slug: 'about',
        title: 'Conoce nuestros casos de exito',
        description: 'Unimos estrategia y diseño para materializar soluciones'
      },
      {
        slug: 'services',
        title: 'Nuestros Servicios',
        description: 'Combinamos estrategia, diseño y tecnología para crear soluciones digitales que impulsan resultados.'
      },
      
    ]  
}
// =====================================================================
// 2. HOME PAGE DATA
// =====================================================================
export const homePageSeedData: HomePageData = {
    // --- BLOCK: HERO ---   
    metaTitle: 'Inicio - Asome',
    blocks: [    
  {
      __component: 'blocks.hero',
      id: 0, 
      title: 'Dejá de pelear con tus procesos. Empezá a escalar con automatización.', 
      subtitle: 'Sin costo y sin compromiso.',
      backgroundImage: { url: '/uploads/hero-bg.jpg' },
      buttonText: 'Agenda tu asesoría',
      buttonUrl: '/contact',
      badge: 'Software, diseño y marketing para escalar tu empresa.',
    },
    // --- BLOCK: LOGO SLIDER ---
    
    {
      __component: 'blocks.logo-slider',
      id: 0,
      title: 'Marcas que ya trabajaron con nosotros',
      logos: [
        { id: 0, name: 'KTM', image: { url: '/uploads/KTM.png' } },
        { id: 0, name: 'Husqvarna', image: { url: '/uploads/Husqvarna.png' } }, // Corregido typo
        { id: 0, name: 'Flexigom', image: { url: '/uploads/Flexigom.png' } },
      ],
    },
    {
      __component: 'blocks.service-section',
      id: 0,
      title: 'Soluciones digitales que marcan un antes y después en tu negocio',
      badge: 'NUESTROS SERVICIOS',
      services: [
        
      ]
    },
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
        { id: 0, title: 'Excelencia', description: 'Altos estándares de entrega' },
        { id: 0, title: 'Metodología', description: 'Para potenciar la innovación' },
        { id: 0, title: 'Agilidad', description: 'Mejora continua como base de todos nuestros procesos' },
        { id: 0, title: 'Ingeniería', description: 'Software adaptado a tus procesos' },
        { id: 0, title: 'Transparencia', description: 'Sin tecnicismos, solo resultados claros' },
        { id: 0, title: 'Escalabilidad', description: 'Tecnología que impulsa al crecimiento' },
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
  ]
};

// =====================================================================
// 4. ABOUT PAGE DATA
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
export const missionVisionBlock = {
  __component: 'blocks.mission-vision', // ⚠️ Verifica que este sea el nombre real en tu Schema
  id: 0,
  
  mission: [
    {
      
      badge: 'MISIÓN',
      title: 'Nuestra Misión',
      description: 'Brindar soluciones integrales de software, marketing y diseño que trasciendan lo visual. Queremos generar resultados reales, donde cada decisión creativa esté respaldada por datos y orientada al máximo performance.',
      
    },
  ],

  vision: [
    {
      badge: 'VISIÓN',
      title: 'Nuestra Visión',
      description: 'Liderar la evolución digital de las empresas, redefiniendo los estándares con los que las marcas se proyectan, conectan y escalan para alcanzar un crecimiento sin límites.',
    },
  ],
};
export const aboutPageSeedData: aboutPageData  = {
  blocks: [
    {
      __component: 'blocks.members-section',
        members: teamSeedData,
    },
    {
      __component: 'blocks.mission-vision',
        mission: missionVisionBlock.mission,
        vision: missionVisionBlock.vision,
    },
    {
      __component: 'blocks.feature-grid',
      badge: 'Nuestros Valores',
      title: '¿Por qué elegir Asome?',
      features: [
        {  title: 'Igualdad', description: 'ACreemos en una cultura horizontal donde cada voz tiene el mismo peso. En Asome no hay jerarquías, sino un equipo de pares colaborando con un propósito común.' },
        {  title: 'Autonomía', description: 'Empoderamos el talento. Confiamos en la capacidad de nuestro equipo para tomar decisiones con criterio propio, fomentando la responsabilidad y la excelencia en cada paso.' },
        {
          title: 'Pertenencia', description: 'Más que socios, somos una comunidad. No te vemos como un cliente, sos parte de Asome: aquí trabajamos codo a codo para que tu proyecto sea también el nuestro.'
        },
        {
          title: 'Organización', description: 'Nada queda librado al azar. Trabajamos bajo un método riguroso, con planes estratégicos y objetivos claros que aseguran resultados tangibles.'
        },
        {
          title: 'Transparencia', description: 'Construimos relaciones basadas en la verdad. La honestidad y la comunicación abierta son los pilares fundamentales que sostienen nuestro vínculo con vos y con nuestro equipo.'
        }

  ]}
  ],
};

// =====================================================================
// 5. SERVICES DATA
// =====================================================================
export const servicesCategorySeedData: Omit<CategoryData, 'id'>[] = [
  { slug: 'software', badge: 'DESARROLLO DE SOFTWARE', title: 'Marcamos un antes y un después en tu negocio.', metaTitle: 'Servicios de Software - Asome'},
  { slug: 'design', badge: 'DISEÑO GRÁFICO', title: 'Marcamos un antes y un después en tu negocio.', metaTitle: 'Servicios de Diseño - Asome'},
  { slug: 'marketing', badge: 'MARKETING DIGITAL', title: 'Marcamos un antes y un después en tu negocio.', metaTitle: 'Servicios de Marketing - Asome'},
  
]
export const servicesSeedData: Omit<Service, 'id'>[] = [
    {
    title: 'Sistemas y Desarrollo a Medida',
    slug: 'sistemas-desarrollo-medida',
    category: 'none', // CAMBIO: 'none' no existe en tus types
    imagePosition: 'right',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'Diseño Gráfico',
    slug: 'diseno-grafico',
    category: 'none', // CAMBIO: 'none' no existe en tus types
    imagePosition: 'left',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
{
    title: 'Marketing Digital',
    slug: 'marketing-digital',
    category: 'none', // CAMBIO: 'none' no existe en tus types
    imagePosition: 'right',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  ,{
    title: 'Apps Móviles',
    slug: 'apps-moviles',
    category: 'software',
    imagePosition: 'right',
    tags: [], 
  },
  {
    title: 'Diseño de Apps', // CAMBIO: Título distinto para evitar confusión
    slug: 'diseno-apps',     // CAMBIO: Slug único (antes era apps-moviles duplicado)
    category: 'design',
    imagePosition: 'right',
    tags: [], 
  },
  {
    title: 'Cloud Computing',
    slug: 'cloud-computing',
    category: 'software',
    imagePosition: 'right',
    tags: [],
  },
  
  {
    title: 'IA & Automation',
    slug: 'ia-automation',
    category: 'software',
    imagePosition: 'left',
    tags: [],
  },
  {
    title: 'Manejo de Redes Sociales',
    slug: 'manejo-redes-sociales',
    category: 'marketing',
    imagePosition: 'right',
    coverImage: { url: '/uploads/placeholder-service.jpg' },
    tags: [],
  },
  {
    title: 'Manuales de marca',
    slug: 'manuales-marca',
    category: 'design',
    imagePosition: 'right',
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
    imagePosition: 'right',
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
// 6. TAGS DATA
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