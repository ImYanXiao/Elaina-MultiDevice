const { WAMessageStubType } = await import('@adiwajshing/baileys')

export async function all(m) {
	if (m.fromMe && m.isBaileys) return !0
	let text;
	let setting = global.db.data.settings[this.user.jid]
	if(!setting.anticall) return 
	
	if (m.messageStubType === WAMessageStubType.CALL_MISSED_VOICE || m.messageStubType === WAMessageStubType.CALL_MISSED_VIDEO) {
    // Eksekusi logika jika panggilan yang terlewat
    await conn.reply(m.chat, `Gosah Nelpon Ya Anj`, m);
    await conn.rejectCall(m.id, m.chat);
    return conn.updateBlockStatus(m.chat, "block");
	}
}