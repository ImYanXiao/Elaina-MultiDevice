import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh pemakaian: ${usedPrefix + command} https://codeshare.nauval.site/paste/68779d5c-bcd5-4a8d-8540-e3212a344221`;

  let link = args[0];
  if (!/^https?:\/\//.test(link)) throw `URL tidak valid.`;

  try {
    let { data: html } = await axios.get(link, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    });

    let $ = cheerio.load(html);
    let rawCode = $("pre").text().trim();
    if (!rawCode) rawCode = $("code").text().trim();
    if (!rawCode) throw `Gagal menemukan kode di halaman.`;

    let caption = `📄 *Copy Code dari Halaman*\n🔗 ${link}\n\n\`\`\`\n${rawCode}\n\`\`\``;
    await conn.sendMessage(m.chat, { text: caption });

  } catch (err) {
    throw `Gagal mengambil code: ${err.message}`;
  }
};

handler.command = /^copycsc$/i;
handler.help = ["copycsc <url>"];
handler.tags = ["tools"];

export default handler;