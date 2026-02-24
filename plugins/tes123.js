/*const { generateWAMessageFromContent } =(await import('@adiwajshing/baileys')).default

var handler  = async (m, 
             { conn, 
                usedPrefix: _p }) => {

var info = `Yes mastah, im here(｡>_<｡)`

const pre = await generateWAMessageFromContent(m.chat, { liveLocationMessage:{
  degreesLatitude: 34.672314,
  degreesLongitude: 135.484802,
  accuracyInMeters: 100,
  speedInMps: 999,
  degreesClockwiseFromMagneticNorth: 99,
  caption: info,
  sequenceNumber: 774236889,
  timeOffset: 8600,
  contextInfo: { mentionedJid: [m.sender] }
}}, { quoted: m })
return conn.relayMessage(pre.key.remoteJid, pre.message, { messageId: pre.key.id })
}
handler.customPrefix = /^(tes|bot|elaina|test)$/i
handler.command = new RegExp
export default handler*/