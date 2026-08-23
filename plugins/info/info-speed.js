import { cpus as _cpus, totalmem, freemem } from 'os'
import os from 'os'
import fs from 'fs'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

const format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    render: (literal, symbol) => `${literal} ${symbol}B`
})

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return `\n• ${d} Hari ${h} Jam ${m} Menit ${s} Detik`
}

let handler = async (m, { conn }) => {
    let _muptime
    if (process.send) {
        process.send('uptime')
        _muptime = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(resolve, 1000)
        }) * 1000
    }

    let muptime = clockString(_muptime)
    let setting = global.db.data.settings[conn.user.jid]

    let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    let groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))

    let used = process.memoryUsage()
    let cpus = _cpus().map(cpu => {
        cpu.total = Object.values(cpu.times).reduce((a, b) => a + b, 0)
        return cpu
    })

    const cpu = cpus.reduce((acc, c, _, { length }) => {
        acc.total += c.total
        acc.speed += c.speed / length
        for (let type in c.times) acc.times[type] += c.times[type]
        return acc
    }, { speed: 0, total: 0, times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 } })

    let old = performance.now()
    await m.reply('⏳ Testing kecepatan...')
    let neww = performance.now()
    let speed = (neww - old).toFixed(2)

    const authFile = `${opts._[0] || 'sessions'}`
    let session = fs.statSync(authFile)

    let sts = `
📊 *Performance Metrics*
• ⚡ Speed: ${speed} ms
• ⏳ Uptime: ${muptime}

👥 *Chat Statistics*
• 👥 Groups: ${groupsIn.length}
• 👤 Private: ${chats.length - groupsIn.length}
• 📊 Total: ${chats.length}

🖥️ *Server Resources*
• 🛑 RAM Used: ${format(totalmem() - freemem())} / ${format(totalmem())}
• 🔵 RAM Free: ${format(freemem())}
• 💾 Session: ${format(session.size)}
• 🖥️ Platform: ${os.platform()}
• 🏷️ Hostname: ${os.hostname()}

${readMore}
📦 *Memory Usage*
${'```'}\n${Object.entries(used).map(([k, v]) => `• ${k.padEnd(12)}: ${format(v)}`).join('\n')}\n${'```'}

${cpus[0] ? `💻 *CPU Usage* (${cpus.length} Core)
• Model: ${cpus[0].model.trim()} 
• Speed: ${cpu.speed} MHz

${Object.entries(cpu.times).map(([type, val]) => 
  `• ${type.padEnd(6)}: ${(100 * val / cpu.total).toFixed(2)}%`).join('\n')}

${cpus.map((c, i) => `\n🔹 *Core ${i + 1}*
• Model: ${c.model.trim()}
• Speed: ${c.speed} MHz
${Object.entries(c.times).map(([type, val]) => 
  `• ${type.padEnd(6)}: ${(100 * val / c.total).toFixed(2)}%`).join('\n')}`).join('\n')}` : ''}
`

                                                         
    await conn.sendMessage(m.chat, {
        text: sts,
        contextInfo: {
            externalAdReply: {
                title: "🤖 Elaina BOT - Status Report",
                body: "Laporan performa & statistik bot",
                thumbnailUrl: "https://telegra.ph/file/8345a7d4161c3eb472a39.jpg",
                sourceUrl: "https://whatsapp.com/channel/0029VaJHq2XFSAsz4dtOTE0T",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })
}

handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping|speed)$/i
export default handler
