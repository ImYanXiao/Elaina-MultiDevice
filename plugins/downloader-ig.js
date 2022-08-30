import instagramGetUrl from 'instagram-url-direct'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`
    const results = (await instagramGetUrl(args[0])).url_list[0]

    conn.sendFile(m.chat, results, 'instagram.mp4', `*INSTAGRAM DOWNLOADER*`, m)
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i

export default handler
