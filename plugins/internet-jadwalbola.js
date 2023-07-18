import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
  let res = await fetch('https://tr.deployers.repl.co/jadwal-pertandingan');
  if (res.status !== 200) throw await res.text();
  let json = await res.json();
  
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('No data found');
  }
  
  let ligaIndonesiaMatches = json[0].matches;
  let ligaInggrisMatches = json[1].matches;
  
  let outputLigaIndonesia = `*JADWAL PERTANDINGAN LIGA INDONESIA*\n\n`;
  
  for (let i = 0; i < ligaIndonesiaMatches.length; i++) {
    let match = ligaIndonesiaMatches[i];
    let titleDate = match.title_date;
    let matchInfo = match.matches.map((m) => `${m.home} vs ${m.away}, Jam = ${m.jam_info}`).join('\n');
    
    outputLigaIndonesia += `_${titleDate}_\n${matchInfo}\n\n`;
  }
  
  let outputLigaInggris = `*JADWAL PERTANDINGAN LIGA INGGRIS*\n\n`;
  
  for (let i = 0; i < ligaInggrisMatches.length; i++) {
    let match = ligaInggrisMatches[i];
    let titleDate = match.title_date;
    let matchInfo = match.matches.map((m) => `${m.home} vs ${m.away}, Jam = ${m.jam_info}`).join('\n');
    
    outputLigaInggris += `_${titleDate}_\n${matchInfo}\n\n`;
  }
  
  let output = outputLigaIndonesia + outputLigaInggris;
  m.reply(output);
};

handler.help = ['jadwalbola'];
handler.tags = ['internet'];
handler.command = /^(jadwalbola|bola)$/i;

export default handler;
