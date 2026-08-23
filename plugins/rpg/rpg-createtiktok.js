import fs from 'fs'
import moment from 'moment-timezone'

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    const who = m.sender

    if (user.tiktok?.username) return m.reply('Kamu sudah memiliki profil TikTok! Cek dengan perintah *!profiletiktok*')
    if (!user.tiktok) user.tiktok = {}

    const defaultName = user.registered ? user.name : conn.getName(who)

    await conn.reply(m.chat, '📱 Membuat profil TikTok...\n🔹 Username: ' + defaultName, m)
    await conn.reply(m.chat, '📅 Balas dengan tanggal lahir (DD/MM/YYYY)\nContoh: 01/01/2000\n\n⏳ Timeout: 2 menit', m)

    try {
        const birthdateMsg = await awaitReply(conn, m.chat, who, 120000)

        const text = birthdateMsg?.message?.conversation || birthdateMsg?.message?.extendedTextMessage?.text || ''
        if (!moment(text, 'DD/MM/YYYY', true).isValid()) {
            return conn.reply(m.chat, '❌ Format tanggal salah! Gunakan format DD/MM/YYYY', m)
        }

                            
        user.tiktok = {
            username: defaultName,
            birthdate: text,
            konten: user.konten || 0,
            follower: user.follower || 0,
            lastupload: user.lasttiktokkonten || 0
        }

                            
        let pp
        try {
            pp = await conn.profilePictureUrl(who, 'image')
        } catch {
            pp = './src/avatar_contact.png'
        }

        const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        const caption = `
╭───〔 📱 TIKTOK PROFILE 〕───⭓
│• 👤 Username: ${user.tiktok.username}
│• 🎂 Tanggal Lahir: ${user.tiktok.birthdate}
│• ⭐ Followers: ${formatNumber(user.follower || 0)}
│• 🎥 Konten: ${formatNumber(user.konten || 0)}
│• 💰 Uang: Rp ${formatNumber(user.money || 0)}
│• ⏱️ Terakhir Upload: ${user.lasttiktokkonten ? new Date(user.lasttiktokkonten).toLocaleString('id-ID') : 'Belum pernah'}
╰─────────────────────⭓

✅ Profil TikTok berhasil dibuat!
📌 Gunakan *!uploadtiktok* untuk membuat konten
`.trim()

        await conn.sendMessage(m.chat, {
            image: { url: pp },
            caption: caption
        }, { quoted: m })

    } catch (err) {
        console.error('❌ Error createTikTok:', err)
        await conn.reply(m.chat, `❌ Gagal membuat profil: ${err.message}`, m)
    }
}

                               
async function awaitReply(conn, jid, sender, timeout = 60000) {
    return new Promise((resolve, reject) => {
        const start = Date.now()
        const listener = async ({ messages }) => {
            const msg = messages[0]
            if (!msg || msg.key.remoteJid !== jid) return

            const from = msg.key.participant || msg.key.remoteJid
            if (from === sender && !msg.key.fromMe) {
                conn.ev.off('messages.upsert', listener)
                resolve(msg)
            }
        }

        conn.ev.on('messages.upsert', listener)

        setTimeout(() => {
            conn.ev.off('messages.upsert', listener)
            reject(new Error('⏱️ Waktu input habis! Ketik *!createtiktok* lagi untuk mencoba ulang.'))
        }, timeout)
    })
}

handler.command = /^createtiktok$/i
handler.help = ['createtiktok']
handler.tags = ['rpg']
handler.register = true
handler.group = true
handler.rpg = true

export default handler
