let handler = async (m, { conn, command, args, text}) => {

  await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: fsizedoc,
      requestFrom: m.sender,
      noteMessage: {
      noteMessage: {
      text: author,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})

  }
handler.command = /^payment$/i

export default handler