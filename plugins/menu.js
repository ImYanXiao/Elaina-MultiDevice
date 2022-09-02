// Script Ori By BochilGaming
// Ditulis Ulang Oleh ImYanXiao

import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default

const defaultMenu = {
  before: `
╭─────═[ INFO USER ]═─────⋆
│╭───────────────···
┴│☂︎ *Name:* %name
⬡│☂︎ *Tag:* %tag
⬡│☂︎ *Premium:* %prems
⬡│☂︎ *Limit:* %limit
⬡│☂︎ *Money:* %money
⬡│☂︎ *Role:* %role
⬡│☂︎ *Level:* %level [ %xp4levelup Xp For Levelup]
⬡│☂︎ *Xp:* %exp / %maxexp
┬│☂︎ *Total Xp:* %totalexp
│╰────────────────···
┠─────═[ TODAY ]═─────⋆
│╭────────────────···
┴│    *${ucapan()} %name!*
⬡│☂︎ *Tanggal:* %week %weton
⬡│☂︎ *Date:* %date
⬡│☂︎ *Tanggal Islam:* %dateIslamic
┬│☂︎ *Waktu:* %time
│╰────────────────···
┠─────═[ INFO BOT ]═─────⋆
│╭────────────────···
┴│☂︎ *Nama Bot:* %me
⬡│☂︎ *Mode:* %mode
⬡│☂︎ *Prefix:* [ *%_p* ]
⬡│☂︎ *Baileys:* Multi Device
⬡│☂︎ *Battery:* ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
⬡│☂︎ *Platform:* %platform
⬡│☂︎ *Type:* Node.Js
⬡│☂︎ *Uptime:* %muptime
┬│☂︎ *Database:* %rtotalreg dari %totalreg
│╰────────────────···
╰──────────═┅═──────────

⃝▣──「 *INFO CMD* 」───⬣
│ *Ⓟ* = Premium
│ *Ⓛ* = Limit
▣────────────⬣
%readmore
`.trimStart(),
  header: '⃝▣──「 %category 」───⬣',
  body: '│○ %cmd %isPremium %islimit',
  footer: '▣───────────⬣\n',
  after: `%c4 %me`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command}) => {
	let tags
	let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'maker', 'edukasi', 'news', 'random', 'game', 'xp', 'islamic', 'stiker', 'rpg', 'kerangajaib', 'quotes', 'admin', 'group', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database','quran', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner', 'nocategory']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': 'Main',
  'game': 'Game',
  'rpg': 'RPG Games',
  'xp': 'Exp & Limit',
  'sticker': 'Sticker',
  'kerang': 'Kerang Ajaib',
  'quotes': 'Quotes',
  'fun': 'Fun',
  'anime': 'Anime',
  'admin': 'Admin',
  'group': 'Group',
  'vote': 'Voting',
  'absen': 'Absen',
  'premium': 'Premium',
  'anonymous': 'Anonymous Chat',
  'internet': 'Internet',
  'downloader': 'Downloader',
  'tools': 'Tools',
  'nulis': 'MagerNulis & Logo',
  'audio': 'Audio',
  'maker': 'Maker',
  'database': 'Database',
  'quran': 'Al Qur\'an',
  'owner': 'Owner',
  'host': 'Host',
  'advanced': 'Advanced',
  'info': 'Info',
  '': 'No Category',
}
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'Nulis',
    'maker': 'Maker'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al-Qur\'an',
    'islamic': 'Islamic'
  }
  if (teks == 'audio') tags = {
    'audio': 'Audio'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'nocategory') tags = {
    '': 'No Category'
  }
  try {
  	// DEFAULT MENU
      let dash = global.dashmenu
  	let m1 = global.dmenut
      let m2 = global.dmenub
      let m3 = global.dmenuf
      let m4 = global.dmenub2
      
      // COMMAND MENU
      let cc = global.cmenut
      let c1 = global.cmenuh
      let c2 = global.cmenub
      let c3 = global.cmenuf
      let c4 = global.cmenua
      
      // LOGO L P
      let lprem = global.lopr
      let llim = global.lolm
      let tag = `@${m.sender.split('@')[0]}`
    
    //-----------TIME---------
    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
      /*const sections = [
   {
	title: `${htki} ᴍᴀɪɴ ${htka}`,
	rows: [
	    {title: `⚡ ${pmenus} 𝚂𝙿𝙴𝙴𝙳 𝙱𝙾𝚃`, rowId: ".ping", description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 𝙺𝚎𝚌𝚎𝚙𝚊𝚝𝚊𝚗 𝚁𝚎𝚜𝚙𝚘𝚗 𝙱𝙾𝚃"},
	    {title: `⏰ ${pmenus} 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 𝙱𝙾𝚃`, rowId: ".runtime", description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 𝚆𝚊𝚔𝚝𝚞 𝙱𝙾𝚃 𝙱𝚎𝚛𝚓𝚊𝚕𝚊𝚗"}, 
	    {title: `💌 ${pmenus} 𝙾𝚆𝙽𝙴𝚁 𝙱𝙾𝚃`, rowId: ".owner", description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚜𝚒 𝚃𝚎𝚗𝚝𝚊𝚗𝚐 𝙾𝚠𝚗𝚎𝚛"},
	    {title: `📔 ${pmenus} 𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝙾𝚃`, rowId: ".sc", description: `𝚂𝚘𝚞𝚛𝚌𝚎 𝙲𝚘𝚍𝚎 ${namebot}`},
	]
    },{
	title: `${htki} sᴜᴘᴘᴏʀᴛ ${htka}`,
	rows: [
	    {title: `💹 ${pmenus} 𝙳𝙾𝙽𝙰𝚃𝙴`, rowId: ".donasi", description: '𝚂𝚞𝚙𝚙𝚘𝚛𝚝 𝙾𝚠𝚗𝚎𝚛 𝙰𝚐𝚊𝚛 𝙻𝚎𝚋𝚒𝚑 𝚂𝚎𝚖𝚊𝚗𝚐𝚊𝚝'},
	]
	},{
	title: `${htki} ᴍᴇɴᴜ ${htka}`,
	rows: [
	    {title: `💬 ${pmenus} All`, rowId: ".? all", description: "Menampilkan Semua command BOT"},
	    {title: `🌱 ${pmenus} Rpg`, rowId: ".? rpg", description: "Game Epic Rpg!"},
	{title: `✨ ${pmenus} Exp`, rowId: ".? xp", description: "Ayo tingkatkan pangkat mu!"},
	{title: `🎮 ${pmenus} Game`, rowId: ".? game", description: "Gamenya seru seru lho (๑˃̵　ᴗ　˂̵)"},
	{title: `🧩 ${pmenus} Fun`, rowId: ".? fun", description: "Fitur yang aman untuk keluarga"},
	{title: `🐚 ${pmenus} Kerang`, rowId: ".? kerangajaib", description: "Tanyakan pada ketua club"},
	{title: `📑 ${pmenus} Quotes`, rowId: ".? quotes", description: "Random Inspirasi"},
	{title: `⛩️ ${pmenus} Anime`, rowId: ".? anime", description: "Wibu wibu🐦"},
	{title: `🔞 ${pmenus} Nsfw`, rowId: ".? nsfw", description: "Tch, dasar sagnean"},
	{title: `🌟 ${pmenus} Premium`, rowId: ".? premium", description: "Untuk user premium"},
	{title: `🎭 ${pmenus} Anonymous Chats`, rowId: ".? anonymous", description: "Bicara dengan orang tidak dikenal"},
	{title: `📖 ${pmenus} Al-Quran`, rowId: ".? quran", description: "Tobat yuk kak"},
	{title: `🌎 ${pmenus} Internet`, rowId: ".? internet", description: "Cari sesuatu diBOT"},
	{title: `📩 ${pmenus} Downloaders`, rowId: ".? downloader", description: "Download sesuatu dari BOT"},
	{title: `🎨 ${pmenus} Stikers`, rowId: ".? stiker", description: "Buat Sticker diBOT"},
	{title: `✏️ ${pmenus} Nulis`, rowId: ".? nulis", description: "Nulis kok males kak?"},
	{title: `🎧 ${pmenus} Audio`, rowId: ".? audio", description: "Ubah Audio dengan Filter"},
	{title: `🏢 ${pmenus} Group`, rowId: ".? group", description: "Only Groups"},
	{title: `👑 ${pmenus} Admin`, rowId: ".? admin", description: "Only Admin Group"},
	{title: `🗂️ ${pmenus} Database`, rowId: ".? database", description: "Simpan sesuatu diBOT"},
	{title: `🛠️ ${pmenus} Tools`, rowId: ".? tools", description: "Mungkin tools ini bisa membantu?"},
	{title: `ℹ️ ${pmenus} Info`, rowId: ".? info", description: "Info info BOT"},
	{title: `👩‍💻 ${pmenus} Owner`, rowId: ".? owner", description: "Owner Only!"},
	{title: `❓ ${pmenus} No Category`, rowId: ".? nocategory", description: "Fitur tanpa kategory!"},
	]
  },
]*/

let usrs = db.data.users[m.sender]

  if (teks == '404') {
 
    let gojo = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        "listMessage": {
          "title": `✧────···[ Dashboard ]···────✧`.trim(),
          "description": `${ucapan()}, ${conn.getName(m.sender)} !`.trim(),
          "footerText": `╭━━━━━━━━━━━━━━━━┈─✧
┴
│⬡ Aktif selama ${mpt}
│⬡ Baterai ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
│⬡ Prefix : [ ${_p} ]
│⬡ *${Object.keys(global.db.data.users).length}* Pengguna
│⬡ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
│⬡ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
┬
├━━━━━━━━━━━━━━━━┈─⋆
│ ▸ *ᴀᴜᴛʜᴏʀ :* ʙᴏᴄʜɪʟɢᴀᴍɪɴɢ
┴ ▸ *ᴏᴡɴᴇʀ :* ɪᴍ-ʏᴀɴxɪᴀᴏ
✧
┬ 📌 𝗣𝗶𝗻𝗻𝗲𝗱 :
│ ʙᴇʀɪ ᴊᴇᴅᴀ ʏᴀʜ ᴋᴀᴋ ^ω^
╰━━━━━━━━━━━━━━━━┈─◂
     ▌│█║▌║▌║║▌║▌║█│▌
     
     ${week}, ${date}`,
          "buttonText": "Click Here!",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": "[⚡] Speed",
                                         "description": "Menampilkann Kecepatan Respon Bot",
                                         "rowId": ".ping"
                                    }, {
                                         "title": "[🗒️] Script Bot",
                                         "description": "Source Code Bot",
                                         "rowId": ".sc"
                                    }, {
                                         "title": "[🎐] Creator",
                                         "description": "Kontak Creator ku ^~^",
                                         "rowId": ".owner nomor"
                       }],
                    "title": "✧───────────────[ ᴍᴀɪɴ ]───────────────✧"
                }, {
                  "rows": [{
                  "title": "Menu 01 |🧾|",
                  "description": "All Commands",
                  "rowId": ".? all"
                }, {
                  "title": "Menu 02 |🎮|",
                  "description": "Game",
                  "rowId": ".? game"
                }, {
                  "title": "Menu 03 |🌱|",
                  "description": "RPG",
                  "rowId": ".? rpg"
                }, {
                  "title": "Menu 04 |✨|",
                  "description": "Exp & limit",
                  "rowId": ".? xp"
                }, {
                  "title": "Menu 05 |🧩|",
                  "description": "Fun",
                  "rowId": ".? fun"
                }, {
                  "title": "Menu 07 |🔞|",
                  "description": "Nsfw",
                  "rowId": ".? nsfw"
                }, {
                  "title": "Menu 08 |⛩️|",
                  "description": "Anime",
                  "rowId": ".? anime"
                }, {
                  "title": "Menu 10 |🕋|",
                  "description": "Islami",
                  "rowId": ".? quran"
                }, {
                  "title": "Menu 13 |🎫|",
                  "description": "Sticker",
                  "rowId": ".? stiker"
                }, {
                  "title": "Menu 14 |🐚|",
                  "description": "Kerang ajaib",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "Menu 15 |📑|",
                  "description": "Quotes",
                  "rowId": ".? quotes"
                }, {
                  "title": "Menu 16 |👑|",
                  "description": "Admin Group",
                  "rowId": ".? admin"
                }, {
                  "title": "Menu 17 |👥|",
                  "description": "Group Chat",
                  "rowId": ".? group"
                }, {
                  "title": "Menu 18 |🌟|",
                  "description": "Premium Users",
                  "rowId": ".? premium"
                }, {
                  "title": "Menu 19 |💻|",
                  "description": "Internet",
                  "rowId": ".? internet"
                }, {
                  "title": "Menu 20 |🎭|",
                  "description": "Anonymous Chat",
                  "rowId": ".? anonymous"
                }, {
                  "title": "Menu 21 |✍️|",
                  "description": "Menulis & Membuat Logo",
                  "rowId": ".? nulis"
                }, {
                  "title": "Menu 22 |📥|",
                  "description": "Downloader",
                  "rowId": ".? downloader"
                }, {
                  "title": "Menu 23 |🧰|",
                  "description": "Tools",
                  "rowId": ".? tools"
                }, {
                  "title": "Menu 24 |📂|",
                  "description": "Database",
                  "rowId": ".? database"
                }, {
                  "title": "Menu 26 |🎙️|",
                  "description": "Voice Changer",
                  "rowId": ".? audio"
                }, {
                  "title": "Menu 28 |ℹ️|",
                  "description": "Info",
                  "rowId": ".? info"
                }, {
                  "title": "Menu 29 |❓|",
                  "description": "No Category",
                  "rowId": ".? nocategory"
                }, {
                  "title": "Menu 30 | 🧑‍💻|",
                  "description": "Owner",
                  "rowId": ".? owner"
                }],
                                "title": "✧───────────────[ ᴍᴇɴᴜ ]───────────────✧"
                                }, {
                                "rows": [{
                                "title": "[🗳️] Donasi",
                                "description": "Donasi kak, jangan enak pakenya doang",
                                "rowId": ".donasi"
                                }, {
                                "title": "[🎖️] Thanks To",
                                "description": "Terima kasih banyak untuk user yang telah berpartisipasi dalam bot",
                                "rowId": ".tqto"
                                }],
                                "title": "✧────────────────[ sᴜᴘᴘᴏʀᴛ ]────────────────✧"
                            }
                        ], "contextInfo": 
                         { "stanzaId": m.key.id,
                        "participant": m.sender,
                        "quotedMessage": m.message
                        }
                    }
                 }, {}), {waitForAck: true})
  return await conn.relayMessage(
         m.chat,
         gojo.message,
         { messageId: gojo.key.id }
     )
    }
  	
 /**************************** TIME *********************/
 let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
 
 let mode = global.opts['self'] ? 'Private' : 'Publik'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, limit, level, role, registered, money} = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium': 'Free'}`
    let platform = os.platform()
    
    //---------------------
    
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      tag, dash,m1,m2,m3,m4,cc, c1, c2, c3, c4,lprem,llim,
      ucpn,platform, wib, mode, _p, money, age, tag, name, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    //----------------- FAKE
 let fvn = {quoted: { key: {participant : '0@s.whatsapp.net'},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds": "2022","ptt": "true"} } }}
 let floc = {quoted: { key: { participant : '0@s.whatsapp.net'}, message: { "liveLocationMessage": { "caption": `Menu`,"h": `${name}`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')}} }}
 let fdocs = {quoted: { key : { participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `Hai Kak ${name}!`,  jpegThumbnail: fs.readFileSync('./thumbnail.jpg') }}}}
 let fgclink = {quoted: {key: {participant : '0@s.whatsapp.net'},message: {groupInviteMessage: {groupJid: "17608914335-1625305606@g.us",inviteCode: null,groupName: `Hai ${name}!`,  caption: wm,  jpegThumbnail: fs.readFileSync('./thumbnail.jpg') }} }}
 let fgif = {quoted: {key: { participant : '0@s.whatsapp.net'}, message: {  "videoMessage": {  "title": `Hai Kak ${name}!`, "h": `Hmm`, 'seconds': '999999999',  'gifPlayback': 'true',  'caption': wm, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg') } } } }
 let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
 
    let ftoko = {
    key: {
    fromMe: false,
    participant: `${m.sender.split`@`[0]}` + '@s.whatsapp.net',
    remoteJid: 'status@broadcast',
  },
  message: {
  "productMessage": {
  "product": {
  "productImage":{
  "mimetype": "image/jpeg",
  "jpegThumbnail": fs.readFileSync('./thumbnail.jpg'),
    },
  "title": `${ucapan()}`,
  "description": '𝗧 𝗜 𝗠 𝗘 : ' + wktuwib,
  "currencyCode": "US",
  "priceAmount1000": "100",
  "retailerId": wm,
  "productImageCount": 999
        },
  "businessOwnerJid": `${m.sender.split`@`[0]}@s.whatsapp.net`
  }
  }
  }
  
    let urls = pickRandom(['https://tinyurl.com/2j9wa2gm', 'https://a.uguu.se/HwyqVYow.jpg', 'https://a.uguu.se/pXdtYjF.jpg', 'https://a.uguu.se/RyffdQeq.jpg', 'https://a.uguu.se/OUpyWceD.jpg', 'https://a.uguu.se/eachYTbC.jpg', 'https://a.uguu.se/mzSokzVU.jpg'])
  
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
    
    //FAKE TROLI

    const ftrol = {

    key : {

    remoteJid: 'status@broadcast',

    participant : '0@s.whatsapp.net'

    },

    message: {

    orderMessage: {

    itemCount : 2022,

    status: 1,

    surface : 1,

    message: `Hai Kak ${name}!`, 

    orderTitle: `▮Menu ▸`,

    thumbnail: await (await fetch(flaaa + 'Menu')).buffer(), //Gambarnye

    sellerJid: '0@s.whatsapp.net' 

    }

    }

    }

    const ftroli = {

    key : {

    remoteJid: 'status@broadcast',

    participant : '0@s.whatsapp.net'

    },

    message: {

    orderMessage: {

    itemCount : 2022,

    status: 1,

    surface : 1,

    message: `Hai Kak ${name}!`, 

    orderTitle: `▮Menu ▸`,

    thumbnail: await (await fetch(flaaa + teks)).buffer(), //Gambarnye

    sellerJid: '0@s.whatsapp.net' 

    }

    }

    }
    
    const fload = {

    key : {

    remoteJid: 'status@broadcast',

    participant : '0@s.whatsapp.net'

    },

    message: {

    orderMessage: {

    itemCount : 2022,

    status: 1,

    surface : 1,

    message: '[❗] Memuat Menu ' + teks + '...\n Sabar Ya Kak ^ω^', 

    orderTitle: `▮Menu ▸`,

    thumbnail: await (await fetch(flaaa + 'Loading')).buffer(), //Gambarnye

    sellerJid: '0@s.whatsapp.net' 

    }

    }

    }

    conn.reply(m.chat, '*Tunggu Sebentar Kak. . .*', ftrol) 

    
    //------------------< MENU >----------------
    
    //------------------ SIMPLE
    /*conn.reply(m.chat, text, fkon, { contextInfo: { mentionedJid: [m.sender],
        externalAdReply: {
            title: `${htjava} ${namebot}`,
            body: titlebot,
            description: titlebot,
            mediaType: 2,
          thumbnail: await(await fetch(thumb2)).buffer(),
         mediaUrl: sig
        }
     }
    })*/
    
    //------------------ DOCUMENT
    let d1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    let d2 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    let d3  = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    let d4 = 'application/pdf'
    let d5 = 'application/vnd.android.package-archive'
    let d6 = 'application/zip'
    let td = `${pickRandom([d1,d2,d3,d4,d5,d6])}`
    
    //------- BUTTON DOC WITH EXTERNAL ADS
    // MAMPUS DI ENC :v
    /*const _0x187932=_0x5c09;function _0x5c09(_0x28b840,_0x244043){const _0x1766bb=_0x1766();return _0x5c09=function(_0x5c09dc,_0x158321){_0x5c09dc=_0x5c09dc-0x1bb;let _0x4031df=_0x1766bb[_0x5c09dc];return _0x4031df;},_0x5c09(_0x28b840,_0x244043);}(function(_0x1c9e83,_0x2eef01){const _0x5e85ab=_0x5c09,_0x179660=_0x1c9e83();while(!![]){try{const _0x4c7814=-parseInt(_0x5e85ab(0x1d0))/0x1*(-parseInt(_0x5e85ab(0x1bd))/0x2)+parseInt(_0x5e85ab(0x1c4))/0x3*(parseInt(_0x5e85ab(0x1bf))/0x4)+parseInt(_0x5e85ab(0x1cc))/0x5*(-parseInt(_0x5e85ab(0x1d1))/0x6)+parseInt(_0x5e85ab(0x1c1))/0x7*(parseInt(_0x5e85ab(0x1bc))/0x8)+parseInt(_0x5e85ab(0x1cd))/0x9*(-parseInt(_0x5e85ab(0x1c7))/0xa)+parseInt(_0x5e85ab(0x1cb))/0xb*(-parseInt(_0x5e85ab(0x1be))/0xc)+parseInt(_0x5e85ab(0x1ce))/0xd;if(_0x4c7814===_0x2eef01)break;else _0x179660['push'](_0x179660['shift']());}catch(_0x2b3360){_0x179660['push'](_0x179660['shift']());}}}(_0x1766,0x70ad5));let buttonMessage={'document':{'url':sgc},'mimetype':td,'fileName':global['wm'],'fileLength':fsizedoc,'pageCount':fpagedoc,'contextInfo':{'forwardingScore':0x22b,'isForwarded':!![],'externalAdReply':{'mediaUrl':global[_0x187932(0x1c8)],'mediaType':0x2,'previewType':_0x187932(0x1c9),'title':global['titlebot'],'body':global['titlebot'],'thumbnail':await(await fetch(thumb))[_0x187932(0x1ca)](),'sourceUrl':sgc}},'caption':text,'footer':botdate,'buttons':[{'buttonId':'.owner','buttonText':{'displayText':_0x187932(0x1bb)},'type':0x1},{'buttonId':_0x187932(0x1c5),'buttonText':{'displayText':_0x187932(0x1c0)},'type':0x1},{'buttonId':_0x187932(0x1c6),'buttonText':{'displayText':'Donasi'},'type':0x1}],'headerType':0x6};await conn[_0x187932(0x1c2)](m[_0x187932(0x1cf)],buttonMessage,{'quoted':m,'mentionedJid':[m[_0x187932(0x1c3)]]});function _0x1766(){const _0x1c60e8=['3ezQcUH','.ping','.donasi','725770ccnUBU','sig','pdf','buffer','305624SHQwwY','233195fjGJSZ','72BjUaMS','2869867kBKaey','chat','6NokiEm','72PsFaxu','Owner','1832yREmVQ','205026IsvCrH','132IBvmfp','3329164htczQJ','Speed','7315FCLnNH','sendMessage','sender'];_0x1766=function(){return _0x1c60e8;};return _0x1766();}*/
    
    // Thanks Rlxfly https://github.com/Rlxfly
    //------- MENU LOCATION
    const pre = generateWAMessageFromContent(m.chat, { liveLocationMessage:{
  degreesLatitude: 34.672314,
  degreesLongitude: 135.484802,
  accuracyInMeters: 100,
  speedInMps: 999,
  degreesClockwiseFromMagneticNorth: 99,
  caption: text.trim(),
  sequenceNumber: 774236889,
  timeOffset: 8600,
  jpegThumbnail: await(await fetch(thumb)).buffer(),
  contextInfo: { mentionedJid: [m.sender] }
}}, { quoted: m
					})

//return conn.relayMessage(m.chat, pre.message, { messageId: pre.key.id })

//-------DOC TEMPLATE
    const message = { 
            document: { url: thumbdoc },
            jpegThumbnail: await (await fetch(urls)).buffer(),
            fileName: wm,
            mimetype: td,
            fileLength: fsizedoc,
            pageCount: fpagedoc,
            caption: text,
            footer: titlebot,
            templateButtons: [
                {
                    urlButton: {
                        displayText: `${namebot}`,
                        url: 'https://github.com/ImYanXiao/Elaina-MultiDevice'
                    }
                },
                {
                    urlButton: {
                        displayText: 'Instagram',
                        url: sig
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Owner🎐',
                        id: '.owner'
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Speed⚡',
                        id: '.ping'
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Donasi💵',
                        id: '.donasi'
                    }
                },
            ]
        }
       //await conn.sendMessage(m.chat, message, m, { mentionedJid: [m.sender] })

    //------------------- 2BUTTON VID
    conn.sendMessage(m.chat, { video: { url: 'https://telegra.ph/file/c82d5c358495e8ef15916.mp4' }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: text.trim(), footer: 'ᴍᴀᴅᴇ ᴡɪᴛʜ ❤ ʙʏ ɪᴍ-ʏᴀɴxɪᴀᴏ', templateButtons: [{ quickReplyButton: { displayText: 'Speedtest⚡', id: `${_p}speedtest` }}, { quickReplyButton: { displayText: 'Owner🎀', id: `${_p}owner` }} ] })
    
    //------------------- 2BUTTON LOCATION
    /*conn.sendButton(m.chat, `${ucapan()}﹗`, text.trim(), `${timeimg()}`, [
      ['ᴍᴇɴᴜ', `${_p}menu`],
      ['sᴘᴇᴇᴅᴛᴇsᴛ', `${_p}speedtest`]
    ], m, {asLocation: true})*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.register = false
handler.exp = 3

export default handler

//----------- FUNCTION -------

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [ye, ' *Years 🗓️*\n',  mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "Pagi Lord 🌄"
  }
  if (time >= 10) {
    res = "Siang Lord ☀️"
  }
  if (time >= 15) {
    res = "Sore Lord 🌇"
  }
  if (time >= 18) {
    res = "Malam Lord 🌙"
  }
  return res
}
function timeimg() {
    let imgloc = ''
  const time = moment.tz('Asia/Kolkata').format('HH')
  imgloc = ('./media/elaina8.png')
  if (time >= 0) {
    imgloc = ('./media/elaina.png')
  }
  if (time >= 4) {
    imgloc = ('./media/elaina2.png')
  }
  if (time >= 8) {
    imgloc = ('./media/elaina3.png')
  }
  if (time >= 12) {
    imgloc = ('./media/elaina4.png')
  }
  if (time >= 16) {
    imgloc = ('./media/elaina5.png')
  }
  if (time >= 20) {
    imgloc = ('./media/elaina6.png')
  }
  if (time >= 24) {
    imgloc = ('./media/elaina7.png')
  }
  return imgloc
}
