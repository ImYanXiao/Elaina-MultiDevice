/* Handler.js Refactor By RexxHayanasi 
Pengubahan Beberapa struktur kode pada Bot Repository ini lakukan
untuk membuat Bot Elaina - MultiDevice Dapat digunakan kembali oleh pengguna lainya
*/

/* ==== THANKS TO ======= */
/* 
+ Penyedia APIs
+ ImYanXiao
+ Dev Scraper
+ RexxHayanasi
+ Xnuvers007
+ All Contributor
+ All Developer Bot
+ All Pengguna Elaina MultiDevice
*/


import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import moment from 'moment-timezone'
import canvafy from "canvafy"
const printMessage = (await import('./lib/print.js')).default

const { proto } = (await import('@rexxhayanasi/elaina-baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const isBoolean = (x) => typeof x === "boolean" && Boolean(x);
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

const normalizeJid = (input = '') => {
  if (!input) return ''
  input = input.trim()
  if (/@(s\.whatsapp\.net|g\.us)$/.test(input)) return input
  if (/^lid\d+$/.test(input)) return input
  if (/^\d{5,}$/.test(input)) return input + '@s.whatsapp.net'
  return ''
}
global.normalizeJid = normalizeJid

export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate)
        return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m)
        return
    if (global.db.data == null)
        await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return
        m.exp = 0
        m.limit = false
        m.energy = false
        try {
            const sender = normalizeJid(m.sender)
        if (typeof global.db.data.users[sender] !== 'object')
            global.db.data.users[sender] = {}
        let user = global.db.data.users[sender]
            if (user) {
                if (!user.tiktok) {
                    user.tiktok = {
            username: null,        // Default null, bisa diganti dengan string kosong jika diinginkan
            birthdate: null,       // Default null, bisa digantid dengan nilai tanggal default jika diinginkan
            konten: 0,             // Default konten 0
            follower: 0,           // Default follower 0
            money: 0               // Default uang 0
        }
                }
                if (!isNumber(user.money))
                    user.money = 0
                if (!isNumber(user.exp))
                    user.exp = 0
                if (!isNumber(user.chat))
                    user.chat = 0
                if (!isNumber(user.chatTotal))
                    user.chatTotal = 0
                if (!isNumber(user.limit))
                    user.limit = 50
                if (!isNumber(user.donasi))
                    user.donasi = 0
                if (!isNumber(user.deposit))
                    user.deposit = 0
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!isNumber(user.skata))
                    user.skata = 0
                 if (!isNumber(user.konten))
                  user.konten = 0
                if (!isNumber(user.follower))
                    user.follower = 0
                if (!isNumber(user.lasttiktokkonten))
                    user.lasttiktokkonten = 0
                if (!isNumber(user.pc))
                    user.pc = 0
                if (!isNumber(user.lastseen))
                    user.lastseen = 0
                if (!isNumber(user.pacaranTime))
                    user.pacaranTime = 0
                if (!('registered' in user))
                    user.registered = false
                if (!('pacar' in user))
                    user.pacar = ""
                if (!('tembak' in user))
                    user.tembak = ""
                if (!('ditembak' in user))
                    user.ditembak = false
                if (!user.registered) {
                    if (!('name' in user))
                        user.name = m.name
                    if (!isNumber(user.age))
                        user.age = -1
                    if (!isNumber(user.regTime))
                        user.regTime = -1
                }
                if (!isNumber(user.afk))
                    user.afk = -1
                if (!isNumber(user.unbanwa))
                    user.unbanwa = 0
                if (!('unreg' in user))
                    user.unreg = false
                if (!('afkReason' in user))
                    user.afkReason = ''
                if (!('banned' in user))
                    user.banned = false
                if (!isNumber(user.bannedTime))
                    user.bannedTime = 0
                if (!'WarnReason' in user)
                    user.WarnReason = ''
                if (!isNumber(user.warning))
                    user.warning = 0
                if (!isNumber(user.level))
                    user.level = 0
                if (!('role' in user))
                    user.role = 'Beginner'
                if (!('skill' in user))
                    user.skill = ''

                if (!('email') in user)
                    user.email = ''
                if (!('verif') in user)
                    user.verif = false
                if (!isNumber(user.command))
                    user.command = 0
                if (!isNumber(user.commandTotal))
                    user.commandTotal = 0
                if (!isNumber(user.commandLimit))
                    user.commandLimit = 50
                if (!isNumber(user.cmdLimitMsg))
                    user.cmdLimitMsg = 0

                if (!isNumber(user.chip))
                    user.chip = 0
                if (!isNumber(user.atm))
                    user.atm = 0
                if (!isNumber(user.fullatm))
                    user.fullatm = 0
                if (!isNumber(user.bank))
                    user.bank = 0
                if (!isNumber(user.health))
                    user.health = 100
                if (!isNumber(user.energy))
                    user.energy = 100
                if (!isNumber(user.sleep))
                    user.sleep = 100
                if (!isNumber(user.potion))
                    user.potion = 0
                if (!isNumber(user.trash))
                    user.trash = 0
                if (!isNumber(user.wood))
                    user.wood = 0
                if (!isNumber(user.rock))
                    user.rock = 0
                if (!isNumber(user.string))
                    user.string = 0
                if (!isNumber(user.petfood))
                    user.petfood = 0

                if (!isNumber(user.emerald))
                    user.emerald = 0
                if (!isNumber(user.diamond))
                    user.diamond = 0
                if (!isNumber(user.gold))
                    user.gold = 0
                if (!isNumber(user.botol))
                    user.botol = 0
                if (!isNumber(user.kardus))
                    user.kardus = 0
                if (!isNumber(user.kaleng))
                    user.kaleng = 0
                if (!isNumber(user.gelas))
                    user.gelas = 0
                if (!isNumber(user.plastik))
                    user.plastik = 0
                if (!isNumber(user.iron))
                    user.iron = 0

                if (!isNumber(user.common))
                    user.common = 0
                if (!isNumber(user.uncommon))
                    user.uncommon = 0
                if (!isNumber(user.mythic))
                    user.mythic = 0
                if (!isNumber(user.legendary))
                    user.legendary = 0
                if (!isNumber(user.umpan))
                    user.umpan = 0
                if (!isNumber(user.pet))
                    user.pet = 0

                if (!isNumber(user.paus))
                    user.paus = 0
                if (!isNumber(user.kepiting))
                    user.kepiting = 0
                if (!isNumber(user.gurita))
                    user.gurita = 0
                if (!isNumber(user.cumi))
                    user.cumi = 0
                if (!isNumber(user.buntal))
                    user.buntal = 0
                if (!isNumber(user.dory))
                    user.dory = 0
                if (!isNumber(user.lumba))
                    user.lumba = 0
                if (!isNumber(user.lobster))
                    user.lobster = 0
                if (!isNumber(user.hiu))
                    user.hiu = 0
                if (!isNumber(user.udang))
                    user.udang = 0
                if (!isNumber(user.orca))
                    user.orca = 0

                if (!isNumber(user.banteng))
                    user.banteng = 0
                if (!isNumber(user.gajah))
                    user.gajah = 0
                if (!isNumber(user.harimau))
                    user.harimau = 0
                if (!isNumber(user.kambing))
                    user.kambing = 0
                if (!isNumber(user.panda))
                    user.panda = 0
                if (!isNumber(user.buaya))
                    user.buaya = 0
                if (!isNumber(user.kerbau))
                    user.kerbau = 0
                if (!isNumber(user.sapi))
                    user.sapi = 0
                if (!isNumber(user.monyet))
                    user.monyet = 0
                if (!isNumber(user.babihutan))
                    user.babihutan = 0
                if (!isNumber(user.babi))
                    user.babi = 0
                if (!isNumber(user.ayam))
                    user.ayam = 0

                if (!isNumber(user.steak))
                    user.steak = 0
                if (!isNumber(user.ayam_goreng))
                    user.ayam_goreng = 0
                if (!isNumber(user.ribs))
                    user.ribs = 0
                if (!isNumber(user.roti))
                    user.roti = 0
                if (!isNumber(user.udang_goreng))
                    user.udang_goreng = 0
                if (!isNumber(user.bacon))
                    user.bacon = 0
                if (!isNumber(user.gandum))
                    user.gandum = 0
                if (!isNumber(user.minyak))
                    user.minyak = 0
                if (!isNumber(user.garam))
                    user.garam = 0

                if (!isNumber(user.ojek))
                    user.ojek = 0
                if (!isNumber(user.polisi))
                    user.polisi = 0
                if (!isNumber(user.roket))
                    user.roket = 0
                if (!isNumber(user.taxy))
                    user.taxy = 0

                if (!isNumber(user.lockBankCD))
                    user.lockBankCD = 0
                if (!isNumber(user.lasthackbank))
                    user.lasthackbank = 0
                if (!isNumber(user.lastadventure))
                    user.lastadventure = 0
                if (!isNumber(user.lastkill))
                    user.lastkill = 0
                if (!isNumber(user.lastmisi))
                    user.lastmisi = 0
                if (!isNumber(user.lastdungeon))
                    user.lastdungeon = 0
                if (!isNumber(user.lastwar))
                    user.lastwar = 0
                if (!isNumber(user.lastsda))
                    user.lastsda = 0
                if (!isNumber(user.lastduel))
                    user.lastduel = 0
                if (!isNumber(user.lastmining))
                    user.lastmining = 0
                if (!isNumber(user.lasthunt))
                    user.lasthunt = 0
                if (!isNumber(user.lastgift))
                    user.lastgift = 0
                if (!isNumber(user.lastberkebon))
                    user.lastberkebon = 0
                if (!isNumber(user.lastdagang))
                    user.lastdagang = 0
                if (!isNumber(user.lasthourly))
                    user.lasthourly = 0
                if (!isNumber(user.lastbansos))
                    user.lastbansos = 0
                if (!isNumber(user.lastrampok))
                    user.lastrampok = 0
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!isNumber(user.lastnebang))
                    user.lastnebang = 0
                if (!isNumber(user.lastweekly))
                    user.lastweekly = 0
                if (!isNumber(user.lastmonthly))
                    user.lastmonthly = 0

                if (!isNumber(user.apel))
                    user.apel = 0
                if (!isNumber(user.anggur))
                    user.anggur = 0
                if (!isNumber(user.jeruk))
                    user.jeruk = 0
                if (!isNumber(user.mangga))
                    user.mangga = 0
                if (!isNumber(user.pisang))
                    user.pisang = 0
                if (!isNumber(user.makanan))
                    user.makanan = 0
                if (!isNumber(user.bibitanggur))
                    user.bibitanggur = 0
                if (!isNumber(user.bibitpisang))
                    user.bibitpisang = 0
                if (!isNumber(user.bibitapel))
                    user.bibitapel = 0
                if (!isNumber(user.bibitmangga))
                    user.bibitmangga = 0
                if (!isNumber(user.bibitjeruk))
                    user.bibitjeruk = 0

                if (!isNumber(user.horse))
                    user.horse = 0
                if (!isNumber(user.horseexp))
                    user.horseexp = 0
                if (!isNumber(user.cat))
                    user.cat = 0
                if (!isNumber(user.catexp))
                    user.catexp = 0
                if (!isNumber(user.fox))
                    user.fox = 0
                if (!isNumber(user.foxhexp))
                    user.foxexp = 0
                if (!isNumber(user.dogexp))
                    user.dogexp = 0
                if (!isNumber(user.robo))
                    user.robo = 0
                if (!isNumber(user.roboexp))
                    user.roboexp = 0

                if (!isNumber(user.horselastfeed))
                    user.horselastfeed = 0
                if (!isNumber(user.catlastfeed))
                    user.catlastfeed = 0
                if (!isNumber(user.robolastfeed))
                    user.robolastfeed = 0
                if (!isNumber(user.foxlastfeed))
                    user.foxlastfeed = 0
                if (!isNumber(user.doglastfeed))
                    user.doglastfeed = 0

                if (!isNumber(user.robo))
                    user.robo = 0
                if (!isNumber(user.robodurability))
                    user.robodurability = 0
                if (!isNumber(user.armor))
                    user.armor = 0
                if (!isNumber(user.armordurability))
                    user.armordurability = 0
                if (!isNumber(user.sword))
                    user.sword = 0
                if (!isNumber(user.sworddurability))
                    user.sworddurability = 0
                if (!isNumber(user.pickaxe))
                    user.pickaxe = 0
                if (!isNumber(user.pickaxedurability))
                    user.pickaxedurability = 0
                if (!isNumber(user.fishingrod))
                    user.fishingrod = 0
                if (!isNumber(user.fishingroddurability))
                    user.fishingroddurability = 0

                if (!('premium' in user))
                    user.premium = false
                if (!('autolevelup' in user))
                    user.autolevelup = false
                if (!('autodownload' in user))
                    user.autodownload = false
                if (!('sticker' in user))
                    user.sticker = {}
                if (!('invest' in user))
                    user.invest = {}
                if (!('saham' in user))
                    user.saham = {}
                if (!('task' in user))
                    user.task = {}
                if (!('historyTrx' in user))
                    user.historyTrx = []
                if (!('rumah' in user))
                    user.rumah = {}
                if (!isNumber(user.premiumTime))
                    user.premiumTime = 0
            } else global.db.data.users[m.sender] = {
                money: 0,
                exp: 0,
                limit: 50,
                chat: 0,
                chatTotal: 0,
                lastclaim: 0,
                skata: 0,
                donasi: 0,
                deposit: 0,
                registered: false,
                pacar: "",
                tembak: "",
                ditembak: false,
                pacaranTime: 0,
                name: m.name,
                pc: 0,
                lastseen: 0,
                age: -1,
                regTime: -1,
                unreg: false,
                afk: -1,
                unbanwa: 0,
                afkReason: '',
                banned: false,
                bannedTime: 0,
                warning: 0,
                level: 0,
                role: 'Beginner',
                skill: '',
                WarnReason: '',

                chip: 0,
                bank: 0,
                atm: 0,
                fullatm: 0,
                health: 100,
                energy: 100,
                sleep: 100,
                potion: 10,
                trash: 0,
                wood: 0,
                rock: 0,
                string: 0,
                emerald: 0,
                diamond: 0,
                gold: 0,
                iron: 0,
                common: 0,
                uncommon: 0,
                mythic: 0,
                legendary: 0,
                umpan: 0,
                pet: 0,
                horse: 0,
                horseexp: 0,
                horselastfeed: 0,
                cat: 0,
                catexp: 0,
                catlastfeed: 0,
                fox: 0,
                foxexp: 0,
                foxlastfeed: 0,
                robo: 0,
                roboexp: 0,
                robolastfeed: 0,
                dog: 0,
                dogexp: 0,
                doglastfeed: 0,

                email: '',
                verif: false,
                command: 0,
                commandTotal: 0,
                commandLimit: 50,
                cmdLimitMsg: 0,

                paus: 0,
                kepiting: 0,
                gurita: 0,
                cumi: 0,
                buntal: 0,
                dory: 0,
                lumba: 0,
                lobster: 0,
                hiu: 0,
                udang: 0,
                ikan: 0,
                orca: 0,
                banteng: 0,
                harimau: 0,
                gajah: 0,
                kambing: 0,
                buaya: 0,
                kerbau: 0,
                sapi: 0,
                monyet: 0,
                babi: 0,
                ayam: 0,

                ojek: 0,
                polisi: 0,
                roket: 0,
                taxy: 0,

                armor: 0,
                armordurability: 0,
                sword: 0,
                sworddurability: 0,
                pickaxe: 0,
                pickaxedurability: 0,
                fishingrod: 0,
                fishingroddurability: 0,
                robo: 0,
                robodurability: 0,
                apel: 20,
                pisang: 0,
                anggur: 0,
                mangga: 0,
                jeruk: 0,

                steak: 0,
                ayam_goreng: 0,
                ribs: 0,
                roti: 0,
                udang_goreng: 0,
                bacon: 0,
                gandum: 0,
                minyak: 0,
                garam: 0,

                lastadventure: 0,
                lockBankCD: 0,
                lasthackbank: 0,
                lastkill: 0,
                lastmisi: 0,
                lastdungeon: 0,
                lastwar: 0,
                lastsda: 0,
                lastduel: 0,
                lastmining: 0,
                lasthunt: 0,
                lastgift: 0,
                lastberkebon: 0,
                lastdagang: 0,
                lasthourly: 0,
                lastbansos: 0,
                lastrampok: 0,
                lastclaim: 0,
                lastnebang: 0,
                lastweekly: 0,
                lastmonthly: 0,

                premium: false,
                autolevelup: false,
                autodownload: false,
                sticker: {},
                invest: {},
                saham: {},
                task: {},
                historyTrx: [],
                rumah: {},
                premiumTime: 0,
            }
            let life = db.data.users[m.sender].life;
    if (typeof life !== "object") db.data.users[m.sender].life = {};
    if (life) {
      if (!("name" in life)) life.name = "";
      if (!("gender" in life)) life.gender = "";
      if (!("age" in life)) life.age = "";
      if (!isBoolean(life.verified)) life.verified = false;

      if (!("waifu" in life)) life.waifu = "";
      if (!isNumber(life.exp)) life.exp = 0;
      if (!isNumber(life.lastkencan)) life.lastkencan = 0;
      if (!isNumber(life.money)) life.money = 0;
      if (!isNumber(life.gamepas)) life.gamepas = 0;

      if (!isNumber(life.id)) life.id = 0;
      if (!("about" in life)) life.about = "";
    } else {
      db.data.users[m.sender].life = {
        name: "",
        gender: "",
        age: "",
        verified: false,

        waifu: "",
        exp: 0,
        lastkencan: 0,
        money: 0,
        gamepas: 0,

        id: "",
        about: "",
      };
    }
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object')
                global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat))
                    chat.isBanned = false
                if (!('isBannedTime' in chat))
                    chat.isBannedTime = false
                if (!('mute' in chat))
                    chat.mute = false
                if (!('adminOnly' in chat))
                    chat.adminOnly = false

                if (!('welcome' in chat))
                    chat.welcome = false
                if (!('detect' in chat))
                    chat.detect = false
                if (!('sWelcome' in chat))
                    chat.sWelcome = ''
                if (!('sBye' in chat))
                    chat.sBye = ''
                if (!('sPromote' in chat))
                    chat.sPromote = ''
                if (!('sDemote' in chat))
                    chat.sDemote = ''

                if (!('otakuNews' in chat))
                    chat.otakuNews = false
                if (!('otakuNow' in chat))
                    chat.otakuNow = ''
                if (!('komikuNews' in chat))
                    chat.komikuNews = false
                if (!('komikuNow' in chat))
                    chat.komikuNow = ''
                if (!('antidelete' in chat))
                    chat.antidelete = false
                if (!('antiLinks' in chat))
                    chat.antiLinks = false
                if (!('antiLinkGc' in chat))
                    chat.antiLinkGc = false
                if (!('antiVn' in chat))
                    chat.antiVn = false
                if (!('antiSticker' in chat))
                    chat.antiSticker = false
                if (!('antiLinkWa' in chat))
                    chat.antiLinkWa = false
                if (!('antiVirtex' in chat))
                    chat.antiVirtex = false
                if (!('antiToxic' in chat))
                    chat.antiToxic = false
                if (!('antiBadword' in chat))
                    chat.antiBadword = false
                if (!('pembatasan' in chat))
                    chat.pembatasan = false
                if (!('viewonce' in chat))
                    chat.viewonce = false
                if (!('simi' in chat))
                    chat.simi = false
                if (!('nsfw' in chat))
                    chat.nsfw = false
                if (!('rpg' in chat))
                    chat.rpg = true
                if (!('game' in chat))
                    chat.game = true
                if (!('teks' in chat))
                    chat.teks = false
                if (!('notifgempa' in chat))
                    chat.notifgempa = false
                if (!('gempaDateTime' in chat))
                    chat.gempaDateTime = ''

                if (!('autolevelup' in chat))
                    chat.autolevelup = false
                if (!('autodownload' in chat))
                    chat.autodownload = false
                if (!isNumber(chat.expired))
                    chat.expired = 0

                if (!('store' in chat))
                    chat.store = {}
                if (!('member' in chat))
                    chat.member = {}
            } else global.db.data.chats[m.chat] = {
                isBanned: false,
                isBannedTime: false,
                mute: false,
                adminOnly: false,

                welcome: false,
                detect: false,
                sWelcome: '',
                sBye: '',
                sPromote: '',
                sDemote: '',

                otakuNews: false,
                otakuNow: '',
                komikuNews: false,
                komikuNow: '',
                antidelete: false,
                antiLinks: false,
                antiLinkGc: false,
                antiVn: false,
                antiLinkWa: false,
                antiSticker: false,
                antiToxic: false,
                antiVirtex: false,
                antiBadword: false,
                pembatasan: false,
                viewonce: false,
                simi: false,
                nsfw: false,
                rpg: true,
                game: true,
                teks: true,
                notifgempa: false,
                gempaDateTime: '',

                autolevelup: false,
                autodownload: false,
                expired: 0,

                store: {},
                member: {}
            }         
            
            let settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
            if (settings) {
                if (!('self' in settings)) settings.self = false
                if (!('autoread' in settings)) settings.autoread = true
                if (!('composing' in settings)) settings.composing = false
                if (!('restrict' in settings)) settings.restrict = true
                if (!('autorestart' in settings)) settings.autorestart = true
                if (!('backup' in settings)) settings.backup = false
                if (!('cleartmp' in settings)) settings.cleartmp = false
                if (!('anticall' in settings)) settings.anticall = true
                if (!('adReply' in settings)) settings.adReply = false
                if (!('smlcap' in settings)) settings.smlcap = false
                if (!('noerror' in settings)) settings.noerror = false
            } else global.db.data.settings[this.user.jid] = {
                self: false,
                autoread: true,
                composing: false,
                restrict: true,
                autorestart: true,
                backup: false,
                cleartmp: false,
                anticall: true,
                adReply: false,
                smlcap: false,
                noerror: false
            }

            let bot = global.db.data.bots
            if (typeof bot !== 'object') global.db.data.bots = {}
            if (bot) {
                if (!('replyText' in bot)) bot.replyText = {}
                if (!('rating' in bot)) bot.rating = {}
                if (!('users' in bot)) bot.users = {}
                if (!('menfess' in bot)) bot.menfess = {}
                if (!('anonymous' in bot)) bot.anonymous = {}
                if (!('absen' in bot)) bot.absen = {}
                if (!('logs' in bot)) bot.logs = {}
                if (!('ultah' in bot)) bot.ultah = {}
                if (!('gempaDateTime' in bot)) bot.gempaDateTime = ""
                if (!('otakuNow' in bot)) bot.otakuNow = ""
                if (!('komikuNow' in bot)) bot.komikuNow = ""
                if (!('sellRumah' in bot)) bot.sellRumah = {}
                if (!('invest' in bot)) bot.invest = JSON.parse(fs.readFileSync('./json/crypto.json', 'utf-8'))
                if (!('stock' in bot)) bot.stock = JSON.parse(fs.readFileSync('./json/stock.json', 'utf-8'))
                if (!('rumah' in bot)) bot.rumah = JSON.parse(fs.readFileSync('./json/rumah.json', 'utf-8'))
                if (!('saham' in bot)) bot.saham = JSON.parse(fs.readFileSync('./json/saham.json', 'utf-8'))
                if (!('jadwalsholat' in bot)) bot.jadwalsholat = JSON.parse(fs.readFileSync('./json/jadwalsholat.json', 'utf-8'))
            } else global.db.data.bots = {
                replyText: {},
            	rating: {},
            	users: {},
                menfess: {},
                anonymous: {},
                absen: {},
                logs: {},
                ultah: {},
                gempaDateTime: "",
                otakuNow: "",
                komikuNow: "",
                sellRumah: {},
                invest: JSON.parse(fs.readFileSync('./json/crypto.json', 'utf-8')),
                stock: JSON.parse(fs.readFileSync('./json/stock.json', 'utf-8')),
                saham: JSON.parse(fs.readFileSync('./json/saham.json', 'utf-8')),
                rumah: JSON.parse(fs.readFileSync('./json/rumah.json', 'utf-8')),
                jadwalsholat: JSON.parse(fs.readFileSync('./json/jadwalsholat.json', 'utf-8'))
            }

            let member = global.db.data.chats[m.chat].member[m.sender]
            if (typeof member !== 'object') global.db.data.chats[m.chat].member[m.sender] = {}
            if (member) {
                if (!isNumber(member.warn)) member.warn = 0
                if (!('blacklist' in member)) member.blacklist = false
                if (!isNumber(member.blacklistTime)) member.blacklistTime = 0
                if (!isNumber(member.chat)) member.chat = 0
                if (!isNumber(member.chatTotal)) member.chatTotal = 0
                if (!isNumber(member.command)) member.command = 0
                if (!isNumber(member.commandTotal)) member.commandTotal = 0
                if (!isNumber(member.lastseen)) member.lastseen = 0
            } else global.db.data.chats[m.chat].member[m.sender] = {
                warn: 0,
                blacklist: false,
                blacklistTime: 0,
                chat: 0,
                chatTotal: 0,
                command: 0,
                commandTotal: 0,
                lastseen: 0
            }

        } catch (e) {
            console.error(e)
        }

        const isMods = global.config.owner.filter(([number, _, isDeveloper]) => number && isDeveloper).map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isOwner = m.fromMe || isMods || global.config.owner.filter(([number, _, isDeveloper]) => number && !isDeveloper).map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems =  isOwner || new Date() - global.db.data.users[m.sender].premiumTime < 0

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque,
            time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        if (m.isBaileys || m.fromMe)
            return
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
        let _chat = global.db.data && global.db.data.chats && global.db.data.chats[m.chat]

        const groupMetadata = (
  m.isGroup
    ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(() => null))
    : {}
) || {}

const participants = (m.isGroup ? groupMetadata.participants : []) || []

const senderJid = (m.sender && m.sender.endsWith('@s.whatsapp.net'))
  ? m.sender
  : conn.decodeJid?.(m.sender) || m.sender

const myJidRaw = this?.user?.jid || this?.user?.id || conn?.user?.id
const myJid = (myJidRaw && myJidRaw.endsWith('@s.whatsapp.net'))
  ? myJidRaw
  : conn.decodeJid?.(myJidRaw) || myJidRaw

const user = (m.isGroup ? participants.find(u => u.jid === senderJid) : {}) || {}
const bot  = (m.isGroup ? participants.find(u => u.jid === myJid)     : {}) || {}

const isRAdmin   = user?.admin === 'superadmin' || false
const isAdmin    = isRAdmin || user?.admin === 'admin' || false
const isBotAdmin = bot?.admin ? true : false

const isBlacklist = m.isGroup
  ? Object.entries(_chat.member || {}).find(([jid, data]) => data?.blacklist && jid === senderJid)
  : false

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    console.error(e)
                    if (!global.db.data.settings[conn.user.jid].noerror) {
                        for (let [jid] of global.config.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                            let data = (await conn.onWhatsApp(jid))[0] || {}
                            if (data.exists)
                                m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
                        }
                    }
                }
            }
            if (!opts['restrict'])
                if (plugin.tags && plugin.tags.includes('admin')) {
                continue
            }
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            const prefix = new RegExp('^[' + (opts['prefix'] || '‎\/!#.\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : prefix
            let match = (_prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]] : Array.isArray(_prefix) ? _prefix.map(p => {
                let re = p instanceof RegExp ? p : new RegExp(str2Regex(p))
                return [re.exec(m.text), re]}) : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] : [[[], new RegExp]]).find(p => p[1])
            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isMods,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }))
                continue
            }
            if (typeof plugin !== 'function')
                continue
            if ((usedPrefix = (match[0] || '')[0])) {
                let noPrefix = m.text.replace(usedPrefix, '')
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join(" ") 
                command = (command || '').toLowerCase()
                let fail = plugin.fail || global.dfail
                let isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) : Array.isArray(plugin.command) ? plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command) : typeof plugin.command === 'string' ? plugin.command === command : false

                if (!isAccept)
                    continue
                m.plugin = name

                let user = global.db.data.users[m.sender]
                let chat = global.db.data.chats[m.chat]
                let setting = global.db.data.settings[this.user.jid]

                if (typeof m.text !== 'string')
                    m.text = ''
                if (!m.fromMe && opts['self'] && !isOwner)
                    return
                if (opts['pconly'] && m.isGroup)
                    return

                if (!name.startsWith("topup") && name != "_quickPurchase.js" && name != 'fun-suitpvp_ans.js' && name != '_cekVerifCode.js' && name != 'game-werewolf_ans.js' && name != 'rpg-referal.js' && name != 'main-sewa.js' && name != 'main-premium.js' && name != 'info-owner.js' && name != "exp-daftar.js" && name != 'exp-verified.js' && opts['gconly'] && !m.isGroup && !isPrems && Date.now() - user.pc < 21600000)
                    return
                if (!name.startsWith("topup") && name != "_quickPurchase.js" && name != 'fun-suitpvp_ans.js' && name != '_cekVerifCode.js' && name != 'game-werewolf_ans.js' && name != 'rpg-referal.js' && name != 'main-sewa.js' && name != 'main-premium.js' && name != 'info-owner.js' && name != "exp-daftar.js" && name != 'exp-verified.js' && opts['gconly'] && !m.isGroup && !isPrems && Date.now() - user.pc > 21600000) {
                    if (setting.composing) await this.sendPresenceUpdate('composing', m.chat).catch(() => {})
                    if (setting.autoread) await this.readMessages([m.key]).catch(() => {})
                    return conn.adReply(m.chat, `Hallo Kak, ${conn.getName(m.sender)} \n\nMohon maaf saat ini ${conn.user.name} sedang didalam mode *Group Only*, untuk menggunakan ${conn.user.name} di Private Chat anda harus menjadi *User Premium*\nUntuk menjadi *User Premium* silahkan ketik *#premium*`, global.config.watermark, null, fs.readFileSync('./media/thumbnail.jpg'), global.config.group, m).then(() => {
                        user.pc = Date.now()
                    })
                }

                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    if (name != 'group-info.js' && !isAdmin && chat?.adminOnly)
                        return
                    if (name != 'group-modebot.js' && name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && (chat?.isBanned || chat?.mute))
                        return
                    if (name != 'owner-unbanuser.js' && name != 'info-cekbanned.js' && user?.banned)
                        return
                    if (name != 'group-listblacklist.js' && isBlacklist)
                        return

                    if (!name.startsWith("topup") && name != "main-premium.js" && name != "main-sewa.js" && name != "info-owner.js" && name != "_quickPurchase.js" && name != 'exp-daftar.js' && name != 'exp-verified.js' && name != 'info-limit.js' && user.command >= user.commandLimit && !isPrems && Date.now() - user.cmdLimitMsg < 600000)
                        return
                    if (!name.startsWith("topup") && name != "main-premium.js" && name != "main-sewa.js" && name != "info-owner.js" && name != "_quickPurchase.js" && name != 'exp-daftar.js' && name != 'exp-verified.js' && name != 'info-limit.js' && user.command >= user.commandLimit && !isPrems && Date.now() - user.cmdLimitMsg > 600000) {
                        if (setting.composing) await this.sendPresenceUpdate('composing', m.chat).catch(() => {})
                        if (setting.autoread) await this.readMessages([m.key]).catch(() => {})
                        return m.reply(`Limit command kamu sudah habis ${user.command} / ${user.commandLimit}, Silahkan tunggu limit reset pada jam 12 malam! \n\n${!user.verif ? "_Atau Verifikasi terlebih dahulu menggunakan command *#verif* untuk mendapatkan 1000 command limit_" : "_Atau ke Premium User untuk mendapatkan Unlimited Command Limit_"}`).then(() => {
                            user.cmdLimitMsg = Date.now()
                        })
                    }

                    if (m.isGroup) {
                        chat.member[m.sender].command++
                        chat.member[m.sender].commandTotal++
                        chat.member[m.sender].lastCmd = Date.now()
                    }
                    user.command++
                    user.commandTotal++
                    user.lastCmd = Date.now()
                }

                if (setting.composing)
                    await this.sendPresenceUpdate('composing', m.chat).catch(() => {})
                if (setting.autoread)
                    await this.readMessages([m.key]).catch(() => {})
                if (plugin.mods && !isMods) {
                    fail('mods', m, this)
                    continue
                }
                if (plugin.owner && !isOwner) {
                    fail('owner', m, this)
                    continue
                }
                if (plugin.premium && !isPrems) {
                    fail('premium', m, this)
                    continue
                }
                if (plugin.group && !m.isGroup) {
                    fail('group', m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) {
                    fail('botAdmin', m, this)
                    continue
                } else if (plugin.admin && !isAdmin) {
                    fail('admin', m, this)
                    continue
                }
                if (plugin.private && m.isGroup) {
                    fail('private', m, this)
                    continue
                }
                if (plugin.register && !_user.registered) {
                    fail('unreg', m, this)
                    continue
                }
                if (plugin.onlyprem && !m.isGroup && !isPrems) {
                    fail('onlyprem', m, this)
                    continue
                }
                if (plugin.rpg && m.isGroup && !global.db.data.chats[m.chat].rpg) {
                    fail('rpg', m, this)
                    continue
                }
                if (plugin.game && m.isGroup && !global.db.data.chats[m.chat].game) {
                    fail('game', m, this)
                    continue
                }
                if (plugin.nsfw && m.isGroup && !global.db.data.chats[m.chat].nsfw) {
                    fail('nsfw', m, this)
                    continue
                }
                m.isCommand = true
                let xp = 'exp' in plugin ? parseInt(plugin.exp): 17
                if (xp > 200)
                    m.reply('Ngecit -_-')
                else
                    m.exp += xp
                if (plugin.limit && !isPrems && _user.limit < plugin.limit * 1) {
                	fail('limitExp', m, this)
                    continue
                }
                if (plugin.energy && _user.energy < plugin.energy * 1) {
                	fail('energy', m, this)
                    continue
                }
                if (plugin.level > _user.level) {
                    this.adReply(m.chat, `Untuk menggunakan fitur ini, kamu harus berada di level ${plugin.level}`, 'ＡＫＳＥＳ ＤＩＴＯＬＡＫ', global.config.watermark, fs.readFileSync('./media/denied.jpg'), global.config.website, m, false)
                    continue
                }
                if (plugin.age > _user.age) {
                    this.adReply(m.chat, `Untuk menggunakan fitur ini, kamu harus berumur ${plugin.age} Tahun`, 'ＡＫＳＥＳ ＤＩＴＯＬＡＫ', global.config.watermark, fs.readFileSync('./media/denied.jpg'), global.config.website, m, false)
                    continue
                }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isMods,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    if (!m._handled) 
                    {await plugin.call(this, m, extra)
                    m._handled = true
                    }
                    m.energy = m.energy || plugin.energy || false
                    if (!isPrems)
                        m.limit = m.limit || plugin.limit || false
                } catch (e) {
                    m.error = e
                    console.error(e)
                    if (e && setting.noerror) {
                        m.reply(global.config.errorMsg)
                    } else if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.config.APIKeys))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                        if (e.name)
                            for (let [jid] of global.config.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                            let data = (await conn.onWhatsApp(jid))[0] || {}
                            if (data.exists)
                                m.reply(`*🗂️ Plugin:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
                        }
                        m.reply(text)
                    }
                } finally {
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
        let user,
        stats = global.db.data.stats
        if (m) {
            if (m.sender && (user = global.db.data.users[m.sender])) {
                user.exp += m.exp
                user.limit -= m.limit * 1
                user.energy -= m.energy * 1
            }

            let stat
            if (m.plugin) {
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total))
                        stat.total = 1
                    if (!isNumber(stat.success))
                        stat.success = m.error != null ? 0: 1
                    if (!isNumber(stat.last))
                        stat.last = now
                    if (!isNumber(stat.lastSuccess))
                        stat.lastSuccess = m.error != null ? 0: now
                } else
                    stat = stats[m.plugin] = {
                    total: 1,
                    success: m.error != null ? 0: 1,
                    last: now,
                    lastSuccess: m.error != null ? 0: now
                }
                stat.total += 1
                stat.last = now
                if (m.error == null) {
                    stat.success += 1
                    stat.lastSuccess = now
                }
            }
        }

        try {
            if (!opts['noprint']) await printMessage(m, this)
        } catch (e) {
            console.log(m, m.quoted, e)
        }

        let chat = global.db.data.chats[m.chat]

        user.chat++
        user.chatTotal++
        user.lastseen = Date.now()

        if (m.isGroup) {
            chat.member[m.sender].chat++
            chat.member[m.sender].chatTotal++
            chat.member[m.sender].lastseen = Date.now()
        }
    }
}

export async function participantsUpdate( { id, participants, action }) {
    if (opts['self'])
        return
    if (this.isInit)
        return
    let chat = global.db.data.chats[id] || {}
    let text = ''
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    switch (action) {
        case 'add': {
    if (!chat.welcome) return;
    let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata;
    if (!groupMetadata) return;

    for (let user of participants) {
        const participant = groupMetadata.participants.find(p => p.id === user);
        const realJid = participant?.jid || user;

        const name = global.db.data.users?.[realJid]?.registered ? global.db.data.users?.[realJid]?.name : this.getName(realJid);
        const pp = await this.profilePictureUrl(realJid, 'image').catch(_ => 'https://i.ibb.co/sQTkHLD/ppkosong.png');
        const groupName = groupMetadata.subject;
        
        const img = await welcomeBanner(pp, name, groupName, "welcome");

        let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!');
        text = text.replace('@subject', groupName)
                   .replace('@desc', groupMetadata.desc?.toString() || 'Tidak ada deskripsi')
                   .replace('@user', "@" + realJid.split("@")[0]);

        this.adReply(id, text.trim(), "W E L C O M E  U S E R", global.config.watermark, img, global.config.website, false, true, false, { mentions: [realJid] });
    }
    break;
}
        case "remove": {
    if (chat.welcome) {
        let groupMetadata = (await this.groupMetadata(id)) || (conn.chats[id] || {}).metadata;
        if (!groupMetadata) return;

        for (let user of participants) {
            const participant = groupMetadata.participants.find(p => p.id === user);
            const realJid = participant?.jid || user;

            let pp = "https://i.ibb.co/sQTkHLD/ppkosong.png";
            try {
                pp = await this.profilePictureUrl(realJid, "image");
            } catch (e) {
                console.error(`Gagal mengambil PP untuk ${realJid}:`, e);
            }

            const text = (chat.sBye || this.bye || conn.bye || "Bye, @user!")
                .replace("@user", "@" + realJid.split("@")[0]);

            this.sendMessage(
                id,
                {
                    document: fs.readFileSync("./package.json"),
                    fileName: wm,
                    mimetype: "application/pdf",
                    fileLength: 9999999,
                    pageCount: 1,
                    caption: text,
                    contextInfo: {
                        mentionedJid: [realJid],
                        externalAdReply: {
                            title: "G O O D B Y E  U S E R",
                            body: "",
                            thumbnailUrl: pp,
                            sourceUrl: null,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                },
                { quoted: null }
            );
        }
    }
    break;
}
        case 'promote':
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
        case 'demote':
            if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])

            // ===== tambahan: cek metadata agar pakai jid bukan lid =====
            ;(async () => {
                let groupMetadataPD = await this.groupMetadata(id).catch(() => (conn.chats[id] || {}).metadata) || {}
                let p0 = groupMetadataPD?.participants?.find(x => x.id === participants[0] || x.lid === participants[0] || x.jid === participants[0])
                let realJid0 = p0?.jid || participants[0]
                text = text.replace('@' + participants[0].split('@')[0], '@' + realJid0.split('@')[0])
                if (chat.detect)
                    this.reply(id, text, false)
            })()
            // ==========================================================
            break
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe)
            return
        let msg = this.serializeM(this.loadMessage(id))
        if (!msg)
            return
        let chat = global.db.data.chats[msg.chat] || {}
        if (!chat.antidelete)
            return
        await this.reply(msg.chat, `
⧻Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik
*.enable delete*
`.trim(), msg, { mentions: [participant] })
        this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
    let msg = {
        owner: 'Command ini hanya dapat digunakan oleh *Owner* !!',
        mods: 'Command ini hanya dapat digunakan oleh *Developer* !!',
        premium: 'Command ini hanya untuk member *Premium* !!',
        group: 'Command ini hanya dapat digunakan di *Group* !!',
        private: 'Command ini hanya dapat digunakan di *Chat Pribadi* !!',
        admin: 'Command ini hanya dapat digunakan oleh *Admin* !!',
        botAdmin: 'Jadikan bot sebagai *Admin* untuk menggunakan command ini',
        segel: 'Maaf command ini tidak bisa digunakan karna rawan banned !!',
        onlyprem: 'Hanya user *Premium* yang dapat menggunakan fitur ini di *Chat Pribadi* !!',
        nsfw: 'Admin menonaktifkan fitur *Nsfw* di group ini!',
        rpg: 'Admin menonaktifkan fitur *Rpg Game* di group ini!',
        game: 'Admin menonaktifkan fitur *Game* di group ini!',
        limitExp: 'Limit kamu telah habis, beberapa command tidak dapat diakses! \n\n_Untuk mendapatkan limit anda bisa membelinya dengan *#buy limit* atau menunggu limit refresh setiap hari._',
        restrict: 'Fitur ini tidak dapat digunakan !!',
        energy: 'Energy kamu telah habis, Silahkan isi energy dengan *#makan*',
        unreg: 'Silahkan daftar ke *Database* bot terlebih dahulu jika ingin menggunakan fitur ini!'
    }[type]
    if (msg && /unreg/i.test(type)) {
        conn.textOptions(m.chat, msg, false, [[".daftar", "Daftar"]], m, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    mediaType: 1,
                    title: "A K S E S  K A M U | ＤＩＴＯＬＡＫ",
                    body: global.config.watermark,
                    thumbnail: fs.readFileSync("./media/denied.jpg"),
                    renderLargerThumbnail: false,
                    sourceUrl: global.config.website
                }
            }
        }, m)
    } else if (msg) {
        conn.adReply(m.chat, msg, 'ＡＫＳＥＳ ＤＩＴＯＬＡＫ', global.config.watermark, fs.readFileSync('./media/denied.jpg'), global.config.website, m, false)
    }
}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
})

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat Dinihari"
    if (time >= 4) {
        res = "Selamat Pagi"
    }
    if (time >= 10) {
        res = "Selamat Siang"
    }
    if (time >= 15) {
        res = "Selamat Sore"
    }
    if (time >= 18) {
        res = "Selamat Malam"
    }
    return res
}

async function welcomeBanner(avatar, name, subject, type) {
    const title = (type == "welcome" ? "Halo, " : "Sayonara, ") + name
    const desc = (type == "welcome" ? "Selamat datang ke " : "Keluar dari ") + subject
    const background = ["https://pomf2.lain.la/f/miskhj5i.jpg", "https://pomf2.lain.la/f/lfo1en8.png"]
    const welcome = await new canvafy.WelcomeLeave()
    .setAvatar(avatar)
    .setBackground("image", background.getRandom())
    .setTitle(title.length > 20 ? (title.substring(0, 16) + "..") : title)
    .setDescription(desc.length > 70 ? (desc.substring(0, 65) + "..") : desc)
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .setOverlayOpacity(0.3)
    .build()
    return welcome
}
