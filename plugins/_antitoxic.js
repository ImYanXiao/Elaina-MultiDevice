let handler = m => m

let toxic = /(a(su|nj(([ie])ng|([ie])r)?)|me?me?k|ko?nto?l|ba?bi|fu?ck|ta(e|i)k|bangsat|g([iueo])bl([iueo])(k|g)|g ([iueo]) b l ([iueo]) (k|g)|a (n j (i n g|i r)?)s u|col(i|ay)|an?jg|b([ia])ngs([ia])?t|t([iuo])l([iuo])l)/i
handler.before = function (m, { user }) {
  if (m.isBaileys && m.fromMe) return true
  if (/masuk|lanjutkan|banjir|(per)?panjang/g.exec(m.text)) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupToxic = toxic.exec(m.text)

  if (chat.antiToxic && isGroupToxic) {
    m.reply('Jangan Toxic ya!!\n' + readMore + '\nMau Matikan? ketik */disable antitoxic*')
    if (global.opts['restrict']) {
      // if (!user.isAdmin) return true
      // this.groupRemove(m.chat, [m.sender])
    }
  }
  return true
}

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
