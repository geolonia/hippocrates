import path from "path";
import { execPromise } from "./execPromise";
import { defaultValues } from "./defaultValues";

export const buildTypeScript = async (env: NodeJS.ProcessEnv) => {
  try {
    console.log(path.join(defaultValues.providerDir, 'tsconfig.json'))
    const { stdout, stderr } = await execPromise(`cd ${defaultValues.providerDir} && react-scripts build`, {env});

    console.log(`stdout: ${stdout}`);

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }
}
