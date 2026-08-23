import axios from 'axios';

const handler = async (m, { conn, text }) => {
                                                                   
  const args = text.split(' ');

                                                        
  if (args.length < 3) throw 'Harap masukkan username, avatar URL, dan komentar. Contoh: /ytcomment Rexx https://telegra.ph/file/24fa902ead26340f3df2c.png Kontol';

                               
  const username = args[0];                     
  const avatar = args[1];                     
  const comment = args.slice(2).join(' ');                                   

                                               
  const url = `https://some-random-api.com/canvas/misc/youtube-comment?username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(comment)}`;

  try {
                                                  
    const response = await axios.get(url, { responseType: 'arraybuffer' });

                                       
    await conn.sendMessage(m.chat, { 
      image: response.data, 
      caption: 'Here is your YouTube comment.'
    }, { quoted: m });

  } catch (e) {
    throw 'Gagal mengambil gambar dari API. Silakan coba lagi nanti.';
  }
};

handler.help = ['ytcomment <username> <avatar> <comment>'];
handler.tags = ['maker'];
handler.limit = true;
handler.register = true;

handler.command = /^(ytcomment)$/i;

export default handler;
