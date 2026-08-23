import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import { generateWAMessageFromContent, proto, prepareWAMessageMedia } from '@rexxhayanasi/elaina-baileys'

const defaultMenu = {
    before: `
╭━━〔 👤 *USER PROFILE* 〕━━⬣
┃🎋 *Name:* %name
┃🎋 *Tag:* %tag
┃🎋 *Status:* %status
┃🎋 *Level:* %level (Role: %role)
┃🎋 *XP:* %totalexp/%maxexp
┃🎋 *Limit:* %limit
┃🎋 *Registered:* %rtotalreg/%totalreg users
┃🎋 *Date:* %date
┃🎋 *Time:* %wib (%week)
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━〔 🖥 *BOT STATUS* 〕━━⬣
┃🎋 *Uptime:* %uptime
┃🎋 *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
┃🎋 *Features:* %totalf commands
┃🎋 *Commands Today:* %commandToday
┃🎋 *Database:* ${opts["mongodb"] ? "MongoDB" : `Local (${bytesToMB(fs.readFileSync("./database.json").byteLength)} MB)`}
┃🎋 *Rating:* %averageRating/5.00
╰━━━━━━━━━━━━━━━━━━━━⬣

📌 *Note:*
🅟 = Premium Feature | 🅛 = Limited Use
%readmore`.trimStart(),
    header: `
╭──〔 📂 *%category* 〕──╮`,
    body: `│ ⤷ %cmd %islimit %isPremium`,
    footer: '╰─────────────────────╯\n',
    after: `
━━━〔 🛠 Powered by Elaina MultiDevice - RexxHayanasi 〕━━━
`
}

let handler = async (m, { conn, usedPrefix, command, __dirname, isOwner, isMods, isPrems, args }) => {
    try {
        await global.loading(m, conn)
        let tags
        let teks = `${args[0]}`.toLowerCase()

        let arrayMenu = [
            'topup','ai','game','rpg','xp','sticker','kerang','quotes',
            'fun','anime','group','premium','nsfw','internet','genshin',
            'news','downloader','search','tools','primbon','nulis',
            'audio','maker','database','quran','owner','info'
        ]

        if (!arrayMenu.includes(teks)) teks = '404'

        if (teks == 'topup') tags = { 'topup': 'Top Up' }
        if (teks == 'ai') tags = { 'ai': 'AI' }
        if (teks == 'game') tags = { 'game': 'Game' }
        if (teks == 'rpg') tags = { 'rpg': 'RPG Games' }
        if (teks == 'xp') tags = { 'xp': 'Exp & Limit' }
        if (teks == 'sticker') tags = { 'sticker': 'Sticker' }
        if (teks == 'kerang') tags = { 'kerang': 'Kerang Ajaib' }
        if (teks == 'quotes') tags = { 'quotes': 'Quotes' }
        if (teks == 'fun') tags = { 'fun': 'Fun' }
        if (teks == 'anime') tags = { 'anime': 'Anime & Manga' }
        if (teks == 'group') tags = { 'group': 'Group & Admin' }
        if (teks == 'premium') tags = { 'premium': 'Premium' }
        if (teks == 'nsfw') tags = { 'nsfw': 'NSFW' }
        if (teks == 'internet') tags = { 'internet': 'Internet' }
        if (teks == 'genshin') tags = { 'genshin': 'Genshin' }
        if (teks == 'news') tags = { 'news': 'News' }
        if (teks == 'downloader') tags = { 'downloader': 'Downloader' }
        if (teks == 'search') tags = { 'search': 'Searching' }
        if (teks == 'tools') tags = { 'tools': 'Tools' }
        if (teks == 'primbon') tags = { 'primbon': 'Primbon' }
        if (teks == 'nulis') tags = { 'nulis': 'Nulis' }
        if (teks == 'audio') tags = { 'audio': 'Audio' }
        if (teks == 'maker') tags = { 'maker': 'Maker' }
        if (teks == 'database') tags = { 'database': 'Database' }
        if (teks == 'quran') tags = { 'quran': 'Al Quran' }
        if (teks == 'owner') tags = { 'owner': 'Owner' }
        if (teks == 'info') tags = { 'info': 'Info' }

        let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
        let { exp, level, role } = global.db.data.users[m.sender]
        let { min, xp, max } = xpRange(level, global.multiplier)
        let tag = `@${m.sender.split('@')[0]}`
        let user = global.db.data.users[m.sender]
        let limit = isPrems ? 'Unlimited' : toRupiah(user.limit)
        let name = user.registered ? user.name : conn.getName(m.sender)
        let status = isMods ? 'Developer' : isOwner ? 'Owner' : isPrems ? 'Premium User' : 'Free User'

        let d = new Date()
        let week = d.toLocaleDateString('id', { weekday: 'long' })
        let date = d.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })
        let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

        let uptime = clockString(process.uptime() * 1000)
        let totalreg = Object.keys(global.db.data.users).length
        let rtotalreg = Object.values(global.db.data.users).filter(v => v.registered).length
        let totalf = Object.values(global.plugins).filter(v => v.help && v.tags).length
        let averageRating = 0
        let commandToday = 0

        let thumbIndex = Math.floor(Math.random() * 5) + 1
        let thumbPath = `./media/thumb-${thumbIndex}.jpg`
        if (!fs.existsSync(thumbPath)) thumbPath = './media/thumbnail.jpg'

        if (teks == '404') {
            let headerMedia = await prepareWAMessageMedia(
                { image: fs.readFileSync(thumbPath) },
                { upload: conn.waUploadToServer }
            )

            let sections = [{
                title: "Menu",
                rows: arrayMenu.map(v => ({
                    title: capitalize(v),
                    description: `Menu ${capitalize(v)}`,
                    id: `${usedPrefix + command} ${v}`
                }))
            }]

            let listMessage = {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: `Hi ${name}, ${wish()}`,
                                hasMediaAttachment: true,
                                imageMessage: headerMedia.imageMessage
                            },
                            body: { text: 'Silakan pilih menu di bawah' },
                            footer: { text: 'Elaina MultiDevice' },
                            nativeFlowMessage: {
                                buttons: [{
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "PILIH MENU",
                                        sections
                                    })
                                }]
                            }
                        }
                    }
                }
            }

            let msg = generateWAMessageFromContent(m.chat, listMessage, { userJid: m.sender, quoted: m })
            return conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        }

        let help = Object.values(global.plugins).filter(v => !v.disabled).map(v => ({
            help: Array.isArray(v.help) ? v.help : [v.help],
            tags: Array.isArray(v.tags) ? v.tags : [v.tags],
            limit: v.limit,
            premium: v.premium,
            prefix: 'customPrefix' in v
        }))

        let text = [
            defaultMenu.before,
            ...Object.keys(tags).map(tag => {
                return defaultMenu.header.replace('%category', tags[tag]) + '\n' +
                    help.filter(v => v.tags.includes(tag))
                        .map(v => v.help.map(h =>
                            defaultMenu.body
                                .replace('%cmd', v.prefix ? h : usedPrefix + h)
                                .replace('%islimit', v.limit ? '🅛' : '')
                                .replace('%isPremium', v.premium ? '🅟' : '')
                        ).join('\n')).join('\n') +
                    '\n' + defaultMenu.footer
            }),
            defaultMenu.after
        ].join('\n')

        let replace = {
            name, tag, status, level, role,
            totalexp: toRupiah(exp),
            maxexp: toRupiah(xp),
            limit, uptime, week, date, wib,
            totalreg, rtotalreg, totalf,
            commandToday, averageRating,
            readmore
        }

        text = text.replace(/%(\w+)/g, (_, k) => replace[k] ?? '')

        await conn.sendMessage(m.chat, {
            text: text.trim(),
            contextInfo: {
                externalAdReply: {
                    title: `📂 Menu: ${capitalize(teks)}`,
                    body: 'Elaina MultiDevice',
                    thumbnail: fs.readFileSync(thumbPath),
                    sourceUrl: 'https://github.com/rexxhayanasi',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m })

    } finally {
        await global.loading(m, conn, true)
    }
}

handler.command = /^(menu|help|main)$/i
export default handler

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function wish() {
    let h = moment.tz('Asia/Jakarta').hour()
    if (h < 4) return 'Selamat Malam'
    if (h < 11) return 'Selamat Pagi'
    if (h < 15) return 'Selamat Siang'
    if (h < 18) return 'Selamat Sore'
    return 'Selamat Malam'
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const toRupiah = n => parseInt(n).toLocaleString('id-ID')
function bytesToMB(b) { return (b / 1048576).toFixed(2) }