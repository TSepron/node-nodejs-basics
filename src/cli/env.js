/* 
    In powershell set env by typing in terminal:
        $env:RSS_something='something special'
    or
        $env:other_value='other value'
    then just launch this script

    In bash set env by typing in terminal:
        export RSS_something='something special'
    or
        export other_value='other value'
    then just launch this script
*/

export const parseEnv = () => {
    const PREFIX = 'RSS_'

    const ourEnvNames = Object.keys(process.env)
        .filter(envName => envName.startsWith(PREFIX))

    console.log(
        ourEnvNames
            .map(envName => `${envName}=${process.env[envName]}`)
            .join('; ')
    )
}

parseEnv()
