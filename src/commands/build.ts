import path from 'path'
import { excelToGeojson } from '../lib/excel2geojson'
import { buildConfig} from '../lib/buildConfig'
import { copyDirectory } from '../lib/copyDirectory'
import { buildTypeScript } from '../lib/buildTypeScript'
import { defaultValues } from '../lib/defaultValues';
import fs from 'fs'

export const build = async (source: string | undefined) => {

  await buildConfig()

  const configPath = path.resolve(defaultValues.providerDir, 'config.json')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // 現在の環境変数にカスタム環境変数をマージ
  const env = Object.assign({}, process.env, config);

  // sourcePath 内の Excel/CSV を json に変換する
  const sourcePath = source ? path.resolve(process.cwd(), source) : process.cwd();
  await excelToGeojson(sourcePath);

  await buildTypeScript(env)

  const innerNPMPath = path.resolve(defaultValues.providerDir, 'build');

  copyDirectory(innerNPMPath, defaultValues.buildDir)



}
