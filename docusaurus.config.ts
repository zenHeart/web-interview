import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs'
import extractQuestionsPlugin, { numberPrefixParser } from './src/plugins/extractQuestions/index'
import devProxy from './src/plugins/devProxy/index'
const isLocal = process.env.NODE_ENV === 'development'

const config: Config = {
  markdown: {
    mermaid: true
  },
  customFields: {
    questions: []
  },
  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],
  title: '前端面试',
  url: 'https://blog.zenheart.site',
  baseUrl: isLocal ? '' : '/web-interview/',
  organizationName: 'zenHeart', // Usually your GitHub org/user name.
  projectName: 'web-interview', // Usually your repo name.
  favicon: 'img/logo.svg',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'zh-hans',
    locales: ['zh-hans']
  },
  plugins: [
    devProxy,
    [
      extractQuestionsPlugin,
      {
        exclude: ['issueData']
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'company',
        path: 'company',
        routeBasePath: 'company',
        sidebarPath: './sidebarsCompany.ts',
        breadcrumbs: true,
        // 添加其他必要的文档配置
        showLastUpdateAuthor: true,
        showLastUpdateTime: true
      } satisfies DocsOptions
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributors',
        path: 'contributors',
        routeBasePath: 'contributors',
        sidebarPath: './sidebarsContributors.ts',
        breadcrumbs: true,
        // 添加其他必要的文档配置
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        numberPrefixParser
      } satisfies DocsOptions
    ]
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarCollapsed: false,
          sidebarPath: './sidebars.ts',
          numberPrefixParser,
          exclude: [
            '**/*.test.{js,jsx,ts,tsx}', // 排除测试文件
            '**/10.system-design/**', // 排除所有 questions 目录
            '**/questions/**', // 排除所有 questions 目录
            '**/quiz/**', // 排除所有例题目录
            '**/answers/**', // 排除所有 answers 目录
            '**/*.question.{md,mdx}', // 排除所有 questions 目录
            '**/node_modules/**' // 排除所有 questions 目录
          ]
        },
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],
  themeConfig: {
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)'
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      }
    },
    docs: {
      sidebar: {
        hideable: true
      }
    },
    navbar: {
      title: '前端面试',
      logo: {
        alt: 'Web Interview Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '题库'
        },

        {
          type: 'doc',
          docId: 'index',
          docsPluginId: 'company', // 确保这里指向正确的插件 ID
          position: 'left',
          label: '公司'
        },

        {
          to: '/reference',
          label: '索引',
          position: 'left'
        },
        {
          to: '/kanban',
          label: '看板',
          position: 'left'
        },
        {
          type: 'doc',
          docId: 'index',
          docsPluginId: 'contributors', // 确保这里指向正确的插件 ID
          position: 'left',
          label: '贡献指南'
        },
        //   { to: 'blog', label: 'Blog', position: 'right' }, // or position: 'right'
        {
          href: 'https://github.com/zenHeart/web-interview',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Web Interview, Inc. Built with ZenHeart.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
}

export default config
