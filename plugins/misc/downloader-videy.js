import axios from "axios";
import cheerio from "cheerio";

const Videydl = async (m, { text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `Input Link From Videy!\n\nExample: .videydl https://videy.co/v?id=ailVPy1S`,
      m
    );
  }

  if (!/^http(s):\/\/videy\.co/i.test(text)) {
    return m.reply("Link Invalid");
  }

  await conn.sendMessage(m.chat, {
    react: {
      text: "🕒",
      key: m.key,
    },
  });

  let request = await videy(text);

  await conn.sendMessage(
    m.chat,
    {
      video: { url: request },
      caption: "Downloaded from Videy",
    },
    { quoted: m }
  );
};

Videydl.help = ["videydl", "videy"];
Videydl.tags = ["downloader", "premium"];
Videydl.command = /^(videy|videydl)$/i;
Videydl.premium = true;

export default Videydl;

function videy(url) {
  return `https://cdn.videy.co/${url.split("?id=")[1]}.mp4`;
}