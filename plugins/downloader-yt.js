import { youtubedl, youtubedlv2, youtubeSearch } from '@bochilteam/scraper';
import fetch from 'node-fetch';

var handler = async (m, { conn, args, command, text, usedPrefix }) => {

if (command == 'play', 'ytplay', 'youtubeplay') {
  try {
    if (!text) {
      return conn.reply(m.chat, `Gunakan contoh ${usedPrefix}${command} naruto blue bird`, m);
    }

    conn.reply(m.chat, 'Tunggu sebentar, sedang dicari dan diunduh...', m);

    let search = await youtubeSearch(text);

    if (!search || !search.video || !search.video[0]) {
      throw 'Video Tidak Ditemukan, Coba Judul Lain';
    }

    let vid = search.video[0];
    let { authorName, title, thumbnail, duration, viewH, publishedTime, url } = vid;

    let caption = `╭──── 〔 Y O U T U B E 〕 ─⬣
⬡ Judul: ${title}
⬡ Author: ${authorName}
⬡ Durasi: ${duration}
⬡ Views: ${viewH}
⬡ Upload: ${publishedTime}
⬡ Link: ${url}
╰────────⬣`;

    conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: thumbnail,
          body: wm,
          thumbnail: await (await conn.getFile(thumbnail)).data,
          sourceUrl: url,
        },
      },
    });

    const yt = await youtubedl(url).catch(async (_) => await youtubedlv2(url));
    const link = await yt.audio['128kbps'].download();
    let doc = {
      audio: {
        url: link,
      },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
    };

    return conn.sendMessage(m.chat, doc, { quoted: m });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan. Silakan coba lagi nanti.\nNyari yang bener donk...', m);
  }
}
// };


if (command == 'ytlist', 'youtubelist', 'ytl') {
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

if (command == 'yta', 'ytmp3', 'getaud', 'youtubemp3') {
  if (!args[0]) throw 'Urlnya Mana Banh? >:('
  let q = '128kbps'
  let v = args[0]

  // Ambil info dari video
  const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
  const dl_url = await yt.audio[q].download()
  const ttl = await yt.title
  const size = await yt.audio[q].fileSizeH

  await m.reply('Permintaan download audio/mp3 youtube sedang diproses, mohon bersabar...')

  // Tampilkan informasi file beserta thumbnail
  const info = `
▢ Judul: ${ttl}
▢ Ukuran: ${size}
▢ Link YouTube: ${v}
▢ Credits by Xnuvers007, https://github.com/Xnuvers007`

  // Kirim pesan dan file audio ke user
  await conn.sendMessage(m.chat, { 
    document: { url: dl_url }, 
    mimetype: 'audio/mpeg', 
    fileName: `${ttl}.mp3`,
    caption: info
  }, {quoted: m})
}


if (command == 'yts', 'ytsearch', 'youtubesearch') {
  if (!text) throw `*_Masukkan Judul Video Yang Ingin Kamu Cari!_*\nperintah:\n${usedPrefix + command} Naruto Squad Reaction\n`;

  const videoUrl = `https://tr.deployers.repl.co/vid?name=${encodeURIComponent(text)}`;

  const user_input_start = 0;
  const user_input_end = 51;

  try {
    const response = await fetch(videoUrl);
    if (!response.ok) throw 'Failed to fetch the video data.';
    const data = await response.json();
    const videoData = data.result;

    if (!videoData || videoData.length === 0) {
      await m.reply('No video data found.');
      return;
    }

    const start = Math.max(0, user_input_start);
    const end = Math.min(videoData.length - 1, user_input_end);

    let replyText = '';
    for (let i = start; i <= end; i++) {
      const videoInfo = videoData[i];

      try {
        if (videoInfo && videoInfo.channel) {
          const name = videoInfo.channel.name;
          const link = videoInfo.channel.link;

          replyText += `Video ${i + 1}:\n`;
          replyText += `name: ${name}\n` +
            `link: ${link}\n`;
        } else {
          replyText += `Video ${i + 1}: Channel information not available\n`;
        }

        const title = videoInfo.title;
        const type = videoInfo.type;
        const link_Video = videoInfo.link;
        const duration = videoInfo.accessibility.duration;
        const views = videoInfo.viewCount.text;

        replyText += `duration: ${duration}\n` +
          `title: ${title}\n` +
          `type: ${type}\n` +
          `link_Video: ${link_Video}\n` +
          `views: ${views}\n`;
        replyText += '-'.repeat(30) + '\n';
      } catch (error) {
        console.error(`Error processing Video ${i + 1}: ${error}`);
        replyText += `Error processing Video ${i + 1}\n`;
      }
    }

    await m.reply(replyText);
  } catch (error) {
    console.error(error);
    await m.reply('Failed to fetch the video data.');
  }
};

// Update by Xnuvers007

if (command == 'getvid', 'ytmp4', 'youtubemp4') {
  if (!args[0]) throw `Ex: ${command} https://www.youtube.com/shorts/Ezzh2joFrzg`;
  const v = args[0];

  const resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p", "720p60", "1080p60"];

  let yt;

  try {
    yt = await youtubedl(v) || await youtubedlv2(v);
  } catch (e) {
    conn.reply(m.chat, e, m);
    return;
  }

  const title = await yt.title;

  let success = false;
  let message = `Permintaan download video YouTube. Sedang diproses, mohon bersabar...\n\n`;

  for (let i = 0; i < resolutions.length; i++) {
    const res = resolutions[i];
    try {
      if (yt.video[res]) {
        const selectedResolution = res;
        const selectedQuality = res.replace('p', '');
        const size = await yt.video[res].fileSizeH;
        const dlUrl = await yt.video[res].download();
        message += `▢ Resolution: ${selectedResolution}\n`;
        message += `▢ Size: ${size}\n`;
        message += `▢ Video link: ${dlUrl}\n\n`;
        success = true;
        await conn.sendFile(m.chat, dlUrl, 'video.mp4', message, m);
      }
    } catch (err) {
      console.log(`Error downloading ${res}: ${err}`);
    }
  }

  if (!success) {
    for (let i = 0; i < resolutions.length; i++) {
      const res = resolutions[i];
      try {
        if (yt.video[res]) {
          const dlUrl = await yt.video[res].download();
          await m.reply(`Silahkan download sendiri disini: ${dlUrl}`);
        }
      } catch (err) {
        console.log(`Error obtaining download link for ${res}: ${err}`);
      }
    }
    const dlUrlFallback = `https://www.ssyoutube.com/watch?v=${yt.videoId}`; // Provide a fallback download link
    await m.reply(`Maaf, video tidak dapat diunduh. Silakan download secara manual menggunakan link berikut:\n${dlUrlFallback}`);
  }
};
};

handler.tags = ['downloader']
handler.command = ['play', 'ytplay', 'youtubeplay', 'ytlist', 'youtubelist', 'ytl', 'yta', 'ytmp3', 'getaud', 'youtubemp3', 'yts', 'youtubesearch', 'getvid', 'ytmp4', 'youtubemp4']
handler.limit = true // false

export default handler;
