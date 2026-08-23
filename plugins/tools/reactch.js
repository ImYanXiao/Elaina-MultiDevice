let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || !args[1]) {
    return m.reply(`📍 Contoh:\n${usedPrefix + command} ✨ https://whatsapp.com/channel/0029Vaj8fWvJUM2Skdo4wg45/5247`);
  }

  const emoji = args[0];
  const link = args[1];

  if (emoji.length > 2) return m.reply('Cuma 1 emoji ya.');
  if (!link.includes('whatsapp.com/channel/')) return m.reply('Link saluran tidak valid.');

  const match = link.match(/whatsapp\.com\/channel\/([^/]+)\/(\d+)/);
  if (!match) return m.reply('Link salah format.');

  const channelId = match[1];
  const msgId = match[2];

  const channelJid = `${channelId}@newsletter`;

  await conn.sendMessage(channelJid, {
    react: {
      text: emoji,
      key: {
        id: msgId,
        remoteJid: channelJid,
        fromMe: false,
        participant: '0@s.whatsapp.net'
      }
    }
  });

  m.reply(`Berhasil react ${emoji} ke pesan saluran.`);
};

handler.help = ['reactch <emoji> <link_channel>'];
handler.tags = ['tools'];
handler.command = /^reactch$/i;

export default handler;