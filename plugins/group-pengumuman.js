import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, groupMetadata, isOwner, isAdmin }) => {
  if (!(isOwner || isAdmin)) throw dfail('admin', m, conn)
  let users = groupMetadata.participants.map(v => v.id) 
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m) 
  let teks = text ? text : cc.text
   // let q = m.quoted ? m.quoted : m
   // let c = m.quoted ? await m.getQuotedObj() : m.msg
   // let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }}, { quoted: null, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users })
   // console.log(msg)
   // await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
   return reply(m.chat, '@' + m.chat, null, { contextInfo : { mentionedJid: users, groupMentions:[{ groupJid: m.chat, groupSubject: teks}]}}) 
}
handler.help = ['hidetag']
handler.tags = ['group']
handler.command = /^(hidetag)$/i
handler.group = true

export default handler


async function reply(jid, text = '', quoted, options) {
                return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { text,
                ...options }, {
                    quoted,
            ephemeralExpiration: true
                })
            }