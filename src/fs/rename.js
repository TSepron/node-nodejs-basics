import { rename as rn } from 'fs/promises'
import { fileURLToPath } from 'url'

export const rename = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)
    
    try {
        await rn(
            `${thisScriptPath}/../files/wrongFilename.txt`,
            `${thisScriptPath}/../files/properFilename.md`
        )
    } catch (err) {
        if (['ENOENT'].includes(err.code))
            throw new Error('FS operation failed')

        throw err
    }
}

rename()
