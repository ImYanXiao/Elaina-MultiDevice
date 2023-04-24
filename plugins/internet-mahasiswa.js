import fetch from 'node-fetch';

var handler = async (m, { conn, text }) => {
  if (!text) throw `*_Masukan Nama Mahasiswa/Siswa Yang Ingin Kamu Cari !_*`;
  conn.reply(m.chat, 'Sedang mencari Orangnya... Silahkan tunggu', m);
  let res = await fetch('https://api-frontend.kemdikbud.go.id/hit_mhs/' + text);
  if (!res.ok) throw 'Tidak Ditemukan';
  let json = await res.json();
  let message = '';
  let Xnuvers007 = 'Scrape By Xnuvers007';

  json.mahasiswa.forEach(data => {
    let nama = data.text;
    let websiteLink = data['website-link'];
    let website = `https://pddikti.kemdikbud.go.id${websiteLink}`;
    message += `\nNama = ${nama}\n\nData Ditemukan pada website = ${website}\n\n\n`;
  });
  const mySecret = process.env['nomer']
  conn.reply(m.chat, message, m);
  conn.reply(m.chat, `JANGAN LUPA SUPPORT DEVELOPERNYA\nXnuvers007\nhttps://saweria.co/xnuvers007\n\nfollow Me On github\nhttps://github.com/Xnuvers007\nDana = ${mySecret}`, m);
}

handler.help = ['mahasiswa <nama>', 'mhs <nama>', 'mhssiswa <nama>', 'msiswa <nama>', 'mhsiswa <nama>'];
handler.tags = ['internet', 'mahasiswa', 'pendidikan'];
handler.command = /^(mahasiswa|mhs|mhssiswa|msiswa|mhsiswa)$/i;

export default handler;
