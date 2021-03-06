import execa from "execa";

export async function initGit(options) {
  const res = await execa("git", ["init"], {
    cwd: options.targetDir + `/${options.folderName}`,
  });

  if (res.failed) {
    return Promise.reject("Git init failed");
  }
}
