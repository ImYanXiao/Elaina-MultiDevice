import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import moment from 'moment-timezone'
const handler = async (m, { conn }) => {
    try {
        await global.loading(m, conn)
        const d = new Date(new Date + 3600000)
        const locale = 'id'
        const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
        const week = d.toLocaleDateString(locale, {
            weekday: 'long'
        })
        const date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })

        const wibh = moment.tz('Asia/Jakarta').format('HH')
        const wibm = moment.tz('Asia/Jakarta').format('mm')
        const wibs = moment.tz('Asia/Jakarta').format('ss')
        const wktuwib = `${wibh} H ${wibm} M ${wibs} S`

        const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        const user = global.db.data.users[who]
        const isMods = [conn.decodeJid(global.conn.user.id), ...global.config.owner.filter(([number, _, isDeveloper]) => number && isDeveloper).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
        const isOwner = m.fromMe || isMods || [conn.decodeJid(global.conn.user.id), ...global.config.owner.filter(([number, _, isDeveloper]) => number && !isDeveloper).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
        const isPrems = isOwner || new Date() - user.premiumTime < 0

        if (typeof user == 'undefined') return m.reply('Pengguna tidak ada didalam data base')
        const pp = await conn.profilePictureUrl(who, 'image').catch(_ => fs.readFileSync('./src/avatar_contact.png'))
        const bio = await conn.fetchStatus(who).catch(_ => 'Tidak Ada Bio')
        const { role, premium, money, level, limit, exp, lastclaim, registered, regTime, age } = user

        const name = user.registered ? user.name : conn.getName(who)
        const datePacaran = await dateTime(user.pacaranTime)

                                         
        const caption = `
╭───〔 *👤 USER INFO* 〕───⭓
│• *Nama*         : ${name}
│• *Umur*         : ${user.registered ? age + ' tahun' : '-'}
│• *Status*       : ${isMods ? '👑 Developer' : isOwner ? '🧠 Owner' : isPrems ? '✨ Premium' : user.level > 999 ? '⚔️ Elite' : '🔰 Free User'}
│• *Verifikasi*   : ${user?.verif ? "✅ Ya" : "❌ Belum"}
│• *Bio*          : ${bio.status || bio}
│• *Pacar*        : ${user.pacar ? `❤️ @${user.pacar.split('@')[0]}` : '❌ Tidak Ada'}
│• *Sejak*        : ${user.pacar ? `${datePacaran}` : '-'}
│• *Link WA*      : https://wa.me/${who.split`@`[0]}
╰─────────────────────⭓

╭───〔 *🎮 RPG INFO* 〕───⭓
│• *Level*        : ${toRupiah(user.level)} ⚡
│• *Exp*          : ${toRupiah(user.exp)} ✨
│• *Uang*         : ${toRupiah(user.money)} 💸
│• *Bank*         : ${toRupiah(user.bank)} 🏦
│• *Konten*       : ${toRupiah(user.konten)} 🎥
│• *Followers*    : ${toRupiah(user.follower)} ⭐
│• *Rumah*        : ${global.db.data.bots.rumah[who]?.tipe || '❌ Tidak Punya'} 🏠
╰─────────────────────⭓

📅 *Terdaftar*: ${user.registered ? '✅ Ya ( ' + await dateTime(regTime) + ' )' : '❌ Belum'}
`.trim()

                            
        await conn.sendFile(m.chat, pp, 'profile.jpeg', caption, m, false, { contextInfo: { mentionedJid: [who, user.pacar] } })

                                             
        await conn.sendFile(m.chat, './vn/galau.mp3', 'menunya.mp3', null, m, true, { mimetype: 'audio/mp4', ptt: true })

    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['profile']
handler.tags = ['xp']
handler.command = /^(profile|profil|me)$/i
export default handler

function dateTime(timestamp) {
    const dateReg = new Date(timestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateReg.toLocaleDateString('id-ID', options);
    return formattedDate
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    const ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
    const mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
    const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
    const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return ['┊ ', ye, ' *Years 🗓️*\n', '┊ ', mo, ' *Month 🌙*\n', '┊ ', d, ' *Days ☀️*\n', '┊ ', h, ' *Hours 🕐*\n', '┊ ', m, ' *Minute ⏰*\n', '┊ ', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")
