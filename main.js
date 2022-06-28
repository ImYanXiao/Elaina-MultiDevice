import './config.js'

import path, { join } from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module' // Bring in the ability to create the 'require' method
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
import * as ws from 'ws'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import pino from 'pino'
/* import {
  mongoDB,
  mongoDBV2
} from './lib/mongoDB.js' */
const {
  useSingleFileAuthState,
  DisconnectReason
} = await import('@adiwajshing/baileys')

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))

global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? await global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

global.authFile = `${opts._[0] || 'session'}.data.json`
const { state, saveState } = useSingleFileAuthState(global.authFile)

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  logger: pino({ level: 'silent'}),
  version: [2, 2204, 13]
  // logger: pino({ level: 'trace' })
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (!opts['test']) {
  (await import('./server.js')).default(PORT)
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
   // if (opts['autocleartmp']) try {
      clearTmp()
  //  } catch (e) { console.error(e) }
  }, 60 * 1000)
}

function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
    return false
  })
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONNECTING) {
    console.log(await global.reloadHandler(true).catch(console.error))
    global.timestamp.connect = new Date
  }
  // console.log(JSON.stringify(update, null, 4))
  if (global.db.data == null) loadDatabase()
}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = 'Hai, @user!\nWelcome to @subject\n\n@desc'
  conn.bye = 'Sayonara @user!'
  conn.spromote = '@user now admin!'
  conn.sdemote = '@user now not admin!'
  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveState.bind(global.conn)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  // require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(console.error)
