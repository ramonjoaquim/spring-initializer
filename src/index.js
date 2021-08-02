const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./components/questions');
const files = require('./components/files');
const exec = require('./components/executor');

clear();

console.log(
    chalk.cyan(
        figlet.textSync('Spring Runner', {horizontalLayout: 'full'}),
    ),
);

const run = async () => {
  const primaryQuestion = await inquirer.askFolderProjectRootLocation();
  primaryQuestion.folderLocation = '/home/shinobi/Desenvolvimento/';

  if (primaryQuestion.folderLocation.length) {
    const result = files.getDirectories(primaryQuestion.folderLocation);

    const projects = await inquirer.askForSelectProjectToRun(result);

    exec.clean(
        files
            .parseDirectories(primaryQuestion.folderLocation,
                projects.selectedProjects), primaryQuestion.showLogs)
        .then(exec
            .install(files.parseDirectories(primaryQuestion.folderLocation,
                projects.selectedProjects), primaryQuestion.skipTests,
            primaryQuestion.showLogs))
        .then(exec
            .run(files.parseDirectories(primaryQuestion.folderLocation,
                projects.selectedProjects), primaryQuestion.showLogs));
  }
};

run();
