let handler = async(m, { conn, text }) => {
  if (!text) throw `Uhm....Prefixnya?`
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  await m.reply(`Prefix Telah Ditukar Ke *${text}*`)
}
handler.help = ['setprefix']
handler.tags = ['owner']
handler.command = /^(setprefix)$/i

handler.rowner = true

export default handler