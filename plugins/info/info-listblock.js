let handler = async (m, { conn, usedPrefix }) => {
	await conn.fetchBlocklist().then(async data => {
		let txt = `*「  Daftar Nomor Yang Diblokir  」*\n\n*Total:* ${data.length}\n\n┌─\n`
		for (let i of data) {
			txt += `├ @${i.split("@")[0]}\n`
		}
		txt += "└────"
		return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
	}).catch(err => {
		console.log(err);
		return m.reply( 'tidak ada yang diblokir!')
	})
}

handler.tags = ["info"]
handler.help = ["listblock"]
handler.command = /^(listb(lo(ck|k)?)?)$/i

export default handler