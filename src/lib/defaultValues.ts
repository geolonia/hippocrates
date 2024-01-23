import path from 'path'

interface Config {
  providerDir: string,
  buildDir: string,
}

export const defaultValues: Config = {
  providerDir: path.join(path.dirname(path.dirname(__dirname)), 'provider'),
  buildDir: path.join(process.cwd(), 'build'),
}
