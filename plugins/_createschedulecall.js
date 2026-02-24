var handler = async (m, { conn, text }) => {
	let nom = pickRandom[('1', '2')]
	return conn.relayMessage(m.chat, { scheduledCallCreationMessage: {
scheduledTimestampMs:Date.now(), 
callType:nom, title: text }}, { messageId: m.id })
}
handler.command = /^(createschedulecall)$/i

handler.owner = true

export default handler