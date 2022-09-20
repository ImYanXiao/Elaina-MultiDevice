let handler = async (m, { conn, args, groupMetadata}) => {
  if (args.length > 0) {
  const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
       let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : false
       let warn = global.db.data.users[mention].warn
       if (warn > 0) {
         global.db.data.users[mention].warn -= 1
         m.reply(`Moderator mengurangi warn kamu, warn kamu sekarang ${warn - 1}`, mention)
         } else if (warn == 0) {
            m.reply('User tidak memiliki warn')
        }
} else conn.reply(m.chat, 'Tag Targetnya kak', m)
}

handler.help = ['Delwarn @user']
handler.tags = ['group']
handler.command = /^delwarn$/i

handler.mods = true

export default handler