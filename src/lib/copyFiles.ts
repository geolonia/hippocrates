import path from 'path'
import * as fs from 'fs';

export const copyFiles = (sourcePath: string, destinationPath: string) => {

  // ディレクトリが存在しない場合、作成する
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }

  // sourcePath内のファイルを読み込む
  const files = fs.readdirSync(sourcePath);

  // 各ファイルに対して処理を行う
  files.forEach(file => {
    const ext = path.extname(file);

    // ファイルが.xlsx、.csv、.geojsonのいずれかである場合、コピーを行う
    if (ext === '.xlsx' || ext === '.csv' || ext === '.geojson') {
      const sourceFile = path.join(sourcePath, file);
      const destinationFile = path.join(destinationPath, file);

      // ファイルをコピーする
      fs.copyFileSync(sourceFile, destinationFile);
    }
  });
}
