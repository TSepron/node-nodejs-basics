import { cpus } from "os"
import { fileURLToPath } from "url"
import { Worker } from "worker_threads"


export const performCalculations = async () => {
    const thisScriptPath = fileURLToPath(import.meta.url)
    const workerScriptPath = `${thisScriptPath}/../worker`
    
    const workers = cpus()
        .map(
            (_, i) => new Promise((resolve, reject) => {
                const worker = new Worker(workerScriptPath, {
                    workerData: {
                        n: 35 + i
                    }
                })
                    .on('message', resolve)
                    .on('error', reject)
                    .on('exit', code => {
                        if (code !== 0)
                            reject(new Error(
                                `Worker with thread id '${worker.threadId}`
                                + ` stopped with exit code ${code}`
                            ))

                        clearTimeout(workerTerminateTimerId)
                    })

                // if worker won't finish it job for 10 sec, terminate it
                const workerTerminateTimerId = setTimeout(() => worker.terminate(), 10000)
            })
                .then(data => ({ status: 'resolved', data }))
                .catch(() => ({ status: 'error', data: null }))
        )

    const result = await Promise.all(workers)

    return result
}


console.log(await performCalculations())
