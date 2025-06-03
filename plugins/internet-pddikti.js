import fetch from 'node-fetch';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `*Masukkan Nama/NIM Mahasiswa, Nama Dosen, atau Nama PT!*\nExample: ${usedPrefix}${command} Xnuvers007\n\n*Perintah yang tersedia:*\n- ${usedPrefix}mhs <nama>\n- ${usedPrefix}mhs <nim>\n- ${usedPrefix}dosen <nama>\n- ${usedPrefix}pt <nama pt>\n\n*Contoh Penggunaan:*\n- ${usedPrefix}mhs Xnuvers007\n- ${usedPrefix}dosen Xnuvers007\n- ${usedPrefix}pt Universitas Indonesia`;
  conn.reply(m.chat, 'Sedang mencari data, harap tunggu...', m);

  try {
    let searchRes, searchData;
    let messages = [];
    let tempMessage = '';
    let count = 1;

    if (/^(mahasiswa|mhs|mhssiswa|msiswa|mhsiswa|pddikti|dikti)$/i.test(command)) {
      searchRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pencarian/mhs/${encodeURIComponent(text)}`);
      if (!searchRes.ok) throw '*Tidak ditemukan atau API error!*';
      searchData = await searchRes.json();
      if (searchData.length === 0) throw '*Data tidak ditemukan!*';
      if (searchData.ok) conn.reply(m.chat, '*Data ditemukan!*', m);

      for (let data of searchData) {
        await delay(2000);

        let detailRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/detail/mhs/${data.id}`);
        if (!detailRes.ok) continue;
        let detailData = await detailRes.json();

        tempMessage += `\n*#${count}*\n`;
        tempMessage += `• Nama: ${detailData.nama || 'Not Available'}\n`;
        tempMessage += `• NIM: ${detailData.nim || 'Not Available'}\n`;
        tempMessage += `• Perguruan Tinggi: ${detailData.nama_pt || 'Not Available'} (${detailData.kode_pt || '-'})\n`;
        tempMessage += `• Kode Perguruan Tinggi: ${detailData.kode_pt || 'Not Available'}\n`;
        tempMessage += `• Program Studi: ${detailData.prodi || 'Not Available'} (${detailData.kode_prodi || '-'})\n`;
        tempMessage += `• Kode Program Studi: ${detailData.kode_prodi || 'Not Available'}\n`;
        tempMessage += `• Jenis Daftar: ${detailData.jenis_daftar || 'Not Available'}\n`;
        tempMessage += `• Jenjang: ${detailData.jenjang || 'Not Available'}\n`;
        tempMessage += `• Status: ${detailData.status_saat_ini || 'Not Available'}\n`;
        tempMessage += `• Jenis Kelamin: ${detailData.jenis_kelamin || 'Not Available'}\n`;
        tempMessage += `• Tanggal Masuk: ${detailData.tanggal_masuk || 'Not Available'}\n`;
        tempMessage += `\n─────────────────────────────\n`;

        if (count % 10 === 0) {
          messages.push(tempMessage.trim());
          tempMessage = '';
        }
        count++;
      }

    } else if (/^(dosen|dsn)$/i.test(command)) {
      searchRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pencarian/dosen/${encodeURIComponent(text)}`);
      if (!searchRes.ok) throw '*Tidak ditemukan atau API error!*';
      searchData = await searchRes.json();
      if (searchData.length === 0) throw '*Data tidak ditemukan!*';
      if (searchData.ok) conn.reply(m.chat, '*Data ditemukan!*', m);

      for (let data of searchData) {
        await delay(2000);

        let detailRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/dosen/profile/${data.id}`);
        let detailHistory = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/dosen/study-history/${data.id}`);
        let penelitianRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/dosen/portofolio/penelitian/${data.id}`);
        if (!detailRes.ok || !detailHistory.ok || !penelitianRes.ok) continue;
        let historyData = await detailHistory.json();
        let detailData = await detailRes.json();
        let penelitianData = await penelitianRes.json();

        tempMessage += `\n*#${count}*\n`;
        tempMessage += `• Nama: ${detailData.nama_dosen || 'Not Available'}\n`;
        tempMessage += `• Perguruan Tinggi: ${detailData.nama_pt || 'Not Available'}\n`;
        tempMessage += `• Program Studi: ${detailData.nama_prodi || 'Not Available'}\n`;
        tempMessage += `• Jabatan Akademik: ${detailData.jabatan_akademik || 'Not Available'}\n`;
        tempMessage += `• Pendidikan Tertinggi: ${detailData.pendidikan_tertinggi || 'Not Available'}\n`;
        tempMessage += `• Status Ikatan Kerja: ${detailData.status_ikatan_kerja || 'Not Available'}\n`;
        tempMessage += `• Status Aktivitas: ${detailData.status_aktivitas || 'Not Available'}\n`;
        tempMessage += `• Jenis Kelamin: ${detailData.jenis_kelamin || 'Not Available'}\n`;
        tempMessage += `\n─────────────────────────────\n`;
        tempMessage += `*Riwayat Pendidikan Dosen:*\n`;
        if (historyData && Array.isArray(historyData)) {
          for (let history of historyData) {
            tempMessage += `• NIDN: ${history.nidn || 'Not Available'}\n`;
            tempMessage += `• Perguruan Tinggi: ${history.nama_pt || 'Not Available'}\n`;
            tempMessage += `• Program Studi: ${history.nama_prodi || 'Not Available'}\n`;
            tempMessage += `• Jenjang: ${history.jenjang || 'Not Available'}\n`;
            tempMessage += `• Gelar Akademik: ${history.gelar_akademik || 'Not Available'}\n - ${history.singkatan_gelar || 'Not Available'}\n`;
            tempMessage += `• Tahun Masuk: ${history.tahun_masuk || 'Not Available'}\n`;
            tempMessage += `• Tahun Lulus: ${history.tahun_lulus || 'Not Available'}\n`;
            tempMessage += `\n─────────────────────────────\n`;
          }
        } else {
          tempMessage += '*Riwayat pendidikan tidak ditemukan.*\n';
        }

        tempMessage += `*Portofolio Penelitian Dosen:*\n`;
        if (penelitianData && Array.isArray(penelitianData)) {
          for (let penelitian of penelitianData) {
            tempMessage += `• Judul: ${penelitian.judul_kegiatan || 'Not Available'}\n`;
            tempMessage += `• Jenis: ${penelitian.jenis_kegiatan || 'Not Available'}\n`;
            tempMessage += `• Tahun: ${penelitian.tahun_kegiatan || 'Not Available'}\n`;
            tempMessage += `\n─────────────────────────────\n`;
          }
        } else {
          tempMessage += '*Portofolio penelitian tidak ditemukan.*\n';
        }

        if (count % 10 === 0) {
          messages.push(tempMessage.trim());
          tempMessage = '';
        }
        count++;
      }

    } else if (/^(pt|perguruantinggi|kampus)$/i.test(command)) {
      searchRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pencarian/pt/${encodeURIComponent(text)}`);
      if (!searchRes.ok) throw '*Tidak ditemukan atau API error!*';
      searchData = await searchRes.json();
      if (searchData.length === 0) throw '*Data tidak ditemukan!*';
      if (searchData.ok) conn.reply(m.chat, '*Data ditemukan!*', m);

      for (let data of searchData) {
        await delay(2000);

        let detailRes = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pt/detail/${data.id}`);
        let detailBiaya = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pt/cost-range/${data.id}`);
        let detailRataRataLulusMaba = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pt/mahasiswa/${data.id}`);
        let detailWaktuStudi = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/pt/waktu-studi/${data.id}`);

        if (!detailRes.ok || !detailBiaya.ok || !detailRataRataLulusMaba.ok || !detailWaktuStudi.ok) continue;
        let detailWaktuStudiData = await detailWaktuStudi.json();
        let detailData = await detailRes.json();
        let rataRataLulusMabaData = await detailRataRataLulusMaba.json();
        let biayaData = await detailBiaya.json();

        tempMessage += `\n*#${count}*\n`;
        tempMessage += `• Nama PT (Perguruan Tinggi): ${detailData.nama_pt || 'Not Available'} (${detailData.nm_singkat || '-'})\n`;
        tempMessage += `• Biaya Kuliah: ${biayaData.range_biaya_kuliah || 'Not Available'} - ${biayaData.biaya_max || 'Not Available'}\n`;
        tempMessage += `• Rata-Rata Lulus: ${rataRataLulusMabaData.mean_jumlah_lulus || 'Not Available'}\n`;
        tempMessage += `• Rata-Rata Maba: ${rataRataLulusMabaData.mean_jumlah_baru || 'Not Available'}\n`;
        tempMessage += `• Kode PT: ${detailData.kode_pt || 'Not Available'}\n`;
        tempMessage += `• Kode Pos: ${detailData.kode_pos || 'Not Available'}\n`;
        tempMessage += `• Kecamatan PT: ${detailData.kecamatan_pt || 'Not Available'}\n`;
        tempMessage += `• Status: ${detailData.status_pt || 'Not Available'}\n`;
        tempMessage += `• Status Akreditasi: ${detailData.status_akreditasi || 'Not Available'}\n`;
        tempMessage += `• Akreditasi: ${detailData.akreditasi_pt || 'Not Available'}\n`;
        tempMessage += `• Kelompok: ${detailData.kelompok || 'Not Available'}\n`;
        tempMessage += `• Pembina: ${detailData.pembina || 'Not Available'}\n`;
        tempMessage += `• Email: ${detailData.email || 'Not Available'}\n`;
        tempMessage += `• Telepon: ${detailData.no_tel || 'Not Available'}\n`;
        tempMessage += `• Fax: ${detailData.no_fax || 'Not Available'}\n`;
        tempMessage += `• Website: ${detailData.website || 'Not Available'}\n`;
        tempMessage += `• Alamat: ${detailData.alamat || 'Not Available'}\n`;
        tempMessage += `• Kota/Kab: ${detailData.kab_kota_pt || 'Not Available'}\n`;
        tempMessage += `• Provinsi: ${detailData.provinsi_pt || 'Not Available'}\n`;
        tempMessage += `• Tanggal Berdiri: ${detailData.tgl_berdiri_pt || 'Not Available'}\n`;
        tempMessage += `• Tanggal SK Pendirian: ${detailData.tgl_sk_pendirian_sp || 'Not Available'}\n`;
        tempMessage += `• SK Pendirian: ${detailData.sk_pendirian_sp || 'Not Available'}\n`;
        tempMessage += `• Lintang: ${detailData.lintang_pt || 'Not Available'}\n`;
        tempMessage += `• Bujur: ${detailData.bujur_pt || 'Not Available'}\n`;
        tempMessage += `• Google Maps: https://www.google.com/maps/place/${detailData.lintang_pt},${detailData.bujur_pt}\n`;
        tempMessage += `\n─────────────────────────────\n`;
        tempMessage += `*Waktu Studi:*\n`;
        if (detailWaktuStudiData && Array.isArray(detailWaktuStudiData)) {
          for (let waktu of detailWaktuStudiData) {
            tempMessage += `• Jenjang: ${waktu.jenjang || 'Not Available'}\n`;
            tempMessage += `• Rata-Rata Waktu Studi: ${waktu.mean_masa_studi || 'Not Available'} Tahun\n`;
            tempMessage += `\n─────────────────────────────\n`;
          }
        } else {
          tempMessage += '*Waktu studi tidak ditemukan.*\n';
        }

        if (count % 10 === 0) {
          messages.push(tempMessage.trim());
          tempMessage = '';
        }
        count++;
      }

    } else {
      throw '*Perintah tidak dikenali!*';
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

handler.help = ['mhs <nama>', 'mhs <nim>', 'dosen <nama>', 'pt <nama pt>'];
handler.tags = ['internet', 'pendidikan'];
handler.command = /^(mahasiswa|mhs|mhssiswa|msiswa|mhsiswa|pddikti|dikti|dosen|dsn|pt|perguruantinggi|kampus)$/i;

export default handler;
