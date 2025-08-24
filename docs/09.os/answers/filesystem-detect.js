// 文件系统类型检测和特性测试（Node.js 环境）
import { writeFileSync, unlinkSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { platform } from 'process';

/**
 * 检测当前操作系统的文件系统类型
 */
function detectFileSystemType() {
  try {
    switch (platform) {
      case 'darwin': // macOS
        return execSync('stat -f %T .', { encoding: 'utf8' }).trim();
      case 'linux':
        return execSync('stat -f -c %T .', { encoding: 'utf8' }).trim();
      case 'win32': // Windows
        return execSync('powershell -NoProfile -Command "(Get-Volume -DriveLetter (Get-Item .).PSDrive.Name).FileSystem"', { encoding: 'utf8' }).trim();
      default:
        return 'unknown';
    }
  } catch (error) {
    console.log('检测文件系统类型时出错:', error.message);
    return 'unknown';
  }
}

/**
 * 测试文件系统是否大小写敏感
 * 通过尝试创建大小写不同但拼写相同的文件来检测
 */
async function testCaseSensitivity() {
  const upperFile = 'FS_TEST_UPPER';
  const lowerFile = 'fs_test_lower';
  
  try {
    // 先创建大写文件
    writeFileSync(upperFile, 'uppercase content');
    
    try {
      // 尝试创建小写文件
      writeFileSync(lowerFile, 'lowercase content', { flag: 'wx' }); // wx: 文件存在则失败
      
      // 如果成功创建，说明是大小写敏感的
      unlinkSync(lowerFile);
      unlinkSync(upperFile);
      return 'case-sensitive';
    } catch (error) {
      if (error.code === 'EEXIST') {
        // 文件已存在，说明是大小写不敏感的
        unlinkSync(upperFile);
        return 'case-insensitive';
      }
      throw error;
    }
  } catch (error) {
    // 清理文件
    try {
      unlinkSync(upperFile);
      unlinkSync(lowerFile);
    } catch {}
    
    console.log('测试大小写敏感性时出错:', error.message);
    return 'unknown';
  }
}

/**
 * 检测文件系统的一些关键特性
 */
function detectFileSystemFeatures() {
  const fsType = detectFileSystemType().toLowerCase();
  
  const features = {
    filesystem: fsType,
    caseSensitive: null,
    maxFileSize: 'unknown',
    journaling: false,
    snapshots: false,
    compression: false,
    encryption: false,
    crossPlatform: false
  };
  
  // 根据文件系统类型推断特性
  switch (true) {
    case fsType.includes('ext4'):
      features.maxFileSize = '16TB';
      features.journaling = true;
      features.caseSensitive = 'case-sensitive';
      break;
      
    case fsType.includes('apfs'):
      features.maxFileSize = '8EB';
      features.journaling = true;
      features.snapshots = true;
      features.compression = true;
      features.encryption = true;
      features.caseSensitive = 'case-insensitive (default)';
      break;
      
    case fsType.includes('ntfs'):
      features.maxFileSize = '256TB';
      features.journaling = true;
      features.compression = true;
      features.caseSensitive = 'case-insensitive';
      break;
      
    case fsType.includes('fat32'):
      features.maxFileSize = '4GB';
      features.crossPlatform = true;
      features.caseSensitive = 'case-insensitive';
      break;
      
    case fsType.includes('exfat'):
      features.maxFileSize = '128PB';
      features.crossPlatform = true;
      features.caseSensitive = 'case-insensitive';
      break;
      
    case fsType.includes('xfs'):
      features.maxFileSize = '8EB';
      features.journaling = true;
      features.caseSensitive = 'case-sensitive';
      break;
  }
  
  return features;
}

/**
 * 演示不同文件系统对前端开发的影响
 */
function demonstrateImpactOnFrontend() {
  const features = detectFileSystemFeatures();
  
  console.log('=== 文件系统检测结果 ===');
  console.log(`当前文件系统: ${features.filesystem}`);
  console.log(`大小写敏感: ${features.caseSensitive || '检测中...'}`);
  console.log(`最大文件大小: ${features.maxFileSize}`);
  console.log(`是否支持日志: ${features.journaling ? '是' : '否'}`);
  console.log(`是否支持快照: ${features.snapshots ? '是' : '否'}`);
  console.log(`跨平台兼容: ${features.crossPlatform ? '是' : '否'}`);
  
  console.log('\n=== 对前端开发的影响 ===');
  
  if (features.caseSensitive === 'case-insensitive') {
    console.log('⚠️  大小写不敏感可能导致的问题:');
    console.log('   - import "./Component" 和 "./component" 被视为相同');
    console.log('   - 本地开发正常，部署到 Linux 服务器可能失败');
    console.log('   - 建议: 统一使用小写文件名或配置 eslint-plugin-case-sensitive-paths');
  }
  
  if (features.maxFileSize === '4GB') {
    console.log('⚠️  FAT32 文件大小限制:');
    console.log('   - 单个文件不能超过 4GB');
    console.log('   - 影响: 大型构建产物、视频资源可能受限');
  }
  
  if (!features.journaling) {
    console.log('⚠️  无日志功能:');
    console.log('   - 异常断电可能导致文件损坏');
    console.log('   - 影响: node_modules、构建缓存可能需要重新生成');
  }
  
  console.log('\n=== 推荐的文件系统选择 ===');
  console.log('开发环境:');
  console.log('  - macOS: APFS (默认)');
  console.log('  - Windows: NTFS');
  console.log('  - Linux: ext4 或 XFS');
  console.log('');
  console.log('生产环境:');
  console.log('  - Linux 服务器: ext4 (稳定) 或 XFS (高性能)');
  console.log('  - 容器环境: 通常继承宿主机文件系统');
  console.log('');
  console.log('便携存储:');
  console.log('  - exFAT: 跨平台兼容，支持大文件');
  console.log('  - 避免 FAT32: 4GB 文件大小限制');
}

// 运行检测
async function runDetection() {
  try {
    demonstrateImpactOnFrontend();
    
    console.log('\n=== 实时大小写敏感性测试 ===');
    const caseSensitivity = await testCaseSensitivity();
    console.log(`实际测试结果: ${caseSensitivity}`);
    
    if (caseSensitivity === 'case-insensitive') {
      console.log('\n💡 前端开发建议:');
      console.log('1. 配置 webpack 的 resolve.plugins: [new CaseSensitivePathsPlugin()]');
      console.log('2. 使用 ESLint 的 case-sensitive-paths-in-requires 规则');
      console.log('3. 统一团队的文件命名约定');
    }
  } catch (error) {
    console.error('检测过程出错:', error.message);
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runDetection();
}

export { detectFileSystemType, testCaseSensitivity, detectFileSystemFeatures };
