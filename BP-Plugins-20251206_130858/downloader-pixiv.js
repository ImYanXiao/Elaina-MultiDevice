import { URL_REGEX } from '@adiwajshing/baileys';
import { fileTypeFromBuffer } from 'file-type';
import { Pixiv } from '@ibaraki-douji/pixivts';

const pixiv = new Pixiv();

const timeZones = {
  WIB: 'Asia/Jakarta',
  WITA: 'Asia/Makassar',
  WIT: 'Asia/Jayapura'
};

function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Function to format date for a specific timezone
  const formatForTimeZone = (timeZone) => {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(date);
  };

  return {
    localDate: formatForTimeZone('Asia/Jakarta'), // WIB
    witaDate: formatForTimeZone('Asia/Makassar'), // WITA
    witDate: formatForTimeZone('Asia/Jayapura')   // WIT
  };
}

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Input Pixiv URL or search query';

  let res;
  if (text.match(URL_REGEX)) {
    if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(text)) throw 'Invalid Pixiv URL';
    res = await pixivDl(text);
  } else {
    res = await pixivDlByTag(text);
  }

  await m.reply('_In progress, please wait..._');

  let mediaFiles = [];

  // Process images and collect media files
  for (let i = 0; i < res.urls.length; i++) {
    let imageUrl = res.urls[i].original;
    let imageBuffer = await pixiv.download(new URL(imageUrl));
    let mime = (await fileTypeFromBuffer(imageBuffer)).mime;

    // Format dates
    const creationDates = formatDate(res.createDate);
    const uploadDates = formatDate(res.uploadDate);

    let caption = i === 0 ? 
      `*🖼️ Title:* ${res.title}\n` +
      `*🎨 Artist:* ${res.user.name}\n` +
      `*📝 Description:* ${res.description}\n` +
      `*🔖 Tags:* ${res.tags.join(', ')}\n` +
      `*📅 Created:* ${creationDates.localDate} (WIB)\n` +
      `*📅 Created:* ${creationDates.witaDate} (WITA)\n` +
      `*📅 Created:* ${creationDates.witDate} (WIT)\n` +
      `*📤 Uploaded:* ${uploadDates.localDate} (WIB)\n` +
      `*📤 Uploaded:* ${uploadDates.witaDate} (WITA)\n` +
      `*📤 Uploaded:* ${uploadDates.witDate} (WIT)\n` +
      `*👍 Likes:* ${res.like}\n` +
      `*🔖 Bookmarks:* ${res.bookmark}\n` +
      `*👁️ Views:* ${res.view}\n` +
      `*💬 Comments:* ${res.comment}\n` +
      `*📏 Width:* ${res.width}px\n` +
      `*📏 Height:* ${res.height}px\n` +
      `*📄 Pages:* ${res.pageCount}\n` +
      `*🤖 AI Generated:* ${res.AI ? 'Yes' : 'No'}\n` +
      `*🔒 Restricted:* ${res.restricted}\n` +
      `*🆔 Illustration ID:* ${res.illustID}\n` +
      `*🖼️ Illustration Type:* ${res.illustType}\n` +
      `*📸 Number of Images:* ${res.urls.length}` : '';

    mediaFiles.push({ [mime.split('/')[0]]: imageBuffer, caption, mimetype: mime });
  }

  // Send all images with captions
  for (let media of mediaFiles) {
    await conn.sendMessage(m.chat, media, { quoted: m });
  }
};

handler.help = ['pixiv'];
handler.tags = ['downloader'];
handler.command = /^(pixiv)$/i;

export default handler;

async function pixivDl(query) {
  query = query.replace(/\D/g, '');
  let res = await pixiv.getIllustByID(query).catch(() => null);
  if (!res) throw `ID "${query}" not found :/`;

  return {
    user: res.user,
    title: res.title,
    description: res.description,
    tags: res.tags.tags.map(v => v.tag),
    createDate: res.createDate,
    uploadDate: res.uploadDate,
    like: res.like,
    bookmark: res.bookmark,
    view: res.view,
    comment: res.comment,
    width: res.width,
    height: res.height,
    pageCount: res.pageCount,
    illustID: res.illustID,
    illustType: res.illustType,
    AI: res.AI,
    restricted: res.restricted,
    urls: res.urls
  };
}

async function pixivDlByTag(query) {
  let res = await pixiv.getIllustsByTag(query);
  if (!res.length) throw `Tag "${query}" not found :/`;

  res = res[Math.floor(Math.random() * res.length)].id;
  return await pixivDl(res);
}
