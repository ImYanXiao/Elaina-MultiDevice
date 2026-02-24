let handler = async (m, { conn, usedPrefix }) => conn.reply(m.chat, await dare(), m)

handler.help = ['dare']
handler.tags = ['quotes', 'fun']
handler.command = /^(dare)$/i

export default handler

import got from 'got';

let darejson = [];

async function dare() {

  if (!darejson.length) {

    const response = await got('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json');

    darejson = JSON.parse(response.body);

  }

  const randomDare = darejson[Math.round(darejson.length * Math.random())];

  return typeof randomDare === 'string' ? randomDare : null;

}


