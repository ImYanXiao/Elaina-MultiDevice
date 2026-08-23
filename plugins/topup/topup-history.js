import moment from "moment-timezone"

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let name = user.registered ? user.name : await conn.getName(m.sender)
    let caption = `
Nama : ${name}
Saldo : Rp.${toRupiah(user.deposit)}
Total Transaksi : ${user.historyTrx.length}

${user.historyTrx.map((v, i) => {
    let time = formattedDate(v.time)
    return `
*${i + 1}.* ${time}
Type : ${capitalize(v.type)}
Nominal : Rp.${toRupiah(v.nominal)}
`.trim()
}).join("\n\n")}
`.trim()
    m.reply(caption)
}
handler.help = ["history"]
handler.tags = ["topup"]
handler.command = /^(history)$/i
export default handler

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}

let toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")

function formattedDate(ms) {
    return moment(ms).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm');
}