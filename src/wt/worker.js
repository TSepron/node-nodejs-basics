import { fileURLToPath } from "url"
import { isMainThread, parentPort, workerData } from "worker_threads"

const thisScriptPath = fileURLToPath(import.meta.url)


export const nthFibonacci = (n) =>
    n < 2
        ? n
        : nthFibonacci(n - 1) + nthFibonacci(n - 2)


export const sendResult = () => {
    if (!isMainThread) {
        parentPort.postMessage(nthFibonacci(workerData.n))
    }
}


sendResult()
