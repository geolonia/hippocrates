import path from 'path'
import { copyFiles } from '../lib/copyFiles'
import { excelToGeoJson } from '../lib/excel2geojson'

export const build = async (source: string, destination: string) => {

  const sourcePath = path.resolve(process.cwd(), source || '.')
  const destinationPath = path.resolve(process.cwd(), destination || './dist')

  // sourcePath 内の Excel/CSV を geojson に変換する
  await excelToGeoJson(sourcePath);
  // 生成した geojson ファイルを dist ディレクトリにコピーする
  copyFiles(sourcePath, destinationPath, '.geojson');

  // const sourcePath = path.resolve(process.cwd(), source)

  // let destinationPath = ""

  // if (destination) {
  //   destinationPath = path.resolve(process.cwd(), destination)
  // } else {
  //   destinationPath = path.join(path.dirname(sourcePath), `${path.basename(source, '.yml')}.json`)
  // }

  // const style = JSON.stringify(parser(sourcePath), null, '  ')

  // try {
  //   fs.writeFileSync(destinationPath, style)
  // } catch(err) {
  //   // TODO: Error handling
  // }
}
