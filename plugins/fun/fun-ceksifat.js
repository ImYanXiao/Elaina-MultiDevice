let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, 'Masukan Namamu!', m)
    await conn.reply(m.chat, `
╭━━━━°「 *Sifat ${text}* 」°
┃
┊• Nama : ${text}
┃• Ahlak Baik : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
┊• Ahlak Buruk : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
┃• Orang yang : ${pickRandom(['Baik Hati','Sombong','Pelit','Dermawan','Rendah Hati','Rendah Diri','Pemalu','Penakut','Pengusil','Cengeng'])}
┊• Selalu : ${pickRandom(['Rajin','Malas','Membantu','Ngegosip','Jail','Gak jelas','Shoping','Chattan sama Doi','Chattan di WA karna Jomblo','Sedih','Kesepian','Bahagia','ngocok tiap hari'])}
┃• Kecerdasan : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
┊• Kenakalan : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
┃• Keberanian : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
┊• Ketakutan : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
╰═┅═━––––––๑
`.trim(), m, m.mentionedJid ? { mentions: m.mentionedJid } : {})
}
handler.help = ['ceksifat']
handler.tags = ['fun']
handler.command = /^ceksifat/i

export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
