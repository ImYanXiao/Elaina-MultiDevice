process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
import './config.js'
import cron from "node-cron"
import * as auto from "./lib/autoScedule.js"
import { createRequire } from "module"
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
}; global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true))
}; global.__require = function require(dir = import.meta.url) {
    return createRequire(dir)
}
import * as ws from 'ws';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import syntaxerror from 'syntax-error';
import chalk from 'chalk';
import { tmpdir } from 'os';
import { format } from 'util';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb'
import pino from 'pino';
const { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@rexxhayanasi/elaina-baileys');
const PHONENUMBER_MCC = {
    "62": "Indonesia",
    "1": "USA",
    "91": "India",
    "44": "United Kingdom",
    "81": "Japan",
    "49": "Germany",
    "33": "France",
    "55": "Brazil",
    "86": "China",
    "7": "Russia",
    "82": "South Korea",
    "39": "Italy",
    "34": "Spain",
    "90": "Turkey",
    "61": "Australia",
    "27": "South Africa",
    "234": "Nigeria",
    "353": "Ireland",
    "48": "Poland"
};
const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

// Helpers aman

global.decodeSender = (m, conn) => {
  try { return (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender) } catch { return m.sender }
}
global.decodeChat = (m, conn) => {
  try { return (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat) } catch { return m.chat }
}

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.config.APIs ? global.config.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query, ...(apikeyqueryname ? {
        [apikeyqueryname]: global.config.APIKeys[name in global.config.APIs ? global.config.APIs[name] : name]
    } : {})
})) : '')

global.timestamp = {
    start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ? (opts['mongodbv2'] ? new mongoDBV2(opts['db']): new mongoDB(opts['db'])) : new JSONFile(`${opts._[0] ? opts._[0] + '_': ''}database.json`))

global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
        if (!global.db.READ) {
            clearInterval(this)
            resolve(global.db.data == null ? global.loadDatabase(): global.db.data)
        }
    },
        1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read().catch(console.error)
    global.db.READ = null
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        settings: {},
        bots: {},
        ...(global.db.data || {})
    }
    global.db.chain = chain(global.db.data)
}

loadDatabase()

const authFile = `${opts._[0] || 'sessions'}`
console.log(chalk.red(`Load AuthFile from ${authFile}`))
const { state, saveCreds } = await useMultiFileAuthState(authFile)
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(chalk.green(`using WA v${version.join('.')}, isLatest: ${isLatest}`))

const connectionOptions = {
    version,
    logger: pino({
        level: 'silent'
    }),
    printQRInTerminal: !global.config.pairingAuth,
    browser: ['Linux', 'Chrome', ''],
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino().child({
            level: 'silent',
            stream: 'store'
        }))
    }
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (global.config.pairingAuth && !conn.authState.creds.registered) {

    let phoneNumber
    if (!!global.config.pairingNumber) {
        phoneNumber = global.config.pairingNumber.replace(/[^0-9]/g, '')

        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))
            process.exit(0)
        }
    } else {
        phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
        }
    }

    setTimeout(async () => {
        let code = await conn.requestPairingCode(phoneNumber)
        code = code?.match(/.{1,4}/g)?.join("-") || code
        console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
    }, 3000)
}

if (!opts['test']) {
    setInterval(async () => {
        if (global.db.data) await global.db.write().catch(console.error)
    }, 30 * 1000)

    cron.schedule('0 0 * * *', () => {
        auto.resetCommand()
            .then(() => auto.resetChat())
            .then(() => auto.resetLimit())
            .then(() => auto.resetCryptoPrice())
            .then(() => auto.resetSahamPrice())
            .catch(console.error)
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    })

    cron.schedule('0 */5 * * *', () => {
        auto.Backup()
            .then(() => auto.resetVolumeSaham())
            .catch(console.error)
    })

    cron.schedule('0 * * * *', () => {
        auto.resetVolumeCrypto()
            .then(() => auto.clearTmp())
            .then(() => auto.clearMemory())
            .catch(console.error)
    })

    cron.schedule('*/5 * * * *', () => {
        auto.checkSewa()
            .then(() => auto.checkPremium())
            .then(() => auto.updateSaham())
            .then(() => auto.checkGempa())
            .catch(console.error)
    })

    cron.schedule('* * * * *', () => {
        auto.updateCrypto()
            .then(() => auto.checkSholat())
            .then(() => auto.checkDeposit())
            .then(() => auto.quickPurchase())
            .catch(console.error)
    })
}
if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

async function connectionUpdate(update) {
    const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update
    if (isNewLogin) conn.isInit = true
    if (connection == 'connecting') console.log(chalk.redBright('Mengaktifkan Bot, Mohon tunggu sebentar...'))
    if (connection == 'open') console.log(chalk.green('Tersambung'))
    if (isOnline == true) console.log(chalk.green('Status Aktif'))
    if (isOnline == false) console.log(chalk.red('Status Mati'))
    if (receivedPendingNotifications) console.log(chalk.yellow('Menunggu Pesan Baru'))
if (connection == 'close') {
    console.log(chalk.red('koneksi terputus & mencoba menyambung ulang...'))
}
    global.timestamp.connect = new Date
    if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        console.log(chalk.red('Connecting...'))
        await global.reloadHandler(true)
    }
    if (global.db.data == null) await global.loadDatabase()
}


process.on('uncaughtException', console.error)

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
        try {
            global.conn.ws.close()
        } catch {}
        conn.ev.removeAllListeners()
        global.conn = makeWASocket(connectionOptions, {
            chats: oldChats
        })
        isInit = true
    }
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsUpdate)
conn.ev.off('message.delete', conn.onDelete)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
conn.spromote = '@user sekarang admin!'
conn.sdemote = '@user sekarang bukan admin!'
conn.welcome = 'Hallo @user Selamat datang di @subject\n\n@desc'
conn.bye = 'Selamat tinggal @user'
conn.sRevoke = 'Link group telah diubah ke \n@revoke'
conn.handler = handler.handler.bind(global.conn)
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
conn.onDelete = handler.deleteUpdate.bind(global.conn)
conn.connectionUpdate = connectionUpdate.bind(global.conn)
conn.credsUpdate = saveCreds.bind(global.conn)
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

async function _quickTest() {
    let test = await Promise.all([spawn('ffmpeg'), spawn('ffprobe'), spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']), spawn('convert'), spawn('magick'), spawn('gm'), spawn('find', ['--version'])].map(p => {
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
    let s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
    Object.freeze(global.support)

    if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
    if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
    if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}
  
_quickTest().then(() => conn.logger.info('☑️ Quick Test Done')).catch(console.error)
