const roles = ["warewolf", "manusia"];

let handler = async (m, { conn, command, usedPrefix, text }) => {
  const maxPlayers = 3;
  conn.warewolf = conn.warewolf || {};

  const input = text.trim().split(" ");
  const inputcmd = input[0].toLowerCase();
  const targetNumber = input[1] || '';

  const groupId = m.chat;
  conn.warewolf[groupId] = conn.warewolf[groupId] || { players: [], started: false };
  const { players, started } = conn.warewolf[groupId];

  if (inputcmd === "start") {
    if (started) return m.reply("😅 Permainan sudah dimulai.");
    if (players.length < 2) return m.reply("😅 Jumlah pemain belum mencukupi. Minimal 2 pemain diperlukan untuk memulai permainan.");
    if (players.length > maxPlayers) return m.reply("😅 Jumlah pemain melebihi batas maksimal (8 pemain).");

    conn.warewolf[groupId].started = true;
    m.reply("Permainan sudah dimulai. Selamat bermain!");
  } else if (inputcmd === "join") {
    if (started) return m.reply("😅 Permainan sudah dimulai, tidak bisa bergabung lagi.");
    if (players.length >= maxPlayers) return m.reply(`😅 Jumlah pemain sudah mencapai batas maksimal (${maxPlayers} pemain). Permainan bisa dimulai dengan mengetik *${usedPrefix}warewolf start*`);
    const playerName = m.name;
    if (players.some((player) => player.name === playerName)) return m.reply("😅 Kamu sudah bergabung dalam permainan.");
    const money = global.db.data.users[m.sender].money || 0;
    players.push({ name: playerName, money, sender: m.sender });

    // Jika jumlah pemain mencukupi, tambahkan satu pemain warewolf
    if (players.length === maxPlayers) {
      const warewolfPlayer = getRandomPlayer(players);
      warewolfPlayer.role = "warewolf";
    }

    m.reply(`✅ Pemain Manusia ${playerName} telah bergabung dalam permainan.`);
  } else if (inputcmd === "cek") {
    if (!started) return m.reply("😅 Permainan belum dimulai.");
    if (players.length === 0) return m.reply("😅 Belum ada pemain yang bergabung dalam permainan.");

    const warewolf = findWarewolf(players);
    m.reply(`🐺 Siapakah Warewolf dalam permainan ini?\n\nPilih salah satu angka:\n${players.map((player, index) => `${index + 1}. ${player.name}`).join("\n")}`);
  } else if (inputcmd === "tebak") {
    if (!started) return m.reply("😅 Permainan belum dimulai.");
    if (players.length < 2) return m.reply("😅 Jumlah pemain belum mencukupi. Minimal 2 pemain diperlukan untuk memulai permainan.");

    const playerIndex = +targetNumber - 1;
    if (playerIndex < 0 || playerIndex >= players.length) return m.reply("😅 Pilih player yang ada saja.");
    
    const warewolf = findWarewolf(players);
    if (playerIndex === players.findIndex((player) => player.role === "warewolf")) {
      m.reply(`🎉 Selamat! ${warewolf.name} adalah Warewolf! Permainan berakhir.`);
      // Tambahkan logika untuk menghapus sesi permainan warewolf
      delete conn.warewolf[groupId];
    } else {
      m.reply("😔 Tebakanmu salah! Coba lagi.");
    }
  } else {
    m.reply(`❌ Perintah tidak dikenali. Gunakan salah satu perintah berikut:\n${usedPrefix}warewolf join\n${usedPrefix}warewolf start\n${usedPrefix}warewolf cek\n${usedPrefix}warewolf tebak`);
  }
};

// ... (helper functions dan ekspor handler sama seperti sebelumnya)
handler.help = ['warewolf'];
handler.tags = ['rpg'];
handler.command = ['warewolf'];
export default handler;

function shuffleRoles(players) {
  const shuffledPlayers = players.map((player, index) => ({ name: player, role: roles[1], money: 0, sender: '' }));
  const randomIndex = Math.floor(Math.random() * players.length);
  shuffledPlayers[randomIndex].role = roles[0];
  return shuffledPlayers;
}

function findWarewolf(players) {
  return players.find((player) => player.role === "warewolf");
}

function getRandomPlayer(players) {
  return players[Math.floor(Math.random() * players.length)];
}