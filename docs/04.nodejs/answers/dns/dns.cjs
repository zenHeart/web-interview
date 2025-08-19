const dns = require('node:dns')
dns.lookup('example.com', { all: true }, (e, addrs) => console.log('lookup:', addrs))
dns.resolve4('example.com', (e, A) => console.log('resolve4:', A))
