import { build } from './build'
import { execPromise } from '../lib/execPromise';
import path from "path";
import fs from 'fs';

export const start = async (source: string | undefined) => {

  await build(source);

  const distPath = path.resolve(process.cwd(), 'build');

  console.log(distPath)

  if (!fs.existsSync(distPath)) {
    console.error('build/ ディレクトリが存在しません。');
    return;
  }

  try {
    const { stderr } = await execPromise(`npx http-server "${distPath}" -o --cors -c1`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  } catch (error) {
    console.error(`実行エラー: ${error}`);
  }

}
