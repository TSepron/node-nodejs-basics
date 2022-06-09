import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { fileURLToPath } from 'url'
import { createGzip } from 'zlib'


export const compress = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    const gzip = createGzip()

    const source = createReadStream(
        `${thisScriptPath}/../files/fileToCompress.txt`
    )
    
    const destination = createWriteStream(
        `${thisScriptPath}/../files/archive.gz`
    )

    await pipeline(source, gzip, destination)
}

compress()
