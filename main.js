/* Jangan Hapus Credit Bro Gw Susah" Recode + Ngoding
  * Lu Cuman Copas, Setidaknya Kasih Credit Lah
  * Thanks AmirulDev & Rasel Comel For Source
  * @AmirulDev https://github.com/amiruldev20
  * @Rasel Comel https://github.com/raselcomel
  * Recode : ImYanXiao
  * @ImYanXiao https://github.com/ImYanXiao
  * Catatan : Sessionnya Berubah Bukan session.data.json
  *           tetapi banyak file dalam folder sessions
 */ 
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';                    
import './config.js'

import { createRequire } from "module";
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
import * as ws from 'ws';
import {
    readdirSync,
    statSync,
    unlinkSync,
    existsSync,
    readFileSync,
    watch
} from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import pino from 'pino';
const {
    useMultiFileAuthState,
    useSingleFileAuthState, 
    DisconnectReason,
    fetchLatestBaileysVersion,
    msgRetryCounterMap
} = await import('@adiwajshing/baileys')
const cek = fetchLatestBaileysVersion
import { Low, JSONFile } from 'lowdb';

import { makeWASocket, protoType, serialize } from './lib/simple.js';
import storeSys from './lib/store2.js'
import {
    mongoDB,
    mongoDBV2
} from './lib/mongoDB.js';

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
global.prefix = new RegExp('^[' + (opts['prefix'] || 'xzXZ/i!#$%+£¢€¥^°=¶×÷©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
    if (db.READ) return new Promise((resolve) => setInterval(async function () {
        if (!db.READ) {
            clearInterval(this)
            resolve(db.data == null ? global.loadDatabase() : db.data)
        }
    }, 1 * 1000))
    if (db.data !== null) return
    db.READ = true
    await db.read().catch(console.error)
    db.READ = null
    db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(db.data || {})
    }
    global.db.chain = chain(db.data)
}
loadDatabase()

global.authFile = opts['single'] ? `${opts._[0] || 'session'}.data.json` : 'sessions'
const { state, saveState, saveCreds } = opts['single'] ? await useSingleFileAuthState(authF) : await storeSys.useMultiFileAuthState(authFile)                      
const store = storeSys.makeInMemoryStore()
const sess = `${opts._[0] || 'elaina'}.store.json`
store.readFromFile(sess)
global.store = store

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  logger: pino({ level: 'trace' }), 
            printQRInTerminal: true,
            auth: state,
            browser: ['Elaina', 'Safari', '3.1.0']
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (!opts['test']) {
    setInterval(async () => {
        if (global.db.data) await global.db.write().catch(console.error)
        if (!opts['tmp']) try {
            clearTmp()

        } catch (e) {
            //console.error(e) 
        }
    }, 60 * 1000)
}
if (opts['server']) (await import('./server.js')).default(global.conn, PORT)


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
        timestamp.connect = new Date
    }
    
    if (global.db.data == null) loadDatabase()
}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true;
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
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = '❖━━━━━━[ *ᴡᴇʟᴄᴏᴍᴇ* ]━━━━━━❖\n\n┏––––––━━━━━━━━•\n│☘︎ @subject\n┣━━━━━━━━┅┅┅\n│( 👋 Hallo @user)\n├[ *ɪɴᴛʀᴏ* ]—\n│ *ɴᴀᴍᴀ:* \n│ *ᴜᴍᴜʀ:* \n│ *ɢᴇɴᴅᴇʀ:*\n┗––––––━━┅┅┅\n\n––––––┅┅ *ᴅᴇsᴄʀɪᴘᴛɪᴏɴ* ┅┅––––––\n@desc'
  conn.bye = '❖━━━━━━[ *ʟᴇᴀᴠɪɴɢ* ]━━━━━━❖\n𝚂𝚊𝚢𝚘𝚗𝚊𝚛𝚊𝚊 *@user* 👋😃'
  conn.spromote = '*@user* Sekarang jadi admin!'
  conn.sdemote = '*@user* Sekarang bukan lagi admin!'
  conn.sDesc = 'Deskripsi telah diubah menjadi \n@desc'
  conn.sSubject = 'Judul grup telah diubah menjadi \n@subject'
  conn.sIcon = 'Icon grup telah diubah!'
  conn.sRevoke = 'Link group telah diubah ke \n@revoke'
  conn.sAnnounceOn = 'Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan.'
  conn.sAnnounceOff = 'Group telah di buka!\nsekarang semua peserta dapat mengirim pesan.'
  conn.sRestrictOn = 'Edit Info Grup di ubah ke hanya admin!'
  conn.sRestrictOff = 'Edit Info Grup di ubah ke semua peserta!'

  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn)
  
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
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
filesInit().then(_ => {
    //console.log(Object.keys(global.plugins))
}
).catch(console.error)

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        let dir = global.__filename(join(pluginFolder, filename), true)
        if (filename in global.plugins) {
            if (existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
            else {
                conn.logger.warn(`deleted plugin '${filename}'`)
                conn.reply(`${global.o1}@s.whatsapp.net`, `Plugins *${filename}* telah dihapus!!`)
                conn.reply(`${global.o2}@s.whatsapp.net`, `Plugins *${filename}* telah dihapus!!`)
                return delete global.plugins[filename]
            }
        } else conn.logger.info(`requiring new plugin '${filename}'`)
        /*
        conn.reply(`${global.o1}@s.whatsapp.net`, `Plugins *${filename}* telah ditambahkan!!`)
        conn.reply(`${global.o2}@s.whatsapp.net`, `Plugins *${filename}* telah ditambahkan!!`)
        */
        let err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true
        })
        if (err) {
            conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
            conn.reply(`${global.o1}@s.whatsapp.net`, `Syntax error *${filename}*

log:
${format(err)}`)
            conn.reply(`${global.o2}@s.whatsapp.net`, `Syntax error *${filename}*
log:
${format(err)}`)
        }
        else try {
            const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
            global.plugins[filename] = module.default || module
        } catch (e) {
            conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
            conn.reply(`${global.o1}@s.whatsapp.net`, `Eror load *${filename}*
log:
${format(e)}`)
            conn.reply(`${global.o2}@s.whatsapp.net`, `Eror load *${filename}*
log:
${format(e)}`)
        } finally {
            global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
        }
    }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

// Auto Delete Session Made By Rlxfly
async function clearSessions(folder = 'sessions') {
	let filename = []
	fs.readdirSync(folder).forEach(file => filename.push(path.join(folder, file)))
	return filename.map(file => {
		let stats = fs.statSync(file)
		if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 60)) { // 1 hours
			console.log('Deleted session', file)
			return fs.unlinkSync(file)
		}
		return false
	})
}

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

    if (!s.ffmpeg) {
        conn.logger.warn(`Silahkan install ffmpeg terlebih dahulu agar bisa mengirim video`)
    }

    if (s.ffmpeg && !s.ffmpegWebp) {
        conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
    }

    if (!s.convert && !s.magick && !s.gm) {
        conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
    }

}
_quickTest()
    .then(() => conn.logger.info('☑️ Quick Test Done, nama file session => ', authFile))
    .catch(console.error)
