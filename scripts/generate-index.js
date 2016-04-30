/* eslint-env node */
'use strict';
const fs = require('fs');
const path = require('path');

[
  '../src/mockup-components/',
  '../src/components/property-editors/'
].forEach(sourceDirectoryPath => {
  const directoryPath = path.join(__dirname, sourceDirectoryPath);
  const indexPath = path.join(directoryPath, 'index.js');

  // get files to include
  let files = fs.readdirSync(directoryPath);
  files = files.filter(fileName => {
    const absolutePath = path.resolve(directoryPath, fileName);
    const isDirectory = fs.statSync(absolutePath).isDirectory();
    return !isDirectory && fileName !== 'index.js';
  });

  // log
  console.log(directoryPath);
  console.log(Array(directoryPath.length + 1).join('-'));
  files.forEach(fileName => console.log(fileName));
  console.log('');

  // generate index.js
  const code = files.map(fileName => `export ${fileName.split('.')[0]} from './${fileName}';`).join('\n') + '\n';
  fs.writeFileSync(indexPath, code);
});
