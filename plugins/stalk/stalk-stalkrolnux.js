import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`⚠️ *Format Salah*\nContoh: ${usedPrefix + command} YtNizumakuYtz`);
  }

  try {
    m.reply('⏳ Sedang mengambil data profil, mohon tunggu...');

    const { data: searchData } = await axios.post(
      'https://users.roblox.com/v1/usernames/users',
      {
        usernames: [text],
        excludeBannedUsers: true
      }
    );

    const userData = searchData.data?.[0];
    if (!userData) {
      return m.reply(`❌ Pengguna dengan username *"${text}"* tidak ditemukan.`);
    }

    const userId = userData.id;
    const username = userData.name;
    const displayName = userData.displayName;

    const safeGet = async (url) => {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch {
        return null;
      }
    };

    const [
      thumbnailRes,
      userInfoRes,
      friendsRes,
      followersRes,
      followingRes,
      groupsRes,
      badgesRes
    ] = await Promise.all([
      safeGet(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`),
      safeGet(`https://users.roblox.com/v1/users/${userId}`),
      safeGet(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
      safeGet(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
      safeGet(`https://friends.roblox.com/v1/users/${userId}/followings/count`),
      safeGet(`https://groups.roblox.com/v1/users/${userId}/groups/roles`),
      safeGet(`https://badges.roblox.com/v1/users/${userId}/badges?limit=5&sortOrder=Asc`)
    ]);

    const profilePicUrl = thumbnailRes?.data?.[0]?.imageUrl || null;
    const description = userInfoRes?.description?.trim() || 'Tidak ada deskripsi.';
    const joinDate = userInfoRes?.created ? new Date(userInfoRes.created) : null;
    const joinDateFormatted = joinDate
      ? joinDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      : 'Tidak diketahui';

    const friendsCount = friendsRes?.count ?? 0;
    const followersCount = followersRes?.count ?? 0;
    const followingCount = followingRes?.count ?? 0;

    const groups = groupsRes?.data?.length
      ? groupsRes.data.map((g, i) => `${i + 1}. ${g.group.name}`).join('\n')
      : 'Tidak ada grup';

    const badgeList = badgesRes?.data?.length
      ? badgesRes.data.slice(0, 3).map(b => b.name).join(', ')
      : 'Tidak ada badge';
    const badgeCount = badgesRes?.data?.length ?? 0;

    const caption = `
🎮 *Profil Roblox: ${username}*

*Display Name:* ${displayName}
*User ID:* ${userId}

📝 *Deskripsi:*
${description}

👥 *Teman:* ${friendsCount}
👤 *Followers:* ${followersCount}
➡️ *Following:* ${followingCount}
📅 *Tanggal Bergabung:* ${joinDateFormatted}

🏷️ *Grup (${groupsRes?.data?.length ?? 0} total):*
${groups}

🏅 *Badge (${badgeCount} total):* ${badgeList}

🔗 *Link Profil:*
https://www.roblox.com/users/${userId}/profile
    `.trim();

    if (!profilePicUrl) {
      return m.reply('⚠️ Gagal mendapatkan gambar profil. Info teks saja:\n\n' + caption);
    }

    await conn.sendFile(m.chat, profilePicUrl, 'roblox_profile.png', caption, m);

  } catch (error) {
    console.error(error.response?.data || error.message);
    m.reply('❌ Terjadi kesalahan saat mengambil data dari Roblox API.');
  }
};

handler.help = ['stalkroblox <username>'];
handler.tags = ['stalk'];
handler.command = ['stalkroblox'];
handler.register = true;

export default handler;