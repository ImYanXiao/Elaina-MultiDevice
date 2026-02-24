const xpperlimit = 1000;

var handler = async (m, { conn, command, args }) => {
  // Menghapus 'blimit' dari command untuk mendapatkan angka atau 'all'
  let count = command.replace(/^blimit/i, '').trim(); // Trim whitespace

  console.log(`Command after replace: ${count}`); // Debugging

  // Jika 'all', hitung berdasarkan exp pengguna. Jika tidak, parse sebagai angka
  if (/all/i.test(count)) {
    count = Math.floor(global.db.data.users[m.sender].exp / xpperlimit);
  } else if (!isNaN(count) && count !== '') {
    count = parseInt(count); // Ubah ke angka jika valid
  } else if (args[0] && !isNaN(args[0])) {
    count = parseInt(args[0]); // Gunakan args[0] jika command tidak valid
  } else {
    count = 1; // Jika tidak ada argumen, gunakan default 1
  }

  console.log(`Final count: ${count}`); // Debugging

  // Validasi agar count tidak NaN dan lebih besar dari 0
  if (isNaN(count) || count <= 0) {
    conn.reply(m.chat, `[❗] Jumlah limit tidak valid. Masukkan angka yang benar.`, m);
    return; // Keluar dari fungsi jika input tidak valid
  }

  // Pastikan nilai count minimal 1
  count = Math.max(1, count);

  // Cek apakah pengguna memiliki XP yang cukup untuk membeli limit
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    // Kurangi XP pengguna sesuai jumlah pembelian
    global.db.data.users[m.sender].exp -= xpperlimit * count;
    // Tambah limit pengguna
    global.db.data.users[m.sender].limit += count;

    // Balas pesan dengan konfirmasi pengurangan XP dan penambahan limit
    conn.reply(m.chat, `-XP ${xpperlimit * count} 💹\n+ ${count} Limit 🎫`, m);
  } else {
    // Balas jika XP tidak cukup
    conn.reply(m.chat, `[❗] XP Anda tidak mencukupi untuk membeli ${count} limit\n▸ *Mainkan Game untuk dapatkan beberapa uang!*`, m);
  }
}

// Informasi bantuan dan metadata untuk handler
handler.help = ['buylimit <jumlah limit yang ingin dibeli>'];
handler.tags = ['xp'];
handler.command = /^(b(uy)?limit)$/i;

// Inisialisasi pengalaman (XP) untuk command
handler.exp = 0;

export default handler;