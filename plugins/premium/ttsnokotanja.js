import fetch from 'node-fetch';

                    
                                                             
  

async function handler(m, { conn, args, usedPrefix, command }) {
  const text = args.join(' ');
  const prefix = usedPrefix;
  const ptz = conn;

  if (!text) {
    return m.reply(`*Tuladha:* ${prefix + command} Halo, kenalake dhewe`);
  }

  try {
                        
    await global.loading(m, conn);

                                                           
    let prompt = 'Kowe iku Shikanoko Noko (Nokotan), bocah wanita campuran misterius karo rusa. Nalika ngomong, mesthine diwiwiti nganggo frasa sing ceria "Halo! Iki Nokotan~". Kowe seneng banget karo senbei (biskuit rusa), lan tanduk sing ana ing sirahmu bisa dicopot, bisa digunakake kanggo nyimpen macem-macem barang, uga bisa digunakake minangka bahan peledak utawa tentakel. Watakmu penasaran banget, dadi karakter misterius sing nduweni ciri khas unik. Nalika ngomong, coba refleksikake ciri-ciri karakter iki.';
    let aiUrl = `https://api.kyuurzy.site/api/ai/aiprompt?prompt=${encodeURIComponent(prompt)}&query=${encodeURIComponent(text)}`;

    let response = await fetch(aiUrl);
    let cekurukuk = await response.json();
    let hayoloh = cekurukuk.result;

                                                                     
    let ttsUrl = `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(hayoloh)}&key=Bell409&voice=nokotan&language=ja`;

    let audioResponse = await fetch(ttsUrl);
    if (!audioResponse.ok) throw new Error('Gagal njupuk audio TTS');

    let audioBuffer = await audioResponse.buffer();

                                  
    await conn.sendMessage(m.chat, {
      text: `${hayoloh}`,
      contextInfo: {
        externalAdReply: {
          title: 'Shikanoko Noko (Nokotan)',
          body: 'Bocah wanita campuran misterius',
          thumbnailUrl: 'https://pomf2.lain.la/f/9qkdgru0.jpg',
          sourceUrl: 'https://chat.whatsapp.com/D5HU3IapcJNFikeZjnxiwd',
          mediaType: 1,
          renderLargerThumbnail: true, 
          showAdAttribution: true
        }
      }
    });

                         
    ptz.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });

  } catch (error) {
    console.error('Kesalahan muncul:', error);
    m.reply('Ana kesalahan nalika ngolah panjaluk. Mangga ngenteni nganti wates panggunaan API rampung.');
  } finally {
                         
    await global.loading(m, conn, true);
  }
}

handler.help = ['nokotanja'];
handler.tags = ['premium'];
handler.command = /^(nokotanja)$/i;
handler.premium = true;

export default handler;
