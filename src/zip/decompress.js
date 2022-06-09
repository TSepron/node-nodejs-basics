import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { fileURLToPath } from 'url'
import { createUnzip } from 'zlib'


export const decompress = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    const unzip = createUnzip()

    const source = createReadStream(
        `${thisScriptPath}/../files/archive.gz`
    )

    const destination = createWriteStream(
        `${thisScriptPath}/../files/fileToCompress.txt`
    )

    await pipeline(source, unzip, destination)
}

decompress()
