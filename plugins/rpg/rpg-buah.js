let handler = async (m, { conn }) => {
	let user = global.db.data.users[m.sender]
	let text = `
[ *GUDANG BUAH KAMU* ]

${global.rpg.emoticon("pisang")} Pisang: ${toRupiah(user.pisang)}
${global.rpg.emoticon("anggur")} Anggur: ${toRupiah(user.anggur)}
${global.rpg.emoticon("mangga")} Mangga: ${toRupiah(user.mangga)}
${global.rpg.emoticon("jeruk")} Jeruk: ${toRupiah(user.jeruk)}
${global.rpg.emoticon("apel")} Apel: ${toRupiah(user.apel)}
`.trim()
	m.reply(text)
}

handler.menufun = ['buah']
handler.tagsfun = ['rpg']
handler.command = /^((list)?(buah|fruits?))$/i
handler.group = true
handler.rpg = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")
