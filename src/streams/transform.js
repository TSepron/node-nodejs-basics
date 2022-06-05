import { stdin, stdout } from "process";
import { Transform } from "stream";

export const transform = async () => {
    const upperCaseTr = new Transform({
        transform(chunk, encoding, cb) {
            const result = chunk
                .toString()
                .split('')
                .reverse()
                .join('')

            this.push(`${result}\n`)
            cb();
        }
    });

    stdin
        .pipe(upperCaseTr)
        .pipe(stdout)
}

transform()
