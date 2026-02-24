import fs from 'fs'
var handler = async (m, { conn } ) => {
const delay = time => new Promise(res => setTimeout(res, time))
		fs.readdir("sessions", async function(err, files) {
			if (err) {
				console.log('Unable to scan directory: ' + err);
				return m.reply('Unable to scan directory: ' + err);
			}
			let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
			  item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
			)
			console.log(filteredArray.length);
			let teks = `Terdeteksi ${filteredArray.length} junk files\n\n`
			if (filteredArray.length == 0) return newReply(teks)
			filteredArray.map(function(e, i) {
				teks += (i + 1) + `. ${e}\n`
			})
			const { key } = await m.reply(teks)
			await delay(2000)
			await m.reply("Process Clear session...", { edit: key })
			await filteredArray.forEach(function(file) {
				fs.unlinkSync(`../sessions/${file}`)
			});
			await delay(2000)
			m.reply("Success Clear Session", { edit: key }) 
		})
	}
handler.help = ['clearsesi']
handler.tags = ['owner']
handler.command = /^(c(lear)?)(sessi|session)$/i

export default handler