// semantic-release自动化版本管理演示

// 1. semantic-release配置示例
const semanticReleaseConfig = {
  // 分支配置
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true }
  ],
  
  // 插件配置
  plugins: [
    // 分析提交消息
    '@semantic-release/commit-analyzer',
    
    // 生成发布说明
    '@semantic-release/release-notes-generator',
    
    // 生成变更日志
    '@semantic-release/changelog',
    
    // 更新package.json版本
    '@semantic-release/npm',
    
    // 创建GitHub发布
    '@semantic-release/github',
    
    // 提交变更文件
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};

// 2. Conventional Commits示例
const commitExamples = {
  // 修复bug (patch版本)
  fix: [
    'fix: 修复用户登录验证失败的问题',
    'fix(auth): 解决token过期检查逻辑错误',
    'fix(api): 修复POST请求参数验证'
  ],
  
  // 新功能 (minor版本)
  feat: [
    'feat: 添加用户头像上传功能',
    'feat(dashboard): 新增数据统计图表',
    'feat(api): 支持批量导出用户数据'
  ],
  
  // 破坏性变更 (major版本)
  breaking: [
    'feat!: 重构API接口，移除已废弃的v1版本',
    'feat(auth): 升级认证机制，不兼容旧版本\n\nBREAKING CHANGE: 需要更新客户端SDK',
    'refactor!: 修改数据库schema，需要数据迁移'
  ],
  
  // 其他类型 (不影响版本)
  other: [
    'docs: 更新API文档',
    'style: 修复代码格式问题',
    'refactor: 重构用户模块代码结构',
    'test: 添加单元测试',
    'chore: 升级依赖版本'
  ]
};

// 3. package.json配置示例
const packageJsonConfig = {
  name: 'my-awesome-package',
  version: '0.0.0-development',
  description: 'An awesome npm package with automated releases',
  main: 'dist/index.js',
  scripts: {
    build: 'rollup -c',
    test: 'jest',
    'semantic-release': 'semantic-release'
  },
  repository: {
    type: 'git',
    url: 'https://github.com/username/my-awesome-package.git'
  },
  devDependencies: {
    'semantic-release': '^19.0.0',
    '@semantic-release/changelog': '^6.0.0',
    '@semantic-release/git': '^10.0.0'
  },
  release: {
    branches: ['main']
  }
};

// 4. GitHub Actions工作流示例
const githubActionWorkflow = `name: Release
on:
  push:
    branches:
      - main
      - next
      - beta
      - alpha

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          persist-credentials: false
          
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Release
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
        run: npx semantic-release`;

// 5. 手动版本管理对比
function manualVersionManagement() {
  console.log('手动版本管理流程:');
  console.log('1. 修改package.json版本号');
  console.log('2. 手动编写CHANGELOG.md');
  console.log('3. 创建git tag');
  console.log('4. 手动发布到npm');
  console.log('5. 创建GitHub Release');
  console.log('');
  
  console.log('问题:');
  console.log('- 容易忘记步骤');
  console.log('- 版本号可能不一致');
  console.log('- 变更日志容易遗漏');
  console.log('- 发布流程繁琐');
}

// 6. 自动化版本管理优势
function automatedVersionManagement() {
  console.log('自动化版本管理优势:');
  console.log('1. 根据commit消息自动确定版本号');
  console.log('2. 自动生成详细的变更日志');
  console.log('3. 自动创建git tag和GitHub Release');
  console.log('4. 自动发布到npm');
  console.log('5. 确保发布流程的一致性');
  console.log('');
  
  console.log('版本规则:');
  console.log('- fix: 补丁版本 (1.0.0 -> 1.0.1)');
  console.log('- feat: 次要版本 (1.0.0 -> 1.1.0)');
  console.log('- BREAKING CHANGE: 主要版本 (1.0.0 -> 2.0.0)');
}

// 7. 最佳实践建议
const bestPractices = {
  commitMessage: {
    title: 'Commit消息最佳实践',
    rules: [
      '使用Conventional Commits规范',
      '消息要简洁明确，描述变更内容',
      '使用英文或中文，保持团队一致',
      '在消息体中详细说明变更原因',
      '破坏性变更必须明确标注'
    ]
  },
  
  workflow: {
    title: '工作流程最佳实践',
    rules: [
      '在CI/CD中集成semantic-release',
      '确保测试通过后再触发发布',
      '使用分支保护规则',
      '配置必要的环境变量和密钥',
      '定期审查发布历史和变更日志'
    ]
  },
  
  configuration: {
    title: '配置最佳实践',
    rules: [
      '根据项目需求选择合适的插件',
      '配置多环境发布分支',
      '设置合理的预发布规则',
      '自定义变更日志模板',
      '集成代码质量检查'
    ]
  }
};

// 导出配置和示例
module.exports = {
  semanticReleaseConfig,
  commitExamples,
  packageJsonConfig,
  githubActionWorkflow,
  manualVersionManagement,
  automatedVersionManagement,
  bestPractices
};

// 演示函数
if (require.main === module) {
  console.log('=== Semantic Release演示 ===\n');
  
  manualVersionManagement();
  console.log('\n=== vs ===\n');
  automatedVersionManagement();
  
  console.log('\n=== Commit消息示例 ===');
  Object.entries(commitExamples).forEach(([type, examples]) => {
    console.log(`\n${type.toUpperCase()}类型:`);
    examples.forEach(example => console.log(`  - ${example}`));
  });
  
  console.log('\n=== 最佳实践 ===');
  Object.values(bestPractices).forEach(practice => {
    console.log(`\n${practice.title}:`);
    practice.rules.forEach(rule => console.log(`  - ${rule}`));
  });
}
