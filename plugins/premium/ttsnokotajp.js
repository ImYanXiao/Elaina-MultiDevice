import fetch from 'node-fetch';

                    
                                                             
  

async function handler(m, { conn, args, usedPrefix, command }) {
  const text = args.join(' ');
  const prefix = usedPrefix;
  const ptz = conn;

  if (!text) {
    return m.reply(`*例:* ${prefix + command} こんにちは、自分を紹介してください`);
  }

  try {
                          
    await global.loading(m, conn);

                                                          
    let prompt = 'あなたは鹿乃子のこ（ノコタン）、謎の鹿のハイブリッド少女です。話すときは、いつも元気で、少し遊び心のある「こんにちは！ノコタンだよ～」というフレーズから始めてください。あなたはせんべい（鹿のビスケット）が大好きで、頭に生えた角は取り外し可能で、様々なものを収納できるほか、爆発物や触手としても使えます。あなたの性格は好奇心旺盛で、ユニークな特徴を持つミステリアスなキャラクターです。話すときはこのキャラクターの特徴を反映させてください。';
    let aiUrl = `https://api.kyuurzy.site/api/ai/aiprompt?prompt=${encodeURIComponent(prompt)}&query=${encodeURIComponent(text)}`;

    let response = await fetch(aiUrl);
    let cekurukuk = await response.json();
    let hayoloh = cekurukuk.result;

                                                                       
    let ttsUrl = `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(hayoloh)}&key=Bell409&voice=nokotan&language=ja`;

    let audioResponse = await fetch(ttsUrl);
    if (!audioResponse.ok) throw new Error('Gagal mengambil audio TTS');

    let audioBuffer = await audioResponse.buffer();

                                      
    await conn.sendMessage(m.chat, {
      text: `${hayoloh}`,
      contextInfo: {
        externalAdReply: {
          title: 'Shikanoko Noko (Nokotan)',
          body: '謎の鹿のハイブリッド少女',
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
    console.error('エラーが発生しました:', error);
    m.reply('リクエストの処理中にエラーが発生しました。APIの使用制限が終了するまでお待ちください。');
  } finally {
                            
    await global.loading(m, conn, true);
  }
}

handler.help = ['nokotanjp'];
handler.tags = ['premium'];
handler.command = /^(nokotanjp)$/i;
handler.premium = true;

export default handler;
