import { URL_REGEX } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, args }) => {
 
  if (args.length > 0) {

    let newName = args.join(' ')
    try {
     
      await conn.updateProfileName(newName)
      m.reply('Elaina sukses Menganti profil name')
    } catch (e) {
      m.reply('Elaina gagal untuk mengganti  profile name')
    }
  } else {
    throw 'Where\'s the new profile name?'
  }
}

handler.help = ['setname']
handler.tags = ['info']
handler.command = /^setname$/i
handler.group = false
handler.admin = false
handler.botAdmin = false
handler.owner = true

export default handler