import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_newsletters';
  info: {
    displayName: 'Newsletter';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    placeholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsDropdown extends Struct.ComponentSchema {
  collectionName: 'components_elements_dropdowns';
  info: {
    displayName: 'Dropdown';
  };
  attributes: {
    label: Schema.Attribute.String;
    Links: Schema.Attribute.Component<'elements.navbar-links', true>;
  };
}

export interface ElementsNavbarLinks extends Struct.ComponentSchema {
  collectionName: 'components_elements_navbar_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.newsletter': BlocksNewsletter;
      'elements.dropdown': ElementsDropdown;
      'elements.navbar-links': ElementsNavbarLinks;
    }
  }
}
