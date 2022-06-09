import { copyFile, mkdir, readdir } from 'fs/promises'
import { fileURLToPath } from 'url'

export const copy = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)
    const src = `${thisScriptPath}/../files`
    const dest = `${thisScriptPath}/../files_copy`

    try {
        const files = await readdir(src)

        await mkdir(dest)

        await Promise.all(
            files.map(file => {
                return copyFile(
                    `${src}/${file}`,
                    `${dest}/${file}`,
                )
            })
        )
    } catch (err) {
        if (['ENOENT', 'EEXIST'].includes(err.code))
            throw new Error('FS operation failed')

        throw err
    }
}

copy()
