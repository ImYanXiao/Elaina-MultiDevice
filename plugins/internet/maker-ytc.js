import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Uhm... teksnya mana?';

                                      
  let ppUrl = await conn.profilePictureUrl(m.sender).catch(_ => '');

                                                
  let apiUrl = `https://itzpire.com/maker/yt-comment?username=${encodeURIComponent(m.pushName)}&pp_user=${encodeURIComponent(ppUrl)}&comment=${encodeURIComponent(text)}`;

  try {
                            
    let response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

                          
    if (response.status !== 200) {
      throw `Gagal mengambil gambar dari API. Status: ${response.status}`;
    }

                      
    let contentType = response.headers['content-type'];
    if (!contentType || !contentType.startsWith('image/')) {
      throw 'File yang diunduh bukan gambar.';
    }

                                            
    conn.sendFile(m.chat, response.data, 'yt-comment.png', 'Here is your comment', m);
  } catch (error) {
    console.error('Error:', error);
    throw 'Gagal mengambil gambar dari API.';
  }
}

handler.help = ['ytcomment <comment>']
handler.tags = ['internet']
handler.limit = true

handler.command = /^(ytcomment)$/i

export default handler;
