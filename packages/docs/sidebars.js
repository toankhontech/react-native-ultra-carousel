/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/quick-start', 'getting-started/expo-setup'],
    },
    {
      type: 'category',
      label: 'Presets',
      items: ['presets/overview', 'presets/basic', 'presets/advanced', 'presets/creative'],
    },
    {
      type: 'category',
      label: 'API',
      items: ['api/carousel-props', 'api/hooks', 'api/pagination', 'api/plugins'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/custom-animations',
        'guides/performance',
        'guides/accessibility',
        'guides/migration-snap-carousel',
        'guides/migration-reanimated-carousel',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: ['examples/ecommerce', 'examples/image-gallery', 'examples/onboarding', 'examples/stories'],
    },
  ],
};

module.exports = sidebars;
