import { createReadStream } from 'fs'
import { stdout } from 'process'
import { fileURLToPath } from 'url'
const { createHash } = await import('crypto')

export const calculateHash = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)
    const hash = createHash('sha256')

    const input = createReadStream(`${thisScriptPath}/../files/fileToCalculateHashFor.txt`)
    input
        .pipe(hash)
        .setEncoding('hex')
        .pipe(stdout)
}

calculateHash()
