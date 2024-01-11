/*
Yang ngilangin Credits, gw sumpahin bisulan 20 turunan

ubah tr.deployers.repl.co menjadi https://0e87ad76-6c4e-40ff-bb5a-6bbdab145ae2-00-39qk1kw7vab6l.worf.replit.dev
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
        `https://0e87ad76-6c4e-40ff-bb5a-6bbdab145ae2-00-39qk1kw7vab6l.worf.replit.dev/cariobat?obat=${encodeURIComponent(
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
              `*Obat:* ${item.alt}\n\n*Harga:* ${item.harga}\n\n*Sumber:* ${item.sumber}\n\n*Gambar Obat:* ${item.fallback_url}\n\n\n_*NOTE: Created By Xnuvers007 server*_`,
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
      "ketobat"
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
      `https://0e87ad76-6c4e-40ff-bb5a-6bbdab145ae2-00-39qk1kw7vab6l.worf.replit.dev/keterangan?obat=${encodeURIComponent(
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
      const keteranganResult = `*Aturan Pakai:* ${keteranganData["Aturan Pakai"]}\n\n*Deskripsi:* ${keteranganData.Deskripsi}\n\n*Dosis:* ${keteranganData.Dosis}\n\n*Efek Samping:* ${keteranganData["Efek Samping"]}\n\n*Golongan Produk:* ${keteranganData["Golongan Produk"]}\n\n*Indikasi Umum:* ${keteranganData["Indikasi Umum"]}\n\n*Kemasan:* ${keteranganData.Kemasan}\n\n*Komposisi:* ${keteranganData.Komposisi}\n\n*Kontra Indikasi:* ${keteranganData["Kontra Indikasi"]}\n\n*Manufaktur:* ${keteranganData.Manufaktur}\n\n*No. Registrasi:* ${keteranganData["No. Registrasi"]}\n\n*Perhatian:* ${keteranganData.Perhatian}\n\n\n_*NOTE: Created By Xnuvers007 server*_`;
      conn.reply(m.chat, keteranganResult, m);
    } else {
      conn.reply(m.chat, "Tidak ada data keterangan obat yang ditemukan.", m);
    }
  } else if (
    ["checkdata", "cekimel", "cekemail", "checkemail", "cekdata"].includes(
      command,
    )
  ) {
    if (!args[0]) {
      m.reply("Please provide an email address.");
      return;
    }

    let email = args[0].toLowerCase();
    let apiUrl = `https://0e87ad76-6c4e-40ff-bb5a-6bbdab145ae2-00-39qk1kw7vab6l.worf.replit.dev/checkdata?email=${encodeURIComponent(
      email,
    )}`;

    let res = await fetch(apiUrl);
    if (res.status !== 200) {
      m.reply("Error fetching data. Please try again later.");
      return;
    }

    let json = await res.json();
    let output = "";

    if (json.Data && json.Data.results && json.Data.results.length > 0) {
      output += `**Data Leaks:**\n`;

      for (let result of json.Data.results) {
        for (let data of result.data) {
          output += `**Title:** ${result.title}\n`;
          output += `**Description:** ${result.description}\n`;
          output += `**Data Leaked:** ${data["Data yang bocor"]}\n`;
          output += `**Date of Incident:** ${data["Tanggal Kejadian"]}\n`;
          output += `**Total Data Leaked:** ${data["Total keseluruhan data yang bocor"]}\n`;
          output += `**Link:** [${result.title}](${result.link})\n\n`;
        }
      }
    } else {
      output += `Your email is secure and not leaked in deep web/dark web.\n`;
    }

    m.reply(`\`\`\`${output}\`\`\``);
  }
};

handler.help = [
  "cariobat <Nama Obat>",
  "ktobat <SumberLinkDariCariObat>",
  "cekimel <Email>",
];
handler.tags = ["tool", "tool", "internet"];
handler.command =
  /^(cariobat|obat|sakit|penyakit|keteranganobat|penjelasanobat|ktobat|indikasiobat|komposisiobat|dosisobat|ketobat|checkdata|cekimel|cekemail|checkemail|cekdata)$/i;

export default handler;
