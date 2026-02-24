var handler = async(m, { conn }) => {

let str = `*https://github.com/ImYanXiao/Elaina-MultiDevice*`
let letoy = hwaifu.getRandom()
return conn.createThumbnail(m.chat, str, fakes, { title: 'ᴡᴀɴᴛ sᴏᴜʀᴄᴇ ᴄᴏᴅᴇ ᴛʜɪs ʙᴏᴛ?', ads:false, large:true, thumbnail: await getBuffer(letoy), url: social}) 
          }
handler.help = ['source code']
handler.tags = ['info']
handler.command =  /^(script|sc)$/i

export default handler