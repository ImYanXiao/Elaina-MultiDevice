import fetch from 'node-fetch';
import sharp from 'sharp';

const handler = async (m, { conn }) => {
  conn.reply(m.chat, 'Sedang memuat informasi pengguna acak... Mohon tunggu sebentar', m);

  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();

    const user = data.results[0];
    const {
      name: { title, first, last },
      location: {
        street: { number, name },
        city,
        state,
        country,
        postcode,
        coordinates: { latitude, longitude },
        timezone: { offset, description }
      },
      email,
      login: { uuid, username, password, salt, md5, sha1, sha256 },
      dob: { date, age },
      registered: { date: registeredDate, age: registeredAge },
      phone,
      cell,
      id: { name: idName, value: idValue },
      picture: { large },
      nat
    } = user;

    const full_name = `${first} ${last}`;

    const userInfo = `Title: ${title}\nFirst Name: ${first}\nLast Name: ${last}\nFull Name: ${full_name}\n\n` +
      `Location:\nStreet Number: ${number}\nStreet Name: ${name}\nCity: ${city}\nState: ${state}\nCountry: ${country}\nPostal Code: ${postcode}\nLatitude: ${latitude}\nLongitude: ${longitude}\nTimezone Offset: ${offset}\nTimezone Description: ${description}\n\n` +
      `Email: ${email}\n\n` +
      `Login Information:\nUUID: ${uuid}\nUsername: ${username}\nPassword: ${password}\nSalt: ${salt}\nMD5 Hash: ${md5}\nSHA1 Hash: ${sha1}\nSHA256 Hash: ${sha256}\n\n` +
      `Date of Birth: ${date}\nAge: ${age}\n\n` +
      `Registration Information:\nRegistered Date: ${registeredDate}\nRegistered Age: ${registeredAge}\n\n` +
      `Phone Number: ${phone}\nCell Number: ${cell}\n\n` +
      `ID Name: ${idName}\nID Value: ${idValue}\n\n` +
      `Large Picture: ${large}\n\n` +
      `Nationality: ${nat}`;

    const imageBuffer = await (await fetch(large)).buffer();
    const resizedImageBuffer = await sharp(imageBuffer).resize(1000).jpeg().toBuffer(); // Resize to width 1000 and convert to JPEG format

    conn.sendFile(m.chat, resizedImageBuffer, 'randomuser.jpg', `Berikut informasi pengguna acak:\n\n${userInfo}`, m);
  } catch (error) {
    conn.reply(m.chat, 'Maaf, terjadi kesalahan. Mohon coba lagi nanti.', m);
    console.error(error);
  }
};

handler.help = ['randomuser'];
handler.tags = ['internet', 'tools'];
handler.command = /^(randomuser|randuser|ruser|ranuser|rauser|rndmusr)$/i;

export default handler;
