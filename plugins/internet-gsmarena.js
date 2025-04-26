import fetch from "node-fetch";
import * as cheerio from "cheerio";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/118 Safari/537.36",
  "python-requests/2.27.1",
  "Mozilla/5.0 (Linux; Android 12; Infinix X669) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/532.2 (KHTML, like Gecko) Chrome/4.0.222.8 Safari/532.2",
  "Mozilla/5.0 (Linux; Android 13; M2101K6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Mobile Safari/537.36 OPR/73.2.3844.71002",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11",
  "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
  "Mozilla/5.0 (Linux; Android 10; KOB2-L09; HMSCore 6.15.0.301) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/15.0.4.312 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.3",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
];

const headers = {
  "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const baseUrl = "https://www.gsmarena.com/";
  const input = text.trim();

  if (command === "gsmarenabrands") {
    try {
      /*
      const res = await fetch(`${baseUrl}makers.php3`, { headers });
      const html = await res.text();
*/
      const html = await fetchWithCache(`${baseUrl}makers.php3`);

      if (
        res.status === 429 ||
        html.includes("captcha") ||
        html.includes("error")
      ) {
        throw "Kamu terlalu sering request. Coba lagi nanti ya!";
      }

      const $ = cheerio.load(html);
      let caption = "";

      $(".st-text td a").each((i, el) => {
        const href = $(el).attr("href");
        const fullUrl = baseUrl + href;
        let name = $(el)
          .text()
          .trim()
          .replace(/\s*\d+\s*devices/, "")
          .trim();
        caption += `📱 *${name}*\n🔗 ${fullUrl}\n\n`;
      });

      await m.reply(caption || "Tidak ada data merek ditemukan.");
    } catch (e) {
      console.error(e);
      throw "Gagal mengambil data merek dari GSMArena.";
    }
  } else if (command === "gsmarenadevices") {
    if (!input || !input.startsWith(baseUrl)) {
      throw `Masukkan URL yang valid dari GSMArena.\nContoh:\n${usedPrefix}${command} https://www.gsmarena.com/samsung-phones-9.php`;
    }

    try {
      let url = input;
      let caption = "";

      for (let i = 0; i < 5; i++) {
        /*
        const res = await fetch(url, { headers });
        const html = await res.text();
        */

        const html = await fetchWithCache(url);

        if (
          res.status === 429 ||
          html.includes("captcha") ||
          html.includes("error")
        ) {
          throw "Kamu terlalu sering request. Coba lagi nanti ya!";
        }

        const $ = cheerio.load(html);
        $(".makers li a").each((i, el) => {
          const href = $(el).attr("href");
          const fullUrl = baseUrl + href;
          const model = $(el).find("span").text().trim();
          caption += `📲 *${model}*\n🔗 ${fullUrl}\n\n`;
        });

        const next = $('.nav-pages a.prevnextbutton[title="Next page"]').attr(
          "href"
        );
        if (next) {
          url = baseUrl + next;
          await delay(2500);
        } else break;
      }

      await m.reply(caption || "Tidak ada perangkat ditemukan.");
    } catch (e) {
      console.error(e);
      throw "Gagal mengambil data perangkat.";
    }
  } else if (command === "gsmarenaspecs") {
    if (!input || !input.startsWith(baseUrl)) {
      throw `Masukkan link spesifikasi dari GSMArena.\nContoh:\n${usedPrefix}${command} https://www.gsmarena.com/samsung_galaxy_s23_ultra-12024.php`;
    }

    try {
      /*
      const res = await fetch(input, { headers });
      const html = await res.text();
*/
      const html = await fetchWithCache(input);

      if (
        res.status === 429 ||
        html.includes("captcha") ||
        html.includes("error")
      ) {
        throw "Kamu terlalu sering request. Coba lagi nanti ya!";
      }

      const $ = cheerio.load(html);
      let caption = "";

      const userThreads = $("div.user-thread").slice(0, 3);
      if (userThreads.length > 0) {
        caption += "🗣️ *Komentar Pengguna (3 Terbaru)*\n";
        userThreads.each((i, el) => {
          const name =
            $(el).find("li.uname, li.uname2").text().trim() || "Anonymous";
          const time = $(el).find("time").text().trim();
          const comment = $(el).find("p.uopin").text().trim();
          caption += `👤 ${name} (${time}):\n💬 ${comment}\n\n`;
        });
      }

      $("#specs-list table").each((i, table) => {
        const category = $(table).find("th").first().text().trim();
        caption += `📂 *${category}*\n`;

        $(table)
          .find("tr")
          .each((j, row) => {
            const ttl = $(row).find("td.ttl").text().trim();
            const nfo = $(row).find("td.nfo").text().trim();
            if (ttl && nfo) {
              caption += `• ${ttl}: ${nfo}\n`;
            }
          });

        caption += `\n`;
      });

      await m.reply(caption || "Spesifikasi tidak ditemukan.");
    } catch (e) {
      console.error(e);
      throw "Gagal mengambil data spesifikasi.";
    }
  }
};

const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
  const text = await res.text();
  cache.set(url, text);
  return text;
}

handler.tags = ["internet", "tool"];
handler.help = [
  "gsmarenabrands",
  "gsmarenadevices <url>",
  "gsmarenaspecs <url>",
];
handler.command = /^(gsmarenabrands|gsmarenadevices|gsmarenaspecs)$/i;

export default handler;
