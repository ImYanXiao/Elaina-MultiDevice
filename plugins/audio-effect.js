import { unlinkSync, readFileSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';

let handler = async (m, { conn, args, __dirname, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
        let set;

        if (/bass/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30';
        if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        if (/earrape/.test(command)) set = '-af volume=12';
        if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        if (/tupai|squirrel|chipmunk/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (/reverb/.test(command)) set = '-filter:a "aecho=0.8:0.9:1000:0.3"';
        if (/chorus/.test(command)) set = '-filter:a "chorus=0.7:0.9:55:0.4:0.25:2"';
        if (/flanger/.test(command)) set = '-filter:a "flanger=delay=20:depth=0.2"';
        if (/distortion/.test(command)) set = '-filter:a "aecho=0.8:0.9:1000:0.3,firequalizer=gain_entry=\'entry(0,15);entry(250,0);entry(4000,15)\'"';
        if (/pitch/.test(command)) set = '-filter:a "asetrate=44100*1.25,atempo=1.25"';
        if (/highpass/.test(command)) set = '-filter:a "highpass=f=500"';
        if (/lowpass/.test(command)) set = '-filter:a "lowpass=f=500"';
        if (/underwater/.test(command)) set = '-af "asetrate=44100*0.5,atempo=2,lowpass=f=300"';


        if (/audio/.test(mime)) {
            let ran = getRandom('.mp3');
            let filename = join(__dirname, '../tmp/' + ran);
            let media = await q.download(true);
            exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
                await unlinkSync(media);
                if (err) throw `_*Error!*_`;
                let buff = await readFileSync(filename);
                conn.sendFile(m.chat, buff, ran, null, m, true, {
                    type: 'audioMessage',
                    ptt: true
                });
            });
        } else throw `*[❗ɴᴏᴛᴇ ] Reply audio atau vn kamu yang akan dimodifikasi, menggunakan perintah ${usedPrefix + command}*`;
    } catch (e) {
        throw e;
    }
};

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'reverb', 'chorus', 'flanger', 'distortion', 'pitch', 'highpass', 'lowpass', 'underwater'].map(v => v + ' [vn]');
handler.tags = ['audio'];
handler.command = /^(bass|blown|deep|earrape|fas?t|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk|reverb|chorus|flanger|distortion|pitch|highpass|lowpass|underwater)$/i;

export default handler;

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};
