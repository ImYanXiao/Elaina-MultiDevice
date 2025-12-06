console.log('🕖 Starting...')

import { join, dirname } from 'path'
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

function getWIBTime() {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    return new Date(utc + 7 * 3600000)
}

function isWIBMidnight() {
    return getWIBTime().getHours() === 0
}

async function runUpdater() {
    const logs = []
    const updaterPath = new URL('./lib/system.js', import.meta.url)
    const { default: checkUpdate } = await import(updaterPath)

    const originalLog = console.log

    console.log = (...args) => {
        logs.push({
            waktu: new Date().toLocaleTimeString(),
            info: args.join(' ')
        })
        originalLog('[UPDATER]', ...args)
    }

    try {
        await checkUpdate()
        if (global.config.cekupdate === true) {
            if (isWIBMidnight()) {
                await checkUpdate()
            } else {
                console.log('UPDATE SKIPPED NOT MIDNIGHT WIB')
            }
        } else {
            console.log('UPDATE DISABLED BY CONFIG')
        }
    } catch (e) {
        console.log('UPDATER ERROR ' + e.message)
    }

    console.log = originalLog

    console.log('\n=== UPDATE LOG TABLE ===')
    console.table(logs)
    console.log('=== END UPDATE LOG ===\n')
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

async function countdown(sec) {
    for (let i = sec; i >= 1; i--) {
        console.log(`⏳ Starting in ${i}...`)
        await new Promise(r => setTimeout(r, 1000))
    }
    console.log('')
}

await runUpdater()
await countdown(7)
start('main.js')
