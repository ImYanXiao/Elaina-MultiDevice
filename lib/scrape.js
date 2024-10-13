/* Source From : 
  * https://github.com/ShiroNexo/nexo-aio-downloader
  * I just changed it a little
  */

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import { join } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import os from 'os';
import ytdl from '@distube/ytdl-core';
import https from "https";

const tempDir = os.tmpdir();
function convertAngka(number) {
    const data = String(number).split('').reverse()
    let combine = ''
    for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 3 == 0 && i != data.length - 1) {
            data[i] = `.${data[i]}`
        }
    }
    combine = `${data.reverse().join('')}`
    return combine
}

async function trustpositif(url) {
  if(!url) return false
  let agent = new https.Agent({ rejectUnauthorized: false })
  url = Array.isArray(url) ? encodeURIComponent(url.join("\n")) : url
  let { data } = await axios({
    "url": "https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home",
    "method": "POST",
    "httpsAgent": agent,
    "data": {
      "name": url,
    }
  })
  let result = {}
  for(let i of data.values) {
    result[i.Domain] = i.Status === "Ada"
  }
  return result
}

export async function bilibiliDownloader(url, quality = '480P') {
    try {
        const aidMatch = /\/video\/(\d+)/.exec(url);
        if (!aidMatch) throw new Error('Invalid Bilibili URL');

        let aid = aidMatch[1];
        const appInfo = await axios.get(url).then(res => res.data);
        const $ = cheerio.load(appInfo);
        const title = $('meta[property="og:title"]').attr('content').split('|')[0].trim();
        const locate = $('meta[property="og:locale"]').attr('content');
        const description = $('meta[property="og:description"]').attr('content');
        const cover = $('meta[property="og:image"]').attr('content');
        const like = $('.interactive__like .interactive__text').text();
        const views = $('.bstar-meta-text').first().text();

        const response = await axios.get('https://api.bilibili.tv/intl/gateway/web/playurl', {
            params: {
                's_locale': 'id_ID',
                'platform': 'web',
                'aid': aid,
                'qn': '64',
                'fnval': '16'
            }
        }).then(res => res.data);

        const videoList = response.data.playurl.video.map(item => ({
            quality: item.stream_info.desc_words,
            codecs: item.video_resource.codecs,
            url: item.video_resource.url || item.video_resource.backup_url[0]
        }));

        const audioList = response.data.playurl.audio_resource.map(item => ({
            url: item.url || item.backup_url[0]
        }));

        const selectedVideo = videoList.find(v => v.quality === quality);
        if (!selectedVideo) throw new Error('Desired video quality not found.');

        const [videoBuffer, audioBuffer] = await Promise.all([
            getVideo(url, selectedVideo.url),
            getVideo(url, audioList[0].url)
        ]);

        const buffer = await mergeAudioVideo(audioBuffer, videoBuffer);

        return {
            status: true,
            data: { title, locate, description, cover, views, like, result: buffer, mediaList: { videoList, audioList } }
        };
    } catch (error) {
        console.error('Bilibili Downloader Error: ', error);
        return { status: false, message: error.message || 'Something went wrong' };
    }
}

function mergeAudioVideo(audioBuffer, videoBuffer) {
    return new Promise((resolve, reject) => {
        const audioPath = join(tempDir, `${Date.now()}-audio.mp3`);
        const videoPath = join(tempDir, `${Date.now()}-video.mp4`);
        const outputPath = join(tempDir, `${Date.now()}-output.mp4`);

        fs.writeFileSync(audioPath, audioBuffer);
        fs.writeFileSync(videoPath, videoBuffer);

        ffmpeg()
            .input(audioPath)
            .input(videoPath)
            .outputOptions('-c:v copy', '-c:a aac', '-strict experimental')
            .on('error', (err) => {
                cleanupFiles([audioPath, videoPath, outputPath]);
                reject(new Error(`FFmpeg merge error: ${err.message}`));
            })
            .on('end', () => {
                const outputBuffer = fs.readFileSync(outputPath);
                cleanupFiles([audioPath, videoPath, outputPath]);
                resolve(outputBuffer);
            })
            .save(outputPath);
    });
}

async function getVideo(referer, url) {
    try {
        const headers = {
            'Accept': '*/*',
            'Referer': referer,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Sec-Fetch-Site': 'cross-site'
        };

        const chunks = [];
        let start = 0;
        const chunkSize = 5 * 1024 * 1024; // 5MB

        let fileSize = 0;

        while (true) {
            const range = `bytes=${start}-${start + chunkSize - 1}`;
            const response = await axios.get(url, {
                headers: { ...headers, Range: range },
                responseType: 'arraybuffer'
            });

            chunks.push(Buffer.from(response.data));

            const contentRange = response.headers['content-range'];
            if (fileSize === 0) {
                fileSize = parseInt(contentRange.split('/')[1]);
            }

            if (start + chunkSize >= fileSize) break;
            start += chunkSize;
        }

        return Buffer.concat(chunks);
    } catch (error) {
        throw new Error(`Error downloading video: ${error.message}`);
    }
}

function cleanupFiles(files) {
    files.forEach(file => {
        if (fs.existsSync(file)) fs.unlinkSync(file);
    });
}


// Facebook Downloader
export async function facebookDownloader(url, proxy = null) {
    const varHeaders = {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
        'cache-control': 'max-age=0',
        'sec-ch-prefers-color-scheme': 'light',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41',
    };

    try {
        const response = await axios.get(url, { headers: varHeaders, httpsAgent: proxy }).then(res => res.data);
        const result = await regexUrl(response);
        return result;
    } catch (error) {
        throw error;
    }
}

async function regexUrl(body) {
    const result = {
        status: true,
        data: {
            user: null,
            quoted: null,
            isPrivate: false,
            result: [],
        }
    };
    try {
        const urlRegex = /"playable_url":\s*"([^"]+)"/;
        const urlHdRegex = /"playable_url_quality_hd":\s*"([^"]+)"/;
        const nativeSD = /"browser_native_sd_url":\s*"([^"]+)"/;
        const nativeHD = /"browser_native_hd_url":\s*"([^"]+)"/;
        const regex = /"name":\s*"([^"]+)",\s*"id":\s*"[^"]+"\s*}\s*],\s*"creation_time":\s*\d+,\s*"seo_title":\s*("[^"]*"|null)/;
        const regex2 = /"name":"(#[^"]+)".*?"text":"(.*?)"/;

        let matches = regex.exec(body) || regex2.exec(body);
        if (matches) {
            const user = matches[1].replace(/"/g, '');
            let quoted = matches[2] === 'null' ? null : matches[2].replace(/"/g, '');
            if (quoted !== null) {
                quoted = decodeURIComponent(JSON.parse(`"${quoted}"`));
            }
            result.data.user = user;
            result.data.quoted = quoted;
        }

        const urlMatch = body.match(urlRegex);
        const urlHdMatch = body.match(urlHdRegex);
        const nativeSDMatch = body.match(nativeSD);
        const nativeHDMatch = body.match(nativeHD);

        if (urlHdMatch) {
            const urlDl = decodeUrl(urlHdMatch[1]);
            result.data.result.push({ quality: 'HD', type: 'mp4', url: urlDl });
        }

        if (urlMatch) {
            const urlDl = decodeUrl(urlMatch[1]);
            result.data.result.push({ quality: 'SD', type: 'mp4', url: urlDl });
        }

        if (nativeHDMatch) {
            const urlDl = decodeUrl(nativeHDMatch[1]);
            result.data.result.push({ quality: 'HD', type: 'mp4', url: urlDl });
        }

        if (nativeSDMatch) {
            const urlDl = decodeUrl(nativeSDMatch[1]);
            result.data.result.push({ quality: 'SD', type: 'mp4', url: urlDl });
        }

        if (result.data.result.length === 0 && body.includes('isprivate')) {
            console.log("- Private group");
            result.isPrivate = true;
        }

        console.log('- Download videos success');
        return result;
    } catch (error) {
        console.error('Facebook Downloader Error:\n', error);
        return {
            status: false,
            message: error.message || 'Something went wrong'
        };
    }
}

function decodeUrl(url) {
    return JSON.parse(`"${url.replace(/\\\//g, "/")}"`);
}

// Google Drive Downloader
export async function gdriveDownloader(url) {
    const id = filterID(url);
    console.log(id);

    try {
        const response = await axios.get(`https://drive.usercontent.google.com/download?id=${id}&export=download`, {
            responseType: 'arraybuffer',
            headers: { 'Accept-Encoding': 'gzip, deflate, br' },
            maxRedirects: 0,
            validateStatus: status => status >= 200 && status < 300
        });

        if (response.headers['content-disposition']) {
            const filename = getFilenameFromHeader(response.headers['content-disposition']);
            const filesize = formatFileSize(response.headers['content-length']);
            
            return {
                status: true,
                data: { filename, filesize, result: response.data }
            };
        }

        const htmlContent = Buffer.from(response.data).toString('utf-8');
        const $ = cheerio.load(htmlContent);

        let query = '';
        $('input[type="hidden"]').each((i, elem) => {
            const name = $(elem).attr('name');
            const value = $(elem).val();
            query += `${name}=${value}&`;
        });

        const filename = $('span.uc-name-size a').text().trim();
        const directDownloadUrl = `https://drive.usercontent.google.com/download?${query}`;
        const buffer = await axios.get(directDownloadUrl, { responseType: 'arraybuffer' });
        const filesize = formatFileSize(buffer.headers['content-length']);

        return {
            status: true,
            data: { filename, filesize, result: buffer.data }
        };
    } catch (err) {
        console.error("Error:", err);
        return {
            status: false,
            message: err.message || 'Unknown error'
        };
    }
}

function filterID(url) {
    return url.match(/(?:https?:\/\/drive\.google\.com\/(?:file\/d\/|uc\?id=|open\?id=))?(?<id>[-\w]{25,})/)?.groups?.id;
}

function getFilenameFromHeader(header) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(header);
    if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
    }
    return 'unknown';
}

function formatFileSize(bytes) {
    if (!bytes) return 'unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const QUALITY_MAP = {
    1: '160',   // 144p
    2: '134',   // 360p
    3: '135',   // 480p
    4: ['302', '136', '247'],  // 720p
    5: ['303', '248'],         // 1080p
    6: ['308', '271'],         // 1440p
    7: ['315', '313'],         // 2160p
    8: 'highestaudio',
    9: 'bitrateList'
};

async function youtubeDownloader(link, qualityIndex) {
    try {
        const quality = QUALITY_MAP[qualityIndex] || QUALITY_MAP[2];
        const info = await ytdl.getInfo(link);

        if (quality === 'bitrateList') {
            return getBitrateList(info);
        }

        const videoDetails = info.videoDetails;
        const thumb = info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;

        const format = await chooseFormat(info, quality);
        if (!format && qualityIndex <= 7) {
            throw new Error(`No video found with quality '${getQualityLabel(qualityIndex)}'P.`);
        }

        if (qualityIndex > 7 || quality === 'highestaudio') {
            return await downloadAudioOnly(info, quality, videoDetails, thumb);
        } else {
            return await downloadVideoWithAudio(info, quality, videoDetails, thumb);
        }
    } catch (err) {
        console.error('Youtube Downloader Error:\n', err);
        return {
            status: false,
            message: err.message,
        };
    }
}

function getBitrateList(info) {
    const bitrateList = info.formats
        .filter(element => !element.hasVideo && element.hasAudio)
        .map(element => ({
            codec: element.codecs,
            bitrate: element.audioBitrate,
            itag: element.itag
        }))
        .sort((a, b) => b.bitrate - a.bitrate);

    return {
        status: true,
        data: { bitrateList }
    };
}

async function chooseFormat(info, quality) {
    if (Array.isArray(quality)) {
        for (const q of quality) {
            try {
                const format = await ytdl.chooseFormat(info.formats, { quality: q });
                if (format) return format;
            } catch (e) {
                // Continue to next quality option
            }
        }
    }
    return await ytdl.chooseFormat(info.formats, { quality });
}

async function downloadAudioOnly(info, quality, videoDetails, thumb) {
    const audioStream = ytdl.downloadFromInfo(info, { quality });
    const tempMp3 = path.join(tempDir, `temp_audio_${Date.now()}.mp3`);

    console.log('Downloading audio...');
    await streamToFile(audioStream, tempMp3);
    console.log('Audio download complete.');

    const mp3Buffer = await fsPromises.readFile(tempMp3);
    await fsPromises.unlink(tempMp3);

    return createResponse(videoDetails, mp3Buffer, quality, thumb, 'mp3');
}

async function downloadVideoWithAudio(info, quality, videoDetails, thumb) {
    const videoStream = ytdl.downloadFromInfo(info, { quality });
    const audioStream = ytdl.downloadFromInfo(info, { quality: 'highestaudio' });

    const mp4File = path.join(tempDir, `buff_${Date.now()}.mp4`);
    const tempMp4 = path.join(tempDir, `temp_video_${Date.now()}.mp4`);
    const tempMp3 = path.join(tempDir, `temp_audio_${Date.now()}.mp4`);

    console.log('Downloading audio and video...');
    await Promise.all([
        streamToFile(audioStream, tempMp3),
        streamToFile(videoStream, tempMp4)
    ]);
    console.log('Audio and video download complete.');

    console.log('Merging audio and video...');
    await mergeAudioVideo(tempMp3, tempMp4, mp4File);
    console.log('Merge complete.');

    const mp4Buffer = await fsPromises.readFile(mp4File);
    await Promise.all([
        fsPromises.unlink(tempMp3),
        fsPromises.unlink(tempMp4),
        fsPromises.unlink(mp4File)
    ]);

    return createResponse(videoDetails, mp4Buffer, quality, thumb, 'mp4');
}

function streamToFile(stream, filePath) {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);
        stream.on('end', resolve);
        stream.on('error', reject);
        writeStream.on('error', reject);
    });
}

function mergeAudioFromVideo(audioPath, videoPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(audioPath)
            .input(videoPath)
            .outputOptions('-c:v copy')
            .outputOptions('-c:a aac')
            .outputOptions('-strict experimental')
            .on('end', resolve)
            .on('error', reject)
            .save(outputPath);
    });
}

function createResponse(videoDetails, buffer, quality, thumb, type) {
    return {
        status: true,
        data: {
            title: videoDetails.title,
            result: buffer,
            size: buffer.length,
            quality,
            desc: videoDetails.description,
            views: videoDetails.viewCount,
            likes: videoDetails.likes,
            dislikes: videoDetails.dislikes,
            channel: videoDetails.ownerChannelName,
            uploadDate: videoDetails.uploadDate,
            thumb,
            type
        },
    };
}

function getQualityLabel(qualityIndex) {
    return ['144', '360', '480', '720', '1080', '1440', '2160'][qualityIndex - 1];
}

function sanitizeTitle(title) {
    return title
        .replace(/[\/\\:*?"<>|]/g, '_') // Ganti karakter yang tidak valid dengan underscore
        .trim(); // Hapus spasi di awal dan akhir
}

// Async function which scrapes the data
async function youtubePlaylistDownloader(url, quality, folderPath = join(process.cwd() + '/temp')) {
    try {
        playlistId = url.slice(url.indexOf("list="), url.indexOf("&index"))
        console.log("Playlist ID: " + playlistId);
    } catch {
        console.log("can't extract Playlist ID from URL. Check URL or Code (search for 'playlistId =')")
        return {
            status: false,
            message: e.message || 'Invalid Playlist URL'
        }
    }
    try {
        const { data } = await axios.get(url);
        const htmlStr = data
        fs.writeFileSync('./keys.txt', htmlStr)

        let arr = htmlStr.split('"watchEndpoint":{"videoId":"')
        var db = {}

        for (var i = 1; i < arr.length; i++) {
            let str = arr[i]
            let eI = str.indexOf('"')
            if (str.slice(eI,eI+13) != '","playlistId') continue
            let sstr = str.slice(0, eI)
            db[sstr] = 1
        }
        console.log(Object.keys(db))
        console.log(Object.keys(db).length)
        let title = htmlStr.match(/property="og:title" content="(.+?)"/)?.[1]

        let resultPath = []
        let metadata = []

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Folder ${folderPath} berhasil dibuat.`);
        }
        Object.keys(db).forEach(async key => {
            const info = await ytdl.getInfo(link);
            const videoTitle = info.videoDetails.title;
            const testPath = join(folderPath, `${sanitizeTitle(videoTitle)}.`);

            if (fs.existsSync(testPath + '.mp4') || fs.existsSync(testPath + '.mp3')) {
                console.log(`File ${videoTitle} already exists. Skipping...`);
                return;
            }
            await youtubeDownloader(key, quality)
                .then(res => {
                    const filePath = join(folderPath, `${sanitizeTitle(res.data.title)}.${res.data.type}`)
                    fs.writeFileSync(filePath, res.data.result)
                    resultPath.push(filePath)
                    metadata.push(res.data)
                    console.log(`File ${videoTitle} saved to ${folderPath}`)
                })
        })

        return {
            status: true,
            data: {
                title,
                resultPath,
                metadata
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: e.message || 'Something went wrong.'
        }
    }
}

// Export the module
export default { trustpositif, youtubeDownloader, youtubePlaylistDownloader, bilibiliDownloader, facebookDownloader, gdriveDownloader };

