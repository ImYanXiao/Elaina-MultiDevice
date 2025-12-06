console.log('🕖 Starting...')

import { join, dirname } from 'path'
import { createRequire } from "module"
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import './config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

async function runUpdater() {
    const originalLog = console.log
    const logs = []

    console.log = (...args) => {
        logs.push({
            waktu: new Date().toLocaleTimeString(),
            pesan: args.join(' ')
        })
        originalLog('[UPDATER]', ...args)
    }

    try {
        const updaterPath = new URL('./lib/checkupdate.js', import.meta.url)
        const { default: checkUpdate } = await import(updaterPath)
        await checkUpdate()
    } catch (e) {
        originalLog('[SYSTEM] Gagal menjalankan updater:', e.message)
    }

    console.log = originalLog

    if (logs.length) {
        originalLog('\n=== UPDATE LOG TABLE ===')
        console.table(logs)
        originalLog('=== END UPDATE LOG ===\n')
    } else {
        originalLog('\n=== TIDAK ADA UPDATE ===\n')
    }
}

say(global.config.namebot, {
    font: 'pallet',
    align: 'center',
    colors: ['white']
})

say(`⧻ ${global.config.namebot} by ${global.config.author}`, { 
    font: 'console',
    align: 'center',
    colors: ['white']
})

let isRunning = false

function start(file) {
    if (isRunning) return
    isRunning = true

    const args = [join(__dirname, file), ...process.argv.slice(2)]

    say([process.argv[0], ...args].join(' '), {
        font: 'console',
        align: 'center',
        colors: ['magenta']
    })

    say('⸙ MEMUAT SOURCE...', {
        font: 'console',
        align: 'center',
        colors: ['blue']
    })

    say('⸙ MEMUAT PLUGINS...', {
        font: 'console',
        align: 'center',
        colors: ['blue']
    })

    say('✅ DONE !', {
        font: 'console',
        align: 'center',
        colors: ['green']
    })

    setupMaster({
        exec: args[0],
        args: args.slice(1),
    })

    const p = fork()

    p.on('message', data => {
        console.log('[RECEIVED]', data)
        switch (data) {
            case 'reset':
                p.process.kill()
                isRunning = false
                start.apply(this, arguments)
                break
            case 'uptime':
                p.send(process.uptime())
                break
        }
    })

    p.on('exit', (_, code) => {
        isRunning = false
        if (code == 'SIGKILL' || code == 'SIGABRT') return start(file)
        console.error('[❗] Exited with code:', code)
        if (code === 0) return
        watchFile(args[0], () => {
            unwatchFile(args[0])
            start(file)
        })
    })

    const opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
    if (!opts['test'] && !rl.listenerCount()) {
        rl.on('line', line => {
            p.emit('message', line.trim())
        })
    }
}

await runUpdater()
await new Promise(resolve => setTimeout(resolve, 7000))
start('main.js')
