const fs = require('fs');
const path = require('path');

const createFake = async (moduleName, filepath, isRepository = false) => {
  const correctedModuleName = moduleName + (isRepository ? '.repository' : '');

  const classname = `${correctedModuleName.split('.').map((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }).join('')}`;

  const classContent = `import I${classname} from '../i.${correctedModuleName}';\n\nexport default class Fake${classname} implements I${classname} { }`;

  await fs.promises.writeFile(
    path.resolve(filepath, `fake.${correctedModuleName}.ts`),
    classContent,
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  );
}

module.exports = createFake;