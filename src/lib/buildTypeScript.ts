import { execPromise } from "./execPromise";
import { defaultValues } from "./defaultValues";

export const buildTypeScript = async (env: NodeJS.ProcessEnv) => {
  try {

    await execPromise(`cd ${defaultValues.providerDir} && npm install && react-scripts build`, {env});

  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }
}
