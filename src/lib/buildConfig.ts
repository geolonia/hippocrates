import * as fs from 'fs';
import * as path from 'path';
import { defaultValues } from './defaultValues';

export const buildConfig = async () => {

  const packageJSONPath = path.resolve(process.cwd(), 'package.json');

  // package.json ファイルを読み込む
  const packageJson = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));

  // 必要な設定を抽出する
  let envContent: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(packageJson.settings)) {
    const envKey = key.toUpperCase().replace(/-/g, '_');
    envContent[`REACT_APP_${envKey}`] = value;
  }

  envContent['SKIP_PREFLIGHT_CHECK'] = true;

  // config.json として保存する
  fs.writeFileSync(path.resolve(defaultValues.providerDir, 'config.json'), JSON.stringify(envContent, null, 2));

  console.log('build has been created with the specified settings.');
}
