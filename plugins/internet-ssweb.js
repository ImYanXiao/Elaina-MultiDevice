var handler = async (m, { 
                                conn, 
                          command, text, args}) => {
   if (!args[0]) return conn.reply(m.chat, 'Where`s Url?', m)

  await m.reply('Wait A Second') 

if (command === 'ssweb' || command === 'sstablet') {
await conn.sendFile(m.chat, 'https://aemt.me/sstab?url=${args[0]}', '', 'Nih Kak ･ᴗ･', m)
}
if (command === 'sspc') {
await conn.sendFile(m.chat, 'https://aemt.me/sspc?url=${args[0]}', '', 'Nih Kak ･ᴗ･', m)
}
if (command === 'sshp') {
await conn.sendFile(m.chat, 'https://aemt.me/sshp?url=${args[0]}', '', 'Nih Kak ･ᴗ･', m)
}
}
handler.help = ['ssweb','sspc','sshp','sstablet'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^(ssweb|sstablet|sspc|sshp)$/i

export default handler
