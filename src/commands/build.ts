import path from 'path'
import { excelToJson } from '../lib/excel2json'
import { buildConfig} from '../lib/buildConfig'
import { buildTypeScript } from '../lib/buildTypeScript'

export const build = async (source: string | undefined) => {

  const sourcePath = path.resolve(process.cwd(), source || '.')
  const appConfigPath = path.resolve(__dirname, '..', 'app', 'src');
  const publicPath = path.resolve(__dirname, '..', 'app', 'public');

  // sourcePath 内の Excel/CSV を json に変換する
  await excelToJson(sourcePath, publicPath);

  // config.json と .env を生成する
  await buildConfig(appConfigPath);

  // TypeScript をビルドする
  await buildTypeScript();
}
