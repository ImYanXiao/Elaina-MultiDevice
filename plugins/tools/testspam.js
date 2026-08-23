import fetch from 'node-fetch';

const sendMessage = async (message) => {
  try {
    const res = await fetch('https://rapz.site/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (res.status === 429) {
                   
      return { success: false, rateLimited: true };
    }
    return { success: res.ok, rateLimited: false };
  } catch {
    return { success: false, rateLimited: false };
  }
};

const spamMessages = async (message, count) => {
  let sent = 0;
  for (let i = 1; i <= count; i++) {
    const { success, rateLimited } = await sendMessage(message);

    if (rateLimited) {
      console.log(`[${i}] Rate limited, tunggu 1 menit...`);
      await new Promise(r => setTimeout(r, 60000));
      i--;                                   
      continue;
    }

    if (!success) {
      console.log(`[${i}] Gagal kirim pesan`);
    } else {
      sent++;
      console.log(`[${i}] Pesan terkirim`);
    }

    await new Promise(r => setTimeout(r, 1000));                            
  }
  return sent;
};

const handler = async (m, { text }) => {
  if (!text.includes('|')) {
    return m.reply("Format salah! Gunakan: .spamrapzsite pesan|jumlah\nContoh: .spamrapzsite Halo spam|5");
  }

  const [message, countStr] = text.split('|').map(s => s.trim());
  const count = parseInt(countStr, 10);

  if (!message) return m.reply("Pesan tidak boleh kosong!");
  if (isNaN(count) || count < 1) return m.reply("Jumlah spam harus angka positif!");

  try {
    await m.reply(`Mulai mengirim ${count} pesan ke rapz.site...`);
    const sentCount = await spamMessages(message, count);
    return m.reply(`Selesai mengirim ${sentCount} pesan!`);
  } catch (e) {
    console.error(e);
    return m.reply("Terjadi kesalahan saat mengirim pesan, coba lagi nanti.");
  }
};

handler.command = handler.help = ['spamrapzsite'];
handler.tags = ['tools'];

export default handler;
