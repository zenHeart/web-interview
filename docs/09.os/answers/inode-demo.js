// 模拟 inode 与目录项的关系演示
const fs = {
  // 模拟 inode 表 
  inodes: {
    1001: { 
      mode: '0644', 
      nlink: 2, // 两个硬链接：a 和 b
      size: 12, 
      blocks: [201, 202],
      ctime: '2024-01-01T10:00:00Z',
      mtime: '2024-01-01T10:00:00Z'
    },
    1002: { 
      mode: 'lrwxrwxrwx', // 符号链接标识
      nlink: 1, 
      target: 'a', // 链接目标路径
      size: 1,
      ctime: '2024-01-01T10:01:00Z'
    },
    1003: {
      mode: '0755',
      nlink: 1,
      size: 1024,
      blocks: [301],
      type: 'directory'
    }
  },
  
  // 模拟目录项表（文件名到 inode 的映射）
  dirents: { 
    'a': 1001,    // 硬链接1
    'b': 1001,    // 硬链接2（相同 inode）
    'c': 1002,    // 符号链接（独立 inode）
    'dir1': 1003  // 目录
  }
};

function describeFile(name) {
  const ino = fs.dirents[name];
  const meta = fs.inodes[ino];
  
  if (!meta) {
    return `${name}: 文件不存在`;
  }
  
  if (meta.mode.startsWith('l')) { // 符号链接
    return `${name} -> ${meta.target} (符号链接, inode ${ino})`;
  }
  
  if (meta.type === 'directory') {
    return `${name}: 目录 (inode ${ino}, 权限 ${meta.mode})`;
  }
  
  return `${name}: inode=${ino}, 硬链接数=${meta.nlink}, 大小=${meta.size}字节, 数据块=[${meta.blocks.join(',')}]`;
}

// 演示文件系统查找过程
function simulateFileAccess(filename) {
  console.log(`\n=== 访问文件 "${filename}" ===`);
  
  // 步骤1: 在目录项中查找文件名
  console.log(`1. 查找目录项: "${filename}"`);
  const inodeNum = fs.dirents[filename];
  
  if (!inodeNum) {
    console.log(`   文件名不存在于目录表中`);
    return null;
  }
  
  console.log(`   找到 inode 编号: ${inodeNum}`);
  
  // 步骤2: 通过 inode 编号获取元数据
  console.log(`2. 读取 inode ${inodeNum} 的元数据`);
  const metadata = fs.inodes[inodeNum];
  
  if (metadata.mode.startsWith('l')) {
    console.log(`   这是符号链接，目标: ${metadata.target}`);
    console.log(`   需要再次查找目标文件...`);
    return simulateFileAccess(metadata.target);
  }
  
  // 步骤3: 根据元数据访问数据块
  if (metadata.type === 'directory') {
    console.log(`   这是目录，权限: ${metadata.mode}`);
  } else {
    console.log(`   文件权限: ${metadata.mode}`);
    console.log(`   文件大小: ${metadata.size} 字节`);
    console.log(`   数据位于块: [${metadata.blocks.join(', ')}]`);
    console.log(`   硬链接计数: ${metadata.nlink}`);
  }
  
  return metadata;
}

// 演示硬链接和符号链接的区别
function demonstrateLinks() {
  console.log('=== inode 与文件系统演示 ===');
  
  const files = ['a', 'b', 'c', 'dir1'];
  files.forEach(file => {
    console.log(describeFile(file));
  });
  
  console.log('\n=== 硬链接 vs 符号链接 ===');
  console.log('硬链接 a 和 b:');
  console.log(`- 共享相同的 inode (${fs.dirents.a})`);
  console.log(`- 删除其中一个不影响另一个`);
  console.log(`- 只能在同一文件系统内创建`);
  
  console.log('\n符号链接 c:');
  console.log(`- 有独立的 inode (${fs.dirents.c})`);
  console.log(`- 内容是目标文件的路径名`);
  console.log(`- 可以跨文件系统，可以指向不存在的文件`);
  
  // 模拟文件访问过程
  simulateFileAccess('a');
  simulateFileAccess('c');
  
  // 模拟删除原始文件后的影响
  console.log('\n=== 模拟删除文件 a 后的影响 ===');
  delete fs.dirents.a;
  fs.inodes[1001].nlink = 1; // 硬链接计数减1
  
  console.log('文件 b 仍然可访问 (硬链接):');
  simulateFileAccess('b');
  
  console.log('文件 c 变成悬挂链接 (符号链接):');
  simulateFileAccess('c');
}

// 运行演示
demonstrateLinks();
