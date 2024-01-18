import path from 'path'
import fs from 'fs'

export function build(source: string, destination: string) {

  console.log('build', source, destination)
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
