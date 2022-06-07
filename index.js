#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const createInterface = require('./interface.generator');
const createFake = require('./fake.generator');

(async () => {
  const moduleName = process.argv[2];

  if (!moduleName) {
    console.error('Module name cannot be empty!');
    return;
  }

  const fullPath = /^(.*?)node_modules/.exec(
    path.dirname(require.main.filename)
  );

  const appRoot = fullPath ? fullPath[1] : path.dirname(require.main.filename);

  const rootModuleDirectory = path.resolve(
    path.dirname(appRoot), 'src/modules', process.argv[2]
  );

  if (fs.existsSync(rootModuleDirectory)) {
    console.error(`Module "${moduleName}" already exists!`);
    return;
  }

  const moduleDirectoriesWithInterface = [
    'entities', 'repositories'
  ];

  const moduleDirectories = [
    ...moduleDirectoriesWithInterface,
    'dtos', 'services', 'entities/implementations', 'http/controllers',
    'http/routes', 'repositories/fakes', 'repositories/implementations'
  ];

  moduleDirectories.map(async dir => {
    await fs.promises.mkdir(path.resolve(rootModuleDirectory, dir), {
      recursive: true
    });

    console.log(rootModuleDirectory);

    if (moduleDirectoriesWithInterface.includes(dir)) {
      await createInterface(
        moduleName,
        path.resolve(rootModuleDirectory, dir),
        dir.includes('repositories')
      );
    }

    if (dir.includes('repositories/fakes')) {
      await createFake(
        `${moduleName}`,
        path.resolve(rootModuleDirectory, dir),
        true
      );
    }
  });

  console.log(`Module "${moduleName}" created successfully.`);
})();
