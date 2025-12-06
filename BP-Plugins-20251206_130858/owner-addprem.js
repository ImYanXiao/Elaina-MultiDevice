let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) 
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else 
        who = m.chat

    if (!who) throw `Tag atau balas seseorang!`
    let user = global.db.data.users[who]
    if (!user) throw `User tidak ditemukan di database!`
    
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `Masukkan jumlah hari premium!`
    if (isNaN(txt)) return m.reply(`Hanya boleh angka!\n\nContoh:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`)

    let jumlahHari = 86400000 * parseInt(txt) // 1 hari = 86.400.000 ms
    let now = Date.now()

    if (!user.premiumTime || now >= user.premiumTime) {
        user.premiumTime = now + jumlahHari
    } else {
        user.premiumTime += jumlahHari
    }

    user.premium = true

    let sisaMs = user.premiumTime - now
    let sisaHari = Math.floor(sisaMs / (86400000))
    let sisaJam = Math.floor((sisaMs % 86400000) / 3600000)
    let sisaMenit = Math.floor((sisaMs % 3600000) / 60000)

    m.reply(`✔️ *Berhasil menambahkan ${user.name} sebagai premium!*
    
📛 *Nama:* ${user.name}
📆 *Durasi Ditambahkan:* ${txt} hari
⏳ *Sisa Waktu:* ${sisaHari} hari ${sisaJam} jam ${sisaMenit} menit
`)
}

handler.help = ['addprem [@user] <hari>']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)p(rem)?$/i

handler.group = true
handler.rowner = true

export default handler
