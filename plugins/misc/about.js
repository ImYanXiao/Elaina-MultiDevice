import fs from 'fs'

let handler = async (m, { conn }) => {
let loadd = [
'⋘ Tunggu Menampilkan Data... ⋙',
'▒▒▒▒▒▒▒▒▒▒ 0%',
'█▒▒▒▒▒▒▒▒▒ 10%',
'███▒▒▒▒▒▒▒ 30%',
'█████▒▒▒▒▒ 50%',
'███████▒▒▒ 70%',
'█████████▒ 90%',
'██████████ 100%',
'Ｓｕｃｃｅｓｓ...'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '_Loading_'})              

for (let i = 0; i < loadd.length; i++) {
await conn.sendMessage(m.chat, {text: loadd[i], edit: key })}
	let pfft = `
ubah di bawah!!!
`;
 conn.sendMessage(m.chat, {
      video: { url: "https://telegra.ph/file/4a20ea409cd038ec34a80.mp4"},
      gifPlayback: true,
      caption: 'Elaina - Multidevice  adalah bot WhatsApp yang cerdas dan sangat berguna untuk membantu Anda dalam menjawab pertanyaan dan memberikan solusi yang tepat dalam waktu yang singkat. Dikembangkan oleh RexxHayanasi , bot ini menggunakan sumber asli base ELAINA AI yang terus diperbarui oleh RexxHayanasi  untuk memberikan pengalaman berinteraksi yang lebih mudah dan menyenangkan.\nDengan kemampuannya yang luas dalam menjawab pertanyaan dan memberikan solusi, Bot Elaina - Multidevice  dapat membantu Anda dalam berbagai hal seperti, mencari informasi tentang produk atau layanan, mengatur jadwal, dan banyak lagi. Bot Elaina - Multidevice  juga dapat memberikan jawaban yang akurat dan cepat sehingga Anda tidak perlu lagi menunggu lama untuk mendapatkan jawaban yang Anda butuhkan.\nSebagai produk yang dikembangkan dan diperbarui oleh RexxHayanasi , Bot Elaina - Multidevice  selalu menerima pembaruan fitur-fitur terbaru untuk memberikan layanan yang semakin baik dan canggih. Dengan Bot Elaina - Multidevice , Anda tidak perlu khawatir tentang kualitas layanan yang diberikan karena bot ini selalu siap memberikan solusi yang terbaik bagi pengguna WhatsApp. Jadi, tunggu apa lagi? Gunakan Bot Elaina - Multidevice  sekarang dan nikmati kemudahan serta kenyamanan dalam berinteraksi dengan bot cerdas ini di WhatsApp!\n\nElaina - Multidevice  is a smart WhatsApp bot that is very useful for helping you answer questions and provide accurate solutions in a short amount of time. Developed by RexxHayanasi , this bot uses the original source of Botcahx that is constantly updated by RexxHayanasi to provide an easier and more enjoyable interactive experience.With its broad ability to answer questions and provide solutions, Bot Elaina - Multidevice  can assist you in various things such as searching for information about products or services, scheduling appointments, and much more. Bot Elaina - Multidevice  can also provide accurate and quick answers so you no longer have to wait long to get the answers you need.\nAs a product developed and updated by RexxHayanasi , Bot Elaina - Multidevice  always receives the latest feature updates to provide better and more advanced services.With Bot Elaina - Multidevice , you dont have to worry about the\nquality of the service provided because this bot is always ready to provide the best solutions for WhatsApp users. So, what are you waiting for? Use Bot yukk now and enjoy the ease and convenience of interacting with this smart bot on WhatsApp!',
      contextInfo: {
      externalAdReply: {
      title: `© About Elaina - Multidevice`,
      body: global.author,
      thumbnailUrl: 'https://telegra.ph/file/a245bc22bc0c1b96792d8.jpg',
      sourceUrl: `https://chat.whatsapp.com/DsZ1DNoB9esEKFrD3wmB7T`,
      mediaType: 1,
      renderLargerThumbnail: true
      }}})
              let vn = "./vn/yowaimo.mp3"
      
	conn.sendFile(m.chat, vn, "ehee.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
}
handler.command = /^(about)$/i;

export default handler;
