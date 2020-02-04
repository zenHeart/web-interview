const path = require('path');

module.exports = {
    root: 'docs',
    plugins: [
        'fontsettings',
        'search',
        '-highlight',
        'prism',
        'todo',
        'lunr',
        'timeline',
        'popup',
        'anchor-navigation-ex',
        'styled-blockquotes'
    ],
    pluginsConfig: {
        prism: {
            lang: {
                shell: 'bash'
            }
        },
        'anchor-navigation-ex': {
            showLevel: false
        }
    }
};
