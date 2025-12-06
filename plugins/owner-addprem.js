import { jidNormalizedUser } from '@rexxhayanasi/elaina-bail'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)

    let rawWho = m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
            ? m.quoted.sender
            : args[0]
                ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                : false

    if (!rawWho) return m.reply('Masukan Nomor Atau Tag Orangnya!')

    let who = jidNormalizedUser(rawWho)

    if (!global.db.data.users[who]) {
        global.db.data.users[who] = {
            premium: false,
            premiumTime: 0,
            name: who.split('@')[0],
        }
    }

    let user = global.db.data.users[who]

    // Ambil nama kontak dari conn.store.contacts kalau ada
    let contact = conn.store?.contacts?.[who]
    if (contact) {
        // Utamakan properti nama yang ada, fallback ke jid username
        user.name = contact.notify || contact.name || contact.vname || who.split('@')[0]
    } else {
        user.name = user.name || who.split('@')[0] // pastikan ada nama walau kontak gak ada
    }

    let txt = args[1]
    if (!txt) return m.reply('Masukan Jumlah Hari Yang Ingin Diberikan')
    if (isNaN(txt)) return m.reply(`Hanya Angka!\n\nContoh :\n${usedPrefix + command} @${sender.split`@`[0]} 7`)

    let jumlahHari = 86400000 * parseInt(txt)
    let now = Date.now()

    if (now < user.premiumTime) user.premiumTime += jumlahHari
    else user.premiumTime = now + jumlahHari

    user.premium = true

    let timers = user.premiumTime - now

    function msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60)
        let minutes = Math.floor((duration / (1000 * 60)) % 60)
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
        let days = Math.floor(duration / (1000 * 60 * 60 * 24))

        return `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`
    }

    await conn.reply(who, `✔️ Success! Kamu Sekarang User Premium!
📛 *Name:* ${user.name}
📆 *Days:* ${txt} hari
📉 *Countdown:* ️ ${msToTime(timers)}`, false)

    await delay(2000)

    await m.reply(`✔️ Success
📛 *Name:* ${user.name}
📆 *Days:* ${txt} hari
📉 *Countdown:* ️ ${msToTime(timers)}`)
}

handler.help = ['addprem']
handler.tags = ['owner']
handler.command = /^(add(prem|premium))$/i
handler.owner = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))