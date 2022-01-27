import { promisify } from "util";

import ncp from "ncp";
const copy = promisify(ncp);

export async function copyTemplateFiles(options) {
  console.log(`\nScaffolding project in ${options.targetDir}...`);

  return copy(
    options.templateDir,
    options.targetDir + `/${options.folderName}`,
    {
      clobber: false,
    }
  );
}
