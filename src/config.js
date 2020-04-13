const fs = require('fs');
const { join } = require('path');

const argv = require('minimist')(process.argv.slice(2));
const context = join(__dirname, '../../../');

const defaultConfig = { 
  reverse: {
    excludes: []
  },
  forward: {
    excludes: []
  }
};

let config = defaultConfig;

for (const name of ['.jetifierrc', 'jetifier.json']) {
  
  try {
    if (fs.existsSync(join(context, name))) {
      config = fs.readFileSync(join(context, name), { encoding: 'utf-8' });
      break;
    };
  } catch(e) {
    console.error(e);
  }
}

if (argv.config) {
  // TODO: use check file extention(.json, .js, .jetifierrc)
  config = fs.readFileSync(join(context, argv.config), { encoding: 'utf-8' });
}

module.exports = {
  default: typeof config === 'string' ? JSON.parse(config) : config,
}