const fs = require('fs');
const path = require('path');

const createInterface = async (moduleName, filepath, isRepository = false) => {
  const correctedModuleName = moduleName + (isRepository ? '.repository' : '');

  const classname = `${correctedModuleName.split('.').map((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }).join('')}`;

  await fs.promises.writeFile(
    path.resolve(filepath, `i.${correctedModuleName}.ts`),
    `export default interface I${classname} { }`,
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  );
}

module.exports = createInterface;