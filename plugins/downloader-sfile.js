import fetch from "node-fetch";
import * as cheerio from "cheerio";

const headers = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-US,en;q=0.8",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const input = text.trim();

  if (
    command === "sfiletrend" ||
    command === "trendfile" ||
    command === "trendsfile"
  ) {
    const baseUrl = "https://sfile.mobi/top.php";
    let caption = "";

    for (let page = 1; page <= 10; page++) {
      const url = `${baseUrl}?page=${page}`;
      try {
        const res = await fetch(url, { headers, timeout: 10000 });
        if (!res.ok) continue;

        const html = await res.text();
        const $ = cheerio.load(html);

        $("div.list").each((i, elem) => {
          const aTag = $(elem).find("a[href]");
          const smallTag = $(elem).find("small");

          if (aTag.length > 0 && smallTag.length > 0) {
            const fileName = aTag.text().trim();
            const fileUrl = aTag.attr("href");
            const fileInfoText = smallTag.text().trim();
            const match = fileInfoText.match(
              /([\d\.]+ MB), Download: (\d+) Uploaded: (\d{2} \w+ \d{4})/,
            );

            if (match) {
              const fileSize = match[1];
              const downloadCount = match[2];
              const uploadDate = match[3];

              caption += `• 📂 *${fileName}*\n`;
              caption += `📦 Size: ${fileSize}\n⬇️ Downloads: ${downloadCount}\n📅 Uploaded: ${uploadDate}\n🔗 ${fileUrl}\n\n`;
            }
          }
        });
      } catch (err) {
        console.error(`Error fetching page ${page}:`, err.message);
      }
    }

    if (!caption) caption = "Tidak ada data trend ditemukan.";
    await m.reply(caption);

    //} else if (command.match(/^(sfile|sfiledl)$/i)) {
  } else if (command === "sfile" || command === "sfiledl") {
    if (!input)
      throw `Example:\n${usedPrefix}${command} https://sfile.mobi/xxxxx\n\nTry: \n${usedPrefix}trendsfile\n${usedPrefix}sfilesearch`;

    try {
      const res = await fetch(input, { headers, timeout: 10000 });
      if (!res.ok) throw "Gagal mengambil halaman download.";

      const html = await res.text();
      const $ = cheerio.load(html);

      const downloadLink = $("a.w3-button.w3-blue.w3-round").attr("href");
      if (downloadLink) {
        await m.reply(`🔗 Link Download:\n${downloadLink}`);
      } else {
        throw "Download link tidak ditemukan.";
      }
    } catch (err) {
      throw err.message || "Error saat mengambil download link.";
    }

    // } else if (command.match(/^(sfilesearch|searchsfile)$/i)){
  } else if (command === "sfilesearch" || command === "searchsfile") {
    if (!input) throw `Example:\n${usedPrefix}${command} mobile legend`;

    let caption = "";
    //const baseUrl = `https://sfile.mobi/search.php?q=${encodeURIComponent(input)}`;

    try {
      //const baseUrl = `https://sfile.mobi/search.php?q=${encodeURIComponent(input)}`;
      for (let page = 1; page <= 10; page++) {
        const url = `https://sfile.mobi/search.php?q=${encodeURIComponent(input)}&page=${page}`;
        console.log(`Fetching URL: ${url}`);

        if (page > 1) caption += `\n\nPage ${page}:\n`;

        const res = await fetch(url, { headers, timeout: 10000 });
        if (!res.ok) break;

        const html = await res.text();
        const $ = cheerio.load(html);

        const results = $("div.list");

        if (results.length === 0) {
          if (page === 1) caption = "Tidak ada hasil ditemukan.";
          break;
        }

        results.each((i, elem) => {
          const aTag = $(elem).find("a[href]");
          const imgTag = $(elem).find("img[src]");

          if (aTag.length > 0) {
            const fileName = aTag.text().trim();
            const fileUrl = aTag.attr("href");
            const imgUrl = imgTag.length > 0 ? imgTag.attr("src") : null;

            const textContent = $(elem).text().trim();
            let fileSize = "Unknown";

            const sizeMatch = textContent.match(/\(([^)]+)\)/);
            if (sizeMatch) {
              fileSize = sizeMatch[1];
            }

            caption += `• 📂 *${fileName}*\n`;
            caption += `📦 Size: ${fileSize}\n`;
            caption += `🔗 ${fileUrl}\n`;
            if (imgUrl) caption += `🖼️ Thumbnail: ${imgUrl}\n`;
            caption += `\n`;
          }
        });
      }

      await m.reply(caption || "Tidak ada hasil ditemukan.");
    } catch (err) {
      throw err.message || "Error saat melakukan pencarian.";
    }
  }
};

handler.tags = ["tool", "internet"];
handler.help = [".sfiletrend", ".sfile", ".sfiledl", ".sfilesearch <query>"];
handler.command =
  /^(sfiletrend|trendfile|trendsfile|sfile|sfiledl|sfilesearch|searchsfile)$/i;

export default handler;
