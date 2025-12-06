import fetch from 'node-fetch';

var handler = async (m, { conn }) => {
  conn.reply(m.chat, 'Sedang mencari Joke... Silahkan tunggu', m);
  let res = await fetch('https://official-joke-api.appspot.com/random_joke');
  if (!res.ok) throw 'Tidak Ditemukan';
  let json = await res.json();
  let setup = json.setup;
  let punchline = json.punchline;
  conn.reply(m.chat, `Pertanyaan: ${setup}\n\nJawaban: ${punchline}`, m);
}

handler.help = ['joke'];
handler.tags = ['internet', 'fun'];
handler.command = /^(joke|lelucon)$/i;

export default handler;
