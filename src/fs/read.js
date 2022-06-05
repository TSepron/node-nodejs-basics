import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'

export const read = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    try {
        const contents = await readFile(`${thisScriptPath}/../files/fileToRead_.txt`)
        console.log(contents.toString())
    } catch (err) {
        if (['ENOENT'].includes(err.code))
            throw new Error('FS operation failed')

        throw err
    }
}

read()
