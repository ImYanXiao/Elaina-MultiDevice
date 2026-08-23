import path, { join } from 'path'
import {
    readdirSync,
    unlinkSync,
    existsSync,
    rmdirSync
} from 'fs'

let handler = async (m, { conn, __dirname, args, text, usedPrefix, command }) => {
                      
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  let setting = global.db.data.settings[conn.user.jid]
  let ar = Object.keys(global.plugins || {})
  let ar1 = ar.map(v => v.replace(/\.js$/i, ''))
  if (!text) return m.reply(`uhm.. where the text?\n\nexample:\n${usedPrefix + command} info\n${usedPrefix + command} exp/profile (kalau plugin-nya ada di subfolder)`)

                                                                         
  let target = ar1.includes(args[0]) ? args[0] : null

                                                                             
                                                          
  if (!target && args[0] && !args[0].includes('/')) {
      let matches = ar1.filter(v => path.basename(v) === args[0])
      if (matches.length === 1) target = matches[0]
      else if (matches.length > 1) {
          return m.reply(`⚠️ Ada beberapa plugin bernama *${args[0]}*, sebutkan lengkap sama foldernya:\n\n${matches.map(v => ' ' + v).join('\n')}`)
      }
  }

  if (!target) return conn.sendMessage(chatId, { text: `${setting.smlcap ? conn.smlcap("*🗃️ NOT FOUND!*") : "*🗃️ NOT FOUND!"}\n==================================\n\n${ar1.map(v => ' ' + v).join`\n`}` }, { quoted: m })

  const file = join(__dirname, '../plugins/' + target + '.js')
  unlinkSync(file)

                                                                            
  const dir = path.dirname(file)
  const pluginsRoot = join(__dirname, '../plugins')
  if (dir !== pluginsRoot && existsSync(dir) && readdirSync(dir).length === 0) {
      rmdirSync(dir)
  }

  conn.reply(chatId, `Succes deleted "plugins/${target}.js"`, m)
}
handler.help = ['deletefile']
handler.tags = ['owner']
handler.command = /^(df|deletefile)$/i

handler.mods = true

export default handler
