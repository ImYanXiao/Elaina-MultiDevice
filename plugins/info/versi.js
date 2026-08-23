let handler = async (m, { conn }) => {
  conn.reply(m.chat, `${conn.user.name} ᴠᴇʀsɪᴏɴ: Version encryption`, m, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        body: 'Versi Elaina saat ini',
        thumbnailUrl: 'https://pomf2.lain.la/f/z8ii6sf7.jpg',
        sourceUrl: 'https://rexxzynprofile.vercel.app',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

handler.command = ['version', 'versi'];
handler.help = ['version'];
handler.tags = ['info'];

export default handler;