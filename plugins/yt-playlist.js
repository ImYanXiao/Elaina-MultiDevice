import fetch from 'node-fetch';

function getPlaylistInfo(playlistData) {
  const playlistInfo = [];

  for (const playlist of playlistData) {
    const channelInfo = playlist.channel;
    playlistInfo.push({
      name: channelInfo.name,
      link: channelInfo.link,
      link_Playlist: playlist.link,
      title: playlist.title,
      type: playlist.type,
      videoCount: playlist.videoCount,
    });
  }

  return playlistInfo;
}

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `*_Masukan Judul Playlist Yang Ingin Kamu Cari!_*\nperintah:\n${usedPrefix + command} Kanao Tsuyuri\n`;

  const playlistUrl = `https://tr.deployers.repl.co/playlist?name=${encodeURIComponent(text)}`;
  const user_input_start = 0; // bebas diubah dimulai dari berapa
  const user_input_end = 51; // bebas diubah (max 51)

  try {
    const response = await fetch(playlistUrl);
    if (!response.ok) throw 'Failed to fetch the playlist data.';
    const data = await response.json();
    const playlistsData = data.result;

    if (!playlistsData || playlistsData.length === 0) {
      await m.reply('No playlist data found.');
      return;
    }

    const filteredPlaylists = playlistsData.slice(user_input_start, user_input_end + 1);
    const extractedInfo = getPlaylistInfo(filteredPlaylists);

    let replyText = '';
    extractedInfo.forEach((playlistInfo, idx) => {
      replyText += `Playlist ${user_input_start + idx}:\n`;
      replyText += `Title: ${playlistInfo.title}\n`;
      replyText += `Name: ${playlistInfo.name}\n`;
      replyText += `Channel Link: ${playlistInfo.link}\n`;
      replyText += `Type: ${playlistInfo.type}\n`;
      replyText += `Playlist Link: ${playlistInfo.link_Playlist}\n`;
      replyText += `Video Count: ${playlistInfo.videoCount}\n`;
      replyText += '-'.repeat(30) + '\n';
    });

    await m.reply(replyText);
  } catch (error) {
    console.error(error);
    await m.reply('Failed to fetch the playlist data.');
  }
};

handler.command = /^(playlist|list|ytlist|youtubelist|ytl)$/i;
handler.tags = ['youtube'];
handler.help = ['playlist <nama_playlist>'];

export default handler;
