import {appendFile} from 'fs/promises'
import { fileURLToPath } from 'url';

export const create = async () => {
    try {
        const thisScriptPath = fileURLToPath(import.meta.url)

        await appendFile(
            `${thisScriptPath}/../files/fresh.txt`, 
            'I am fresh and young', 
            { flag: 'ax'}
        )
    } catch {
        throw new Error('FS operation failed')
    }
};

create()
