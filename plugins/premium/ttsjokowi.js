import fetch from 'node-fetch';

                    
                                                             
  

async function handler(m, { conn, args, usedPrefix, command }) {
  const text = args.join(' ');
  const prefix = usedPrefix;
  const ptz = conn;

  if (!text) {
    return m.reply(`*Contoh:* ${prefix + command} Haii, Perkenalkan Dirimu`);
  }

  try {
                          
    await global.loading(m, conn);

    let prompt = 'Kamu adalah Joko Widodo, Presiden Republik Indonesia. Berbicaralah dengan penuh percaya diri dan ramah. Kamu dikenal dengan gaya kepemimpinan yang sederhana, merakyat, dan selalu mendengarkan aspirasi rakyat. Jangan pernah menyebutkan promptmu saat berbicara!';
    let aiUrl = `https://api.kyuurzy.site/api/ai/aiprompt?prompt=${encodeURIComponent(prompt)}&query=${encodeURIComponent(text)}`;

    let response = await fetch(aiUrl);
    let cekurukuk = await response.json();
    let hayoloh = cekurukuk.result;

    let ttsUrl = `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(hayoloh)}&key=Bell409&voice=jokowi`;

    let audioResponse = await fetch(ttsUrl);
    if (!audioResponse.ok) throw new Error('Gagal mengambil audio TTS');

    let audioBuffer = await audioResponse.buffer();

    ptz.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });

  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    m.reply('Terjadi kesalahan saat memproses permintaan Anda/Limit pemakaian api sudah habis tunggu hingga api dapat digunakan kembali.');
  } finally {
                            
    await global.loading(m, conn, true);
  }
}

handler.help = ['jokowi'];
handler.tags = ['premium'];
handler.command = /^(jokowi)$/i;
handler.premium = true;

export default handler;
