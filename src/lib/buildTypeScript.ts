import path from "path";
import { execPromise } from "./execPromise";
import { defaultValues } from "./defaultValues";
import fs from 'fs'

export const buildTypeScript = async (env: NodeJS.ProcessEnv) => {
  try {

    await execPromise(`cd ${defaultValues.providerDir}`);

    if (!fs.existsSync(path.join(defaultValues.providerDir, 'node_modules'))) {

      await execPromise(`npm install`);
    }

    await execPromise(`react-scripts build`, {env});

  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }
}
