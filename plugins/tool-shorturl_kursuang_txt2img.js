import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

const apiKeys = ['C9eLLoQZvX', 'euhsDaUPzl'];

const stickersearch = (text) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://getstickerpack.com/stickers?query=${text}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const source = [];
        const link = [];

        var ya = $('#stickerPacks > div > div:nth-child(3) > div > a').text();
        if (!ya) return resolve();

        $('#stickerPacks > div > div:nth-child(3) > div > a').each(function (a, b) {
          source.push($(b).attr('href'));
        });

        axios.get(source[Math.floor(Math.random() * source.length)])
          .then(({ data }) => {
            const $$ = cheerio.load(data);
            $$('img').each(function (c, d) {
              link.push($$(d).attr('src').replace(/&d=200x200/g, ''));
            });

            const result = {
              title: $$('#intro > div > div > h1').text(),
              sticker_url: link,
            };

            resolve(result);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

let handler = async (m, { args, usedPrefix, text, command, conn }) => {
  const filteredWords = ['seksi', 's3x', 'konten dewasa', 'hentai', 'mesum', 'ahegao', 'fuck', 'sex', 'porn', 'porno', 'ngewe', 'pussy', 'memek', 'meki', 'mmk', 'kontol', 'butt', 'buttocks', 'bra', 'stepmom', 'stepfather', 'BAB1', 'PEL1', 'AASU', 'PEJU', 'P3JU', 'A5UU', 'AA5U', 'MBUT', 'AWUK', 'FUCK', 'JEMB', 'KNTL', 'CRUT', 'NTUT', 'MAT1', 'PCUN', 'G1LA', 'BUTA', 'JLEK', 'CEWE', 'EEWE', 'ANUS', 'SH1T', 'B1CH', 'KL1T', 'CL1T', 'CNTZ', 'CUMS', 'CUNT', 'D1CK', 'DYKE', 'FAGS', 'FAGZ', 'FART', 'F4RT', 'FUKR', 'FUKK', 'GAYS', 'GAYZ', 'HELL', 'JIZZ', 'JISS', 'KNOB', 'KUNT', 'N1GR', 'PUS1', 'SHYT', 'SLUT', 'T1TS', 'VAGS', 'CAWK', 'FCUK', 'LEEC', 'PUSS', 'BUBS', 'TITT', 'WANK', 'DAMN', 'D4MN', 'BUTT', 'NAZ1', 'P1SS', 'PUPS', 'TWAT', 'KENT', 'NTHU', 'NT1L', 'GAWK', 'GAUK', 'GAWU', 'NCUK', 'WDUS', 'TAEK', 'MEK1', 'KERE', 'UP1L', 'ELEK', 'UTEK', 'BJAT', 'ALAY', 'NDAS', 'STFU', 'TEMP', 'KETE', 'ASEM', 'kontl', 'ppk', 'pepek', 'tai', 'ngentod', 'ngentot', 'fucker', 'ngntd', 'ngntot', 'kntol', 'goblok', 'gblk', 'goblog', 'stupid', 'kenthu', 'kentu', 'tits', 'boobs', 'blowjob', 'naked', 'naughty', 'kampret', 'bangsat', 'bangsad', 'bngst', 'asu', 'bujang', 'kimak', 'kimbek', 'lacur', 'pelacur', 'lonte', 'lont', 'bitch', 'fuckyou', 'fucked', 'bokep', 'penis', 'vagina', 'undress', 'undressed', 'pantat', 'pantad'];

  if (command === 'convertuang' || command === 'kurs' || command === 'kursuang' || command === 'matauang' || command === 'konversiuang') {
    if (args.length < 1) {
      throw `Usage: ${usedPrefix}${command} <amount>|<fromCurrency>|<toCurrency>\n\nEx: *${usedPrefix}${command} 13|USD|IDR*\n\nList Currency for example =\n
USD: Dolar Amerika Serikat (Amerika Serikat)
EUR: Euro (Eurozone - sejumlah negara Eropa)
GBP: Pound Sterling (Inggris)
JPY: Yen Jepang (Jepang)
CAD: Dolar Kanada (Kanada)
AUD: Dolar Australia (Australia)
CHF: Franc Swiss (Swiss)
MYR: Ringgit Malaysia (Malaysia)
CNY: Yuan Tiongkok (Tiongkok)
IDR: Rupiah Indonesia (Indonesia)

dan lain lain (etc.), for more ? check google or https://www.bola.com/ragam/read/5334821/daftar-nama-mata-uang-berbagai-negara-di-dunia-beserta-kodenya
`;
    }

    try {
      const [amount, fromCurrency, toCurrency] = args[0].split('|');

      if (!amount || !fromCurrency || !toCurrency) {
        throw 'Invalid input format. Please use: <amount>|<fromCurrency>|<toCurrency>';
      }

      const apiUrl = `https://tr.deployers.repl.co/convertuang?uang=${amount}&dari=${fromCurrency}&ke=${toCurrency}`;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        const author = data.Author;
        const from = data.Dari;
        const to = data.Ke;
        const result = data.Hasil;
        const formattedData = `Author: ${author}\n\nDari: ${from}  Ke: ${to}\nHasil: ${result}`;
        m.reply(formattedData);
      } else {
        m.reply('Failed to retrieve currency conversion data. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      throw 'An error occurred. Please try again later.\n\nInvalid input format. Please use: <amount>|<fromCurrency>|<toCurrency>';
    }
  } else if (command.match(/^(short|singkatin|singkat|bitly|tinyurl|vgd|ouo|isgd|shortlink|linkshort)$/i)) {
    if (!args[0]) throw `${usedPrefix}${command} https://mykingbee.blogspot.com/`;

    try {
      const response = await fetch(`https://tr.deployers.repl.co/short?url=${args[0]}`);

      if (response.ok) {
        const data = await response.json();
        const author = data.author;
        const bitly = data.bitly;
        const isgd = data.isgd;
        const ouo = data.ouo;
        const tinyurl = data.tinyurl;
        const vgd = data.vgd;
        const formattedData = `Author: ${author}\n\nLink Asli ${args[0]}\n=====SHORT LINK=====\nBitly: ${bitly}\nIsgd: ${isgd}\nOuo: ${ouo}\nTinyURL: ${tinyurl}\nVgd: ${vgd}`;
        m.reply(formattedData);
      } else {
        m.reply('Failed to retrieve data. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      throw 'An error occurred. Please try again later.';
    }
  } else if (command === "text2img" || command === "txt2img" || command === "t2i" || command === "tekskegambar") {
    if (args.length < 1) {
      throw `Masukkan teks yang ingin Anda ubah menjadi gambar.\nEx: ${usedPrefix}${command} police girl\n\n*DILARANG BERBAU PORNO/SARA*`;
    }

    const apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];
    const lowercaseText = args.join(' ').toLowerCase();

    if (filteredWords.some(word => lowercaseText.includes(word.toLowerCase()))) {
      conn.reply(m.chat, "tidak diizinkan. Akan dibanned", m);
      let users = db.data.users;
      users[m.sender].banned = true;
      return; // Keluar dari fungsi setelah melakukan banned
    }

    const apiUrl = `https://api.ibeng.tech/api/ai/text2img?text=${encodeURIComponent(lowercaseText)}&apikey=${encodeURIComponent(apiKey)}`;

    let imageBuffer;

    do {
      try {
        conn.reply(m.chat, 'Sedang membuat gambar...', m);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw 'Gagal mengambil gambar dari server.';
        }

        imageBuffer = await response.buffer();

      } catch (error) {
        console.error(error);
      }
    } while (!imageBuffer);

    conn.sendFile(m.chat, imageBuffer, 'image.png', 'Berikut adalah gambar yang sesuai dengan teks yang Anda masukkan.');
  } else if (command === "caristicker" || command === "caristiker" || command === "getsticker" || command === "getstiker") {
    if (!text) {
      throw 'Silakan masukkan query pencarian sticker.';
    }

    try {
      const result = await stickersearch(text);
      if (!result) {
        return m.reply('Tidak ditemukan sticker dengan query tersebut.');
      }

      m.reply(`*Title:* ${result.title}`);
      for (let stickerUrl of result.sticker_url) {
        conn.sendFile(m.chat, stickerUrl, 'sticker.jpg', '');
      }
    } catch (error) {
      console.error(error);
      m.reply('Terjadi kesalahan dalam pencarian sticker.');
    }
  }
};

handler.help = [
  'text2img <teks>',
  'convertuang <amount>|<fromCurrency>|<toCurrency>',
  'short <url>',
  'caristiker <Query>'
];
handler.tags = ['tools', 'currency', 'internet', 'sticker'];
handler.command = /^(convertuang|kurs|kursuang|matauang|konversiuang|short|singkatin|singkat|bitly|tinyurl|vgd|ouo|isgd|shortlink|linkshort|text2img|txt2img|t2i|tekskegambar|caristicker|caristiker|getstiker|getsticker)$/i;

export default handler;
