import fs from "fs";
import path from "path";
import { promisify } from "util";
import { URL } from "url";
import { projectInstall } from "pkg-install";
import { initGit } from "./initGit";
import { copyTemplateFiles } from "./copyTemplateFiles";
import Listr from "listr";
import { pkgFromUserAgent, updateEnvFile } from "./functions/index";

const access = promisify(fs.access);

export async function createProject(options) {
  const cwd = process.cwd();

  options = {
    ...options,
    targetDir: options.targetDir || cwd,
  };

  const curFileUrl = import.meta.url;

  const templateDir = path.resolve(
    new URL(curFileUrl).pathname,
    "../../templates",
    options.template.toLowerCase()
  );

  options.templateDir = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("Invalid Template");
    process.exit(1);
  }

  const task = new Listr([
    { title: "Copy project files", task: () => copyTemplateFiles(options) },
    {
      title: "Init git",
      task: () => initGit(options),
      enable: () => options.git,
    },
    {
      title: "Install node_modules ",
      task: () =>
        projectInstall({
          cwd: options.targetDir,
        }),
      skip: () =>
        !options.runInstall
          ? "Pass  --install to automatically install  packages"
          : undefined,
    },
  ]);

  await task.run().then((res) => {
    updateEnvFile(options).catch(() => {
      throw new Error("Errror while creating env file");
    });
    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
    const pkgManager = pkgInfo ? pkgInfo.name : "npm";

    const root = options.folderName;
    console.log(`\nDone. Now run:\n`);
    if (root !== cwd) {
      console.log(`  cd ${path.relative(cwd, root)}`);
    }
    switch (pkgManager) {
      case "yarn":
        console.log("  yarn");
        console.log("  yarn dev");
        break;
      default:
        console.log(`  ${pkgManager} install`);
        console.log(`  ${pkgManager} run dev`);
        break;
    }
  });
}
