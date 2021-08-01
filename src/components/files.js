const fs = require('fs');
const _path = require('path');
const chalk = require('chalk');

exports.getDirectories = (path) => {
  try {
    const absolutePath = _path.join(path);

    return fs.readdirSync(absolutePath).filter(function(file) {
      const path = `${absolutePath}/${file}`;

      if (_hasPomInFolder(path)) {
        return fs.statSync(path).isDirectory();
      }
    });
  } catch (error) {
    console.log(chalk.red.bold(`path ${path} not found!`));
  }
};

exports.parseDirectories = (rootDir, projectDir) => {
  const projectsList = [];

  projectDir.forEach((project) => {
    projectsList.push(_path.join(rootDir, project));
  });

  return projectsList;
};

/**
 * Verify if has pom in directory.
 * @param {string} folderPath path.
 * @return {boolean} true if has pom in directory, false if hasn't.
 */
function _hasPomInFolder(folderPath) {
  try {
    return fs.statSync(`${folderPath}/pom.xml`).isFile();
  } catch (_err) {
    return false;
  }
}
