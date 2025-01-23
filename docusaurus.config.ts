import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs'
import extractQuestionsPlugin from './src/plugins/extractQuestions/index'
import devProxy from './src/plugins/devProxy/index'

const config: Config = {
  customFields: {
    questions: []
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  future: {
    experimental_faster: true
  },
  title: 'web-interview',
  url: 'https://blog.zenheart.site',
  baseUrl: '/web-interview/',

  organizationName: 'zenHeart', // Usually your GitHub org/user name.
  projectName: 'wweb-interview', // Usually your repo name.

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
        id: 'contributors',
        path: 'contributors',
        routeBasePath: 'contributors',
        sidebarPath: './sidebarsContributors.ts',
        breadcrumbs: true,
        // 添加其他必要的文档配置
        showLastUpdateAuthor: true,
        showLastUpdateTime: true
      } satisfies DocsOptions
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
    ]
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: './sidebars.ts',
          exclude: [
            '**/*.test.{js,jsx,ts,tsx}', // 排除测试文件
            '**/questions/**', // 排除所有 questions 目录
            '**/quiz/**', // 排除所有例题目录
            '**/answers/**', // 排除所有 answers 目录
            '**/*.question.{md,mdx}' // 排除所有 questions 目录
          ]
        },
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],
  themeConfig: {
    navbar: {
      title: 'web interview',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'questions'
        },
        {
          type: 'doc',
          docId: 'index',
          docsPluginId: 'contributors', // 确保这里指向正确的插件 ID
          position: 'left',
          label: 'contributors'
        },
        {
          type: 'doc',
          docId: 'index',
          docsPluginId: 'company', // 确保这里指向正确的插件 ID
          position: 'left',
          label: 'company'
        },
        {
          to: '/reference',
          label: 'reference',
          position: 'left'
        },
        {
          to: '/kanban',
          label: 'kanban',
          position: 'left'
        },
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
