import path from "path";
import { execPromise } from "./execPromise";

export const buildTypeScript = async () => {

  const configPath = path.resolve(process.cwd(), 'src', 'app', 'vite.config.ts');

  try {
    const { stderr } = await execPromise(`tsc && vite build --config ${configPath} --emptyOutDir`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }

}
