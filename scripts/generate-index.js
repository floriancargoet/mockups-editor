var fs = require('fs');
var path = require('path');

var directoryPath = path.join(__dirname, '../src/mockup-components/');
var indexPath = path.join(directoryPath, 'index.js');

var files = fs.readdirSync(directoryPath);

files = files.filter(fileName => {
  var absolutePath = path.resolve(directoryPath, fileName);
  var isDirectory = fs.statSync(absolutePath).isDirectory();
  return !isDirectory && fileName !== 'index.js';
});

var code = files.map(fileName => `export ${fileName.split('.')[0]} from './${fileName}';`).join('\n') + '\n';

fs.writeFileSync(indexPath, code);
