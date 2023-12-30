import fetch from "node-fetch";
import { format } from "util";
import path from "path";

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`NOTE: bisa gunakan https:// bisa juga http:// dan bisa juga tanpa keduanya (https:// dan http://)
*Bisa mendownload dan melihat file yang di short seperti shorturl.at/GHY58 atau short url lainnya (tinyurl, s.id, shorturl, dll)* \n
bisa mendownload dan menampilkan json, html, txt, image, pdf, dll. contoh: ${
      usedPrefix + command
    } Link/Url\n
|====================================|
${usedPrefix + command} shorturl.at/GHY58
${
  usedPrefix + command
} si.ft.unmul.ac.id/modul_praktikum/8as0x4aConbSoi4lPy0D05PHemnX6x.pdf
${
  usedPrefix + command
} cdn.i-joox.com/_next/static/chunks/130.9700ec051eee3adc4f5d.js
${usedPrefix + command} data.bmkg.go.id/DataMKG/TEWS/autogempa.json
${usedPrefix + command} tr.deployers.repl.co/robots.txt
${usedPrefix + command} tr.deployers.repl.co/sitemap.xml
${
  usedPrefix + command
} api.duniagames.co.id/api/content/upload/file/7081780811647600895.png
${usedPrefix + command} medlineplus.gov/musclecramps.html
|====================================|\n
NOTE: Pokoknya masih banyak lagi, kalo error, hubungi +${global.nomorown}
coded by https://github.com/Xnuvers007 [Xnuvers007]
`);
  }

  // ngecek dulu nih si user make https:// atau http:// atau gada keduanya
  if (!/^https?:\/\//.test(text)) {
    // tambah http:// sebagai default jika user lupa
    text = "http://" + text;
  } else if (/^https:\/\//.test(text)) {
    // jika gada https:// langsung tambahin
    text = text;
  }

  let _url = new URL(text);
  let url = global.API(
    _url.origin,
    _url.pathname,
    Object.fromEntries(_url.searchParams.entries()),
    "APIKEY",
  );

  // mengkonfigurasi seberapa banyak melakukan redirect, misal url di short sebanyak 1000 maka melakukan redirect 1000 kali (optional: 999999)

  let maxRedirects = 999999;
  let redirectCount = 0;
  let redirectUrl = url;

  while (redirectCount < maxRedirects) {
    let res = await fetch(redirectUrl);

    if (res.headers.get("content-length") > 100 * 1024 * 1024 * 1024) {
      // menghapus respons server
      res.body.destroy();
      throw `Content-Length: ${res.headers.get("content-length")}`;
    }

    // const contentType = res.headers.get('content-type')

    // // ekstrak nama dari url yang gunanya buat ekstensi
    // let filename = path.basename(new URL(redirectUrl).pathname);

    const contentType = res.headers.get("content-type");
    const contentDisposition = res.headers.get("content-disposition");
    let filename;

    // Cek apakah ada header content-disposition dan ekstensi file
    if (contentDisposition && contentDisposition.includes("filename=")) {
      // Jika 'filename=' ada, gunakan split
      filename = contentDisposition.split("filename=")[1].trim();
    } else if (contentDisposition) {
      // Jika 'filename=' tidak ada tapi content-disposition ada, hapus 'filename='
      filename = contentDisposition.replace(/^filename=/i, "").trim();
    } else {
      // Jika tidak ada content-disposition, ekstrak nama dari URL yang gunanya untuk ekstensi
      filename = path.basename(new URL(redirectUrl).pathname);
    }

    await conn.reply(m.chat, global.wait, m);

    // ngendaliin konten tipe yang bisa aja berbeda
    if (/^image\//.test(contentType)) {
      try {
        conn.sendFile(m.chat, redirectUrl, filename, text, m); // m.reply(`Result for ${text}`)
      } catch (err) {
        m.reply("respons bukan gambar");
        conn.sendFile(m.chat, redirectUrl, filename, text, m);
      }
    } else if (/^text\//.test(contentType)) {
      try {
        let txt = await res.text();
        m.reply(txt.slice(0, 65536) + "");
        conn.sendFile(m.chat, Buffer.from(txt), "file.txt", null, m);
      } catch (e) {
        m.reply("respons bukan teks");
      }
    } else if (/^application\/json/.test(contentType)) {
      try {
        let txt = await res.json();
        txt = format(JSON.stringify(txt, null, 2));
        m.reply(txt.slice(0, 65536) + "");
        conn.sendFile(m.chat, Buffer.from(txt), "file.json", null, m);
      } catch (error) {
        m.reply("Respons bukan JSON");
      }
    } else if (/^text\/html/.test(contentType)) {
      try {
        let html = await res.text();
        conn.sendFile(m.chat, Buffer.from(html), "file.html", null, m);
      } catch (error) {
        m.reply("Respons bukan HTML");
      }
    } else {
      // mengirim file sesuai ekstensi
      conn.sendFile(m.chat, redirectUrl, filename, text, m);
    }

    // melakukan pengeceka dulu cuy kalo ada redirect
    if (
      res.status === 301 ||
      res.status === 302 ||
      res.status === 307 ||
      res.status === 308
    ) {
      let location = res.headers.get("location");
      if (location) {
        redirectUrl = location;
        redirectCount++;
      } else {
        // ga nemu location header ? berhenti redirect
        break;
      }
    } else {
      // No redirect ? berhenti redirect
      break;
    }
  }

  if (redirectCount >= maxRedirects) {
    throw `Too many redirects (max: ${maxRedirects})`;
  }
};

handler.help = ["fetch", "get"].map((v) => v + " <url>");
handler.tags = ["internet"];
handler.command = /^(fetch|get)$/i;

export default handler;
