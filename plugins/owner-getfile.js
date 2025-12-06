import fs from 'fs'
import syntaxError from 'syntax-error'
import path from 'path'

const _fs = fs.promises

let handler = async (m, { conn, text, usedPrefix, command, __dirname }) => {
    // --- LID support fix ---
    const chatId = global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat)
    // ------------------------

    if (!text) return m.reply(`
Penggunaan: ${usedPrefix}${command} <name file>
Contoh: 
${usedPrefix}getfile main.js
${usedPrefix}getplugin owner
`.trim())

    if (/p(lugin)?|gp/i.test(command)) {
        const filename = text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js')
        const pathFile = path.join(__dirname, filename)
        const file = await _fs.readFile(pathFile, 'utf8')
        conn.sendMessage(chatId, { text: file }, { quoted: m })

        const error = syntaxError(file, filename, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        })
        if (error) {
            await m.reply(`
Error found in *${filename}*:
\`\`\`
${error}
\`\`\`
`.trim())
        }

    } else {
        const isJavascript = /\.js/.test(text)
        if (isJavascript) {
            const file = await _fs.readFile(text, 'utf8')
            conn.sendMessage(chatId, { text: file }, { quoted: m })

            const error = syntaxError(file, text, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            })
            if (error) {
                await m.reply(`
Error found in *${text}*:
\`\`\`
${error}
\`\`\`
`.trim())
            }
        } else {
            const file = await _fs.readFile(text, 'base64')
            await m.reply(Buffer.from(file, 'base64'))
        }
    }
}

handler.help = ['getfile', 'getplugin']
handler.tags = ['owner']
handler.command = /^(getfile|gf|getplugin|gp)$/i
handler.mods = true

export default handler