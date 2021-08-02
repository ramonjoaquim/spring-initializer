/* eslint-disable max-len */

const shell = require('shelljs');
const chalk = require('chalk');

exports.clean = (directories, showLogs) => {
  return new Promise((resolve, reject) => {
    try {
      directories.forEach((directory) => {
        _log('running clean');
        shell.exec(`mvn clean -f ${directory}/pom.xml ${showLogs === 'no' ? '--quiet' : ''}`,
            {async: false});

        resolve(shell);
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.install = (directories, skipTests, showLogs) => {
  return new Promise((resolve, reject) => {
    try {
      directories.forEach((directory) => {
        _log('running install');
        if (skipTests) {
          shell.exec(`mvn install -DskipTests -f ${directory}/pom.xml ${showLogs === 'no' ? '--quiet' : ''}`,
              {async: false});
          resolve(shell);
        } else {
          shell.exec(`mvn install -f ${directory}/pom.xml ${showLogs === 'no' ? '--quiet' : ''}`,
              {async: false});
          resolve(shell);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.run = (directories, showLogs) => {
  return new Promise((resolve, reject) => {
    try {
      directories.forEach((directory) => {
        _log('running spring-boot:run');
        shell.exec(`mvn -f ${directory}/pom.xml spring-boot:run ${showLogs === 'no' ? '--quiet' : ''}`,
            {async: true}).stdout;
        resolve(shell);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * log a message in console with chalk color
 * @param {string} message message to chalk
 * @param {boolean} silent show log spring on console
 */
function _log(message) {
  console.log(chalk.blue.bold(message));
}
