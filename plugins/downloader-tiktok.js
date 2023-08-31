import axios from 'axios';
import cheerio from 'cheerio';

var handler = async (m, { conn, args }) => {
  if (!args[0]) {
    throw 'Uhm... URL-nya mana?';
  }

  try {
    await conn.reply(m.chat, 'Tunggu sebentar kak, video sedang di download...', m);

    const tiktokData = await downloadTikTok(args[0]);

    if (!tiktokData) {
      throw 'Gagal mendownload video!';
    }

    const videoURL = tiktokData.video.noWatermark;

    const videoURLWatermark = tiktokData.video.watermark;

    const ppTiktok = tiktokData.author.avatar;

    const infonya_gan =`Judul: ${tiktokData.title}\nUpload: ${tiktokData.created_at}\n\nSTATUS:\n=====================\nLike = ${tiktokData.stats.likeCount}\nKomen = ${tiktokData.stats.commentCount}\nShare = ${tiktokData.stats.shareCount}\nViews = ${tiktokData.stats.playCount}\nSimpan = ${tiktokData.stats.saveCount}\n=====================\n\nUploader: ${tiktokData.author.name} (${tiktokData.author.unique_id} - https://www.tiktok.com/@${tiktokData.author.unique_id}) \nBio: ${tiktokData.author.signature}\nLagu: ${tiktokData.music.play_url}\nResolusi: ${tiktokData.video.ratio}\nFoto Profile: ${ppTiktok}`;

    if (videoURL || videoURLWatermark) {
      await conn.sendFile(m.chat, ppTiktok, 'profile.png', 'ini foto profilenya', m);
      await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', `Ini kak videonya\n\n${infonya_gan}`, m);
      setTimeout(async () => {
        await conn.sendFile(m.chat, videoURLWatermark, 'tiktokwm.mp4', `*Ini Versi Watermark*\n\n${infonya_gan}`, m);
        conn.reply(m.chat, "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎", m); 
      }, 5000);

      // await conn.sendFile(m.chat, videoURLWatermark, 'tiktokwm.mp4', `*Ini Versi Watermark*\n\n${infonya_gan}`, m);
    } else {
      throw 'Tidak ada tautan video yang tersedia.';
    }
  } catch (error) {
    conn.reply(m.chat, `Error: ${error}`, m);
  }
};

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;

async function downloadTikTok(url) {
  // Try using tiklydown.eu.org API first
  let tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${url}`;
  try {
    let response = await axios.get(tiklydownAPI);
    return response.data;
  } catch (error) {
    // If tiklydown.eu.org API fails, try using tikdown.org/id
    return tiktokdl(url);
  }
}

async function tiktokdl(url) {
  if (!/tiktok/.test(url)) {
    throw 'Invalid TikTok URL!';
  }

  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value');
  const param = {
    url: url,
    _token: token,
  };

  const { data } = await axios.request('https://tikdown.org/getAjax?', {
    method: 'post',
    data: new URLSearchParams(Object.entries(param)),
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
    },
  });

  var getdata = cheerio.load(data.html);

  if (data.status) {
    return {
      status: true,
      thumbnail: getdata('img').attr('src'),
      video: getdata('div.download-links > div:nth-child(1) > a').attr('href'),
      audio: getdata('div.download-links > div:nth-child(2) > a').attr('href'),
    };
  } else {
    return {
      status: false,
    };
  }
}
