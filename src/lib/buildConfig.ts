import * as fs from 'fs';
import * as path from 'path';

export const buildConfig = (destinationPath: string) => {

  const packageJSONPath = path.resolve(process.cwd(), 'package.json');

  // package.json ファイルを読み込む
  const packageJson = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));

  // 必要な設定を抽出する
  const settings = packageJson.settings;

  // config.json として保存する
  fs.writeFileSync(path.resolve(destinationPath, 'src', 'config.json'), JSON.stringify(settings, null, 2));


  // .env 形式での文字列を生成する
  const envContent = Object.entries(settings).map(([key, value]) => {
    // オブジェクトのキーを大文字に変換し、アンダースコアに置き換える
    const envKey = key.toUpperCase().replace(/-/g, '_');
    return `VITE_${envKey}=${value}`;
  }).join('\n');

  fs.writeFileSync(path.resolve(destinationPath, '.env'), envContent);

  console.log('build has been created with the specified settings.');
}
