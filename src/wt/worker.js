import { fileURLToPath } from "url"
import { isMainThread, parentPort, Worker, workerData } from "worker_threads"

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2)

export const sendResult = () => {
    const thisScriptPath = fileURLToPath(import.meta.url)

    if (isMainThread) {
        const worker = new Worker(thisScriptPath, {
            workerData: {
                n: 33
            },
            resourceLimits: {
                maxOldGenerationSizeMb: 4
            }
        })
            .on('message', msg => console.log(msg))
            .on('error', err => {
                throw err
            })
            .on('exit', code => {
                if (code !== 0)
                    throw new Error(`Worker stopped with exit code ${code}`)

                console.log(`worker with thread id '${worker.threadId}' finish his work)`)
                clearTimeout(workerTerminateTimerId)
            })

        // if worker won't finish it job for 10 sec, terminate it
        const workerTerminateTimerId = setTimeout(() => worker.terminate(), 10000)
    } else {
        parentPort.postMessage(nthFibonacci(workerData.n))
    }
}

sendResult()
