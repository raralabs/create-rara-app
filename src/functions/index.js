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
