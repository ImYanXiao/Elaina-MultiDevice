import axios from 'axios';
import cheerio from 'cheerio';

var handler = async (m, { conn, args }) => {
  if (!args[0]) {
    throw 'Uhm... URL-nya mana?';
  }

  try {
    await conn.reply(m.chat, 'Tunggu sebentar kak, video sedang di download... server 1', m);

    const tiktokData = await tryServer1(args[0]);

    if (!tiktokData) {
      throw 'Gagal mendownload video!';
    }

    const videoURL = tiktokData.video.noWatermark;

    const videoURLWatermark = tiktokData.video.watermark;

    // let ppTiktok = '';
    // if (tiktokData.author && tiktokData.author.avatar) {
    //   ppTiktok = tiktokData.author.avatar;
    // }

    const infonya_gan = `Judul: ${tiktokData.title}\nUpload: ${tiktokData.created_at}\n\nSTATUS:\n=====================\nLike = ${tiktokData.stats.likeCount}\nKomen = ${tiktokData.stats.commentCount}\nShare = ${tiktokData.stats.shareCount}\nViews = ${tiktokData.stats.playCount}\nSimpan = ${tiktokData.stats.saveCount}\n=====================\n\nUploader: ${tiktokData.author.name || 'Tidak ada informasi penulis'}\n(${tiktokData.author.unique_id} - https://www.tiktok.com/@${tiktokData.author.unique_id} )\nBio: ${tiktokData.author.signature}\nLagu: ${tiktokData.music.play_url}\nResolusi: ${tiktokData.video.ratio}\n`;
    // Foto Profile: ${ppTiktok}

    if (videoURL || videoURLWatermark) {
      // if (ppTiktok) {
      //   await conn.sendFile(m.chat, ppTiktok, 'profile.png', 'ini foto profilenya', m);
      // }
      await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', `Ini kak videonya\n\n${infonya_gan}`, m);
      setTimeout(async () => {
        await conn.sendFile(m.chat, videoURLWatermark, 'tiktokwm.mp4', `*Ini Versi Watermark*\n\n${infonya_gan}`, m);
        await conn.sendFile(m.chat, `${tiktokData.music.play_url}`,'lagutt.mp3', 'ini lagunya',m);
        conn.reply(m.chat, "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎", m); 
      }, 1500);
    } else {
      throw 'Tidak ada tautan video yang tersedia.';
    }
  } catch (error1) {
    // Server 1 failed, try Server 2
    try {
      await conn.reply(m.chat, 'Tunggu sebentar kak, video sedang di download... server 2', m);
      const tiktokData2 = await tryServer2(args[0]);

      if (!tiktokData2) {
        throw 'Gagal mendownload video!';
      }

      const videoURL2 = tiktokData2.video;
      const audioURL2 = tiktokData2.audio;
      const thumbnailURL = tiktokData2.thumbnail;

      // Lakukan apa yang Anda perlukan dengan tiktokData2 dari Server 2 di sini
      await conn.sendFile(m.chat, thumbnailURL, 'thumbnail.jpg', 'Ini thumbnail videonya', m);
      await conn.sendFile(m.chat, videoURL2, 'tiktok2.mp4', 'Ini kak videonya dari Server 2', m);
      await conn.sendFile(m.chat, audioURL2, 'tiktok.mp3', 'Ini kak audionya', m);
      await conn.reply(m.chat, "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎", m);

    } catch (error2) {
      // Jika server kedua juga gagal, tangani error di sini
      conn.reply(m.chat, `Error: ${error2}`, m);
    }
  }
};

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;

async function tryServer1(url) {
  // Try using tiklydown.eu.org API first
  let tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${url}`;
  let response = await axios.get(tiklydownAPI);
  return response.data;
}

async function tryServer2(url) {
  // If server 1 fails, try using tikdown.org/id
  const tikdownURL = 'https://tikdown.org/id';
  const response = await axios.get(tikdownURL);

  if (response.status === 200) {
    const $ = cheerio.load(response.data);
    // const token = $('[name="_token"]').val();
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
        thumbnail: $('.download-result .preview-image').attr('src'),
        video: $('.download-result .download-links a[href*=".mp4"]').attr('href'),
        audio: $('.download-result .download-links a[href*=".mp3"]').attr('href'),
      };
    } else {
      return {
        status: false,
      };
    }
  }

  throw 'Server 2 failed as well.';
}
