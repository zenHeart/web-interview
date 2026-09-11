const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const buildIndex = path.join(ROOT, 'build', 'search-index.json');
const staticIndex = path.join(ROOT, 'static', 'search-index.json');

try {
  if (fs.existsSync(buildIndex)) {
    fs.copyFileSync(buildIndex, staticIndex);
    console.log('[Search] Successfully synced build/search-index.json to static/search-index.json');
  } else if (!fs.existsSync(staticIndex)) {
    fs.writeFileSync(staticIndex, '[]', 'utf8');
    console.log('[Search] Initialized static/search-index.json placeholder');
  }
} catch (err) {
  console.warn('[Search] Sync warning:', err.message);
}
