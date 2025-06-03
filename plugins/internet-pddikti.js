import fetch from 'node-fetch';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var handler = async (m, { conn, text }) => {
  if (!text) throw '*Masukkan Nama atau NIM Mahasiswa yang ingin dicari!*';

  conn.reply(m.chat, 'Sedang mencari data, harap tunggu...', m);

  try {
    let searchRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pencarian/mhs/${encodeURIComponent(text)}`);
    if (!searchRes.ok) throw '*Tidak ditemukan atau API error!*';
    let searchData = await searchRes.json();

    if (searchData.length === 0) throw '*Data tidak ditemukan!*';

    let messages = [];
    let tempMessage = '';
    let count = 1;

    for (let data of searchData) {
      await delay(2000);

      let detailRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/detail/mhs/${data.id}`);
      if (!detailRes.ok) continue;
      let detailData = await detailRes.json();

      tempMessage += `\n*#${count}*\n`;
      tempMessage += `• Nama: ${detailData.nama}\n`;
      tempMessage += `• NIM: ${detailData.nim}\n`;
      tempMessage += `• Perguruan Tinggi: ${detailData.nama_pt} (${detailData.kode_pt})\n`;
      tempMessage += `• Program Studi: ${detailData.prodi} (${detailData.kode_prodi})\n`;
      tempMessage += `• Jenjang: ${detailData.jenjang}\n`;
      tempMessage += `• Status: ${detailData.status_saat_ini}\n`;
      tempMessage += `• Jenis Kelamin: ${detailData.jenis_kelamin}\n`;
      tempMessage += `• Tanggal Masuk: ${detailData.tanggal_masuk}\n`;
      tempMessage += `\n─────────────────────────────\n`;

      if (count % 10 === 0) {
        messages.push(tempMessage.trim());
        tempMessage = '';
      }

      count++;
    }

    if (tempMessage.trim() !== '') {
      messages.push(tempMessage.trim());
    }

    for (let msg of messages) {
      await conn.reply(m.chat, msg, m);
      await delay(1500);
    }

    const mySecret = global.nomorbot;
    conn.reply(m.chat, `JANGAN LUPA SUPPORT DEVELOPERNYA\nXnuvers007\nhttps://saweria.co/xnuvers007\n\nFollow Me On GitHub\nhttps://github.com/Xnuvers007\nDana = ${mySecret}`, m);

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '*Terjadi kesalahan saat mengambil data!*', m);
  }
};

handler.help = ['mhs <nama>', 'mhs <nim>'];
handler.tags = ['internet', 'mahasiswa', 'pendidikan'];
handler.command = /^(mahasiswa|mhs|mhssiswa|msiswa|mhsiswa|pddikti|dikti)$/i;

export default handler;
