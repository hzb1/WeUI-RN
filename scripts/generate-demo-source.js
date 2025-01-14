const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-undef
const componentsDir = path.join(__dirname, '../app', '(demo)');
// eslint-disable-next-line no-undef
const outputFilePath = path.join(__dirname, '../assets', 'demoCode.json');

const sourceCodeMap = {};

const regex = /.*Demo\.tsx$/;

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else {
      filelist.push(filePath);
    }
  });
  return filelist;
};

const componentFiles = walkSync(componentsDir).filter((file) =>
  regex.test(file),
);

componentFiles.forEach((file) => {
  const componentName = path.basename(file, path.extname(file));
  const name = componentName.replace('Demo', '').toLowerCase();
  const fileContent = fs.readFileSync(file, 'utf-8');
  sourceCodeMap[name] = fileContent;
});

fs.writeFileSync(
  outputFilePath,
  JSON.stringify(sourceCodeMap, null, 2),
  'utf-8',
);

console.log('demoDemos.json generated successfully.');
