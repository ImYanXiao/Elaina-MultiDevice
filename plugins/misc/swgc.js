const handler = async (m, { conn, usedPrefix, command }) => {
    const quoted = m.quoted || null
    const mime = quoted ? (quoted.msg || quoted).mimetype || "" : ""
    const text = m.text || ""
    const caption = text.replace(new RegExp(`^\\${usedPrefix}${command}\\s*`, "i"), "").trim()
    const jid = m.chat
    const waBgColors = [
        '#0A5C5A',
        '#128C7E',
        '#075E54',
        '#25D366',
        '#34B7F1',
        '#DCF8C6'
    ]
    const bg = waBgColors[Math.floor(Math.random() * waBgColors.length)]

    try {
        await global.loading(m, conn)

        if (quoted && /image/.test(mime)) {
            const buffer = await quoted.download()
            await conn.sendMessage(jid, {
                groupStatusMessage: {
                    image: buffer,
                    caption: caption || undefined
                }
            }, { quoted: m })
            await m.react("✅️")
        } else if (quoted && /video/.test(mime)) {
            const buffer = await quoted.download()
            await conn.sendMessage(jid, {
                groupStatusMessage: {
                    video: buffer,
                    caption: caption || undefined
                }
            }, { quoted: m })
            await m.react("✅️")
        } else if (quoted && /audio/.test(mime)) {
            const buffer = await quoted.download()
            await conn.sendMessage(jid, {
                groupStatusMessage: {
                    audio: buffer,
                    mimetype: "audio/mpeg",
                    ptt: true
                }
            }, { quoted: m })
            await m.react("✅️")
        } else if (!quoted && caption) {
            await conn.sendMessage(jid, {
                groupStatusMessage: {
                    text: caption,
                    backgroundColor: bg
                }
            }, { quoted: m })
            await m.react("✅️")
        }
    } catch (e) {
        console.error(e)
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.command = ['upswgc', 'swgc', 'swgrup']
handler.admin = true
handler.group = true

export default handler