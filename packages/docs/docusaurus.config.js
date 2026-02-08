/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ultra Carousel',
  tagline: 'The Ultimate Carousel Ecosystem for React Native',
  favicon: 'img/favicon.ico',
  url: 'https://ultra-carousel.dev',
  baseUrl: '/',
  organizationName: 'toankhontech',
  projectName: 'react-native-ultra-carousel',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/toankhontech/react-native-ultra-carousel/tree/main/packages/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/toankhontech/react-native-ultra-carousel/tree/main/packages/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Ultra Carousel',
        items: [
          { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs' },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/toankhontech/react-native-ultra-carousel',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/docs/getting-started/installation' },
              { label: 'Presets', to: '/docs/presets/overview' },
              { label: 'API', to: '/docs/api/carousel-props' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/toankhontech/react-native-ultra-carousel' },
              { label: 'Discussions', href: 'https://github.com/toankhontech/react-native-ultra-carousel/discussions' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'npm', href: 'https://www.npmjs.com/package/react-native-ultra-carousel' },
              { label: 'Blog', to: '/blog' },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} toankhontech. Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
