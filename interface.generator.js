const fs = require('fs');
const path = require('path');

const createInterface = async (moduleName, filepath, isRepository = false) => {
  moduleName += isRepository ? '.repository' : '';

  const classname = `${moduleName.split('.').map((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }).join('')}`;

  await fs.promises.writeFile(
    path.resolve(filepath, `i.${moduleName}.ts`),
    `export default interface I${classname} { }`,
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  );
}

module.exports = createInterface;