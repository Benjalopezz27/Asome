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

