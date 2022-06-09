import { argv } from "process"
import { fileURLToPath } from "url"
import { isMainThread, parentPort, Worker, workerData } from "worker_threads"

const thisScriptPath = fileURLToPath(import.meta.url)
const executableScript = argv[1].endsWith('.js') 
    ? argv[1] 
    : `${argv[1]}.js`


export const nthFibonacci = (n) =>
    n < 2
        ? n
        : nthFibonacci(n - 1) + nthFibonacci(n - 2)


export const sendResult = (n = 10) => {
    if (isMainThread) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(thisScriptPath, {
                workerData: {
                    n
                },
                resourceLimits: {
                    maxOldGenerationSizeMb: 4
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
    } else {
        parentPort.postMessage(nthFibonacci(workerData.n))
    }
}

// if we execute by node this script, then call sendResult
// otherwise (if we import this script in other module) don't call sendResult
if (isMainThread) {
    if (executableScript === thisScriptPath) {
        // analog in python
        // if __name__ == "__main__":
        //     send_result(20)
        sendResult(20)
            .then(console.log)
    }
} else {
    sendResult()
}

// problem with await (node.js v16.15.1):
//      Check failed: (location_) != nullptr.
//      #FailureMessage Object: 00000027338FDC90
//          1: 00007FF7547F79CF v8:: internal:: CodeObjectRegistry:: ...
//          ...
//      ...

// await sendResult(41)
