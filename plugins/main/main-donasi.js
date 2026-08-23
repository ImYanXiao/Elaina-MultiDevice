import fs from 'fs'
import moment from 'moment-timezone'

let handler = async (m, { conn, command, usedPrefix, text }) => {
    conn.transaction = conn.transaction || {}
    text = parseInt(text)
    if (!text) return m.reply(`Masukkan Nominal! \n\nContoh: \n${usedPrefix + command} 1000`)
    if (m.sender in conn.transaction) return m.reply("Kamu masih memiliki transaksi yang belum selesai!")
    if (text < 1000) return m.reply("Minimal 1000")
    if (text > 10000000) return m.reply("Maximal 10.000.000")
    
    let randomCode = Math.floor(Math.random() * 100)
    let trxId = generateRefID()
    let caption = `
*TRANSAKSI TELAH DIBUAT*

Id : ${trxId}
Nominal : Rp.${toRupiah(text + randomCode)}
Type : Donasi
Dibuat : ${formattedDate(Date.now())}
Expired : 10 Menit

_Silahkan Scan QRIS di atas dengan nominal *Rp.${toRupiah(text + randomCode)}* yang telah ditentukan! Jika sudah transaksi akan otomatis selesai_

_*Note :* Tidak boleh melebihi atau kurang dari nominal tersebut, karena transaksi dicek oleh BOT!_
`.trim()

    await conn.sendFile(m.chat, "./media/qris.jpg", null, caption, m)

    conn.transaction[m.sender] = {
        chat: m.chat,
        status: "proses",
        trxId: trxId,
        nominal: text,
        RCode: randomCode,
        type: "donasi",
        time: Date.now(),
        expired: setTimeout(() => {
            m.reply("Transaksi telah Expired!")
            delete conn.transaction[m.sender]
        }, 600000)
    }
}

handler.help = ["donasi"]
handler.tags = ["main"]
handler.command = /^(dona(tion|si))$/i
export default handler

function generateRefID() {
    return 'ref-' + Math.random().toString(36).substr(2, 9);
}

const toRupiah = number => parseInt(number).toLocaleString('id-ID')

function formattedDate(ms) {
    return moment(ms).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm');
}