let handler = async (m, { conn }) => {

    let thumbBuffer = null
    let faviconBuffer = null

    try {
        const res = await fetch(global.thumb)
        thumbBuffer = Buffer.from(await res.arrayBuffer())
    } catch (e) {
        console.log('Gagal mengambil thumbnail:', e)
    }

    try {
        const res = await fetch(global.elaina)
        faviconBuffer = Buffer.from(await res.arrayBuffer())
    } catch (e) {
        console.log('Gagal mengambil favicon:', e)
    }

    await conn.sendMessage(
        m.chat,
        {
            text: 'Text https://github.com/rexxzyid/elaina-baileys',
            favicon: faviconBuffer,
            contextInfo: {
                externalAdReply: {
                    title: 'Title',
                    body: 'Body',
                    thumbnail: thumbBuffer,
                    sourceUrl: 'https://github.com/rexxzyid/elaina-baileys',
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }
    )
}

handler.help = ['testad']
handler.tags = ['main']
handler.command = /^(testad)$/i

export default handler