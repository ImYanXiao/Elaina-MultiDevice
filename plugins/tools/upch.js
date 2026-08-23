import fs from 'fs'
import path from 'path'

const CHANNEL_JID = '120363410154606795@newsletter'
const CHANNEL_NAME = 'Rexx Hayanasi CH'

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) {
        return m.reply(`*[❗] Balas pesan audio / voice note dengan perintah:*\n\n${usedPrefix + command}`)
    }

    const q = m.quoted
    const quotedMsg = q.msg || {}
    const mime = quotedMsg.mimetype || q.mimetype || ''

    if (!/audio|ogg|opus|mpeg|mp3|mp4|m4a/i.test(mime)) {
        return m.reply('*[❗] Pesan yang dibalas harus audio / voice note.*')
    }

    try {
        await global.loading?.(m, conn)

        const audioBuffer = await q.download()

        if (!audioBuffer) {
            return m.reply('*[❗] Gagal mengunduh audio.*')
        }

        const sizeMB = audioBuffer.length / 1024 / 1024
        if (sizeMB > 50) {
            return m.reply('*[❗] Ukuran audio terlalu besar, maksimal 50MB.*')
        }

        const isPtt = quotedMsg.ptt === true
        const isOpus = /ogg|opus/i.test(mime)

        const sendMime = isOpus
            ? 'audio/ogg; codecs=opus'
            : mime || 'audio/mpeg'

        await conn.sendMessage(CHANNEL_JID, {
            audio: audioBuffer,
            mimetype: sendMime,
            ptt: isPtt
        })

        await m.reply(
            `S u d a h ✔️\n` +
            `Audio berhasil dikirim ke Channel *${CHANNEL_NAME}*\n\n` +
            `Mode: ${isPtt ? 'VN / PTT' : 'Audio biasa'}\n` +
            `Mimetype: ${sendMime}`
        )
    } catch (err) {
        console.error(err)
        m.reply(`Error: ${err.message}`)
    } finally {
        await global.loading?.(m, conn, true)
    }
}

handler.help = ['upch']
handler.command = /^(tovnsaluran|upch)$/i
handler.tags = ['tools']

export default handler