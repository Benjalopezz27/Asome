export interface NavbarLink {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
  __component: 'elements.navbar-links';
}

export interface NavbarDropdown {
  id: number;
  label: string;
  Links: NavbarLink[]; 
  __component: 'elements.dropdown';
}

export type MenuItem = NavbarLink | NavbarDropdown;

export interface FeatureCard {
  id: number;
  title: string;
  description: string;
}

export interface FeatureGridBlock {
  id: number;
  __component: 'blocks.feature-grid';
  badge?: string;
  title: string;
  features: FeatureCard[];
}

export interface StatCard {
  id: number;
  number: number;
  suffix?: string;
  label: string;
}

export interface StatsSectionBlock {
  id: number;
  __component: 'blocks.stats-section'; 
  title: string;
  description: string;
  stats: StatCard[];
  buttonText?: string;
  buttonUrl?: string;
}
export interface Tag {
  id: number;
  name: string;
  icon: string;
}

export interface ServiceSectionBlock {
  id: number;
  __component: 'blocks.service-section';
  title: string;
  badge?: string;
  services: Service[];
}

export type AnyBlock =  MembersSectionBlock |FeatureGridBlock | StatsSectionBlock | ServiceSectionBlock | LogoSliderBlock | HeroBlock | NewsletterBlock; 

export interface HomePageData {
  metaTitle: string
  blocks: AnyBlock[]
}
export interface LogoItem {
  id: number;
  name: string;
  image: {
    url: string;
  };
}

export interface LogoSliderBlock {
  id: number;
  __component: 'blocks.logo-slider';
  title: string;
  logos: LogoItem[];
}
export interface HeroBlock {
  id: number;
  __component: 'blocks.hero';
  title: string; 
  subtitle?: string;
  backgroundImage?:{
    url: string;
  };
  buttonText?: string;
  buttonLink?: string;
  badge?: string;
}
export interface NewsletterBlock {
  id: number;
  __component: 'blocks.newsletter';
  title: string;
  description: string;
  placeholder?: string;
  buttonText?: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  category: 'software' | 'design' | 'marketing' | 'none'; 
  imagePosition: 'left' | 'right';
  coverImage: {
    url: string;
  };
  tags: Tag[];
}
export interface CategoryData {
  slug: string;
  badge: string;
  title: string;
  metaTitle: string;
}
export interface HeroPageData {
  id: number;
  slug: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
  tags?: Tag[];
  backgroundImage?: {
    url: string;
  };
  buttonIcon?: string;
}

export interface GlobalData {
  heroPages: HeroPageData[];
}
export interface IconTextItem {
  id: number;
  text: string;
  icon: string;
}

export interface ProjectPhase {
  id: number;
  PhaseName: string;
  description: string;
  IconText: IconTextItem[]; 
  descriptionPosition: 'left' | 'right';
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  introduction: string;
  url?: string;
  buttonText?: string;
  buttonIcon?: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  imageDescription?: {
    url: string;
    alternativeText?: string;
  };
  tags?: {
    id: number;
    name: string;
    icon: string;
  }[];
  phases: ProjectPhase[]; 
  imagePosition: 'left' | 'right';
}
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  linkedinUrl?: string;
  linkedinIcon?: string; 
  memberPicture: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      }
    }
  };
}

export interface MembersSectionBlock {
  __component: 'blocks.members-section';
  id: number;
  members: TeamMember[];
}
export interface MissionItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  backGroundImage: {
    url: string;
  };
}