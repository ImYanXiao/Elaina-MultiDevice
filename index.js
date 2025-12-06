import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import './config.js'
import checkUpdate from './lib/system.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

async function runUpdaterByConfig() {
  if (!global.config.cekupdate) return
  const logs = []
  const originalLog = console.log
  console.log = (...args) => {
    logs.push({
      waktu: new Date().toLocaleTimeString(),
      pesan: args.join(' ')
    })
    originalLog(...args)
  }
  try {
    await checkUpdate()
  } catch (e) {
    logs.push({
      waktu: new Date().toLocaleTimeString(),
      pesan: e.message
    })
  }
  console.log = originalLog
  if (logs.length) {
    console.log('\n=== UPDATE LOG TABLE ===')
    console.table(logs)
    console.log('=== END UPDATE LOG ===\n')
  }
}

function delayWithCountdown(seconds) {
  return new Promise(resolve => {
    let s = seconds
    const timer = setInterval(() => {
      process.stdout.write(`\r⏳ Starting in ${s} second${s !== 1 ? 's' : ' '}...   `)
      s--
      if (s < 0) {
        clearInterval(timer)
        process.stdout.write('\n')
        resolve()
      }
    }, 1000)
  })
}

function displayBotName() {
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
}

let isRunning = false

function start(file) {
  if (isRunning) return
  isRunning = true
  const args = [join(__dirname, file), ...process.argv.slice(2)]
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  const p = fork()
  p.on('message', data => {
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
    if (code !== 0) console.error('[❗] Exited with code:', code)
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

await runUpdaterByConfig()
displayBotName()
await delayWithCountdown(7)
start('main.js')
