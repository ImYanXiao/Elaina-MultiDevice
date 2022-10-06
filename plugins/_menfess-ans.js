const delay = time => new Promise(res => setTimeout(res, time))
export async function before(m) {
	if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
	this.menfess = this.menfess ? this.menfess : {}
	let mf = Object.values(this.menfess).find(v => v.status === false && v.penerima == m.sender)
	if (!mf) return !0
	console.log({ text: m.text, type: m.quoted?.mtype })
	if ((m.text === 'BALAS PESAN' || m.text === '') && m.quoted.mtype == 'buttonsMessage') return m.reply("Silahkan kirim pesan balasan kamu.\nKetik pesan sesuatu lalu kirim, maka pesan otomatis masuk ke target balas pesan.");
	else {
		let imgr = flaaa.getRandom()
		let txt = `Hai kak @${mf.dari.split('@')[0]}, kamu menerima balasan nih.\n\nPesan yang kamu kirim sebelumnya:\n${mf.pesan}\n\nPesan balasannya:\n${m.text}\n`.trim();
		await this.sendButton(mf.dari, bottime, txt, `${imgr + 'Menfess'}`, [['BALAS PESAN', '.balasmenfess']], null).then(() => {
			m.reply('Berhasil Mengirim balasan.')
			delay(1500)
			delete this.menfess[mf.id]
			return !0
		})
	}
	return !0
}
/* Made By FokusDotId (Fokus ID)
 * https://github.com/FokusDotId
 * Ingin bikin fitur tapi goblok coding?
 * hubungi: https://wa.me/6281320170984
 * Jangan lupa bawa udut minimal sukun🗿
*/
