/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '久染',
  tagline: 'Dinosaurs are cool',
  url: 'http://www.siyuanwa.cn',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/home/logo.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '久染',
      logo: {
        alt: 'My Site Logo',
        src: 'img/home/logo.ico',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'left',
        },
        {
          to: '/',
          activeBasePath: 'blog',
          label: '博客',
          position: 'right',
          items: [
            {
              label: "Javascript",
              to: "/blog/tags/Javascript",
            }
          ],
        },
        {
          to: 'docs/algorithm/二叉树/preorder',
          label: '算法',
          position: 'right',
        },
        {
          to: 'docs/react/react-hooks',
          label: 'React源码',
          position: 'right',
        },
        {
          to: 'docs/write-your-own-framework/one/framework-one',
          label: '书籍小册',
          position: 'right',
        },
        {
          to: 'docs/resources/resources-intro',
          label: '资源整理',
          position: 'right',
        },
        {
          href: 'https://space.bilibili.com/345132581',
          label: 'B站',
          position: 'right',
        },
        {
          href: 'https://github.com/1084350607',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 久染, Built with Docusaurus.
      <a style='text-decoration:none' href='http://beian.miit.gov.cn'><p style='color:white'>冀ICP备2020030963号-1</p></a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  // 国际化
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['en', 'zh-cn'],
  },
};
