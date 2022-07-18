/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'Swift API Framework',
    tagline: 'Swiftly build any API',
    url: 'https://swiftapi.github.io',
    baseUrl: '/swift-docs/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'swift', // Usually your GitHub org/user name.
    projectName: 'swift', // Usually your repo name.
    themeConfig: {
        navbar: {
            title: 'Swift',
            logo: {
                alt: 'Swift Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Docs',
                    position: 'left',
                },
                //{to: 'blog', label: 'Blog', position: 'left'},
                {to: 'next', label: 'Next', position: 'left'},
                {
                    href: 'https://github.com/SwiftAPI/swift',
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
                            label: 'Getting Started',
                            to: 'docs/',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/swift-api',
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
                            href: 'https://github.com/SwiftAPI/swift',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Swift. Built with Docusaurus.`,
        },
        prism: {
            additionalLanguages: ['php', 'php-extras'],
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
                        'https://github.com/SwiftAPI/swift-docs/tree/main',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/SwiftAPI/swift',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};
