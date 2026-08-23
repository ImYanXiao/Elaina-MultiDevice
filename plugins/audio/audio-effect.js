import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, args, __dirname, usedPrefix, command }) => {
    try {
        let q = m.quoted || m
        let mime = q.mimetype || ''
        let effects = {
            bass: '-af equalizer=f=94:width_type=o:width=2:g=18',
            blown: '-af acrusher=.1:1:64:0:log',
            deep: '-af atempo=4/4,asetrate=44500*2/3',
            earrape: '-af volume=12',
            fast: '-filter:a "atempo=1.63,asetrate=44100"',
            fat: '-filter:a "atempo=1.6,asetrate=22100"',
            nightcore: '-filter:a atempo=1.06,asetrate=44100*1.25',
            reverse: '-filter_complex "areverse"',
            robot: '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"',
            slow: '-filter:a "atempo=0.8,asetrate=44100"',
            smooth: '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"',
            tupai: '-filter:a "atempo=0.5,asetrate=65100"',
            audio8d: '-af apulsator=hz=0.125:amount=1',
            echo: '-af aecho=0.8:0.9:1000:0.3',
            distortion: '-af "acompressor=threshold=0.1:ratio=20:attack=1:release=10,acrusher=level_in=8:level_out=18:bits=8:mode=log:aa=1"',
            pitch: '-af "reverb=80:100:100:100:0:0"',
            reverb: '-af "aecho=0.8:0.9:1000:0.3, aecho=0.8:0.9:500:0.5, aecho=0.8:0.9:250:0.7"',
            flanger: '-af "asetrate=48000*1.5,atempo=1.5,asetrate=48000,equalizer=f=8000:width_type=h:width=50:g=6,apulsator=hz=0.125:amount=1"',
            apulsator: '-af apulsator=hz=0.125',
            tremolo: '-af tremolo=f=6.0:d=0.8',
            chorus: '-af chorus=0.7:0.9:55:0.4:0.25:2'
        }

        let set = effects[command.toLowerCase()]
        if (!set) return m.reply(`*[INFO] respond to the audio or voice note which will be modified, use the command ${usedPrefix + command}*`)

        if (/audio/.test(mime)) {
            await global.loading(m, conn)
            let filename = join(__dirname, `../tmp/${getRandom('.mp3')}`)
            let media = await q.download(true)
            exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
                unlinkSync(media)
                if (err) return m.reply(`_*Error!*_`)
                let buff = readFileSync(filename)
                await conn.sendFile(m.chat, buff, filename, false, m, false, { mimetype: 'audio/mpeg' })
            })
        } else {
            m.reply(`*[INFO] respond to the audio or voice note which will be modified, use the command ${usedPrefix + command}*`)
        }
    } finally {
        global.loading(m, conn, true)
    }
}

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'squirrel', 'chipmunk', 'audio8d', 'echo', 'distortion', 'pitch', 'reverb', 'flanger', 'apulsator', 'tremolo', 'chorus']
handler.tags = ['audio']
handler.command = /^(bass|blown|deep|earrape|fast|fat|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk|audio8d|echo|distortion|pitch|reverb|flanger|apulsator|tremolo|chorus)$/i
handler.limit = true

export default handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}