import arg from "arg";

export default function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      //   "--yes": Boolean,
      "--install": Boolean,
      //   "-y": "--yes",
      "-i": "--install",
      "-t": String,
    },
    { argv: rawArgs.slice(2) }
  );
  return {
    skipPrompts: false,
    git: args["--git"] || false,
    template: args["-t"],
    folderName: args._[0],
    runInstall: args["--install"] || false,
  };
}
