import { exec } from "child_process";
import path from "path";

export const buildTypeScript = () => {

  const configPath = path.resolve(process.cwd(), 'src', 'app', 'vite.config.ts');

  exec(`tsc && vite build --config ${configPath} --emptyOutDir`, (error, stdout, stderr) => {
    if (error) {
      console.error(`実行エラー: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

}
