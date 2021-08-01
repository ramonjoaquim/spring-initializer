
const shell = require('shelljs');

exports.clean = (directories) => {
  directories.forEach((directory) => {
    shell.exec(`mvn clean -f ${directory}/pom.xml`, {async: false});
  });
};

exports.install = (directories, skipTests) => {
  directories.forEach((directory) => {
    if (skipTests) {
      shell.exec(`mvn install -DskipTests -f ${directory}/pom.xml`,
          {async: false});
    } else {
      shell.exec(`mvn install -f ${directory}/pom.xml`, {async: false});
    }
  });
};

exports.run = (directories) => {
  directories.forEach((directory) => {
    shell.exec(`mvn -f ${directory}/pom.xml spring-boot:run`, {async: true});
  });
};
