import fetch from "node-fetch"
import path from "path"
import { format } from "util"
import { fileTypeFromBuffer } from "file-type"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let url = args[0]
    if (!url || !/^https?:\/\//.test(url)) return m.reply(`URL tidak valid!

Gunakan format:
${usedPrefix + command} <url> [---opsi]

Contoh:
${usedPrefix + command} https://google.com
${usedPrefix + command} https://google.com ---header
${usedPrefix + command} https://google.com ---jsononly 
${usedPrefix + command} https://google.com ---download 
${usedPrefix + command} https://google.com ---raw 
${usedPrefix + command} https://google.com ---post
${usedPrefix + command} https://google.com ---PROXY`)

    const isHeaderOnly = args.includes('---header')
    const isDownload = args.includes('---download')
    const isRaw = args.includes('---raw')
    const isJsonOnly = args.includes('---jsononly')
    const isPost = args.includes('---post')
    const customHeaders = Object.fromEntries(args.filter(arg => arg.includes(':')).map(line => {
        const [key, ...val] = line.split(':')
        return [key.trim(), val.join(':').trim()]
    }))

    try {
        await global.loading?.(m, conn)

        let fetchOptions = {
            method: isPost ? 'POST' : 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
                ...customHeaders
            },
            redirect: 'follow'
        }

        if (global.PROXY) {
            const HttpsProxyAgent = (await import('https-proxy-agent')).HttpsProxyAgent
            fetchOptions.agent = new HttpsProxyAgent(global.PROXY)
        }

        let res = await fetch(url, fetchOptions)

        if (isHeaderOnly) {
            let headers = [...res.headers.entries()].map(([k, v]) => `${k}: ${v}`).join('\n')
            return await m.reply(`*Header Response:*\n\n${headers}`)
        }

        const contentType = res.headers.get('content-type') || ''
        const contentDisposition = res.headers.get('content-disposition') || ''
        const size = parseInt(res.headers.get('content-length') || '0')

        const filename = contentDisposition.match(/filename="?(.+?)"?$/)?.[1]
            || path.basename(new URL(url).pathname)
            || 'file'

        const buffer = await res.buffer()
        const fileType = await fileTypeFromBuffer(buffer)
        const ext = fileType?.ext || contentType.split('/')[1]?.split(';')[0] || 'bin'
        const mime = fileType?.mime || contentType

        if (isRaw) {
            return await conn.sendFile(m.chat, buffer, filename, '', m, false, { mimetype: mime })
        }

        if (isJsonOnly && contentType.includes('json')) {
            return await conn.sendFile(m.chat, buffer, 'data.json', '', m)
        }

        if (isDownload) {
            return await conn.sendFile(m.chat, buffer, filename, '', m, false, { mimetype: mime })
        }

        if (contentType.startsWith('image/')) {
            return await conn.sendFile(m.chat, buffer, filename, url, m)
        } else if (contentType.includes('json')) {
            try {
                const json = JSON.parse(buffer.toString())
                const textPreview = format(JSON.stringify(json, null, 2))
                await conn.sendMessage(m.chat, {
                    text: textPreview.slice(0, 65536)
                }, { quoted: m })
                await conn.sendFile(m.chat, buffer, 'data.json', '', m)
            } catch (e) {
                await m.reply('Gagal parsing JSON.')
            }
        } else if (contentType.startsWith('text/') || contentType.includes('html')) {
            const text = buffer.toString()
            await conn.sendMessage(m.chat, {
                text: text.slice(0, 65536)
            }, { quoted: m })
            await conn.sendFile(m.chat, Buffer.from(text), filename || 'text.txt', '', m)
        } else {
            await conn.sendFile(m.chat, buffer, filename, url, m, false, { mimetype: mime })
        }
    } catch (err) {
        await m.reply(`❌ Terjadi kesalahan:\n\n${err}`)
    } finally {
        await global.loading?.(m, conn, true)
    }
}

handler.help = ['get', 'fetch']
handler.tags = ['internet', 'tools']
handler.command = /^(get|fetch)$/i
handler.limit = false

export default handler