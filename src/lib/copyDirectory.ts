import fs from 'fs';
import path from 'path';

export function copyDirectory(src: string, dest: string) {
  // ソースディレクトリが存在するか確認
  if (!fs.existsSync(src)) {
      return;
  }

  // 目的ディレクトリが存在しない場合は作成
  if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
  }

  // ソースディレクトリの内容を読み取り
  let files = fs.readdirSync(src);

  files.forEach(file => {
      let srcPath = path.join(src, file);
      let destPath = path.join(dest, file);

      // ファイルまたはディレクトリに応じて処理
      let stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
          // ディレクトリの場合、再帰的にコピー
          copyDirectory(srcPath, destPath);
      } else {
          // ファイルの場合、コピー
          fs.copyFileSync(srcPath, destPath);
      }
  });
}
