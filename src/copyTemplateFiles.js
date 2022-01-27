import { promisify } from "util";

import ncp from "ncp";
const copy = promisify(ncp);

export async function copyTemplateFiles(options) {
  return copy(
    options.templateDir,
    options.targetDir + `/${options.folderName}`,
    {
      clobber: false,
    }
  );
}
