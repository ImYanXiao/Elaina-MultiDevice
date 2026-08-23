import { spawn } from 'node:child_process'

function start(cmd) {
    return spawn(cmd, [], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    })
}

start('clear')
start('bash')
console.log('terminal ready to use!')
