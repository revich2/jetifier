const { readFileSync, writeFileSync } = require('fs');

process.on('message', ({ filesChunk, classesMapping, mode, config }) => {
  const {
    includes = [],
    excludes = []
  } = config[mode] || {};

  for (const file of filesChunk) {
    let data = readFileSync(file, { encoding: 'utf8' });
    
    for (const [oldClass, newClass] of [...classesMapping, ...includes]) {
      const criteria = mode === 'forward' ? oldClass : newClass;
      
      if (!excludes.includes(criteria) && data.includes(criteria)) {
        data = mode === 'forward' ?
          data.replace(new RegExp(oldClass, 'g'), newClass) :
          data.replace(new RegExp(newClass, 'g'), oldClass);
        writeFileSync(file, data, { encoding: 'utf8' });
      }
    }
  }

  process.exit(0);
});
