import fetch from 'node-fetch';
import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.sender;
  let name = conn.getName(m.sender);
  let discriminator = who.substring(9, 13);
  let pp = 'https://i.pinimg.com/564x/d4/17/75/d41775c2a051fe94269e71bdcbd240a5.jpg';
  
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image');
  } catch (e) {
  } finally {
    let user = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(user.level, global.multiplier);

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
      await conn.reply(m.chat, `Level ${name} ${user.level} (${user.exp - min}/${xp})\nKurang ${max - user.exp} EXP lagi!`.trim(), m);
    }

    let before = user.level * 1;

    while (canLevelUp(user.level, user.exp, global.multiplier)) {
      user.level++;
    }

    if (before !== user.level) {
      await conn.reply(m.chat, `${name} Level Up!\n_${before}_ -> ${user.level}`.trim(), m);
    }
    // Mengirim gambar profil
    await conn.sendFile(m.chat, pp, 'profile.jpg', 'Ini foto profil kamu!', m);

    // Jeda agar pesan terlihat berurutan
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  }
}

handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = /^levelup$/i;

export default handler;
function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
