// node src/streams/write.js
// typing something
// Ctrl + C
// then look at fileToWrite.txt

import { createWriteStream } from "fs"
import { stdin } from "process"
import { fileURLToPath } from "url"

export const write = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    const output = createWriteStream(`${thisScriptPath}/../files/fileToWrite.txt`)
    stdin.pipe(output)
};

write()
