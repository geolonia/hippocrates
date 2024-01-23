import { excel2csv } from './excel2csv';
import { writeFile, readFile, copyFile } from 'fs/promises';
import klaw from 'klaw';
//@ts-ignore
import csv2geojson from 'csv2geojson';
import ConversionError from './error';
import path from 'path';
import { defaultValues } from './defaultValues';

const _excelToGeojson = async (inputDir: string) => {
  const promises: any[] = [];

  // 指定したディレクトリ直下のファイルのみを対象にする
  for await (const file of klaw(inputDir, { depthLimit: 0 })) {
    let csvData;

    if (file.path.endsWith(".xlsx")) {
      const excelPath = file.path;
      try {
        csvData = await excel2csv(excelPath);
      } catch (err) {

        if (err instanceof Error) {

          if (err.message === "FILE_ENDED") {
            throw new ConversionError("fileEnded", excelPath);
          }
        }

        throw new ConversionError("excelToGeojson", excelPath);
      }
    } else if (file.path.endsWith(".csv")) {
      csvData = await readFile(file.path, 'utf-8');


    } else if (file.path.endsWith(".geojson")) {
      // TODO: GeoJSON を data.geojson 形式に変換する
      // geojson の場合は 拡張子を json にしてdefaultValues.providerDir にコピーする
      promises.push(copyFile(file.path, path.resolve(defaultValues.providerDir, 'data.geojson')));
      // 1ファイルのみを対象にするために break する
      break;
    }

    if (csvData) {

      try {

        csv2geojson.csv2geojson(
          csvData,
          async (_err: any, geojson: any) => {
            await writeFile(path.resolve(defaultValues.providerDir, 'data.geojson'), JSON.stringify(geojson));
          });

      } catch (err) {
        throw new ConversionError("csvToGeoJson", file.path);
      }
      // 1ファイルのみを対象にするために break する
      break;
    }
  }

  await Promise.all(promises);
}

export const excelToGeojson = async (inputDir: string) => {
  try {
    await _excelToGeojson(inputDir);
  } catch (err) {
    if (err instanceof ConversionError) {
      switch (err.conversionType) {
        case "excelToGeojson":
          throw new Error(`Error: Excel ファイルを ${err.filePath} GeoJSON に変換できませんでした。`);
          break;
        case "fileEnded":
          throw new Error(`Error: データが空になっているか、Excel ファイルが破損している可能性があります。`);
          break;
        case "csvToGeoJson":
          throw new Error(`Error: CSV データ ${err.filePath} を GeoJSON に変換できませんでした。`);
          break;
        default:
          throw new Error(err.message);
      }
    } else {
      throw new Error((err as any).message);
    }
  }
}
