import { fileURLToPath } from 'url'
import { readdir } from 'fs/promises'

export const list = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    try {
        const files = await readdir(`${thisScriptPath}/../files`)

        files.forEach((file) => console.log(file))
    } catch (err) {
        if (['ENOENT'].includes(err.code))
            throw new Error('FS operation failed')

        throw err
    }
}

list()

