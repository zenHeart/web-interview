let user = require('./cache');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'get name> '
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
  case 'exit':
    rl.close();
    break;
  case 'g':
    user = require('./cache');
    console.log(user.name);
    break;
  case 'c':
    // eslint-disable-next-line
    const result = delete require.cache['/Users/lockepc/code/github/web-interview/node/cache/cache.json'];
    if (result) {
      console.log('delete cache success!');
    }
    break;
  default:
    console.log(user.name);
    break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
