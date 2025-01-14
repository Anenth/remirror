// @ts-check

const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Remirror',
  tagline: pkg.description,
  url: 'https://remirror.io',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'remirror', // Usually your GitHub org/user name.
  projectName: 'remirror', // Usually your repo name.
  onBrokenLinks: 'warn',
  themeConfig: {
    image: 'img/logo-dark.png',
    colorMode: {
      // "light" | "dark"
      defaultMode: 'light',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,
    },
    // announcementBar: {
    //   id: 'support_us',
    //   content:
    //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
    //   backgroundColor: '#fafbfc',
    //   textColor: '#091E42',
    //   isCloseable: false,
    // },
    navbar: {
      logo: {
        alt: 'Remirror Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          to: 'blog',
          activeBasePath: 'blog',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://remirror.io/chat',
          label: 'Chat',
          position: 'right',
        },
        {
          href: 'https://github.com/remirror/remirror',
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
            {
              label: 'Introduction',
              to: 'docs',
            },
            {
              label: 'Installation',
              to: 'docs/installation',
            },
            { label: 'Examples', href: 'https://remirror.vercel.app' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://remirror.io/chat' },
            { label: 'Twitter', href: 'https://twitter.com/@remirrorio' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/remirror/remirror' },
            {
              html: `
                <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Hosted with Netlify">
                  <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Hosted with Netlify" />
                </a>
              `,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Remirror Contributors. Built with Docusaurus`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: path.join(__dirname, '../docs'),
          sidebarPath: require.resolve('./sidebar.cjs'),
          editUrl: ({ version, versionDocsDirPath, docPath, permalink, locale }) => {
            // API documents are generated, so they won't have urls for directly edit.
            if (permalink.startsWith('/docs/api')) {
              return;
            }

            return `https://github.com/remirror/remirror/edit/main/docs/${docPath}`;
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/remirror/remirror/edit/main/website/',
        },
        theme: {
          customCss: [require.resolve('./styles.css'), require.resolve('remirror/styles/all.css')],
        },
        // googleAnalytics: { trackingID: 'UA-135738542-1', anonymizeIP: true },
      },
    ],
  ],
  plugins: [
    // require.resolve('@docusaurus/plugin-ideal-image'),
  ],

  // https://github.com/facebook/docusaurus/issues/4765#issuecomment-841135926
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },
};

module.exports = config;
