import inquirer from "inquirer";
import { createProject } from "./createProject";
import { checkNodeVersion } from "./functions";
import parseArgumentsIntoOptions from "./parseArgumentsIntoOptions";

const DEFAULT_THEME = "GraphQL";

// TODO redo all this..
// this is just a quick setup for now
async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || DEFAULT_THEME,
    };
  }

  const questions = [];

  if (!options.folderName) {
    const folderNameQuestion = [
      {
        type: "input",
        name: "folderName",
        message: "Enter the name of your folder",
        default: "rara-app",
      },
    ];
    const { folderName } = await inquirer.prompt(folderNameQuestion);
    options.folderName = folderName;
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose from the project template",
      choices: ["GraphQL", "REST"],
      default: DEFAULT_THEME,
    });
  }

  const { template } = await inquirer.prompt(questions);

  if (template === "GraphQL") {
    const schemaPathPrompt = [
      {
        type: "input",
        name: "schemaPath",
        message: "Enter the path of your schema",
        default: "http://localhost:9000/query",
      },
    ];
    const { schemaPath } = await inquirer.prompt(schemaPathPrompt);

    const serverApiPrompt = [
      {
        type: "input",
        name: "graphqlApi",
        message: "Enter the url of Api",
        default: schemaPath,
      },
    ];

    const { graphqlApi } = await inquirer.prompt(serverApiPrompt);

    return {
      ...options,
      template: options.template || template,
      schemaPath,
      graphqlApi,
    };
  }
  return {
    ...options,
    template: options.template || template,
  };
}

export async function run(args) {
  checkNodeVersion();
  const options = parseArgumentsIntoOptions(args);
  const prompt = await promptForMissingOptions(options);

  await createProject(prompt).then((res) => {});
}
