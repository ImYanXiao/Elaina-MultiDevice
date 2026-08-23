let handler = async (m, { conn, usedPrefix }) => {
    let { banteng, harimau, gajah, kambing, panda, buaya, kerbau, sapi, monyet, ayam, babihutan, babi } = global.db.data.users[m.sender]
    let caption = `📮 Isi Kandang Kamu
${banteng ? `
🐂 Banteng: ${toRupiah(banteng)}` : ''} ${harimau ? `
🐅 Harimau: ${toRupiah(harimau)}` : ''} ${gajah ? `
🐘 Gajah: ${toRupiah(gajah)}` : ''} ${kambing ? `
🐐 Kambing: ${toRupiah(kambing)}` : ''} ${panda ? `
🐼 Panda: ${toRupiah(panda)}` : ''} ${buaya ? `
🐊 Buaya : ${toRupiah(buaya)}` : ''} ${kerbau ? `
🐃 Kerbau: ${toRupiah(kerbau)}` : ''} ${sapi ? `
🐮 Sapi: ${toRupiah(sapi)}` : ''} ${monyet ? `
🐒 Monyet: ${toRupiah(monyet)}` : ''} ${ayam ? `
🐓 Ayam: ${toRupiah(ayam)}` : ''} ${babi ? `
🐖 Babi: ${toRupiah(babi)}` : ''} ${babihutan ? `
🐗 Babi Hutan ${toRupiah(babihutan)}` : ''}
`.trim()
    m.reply(caption)
}
handler.help = ['kandang']
handler.tags = ['rpg']
handler.command = /^(kandang)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")