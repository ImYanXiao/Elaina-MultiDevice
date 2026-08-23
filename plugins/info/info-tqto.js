import fs from 'fs'

let handler = async (m, { conn }) => {
    let tqto = `
╭─❍ *Thanks To* ❍─╮
│ • Allah SWT
│ • Orang Tua
│ • Teman-Teman
│ • My GF 🌹 < selalu ngedukung jir ✋😋🤚>
│ • Semua yang selalu mendukung
╰❍────────────❍╯

╭─❍ *Special Thanks To* ❍─╮
│ • ArifzynXD 
│ • Norutomo
│ • Bochilgaming
│ • Fokus ID
│ • Xiao/Elaina
│ • RexxHayanasi
│ • Yudda (Top Donatur)
╰❍────────────❍╯

*Dev Elaina - MultiDevice:*
* RexxHayanasi


*Top Donasi:*
• +62 856-9206-0114

Terima kasih kepada kalian semua. Tanpa kalian, bot ini tidak akan berkembang!
    `.trim()

    await conn.sendMessage(m.chat, {
        image: { url: 'https://telegra.ph/file/cf368e90d6255fbe3b4e8.jpg' },
        caption: tqto,
    }, { quoted: m })

    await conn.sendFile(m.chat, './vn/inimenu.mp3', '', '', m, true)
}

handler.help = ['tqto']
handler.tags = ['info']
handler.command = /^(tqto)$/i

export default handler