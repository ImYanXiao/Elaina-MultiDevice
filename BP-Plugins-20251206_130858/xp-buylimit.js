const xpperlimit = 1000
var handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^blimit/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xpperlimit * count
    global.db.data.users[m.sender].limit += count
    conn.reply(m.chat, `-XP ${xpperlimit * count} 💹\n+ ${count} Limit 🎫`, m)
  } else conn.reply(m.chat, `[❗] XP Anda tidak mencukupi untuk membeli ${count} limit\n▸ *Mainkan Game untuk dapatkan beberapa uang!*`, m)
}
handler.help = ['buylimit <jumlah limit yang ingin di beli>']
handler.tags = ['xp']

handler.command = /^(b(uy)?limit)$/i

handler.exp = 0

export default handler
