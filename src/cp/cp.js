import { fork } from "child_process"
import { stdin, stdout, stderr } from "process"
import { fileURLToPath } from "url"


export const spawnChildProcess = async (args) => {
    const thisScriptPath = fileURLToPath(import.meta.url)
    const childScriptPath = `${thisScriptPath}/../files/script.js`

    const child = fork(childScriptPath, args, { silent: true })

    stdin.pipe(child.stdin)
    child.stdout.pipe(stdout)
    child.stderr.pipe(stderr)
}


spawnChildProcess()
