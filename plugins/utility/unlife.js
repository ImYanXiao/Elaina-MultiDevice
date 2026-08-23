const handler = async (m, { conn, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender].life || {};

  if (!user.name && !user.gender && !user.age) {
    m.reply("⚠️ Kamu belum pernah set life sebelumnya.");
    return;
  }

  user.name = "";
  user.gender = "";
  user.age = "";
  user.verified = false;
  user.husbu = "";
  user.waifu = "";
  user.id = "";
  user.about = "";

  await m.reply(
    `✅ Data life kamu berhasil dihapus!\n\nKamu sekarang belum memiliki data kehidupan. Gunakan *${usedPrefix}setlife* lagi untuk mendaftarkan kembali.`
  );
};

handler.command = ["unlife"];
handler.tags = ["utility"];
handler.premium = true;

export default handler;