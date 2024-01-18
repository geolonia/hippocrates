export default class ConversionError extends Error {
  filePath: any;
  conversionType: any;
  constructor(type: string, filePath: string) {
    super();
    this.conversionType = type;
    this.filePath = filePath;
  }
}
