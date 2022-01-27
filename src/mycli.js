import inquirer from "inquirer";
import { createProject } from "./main";
import parseArgumentsIntoOptions from "./parseArgumentsIntoOptions";

const DEFAULT_THEME = "GraphQL";
async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || DEFAULT_THEME,
    };
  }

  const questions = [];

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose from the project template",
      choices: ["GraphQL", "REST"],
      default: DEFAULT_THEME,
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Do you want to init git?",
      default: false,
    });
  }

  const answer = await inquirer.prompt(questions);

  return {
    ...options,
    git: options.git || answer.git,
    template: options.template || answer.template,
  };
}

export async function myCLI(args) {
  const options = parseArgumentsIntoOptions(args);
  const prompt = await promptForMissingOptions(options);

  await createProject(prompt).then((res) => {});
}
