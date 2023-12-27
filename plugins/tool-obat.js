/*
Yang ngilangin Credits, gw sumpahin bisulan 20 turunan
*/

import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const pengirim = m.sender.split(`@`)[0];
  if (["cariobat", "obat", "sakit", "penyakit"].includes(command)) {
    if (!args[0])
      return conn.reply(
        m.chat,
        `Masukkan nama obat yang ingin dicari!\nEx: ${
          usedPrefix + command
        } demam`,
        m,
      );

    try {
      const obatName = args.join(" ");
      const response = await fetch(
        `https://tr.deployers.repl.co/cariobat?obat=${encodeURIComponent(
          obatName,
        )}`,
      );

      if (response.ok) {
        await conn.reply(
          m.chat,
          "Tunggu sebentar, sedang mencari keterangan obat...",
          m,
        );
      } else {
        conn.reply(m.chat, response.status + response.statusText, m);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        const result = data
          .map(
            (item) =>
              `*Obat:* ${item.alt}\n*Harga:* ${item.harga}\n*Sumber:* ${item.sumber}\n*Gambar Obat:* ${item.fallback_url}`,
          )
          .join("\n\n");
        conn.reply(m.chat, result, m);
      } else {
        conn.reply(m.chat, "Tidak ada data obat yang ditemukan.", m);
      }
    } catch (error) {
      console.error("Error fetching obat data:", error);
      conn.reply(m.chat, "Maaf, terjadi kesalahan saat mencari data obat.", m);
    }
    await conn.reply(m.chat, "Created By Xnuvers007 server", m);
  } else if (
    [
      "keteranganobat",
      "penjelasanobat",
      "ktobat",
      "indikasiobat",
      "komposisiobat",
      "dosisobat",
    ].includes(command)
  ) {
    if (!args[0])
      return conn.reply(
        m.chat,
        `Masukkan link obat yang tadi sudah dicari di cari obat (letakkan link sumber)\n ex: ${
          usedPrefix + command
        } https://www.halodoc.com/obat-dan-vitamin/rebamipide-100-mg-10-tablet`,
        m,
      );
    const linkSumber = args[0];
    const response = await fetch(
      `https://tr.deployers.repl.co/keterangan?obat=${encodeURIComponent(
        linkSumber,
      )}`,
    );
    if (response.ok) {
      await conn.reply(
        m.chat,
        "Tunggu sebentar, sedang mencari keterangan obat...",
        m,
      );
    } else {
      conn.reply(m.chat, response.status + response.statusText, m);
    }
    const keteranganData = await response.json();

    if (keteranganData) {
      const keteranganResult = `*Aturan Pakai:* ${keteranganData["Aturan Pakai"]}\n*Deskripsi:* ${keteranganData.Deskripsi}\n*Dosis:* ${keteranganData.Dosis}\n*Efek Samping:* ${keteranganData["Efek Samping"]}\n*Golongan Produk:* ${keteranganData["Golongan Produk"]}\n*Indikasi Umum:* ${keteranganData["Indikasi Umum"]}\n*Kemasan:* ${keteranganData.Kemasan}\n*Komposisi:* ${keteranganData.Komposisi}\n*Kontra Indikasi:* ${keteranganData["Kontra Indikasi"]}\n*Manufaktur:* ${keteranganData.Manufaktur}\n*No. Registrasi:* ${keteranganData["No. Registrasi"]}\n*Perhatian:* ${keteranganData.Perhatian}`;
      conn.reply(m.chat, keteranganResult, m);
    } else {
      conn.reply(m.chat, "Tidak ada data keterangan obat yang ditemukan.", m);
    }
    await conn.reply(m.chat, "Created By Xnuvers007 server", m);
  }
};

handler.help = ["cariobat <Nama Obat>", "ktobat <SumberLinkDariCariObat>"];
handler.tags = ["tools", "tool"];
handler.command =
  /^(cariobat|obat|sakit|penyakit|keteranganobat|penjelasanobat|ktobat|indikasiobat|komposisiobat|dosisobat)$/i;

export default handler;
