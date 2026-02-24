let handler = async(m, { conn, command }) => {
  if (command === "mode") {
     return m.reply(global.opts['self'] ? 'Self' : 'Public') 
      }
  let isPublic = command === "public";
  let self = global.opts["self"]

  if(self === !isPublic) return m.reply(`${!isPublic ? "Self" : "Public"} has been activated Previously 🤔`)

  global.opts["self"] = !isPublic

  m.reply(`Bot Is Now ${!isPublic ? "Self" : "Public"} !`)
}

handler.help = ["self", "public", "mode"]
handler.tags = ["owner"]

handler.owner = true

handler.command = /^(self|public|mode)/i

export default handler