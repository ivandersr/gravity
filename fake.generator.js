const fs = require('fs');
const path = require('path');

const createFake = async (moduleName, filepath, isRepository = false) => {
  moduleName += isRepository ? '.repository' : '';

  const classname = `${moduleName.split('.').map((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }).join('')}`;

  const classContent = `import I${classname} from '../i.${moduleName}';\n\nexport default class Fake${classname} implements I${classname} { }`;

  await fs.promises.writeFile(
    path.resolve(filepath, `fake.${moduleName}.ts`),
    classContent,
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  );
}

module.exports = createFake;