import path from 'path'
// import { excelToJson } from '../lib/excel2json'
import { buildConfig} from '../lib/buildConfig'
// import { buildTypeScript } from '../lib/buildTypeScript'
import { copyDirectory } from '../lib/copyDirectory'
import { buildTypeScript } from '../lib/buildTypeScript'
import { defaultValues } from '../lib/defaultValues';
// import fs from 'fs'

export const build = async (_source: string | undefined) => {


  await buildConfig()
  await buildTypeScript()

  const innerNPMPath = path.resolve(defaultValues.providerDir, 'build');

  copyDirectory(innerNPMPath, defaultValues.buildDir)

  // const workingDirPath = process.cwd();
  // const basePath = path.resolve((process.cwd(), 'node_modules/hippocrates'))
  // const buildPath = path.resolve(workingDirPath, 'build');

  // // node_modules/hippocrates/dist/app を process.cwd() にコピーする
  // const appPath = path.resolve(basePath, 'dist', 'app');
  // const destPath = path.resolve(process.cwd(), 'build');
  // copyDirectory(appPath, destPath);


  // const sourcePath = path.resolve(process.cwd(), source || '.')
  // // const appConfigPath = path.resolve(basePath, 'src', 'app', 'src');
  // // const publicPath = path.resolve(basePath, 'src', 'app', 'public');

  // // sourcePath 内の Excel/CSV を json に変換する
  // await excelToJson(sourcePath, buildPath);

  // // config.json と .env を生成する
  // await buildConfig(appConfigPath);

  // // TypeScript をビルドする
  // await buildTypeScript();
}
