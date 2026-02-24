var handler = async (m, { conn }) => conn.reply(m.chat, await bucin(), m)

handler.help = ['bucin']
handler.tags = ['quotes']
handler.command = /^(bucin)$/i

export default handler

import got from 'got';

let bucinjson = [];

async function bucin() {

  if (!bucinjson.length) {

    const response = await got('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json');

    bucinjson = JSON.parse(response.body);

  }

  const randomBucin = bucinjson[Math.floor(bucinjson.length * Math.random())];

  return typeof randomBucin === 'string' ? randomBucin : null;

}