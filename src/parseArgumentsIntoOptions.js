import arg from "arg";

export default function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
      "-t": String,
    },
    { argv: rawArgs.slice(2) }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args["-t"],
    folderName: args._[0],
    runInstall: args["--install"] || false,
  };
}
