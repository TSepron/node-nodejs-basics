import { rm } from 'fs/promises'
import { fileURLToPath } from 'url'

export const remove = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    try {
        await rm(
            `${thisScriptPath}/../files/fileToRemove.txt`
        )
    } catch (err) {
        if (['ENOENT'].includes(err.code))
            throw new Error('FS operation failed')

        throw err
    }
}

remove()
