import fetch from 'node-fetch';

async function handler(m, { conn, command }) {
  m.reply('*[ ? ] Please Wait . . .*');
  try {
    let a = await fetch(`https://raw.githubusercontent.com/AditPetani/khusus/main/onlyfans/${command}.json`);
    let b = await a.json();
    let c = pickRandom(b);
    if (c) {
      conn.sendFile(m.chat, c, '', '?尹', m);
    } else {
      m.reply('No data found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    m.reply('An error occurred while fetching data.');
  }
}

handler.command = handler.help = ['nanaqi', 'hestia', 'mihye', 'noname', 'merial', 'okita', 'onlyfans', 'quan', 'yoshinobi'];
handler.tags = ['premium'];
handler.premium = true;

export default handler;

function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}