import path from 'path'
import * as fs from 'fs';

export const copyFiles = (sourcePath: string, destinationPath: string, targetExt: string) => {

  // ディレクトリが存在しない場合、作成する
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }

  // sourcePath内のファイルを読み込む
  const files = fs.readdirSync(sourcePath);

  // 各ファイルに対して処理を行う
  files.forEach(file => {
    const ext = path.extname(file);

    // ファイルが引数で指定されたファイルである場合、コピーを行う
    if (ext === targetExt) {
      const sourceFile = path.join(sourcePath, file);
      const destinationFile = path.join(destinationPath, file);

      // ファイルをコピーする
      fs.copyFileSync(sourceFile, destinationFile);
    }
  });
}
