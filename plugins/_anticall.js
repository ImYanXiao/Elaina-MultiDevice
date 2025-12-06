export async function before(m) {
	this.ev.on('call', async (call) => {
		if (call[0].status == 'offer' && global.db.data.settings[this.user.jid].anticall) await this.rejectCall(call[0].id, call[0].from)
	})
	return !0
}