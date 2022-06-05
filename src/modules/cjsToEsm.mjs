import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import _c from './files/c.js';
import { URL } from 'url'; 

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = await import('./files/a.json', { assert: { type: "json" } });
} else {
    unknownObject = await import('./files/b.json', { assert: { type: "json" } });
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

export default {
    unknownObject,
    createMyServer,
};

