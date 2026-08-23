import fetch from "node-fetch";

const handler = async (m, { conn, text, usedPrefix, args, command }) => {
  const who = m.sender;
  const user = global.db.data.users[who].life || {};

  if (!user.name || !user.gender || !user.age) {
    m.reply(
      `⚠️ Untuk menggunakan fitur ini, kamu harus teregistrasi terlebih dahulu dengan cara:\n\nKetik *${usedPrefix}setlife* dan ikuti tutorialnya`
    );
    return;
  }

  if (!user.waifu) {
    m.reply(
      `⚠️ Kamu belum punya waifu! Ketik *${usedPrefix}setwaifu* dan cari waifumu.`
    );
    return;
  }

  try {
    await conn.sendMessage(m.chat, {
      react: {
        text: global.loading,
        key: m.key
      }
    });

    const res = await fetch(
      `https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(
        user.waifu + " anime icons"
      )}&type=image`
    );
    const json = await res.json();
    const image = json?.data?.[0]?.image_url || "";

    let caption = `*WAIFU INFO*
💃🏻 Nama Waifu: ${user.waifu}
💘 Level Waifu: ${user.exp}

${user.name} dan ${user.waifu} adalah sepasang kekasih dengan kehidupan yang sangat bahagia. ${user.name} beruntung sekali karena memilih waifu seperti ${user.waifu}. Semoga mereka selalu hidup bahagia.

Tingkatkan level waifumu dengan melakukan kencan *${usedPrefix}kencan*

Fact: _level waifumu tidak akan tereset walaupun sudah mengganti waifu._
`.trim();

    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `Hi, I'm ${user.waifu}`,
          body: "Gambar terkadang tidak muncul",
          thumbnailUrl: image,
          sourceUrl: image,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    });

    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    });
  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key
      }
    });
    m.reply("❌ Gagal mengambil gambar waifu. Coba lagi nanti.");
  }
};

handler.command = handler.help = ["waifume"];
handler.tags = ["Utility"];

export default handler;