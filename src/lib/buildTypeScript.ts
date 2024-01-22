import path from "path";
import { execPromise } from "./execPromise";
import { defaultValues } from "./defaultValues";

export const buildTypeScript = async () => {
  try {
    const { stdout, stderr } = await execPromise(`npx tsc -p ${path.join(defaultValues.providerDir, 'tsconfig.json')}`);

    console.log(`stdout: ${stdout}`);

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }
}
