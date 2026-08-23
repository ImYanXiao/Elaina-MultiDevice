import fs from "fs"

let handler = async (m, { conn, isMods, isOwner, isPrems, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let status = isMods ? 'Developer' : isOwner ? 'Owner' : isPrems ? 'Premium User' : user.level > 1000 ? 'Elite User' : 'Free User'
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => fs.readFileSync('./src/avatar_contact.png'))

    let caption = `
Nama : ${user.registered ? user.name : await conn.getName(m.sender)}
Status : ${status}
Email : ${user.verif ? `${user.email.slice(0, 3)}..@${user.email.split("@")[1]}` : "Tidak Terdaftar!"}
Saldo : Rp. ${toRupiah(user.deposit.toFixed(0))}
Transaksi : ${user.historyTrx.length}

_Untuk melihat history transaksi ketik *${usedPrefix}history*_
`.trim()
    await conn.sendFile(m.chat, pp, null, caption, m)
}
handler.help = ["account"]
handler.tags = ["main"]
handler.command = /^(acc(ount)?)$/i
export default handler

const toRupiah = number => parseInt(number).toLocaleString('id-ID')