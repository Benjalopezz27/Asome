import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_grids';
  info: {
    displayName: 'FeatureGrid';
  };
  attributes: {
    badge: Schema.Attribute.String;
    features: Schema.Attribute.Component<'elements.feature-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    badge: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    titleImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface BlocksHeroPages extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_pages';
  info: {
    displayName: 'HeroPages';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    buttonIcon: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    slug: Schema.Attribute.String;
    tags: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksLogoSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logo_sliders';
  info: {
    displayName: 'logoSlider';
  };
  attributes: {
    logos: Schema.Attribute.Component<'elements.logo', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksMembersSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_members_sections';
  info: {
    displayName: 'membersSection';
  };
  attributes: {
    members: Schema.Attribute.Component<'elements.team-member-card', true>;
  };
}

export interface BlocksMissionVision extends Struct.ComponentSchema {
  collectionName: 'components_blocks_mission_visions';
  info: {
    displayName: 'MissionVision';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mission: Schema.Attribute.Component<'elements.mission-item', true>;
    vision: Schema.Attribute.Component<'elements.mission-item', true>;
  };
}

export interface BlocksNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_newsletters';
  info: {
    displayName: 'Newsletter';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksProjectPhase extends Struct.ComponentSchema {
  collectionName: 'components_blocks_project_phases';
  info: {
    displayName: 'projectPhase';
  };
  attributes: {
    description: Schema.Attribute.Text;
    descriptionPosition: Schema.Attribute.Enumeration<['right', 'left']>;
    IconText: Schema.Attribute.Component<'elements.icon-text', true>;
    PhaseName: Schema.Attribute.String;
  };
}

export interface BlocksServiceSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_service_sections';
  info: {
    displayName: 'ServiceSection';
  };
  attributes: {
    badge: Schema.Attribute.String;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats_sections';
  info: {
    displayName: 'StatsSection';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    stats: Schema.Attribute.Component<'elements.stats-card', true>;
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

export interface ElementsFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_cards';
  info: {
    displayName: 'FeatureCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsIconText extends Struct.ComponentSchema {
  collectionName: 'components_elements_icon_texts';
  info: {
    displayName: 'iconText';
  };
  attributes: {
    icon: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface ElementsMissionItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_mission_items';
  info: {
    displayName: 'missionItem';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
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

export interface ElementsStatsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_stats_cards';
  info: {
    displayName: 'StatsCard';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.Integer;
    suffix: Schema.Attribute.String;
  };
}

export interface ElementsTeamMemberCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_team_member_cards';
  info: {
    displayName: 'teamMemberCard';
  };
  attributes: {
    linkedinIcon: Schema.Attribute.String;
    linkedinUrl: Schema.Attribute.String;
    memberPicture: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.feature-grid': BlocksFeatureGrid;
      'blocks.hero': BlocksHero;
      'blocks.hero-pages': BlocksHeroPages;
      'blocks.logo-slider': BlocksLogoSlider;
      'blocks.members-section': BlocksMembersSection;
      'blocks.mission-vision': BlocksMissionVision;
      'blocks.newsletter': BlocksNewsletter;
      'blocks.project-phase': BlocksProjectPhase;
      'blocks.service-section': BlocksServiceSection;
      'blocks.stats-section': BlocksStatsSection;
      'elements.dropdown': ElementsDropdown;
      'elements.feature-card': ElementsFeatureCard;
      'elements.icon-text': ElementsIconText;
      'elements.logo': ElementsLogo;
      'elements.mission-item': ElementsMissionItem;
      'elements.navbar-links': ElementsNavbarLinks;
      'elements.stats-card': ElementsStatsCard;
      'elements.team-member-card': ElementsTeamMemberCard;
    }
  }
}
