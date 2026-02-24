import { translate } from '@vitalets/google-translate-api'

var handler = async (m, { args, usedPrefix, command }) => {
	let lang, text
	if (args.length >= 2) {
		lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ')
	} else if (m.quoted && m.quoted.text) {
		lang = args[0] ? args[0] : 'id', text = m.quoted.text
	} else throw `Ex: ${usedPrefix + command} id hello i am robot`
	let res = await translate(text, { to: lang }).catch(_ => null)
	if (!res) throw `Error : Bahasa"${lang}" Tidak Support`
	m.reply(`*Terdeteksi Bahasa:* ${res.raw.src}\n*Ke Bahasa:* ${lang}\n\n*Original Text:* ${res.raw.sentences[0].orig}\n*Terjemahan:* ${res.raw.sentences[0].trans}`.trim())
}
handler.help = ['translate'].map(v => v + ' <bahasa> <teks>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

export default handler