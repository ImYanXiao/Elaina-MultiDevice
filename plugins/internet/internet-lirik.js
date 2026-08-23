import axios from "axios";
import cheerio from "cheerio";

async function findSongs(text) {
  try {
    const searchText = encodeURIComponent(text);
    const { data } = await axios.get("https://songsear.ch/q/" + searchText);
    const $ = cheerio.load(data);

    const result = {
      title: $("div.results > div:nth-child(1) > .head > h3 > b").text() +
        " - " +
        $("div.results > div:nth-child(1) > .head > h2 > a").text(),
      album: $("div.results > div:nth-child(1) > .head > p").text(),
      number: $("div.results > div:nth-child(1) > .head > a")
        .attr("href")
        .split("/")[4],
      thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src"),
    };

    if (!result.title.trim()) {
      throw new Error("Lagu tidak ditemukan.");
    }

    const { data: lyricData } = await axios.get(
      `https://songsear.ch/api/song/${result.number}?text_only=true`
    );

    if (!lyricData.song || !lyricData.song.text_html) {
      throw new Error("Lirik tidak ditemukan.");
    }

    let lyrics = lyricData.song.text_html
      .replace(/<br\/>/g, "\n")
      .replace(/&#x27;/g, "'")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\n+/g, "\n")
      .replace(/^\n|\n$/g, "")
      .replace(/\s+/g, " ");

    return {
      status: true,
      title: result.title,
      album: result.album,
      thumb: result.thumb,
      lyrics: lyrics,
    };
  } catch (err) {
    return {
      status: false,
      error: err.message || "Terjadi kesalahan.",
    };
  }
}

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply("Mana query-nya? Masukin judul lagu yang mau dicari!");

  let res = await findSongs(text);
  if (!res.status) return m.reply(`❌ ${res.error}`);

  let message = `🎵 *Judul:* ${res.title}\n📀 *Album:* ${res.album}\n\n📜 *Lirik:*\n${res.lyrics}`;

  conn.sendMessage(
    m.chat,
    {
      image: { url: res.thumb || "https://via.placeholder.com/500" }, 
      caption: message,
      footer: global.wm2,
      buttons: [
        {
          buttonId: `.play ${text}`,
          buttonText: { displayText: "Download Music🎧" },
          type: 1,
        },
      ],
      headerType: 1,
      viewOnce: true,
    },
    { quoted: m }
  );
};

handler.help = ["lyrics"];
handler.tags = ['internet']
handler.command = ["lyrics", "lirik"];
handler.limit = 5
export default handler;