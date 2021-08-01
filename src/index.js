const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./components/questions');
const files = require('./components/files');
const exec = require('./components/executor');

clear();

console.log(
    chalk.cyan(
        figlet.textSync('Spring Initializer', {horizontalLayout: 'full'}),
    ),
);

const run = async () => {
  const primaryQuestion = await inquirer.askFolderProjectRootLocation();

  primaryQuestion.folderLocation =
  '/home/shinobi/Desenvolvimento/betha/gestao-fiscal/backend';

  if (primaryQuestion.folderLocation.length) {
    const result = files.getDirectories(primaryQuestion.folderLocation);

    const projects = await inquirer.askForSelectProjectToRun(result);

    exec.clean(
        files
            .parseDirectories(primaryQuestion.folderLocation,
                projects.selectedProjects))
        .then(exec
            .install(files.parseDirectories(primaryQuestion.folderLocation,
                projects.selectedProjects), primaryQuestion.skipTests))
        .then(exec
            .run(files.parseDirectories(primaryQuestion.folderLocation,
                projects.selectedProjects)));
  }
};

run();
