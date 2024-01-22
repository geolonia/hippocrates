import path from 'path'

interface Config {
  providerDir: string
}

export const defaultValues: Config = {
  providerDir: path.join(path.dirname(path.dirname(__dirname)), 'provider'),
}
