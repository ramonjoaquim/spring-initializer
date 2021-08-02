const inquirer = require('inquirer');
const os = require('os');

module.exports = {
  askFolderProjectRootLocation: () => {
    const questions = [
      {
        name: 'folderLocation',
        type: 'input',
        message:
        `Enter your root folder of projects spring. \n Ex: ${os.homedir}...:`,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your root folder of projects spring.';
          }
        },
      },
      {
        name: 'skipTests',
        type: 'list',
        message: 'Skip tests on install?',
        choices: ['yes', 'no'],
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please select one option.';
          }
        },
      },
      {
        name: 'showLogs',
        type: 'list',
        message: 'Show logs on console?',
        choices: ['yes', 'no'],
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please select one option.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },

  askForSelectProjectToRun: (choices) => {
    const questions = [
      {
        name: 'selectedProjects',
        type: 'checkbox',
        message: 'Select the projects to run:',
        choices: choices,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please select one option at least.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
