"use strict";

import fs from "fs";

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
export function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export async function updateEnvFile(options) {
  const envPath = options.targetDir + `/${options.folderName}/.env`;
  const env = `VITE_SCHEMA_PATH = ${options.schemaPath}\nVITE_API_URL = ${options.graphqlApi}
  `;
  return await fs.writeFileSync(envPath, env);
}

export function checkNodeVersion() {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split(".");
  const major = semver[0];

  // Not exactly sure about this..
  // but just to remain on the safe side
  if (major < 14) {
    console.error(
      `You are running Node ${currentNodeVersion} \n. create-rara-app requires Node 14 or higher Please update your version of Node.`
    );
    process.exit(1);
  }
}
