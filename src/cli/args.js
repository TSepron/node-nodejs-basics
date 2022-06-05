// run:
//      node src/cli/args.js --propName value --prop2Name value2

export const parseArgs = () => {
    const argv = process.argv.slice(2)
    console.log(argv)

    const result = argv.reduce((strResult, currentValue, i) => {
        if (i % 2) {
            // if value
            return `${strResult} is ${currentValue} `
        } else {
            // if propName
            return `${strResult + currentValue}`
        }
    }, '')
   
    console.log(result) 
}

parseArgs()
