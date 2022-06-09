import { cpus } from "os"
import { sendResult } from "./worker.js"

export const performCalculations = async () => {
    const workers = cpus()
        .map(
            (_, i) => sendResult(10 + i)
                .then(data => ({ status: 'resolved', data}))
                .catch(() => ({ status: 'error', data: null }))
        )

    const result = await Promise.all(workers)

    return result
}

console.log(await performCalculations())
