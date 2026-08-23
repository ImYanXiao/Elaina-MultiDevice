const handler = async (m, { conn, usedPrefix, command, text }) => {
    const user = global.db.data.users[m.sender].life;

    if (!m.text) {
      m.reply(`Contoh : ${usedPrefix + command} name,gender,age`);
      return;
    }
 
    if (
      user.name.length > 1 ||
      user.gender.length > 1 ||
      !user.age.length > 1
    ) {
      m.reply("⚠️ Sepertinya Kamu sudah melakukan sebelumnya.");
      return;
    }

    const [name, gender, age] = text.split(",");

    if (!name || !gender || !age) {
      m.reply(
        `Contoh :\n\n${usedPrefix + command} name,gender,age\n${usedPrefix + command} Rexxzyn,male/female,18\n\nNote :\nSet life hanya bisa satu kali ya, jadi kamu tidak bisa mengubahnya.`,
      );
      return;
    }

    if (!["male", "female"].includes(gender)) {
      m.reply("⚠️Gender hanya bisa (male dan female)");
      return;
    }

    if (isNaN(age)) {
      m.reply("⚠️ Age harus berupa angka.");
      return;
    }

    await m.reply(
      `*Berhasil set Life*\n\nName : ${name}\nGender : ${gender}\nAge : ${age}\n\nSelamat Menikmati keseharian mu🥰.`,
    );
    user.name = name;
    user.gender = gender;
    user.age = age;
    user.verified = true;
  }
  
handler.command = ["setlife"]
handler.tags = ["utility"]

handler.premium = true
export default handler