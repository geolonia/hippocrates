import path from "path";
import { execPromise } from "./execPromise";
import { defaultValues } from "./defaultValues";

export const buildTypeScript = async () => {
  try {
    const { stderr } = await execPromise(`tsc -p ${path.join(defaultValues.providerDir, 'tsconfig.json')}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }
}
