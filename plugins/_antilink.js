let handler = m => m
// TAMBAHIN SENDIRI SITUS YANG LAIN
let linkRegex = /(chat.whatsapp.com|whatsapp.com|xnxx.com|xvideos.com|pornhub.com)\/([0-9A-Za-z]{1,99999})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
    let isGroupLink = linkRegex.exec(m.text)
  if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
  if (m.text.includes(thisGroup)) throw false // jika link grup itu sendiri gak dikick
    if (!isBotAdmin) m.reply(` *「 ANTILINK 」* ${isAdmin ? "Admin mah bebas ygy :'v" : `\n\nlink group terdeteksi dan ${global.namebot} bukan admin jadi tidak bisa ngekick!`}`)
  if (isBotAdmin) {
      m.reply(` *「 ANTILINK 」* \n\nLink Group Terdeteksi, bye Kamu Akan Di Kick!!`.trim())
      await this.delay(500)
      await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
      await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.id }}) // Hapus pesan yang mengandung tautan
    }
  }
  return true
}
export default handler
