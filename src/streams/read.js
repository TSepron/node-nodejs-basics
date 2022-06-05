import { createReadStream } from "fs"
import { stdout } from "process"
import { fileURLToPath } from "url"

export const read = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    const input = createReadStream(`${thisScriptPath}/../files/fileToRead.txt`)
    input
        .pipe(stdout)
}

read()
