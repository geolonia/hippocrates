import { excel2csv } from './excel2csv';
import { writeFile, readFile } from 'fs/promises';
import klaw from 'klaw';
//@ts-ignore
import csv2geojson from 'csv2geojson';
import ConversionError from './error';

const _excelToGeoJson = async (inputDir: string) => {
  const promises: any[] = [];

  for await (const file of klaw(inputDir, { depthLimit: -1 })) {
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

        throw new ConversionError("excelToGeoJson", excelPath);
      }
    } else if (file.path.endsWith(".csv")) {
      csvData = await readFile(file.path, 'utf-8');
    }

    if (csvData) {
      const geoJsonPath = file.path.replace(/.csv$|.xlsx$/, '.geojson');

      try {

        csv2geojson.csv2geojson(
          csvData,
          async (_: unknown, geojson: any) => {
            await writeFile(geoJsonPath, JSON.stringify(geojson));
          });

      } catch (err) {
        throw new ConversionError("csvToGeoJson", file.path);
      }
    }
  }

  await Promise.all(promises);
}

export const excelToGeoJson = async (inputDir: string) => {
  try {
    await _excelToGeoJson(inputDir);
  } catch (err) {
    if (err instanceof ConversionError) {
      switch (err.conversionType) {
        case "excelToGeoJson":
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
