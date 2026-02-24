let handler = async (m, { conn, usedPrefix }) => conn.reply(m.chat, await truth(), m)

handler.help = ['truth']
handler.tags = ['quotes', 'fun']
handler.command = /^(truth)$/i

export default handler

import got from 'got';

let truthjson = [];

async function truth() {

  if (!truthjson.length) {

    const response = await got('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json');

    truthjson = JSON.parse(response.body);

  }

  return typeof truthjson[Math.floor(truthjson.length * Math.random())] === 'string'

    ? truthjson[Math.floor(truthjson.length * Math.random())]

    : null;

}