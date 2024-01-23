import { execPromise } from "./execPromise";
import { defaultValues } from "./defaultValues";

export const buildTypeScript = async () => {
  try {

    await execPromise(`cd ${defaultValues.providerDir} && react-scripts build`);

  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }
}
