/*
awokoawkok mau naro aja, soalnya gw maen toram :V
untuk api deployers yang mati, nanti bakal di taro di https://bioskop-six.vercel.app , kalau bisa ya :)
*/

import axios from "axios";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (args.length < 1) {
      throw `Usage: ${usedPrefix + command} level|range|exp`;
    }

    const [level, range, exp] = args[0].split("|");

    await conn.reply(
      m.chat,
      "Tunggu sebentar kak, sedang mengambil data...",
      m
    );

    const response = await axios.get(
      `https://bioskop-six.vercel.app/toramlvl?lvl=${level}&range=${range}&exp=${exp}`
    );

    const data = response.data;

    let message = `Scrape: ${data.url + "\nServer : " + data.server}\n\nExp Required: ${data.Exp_Required}\n\nMonsters:\n`;
    data.Monsters.forEach((monster) => {
      message += `- Monster: ${monster.Monster}\n  Level: ${monster.Level}\n  Location: ${monster.Location}\n  EXP: ${monster.EXP}\n\n`;
    });
    //message += `Another Params: ${data.another_params}`;
    //message += `Scrape: ${data.url + "\nServer : " + data.server}`;

    // Mengirim pesan dengan data yang diperoleh
    await conn.reply(m.chat, message, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan: " + error, m);
  }
};

handler.help = ["toramexp"];
handler.tags = ["game"];
handler.command = /^(toram(exp|onlineexp|farm)?|toe)$/i;

export default handler;
