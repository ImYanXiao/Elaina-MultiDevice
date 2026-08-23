import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [ ip, port ] = text.split(' ')
    if (!ip || !port) return m.reply(`Masukan Ip Server Dan Port!\n\nContoh :\n${usedPrefix + command} mc.caldronsmp.me 19132`)
    if (port == 19132) {
        let response = await fetch(`https://api.mcsrvstat.us/bedrock/2/${ip}`)
        let data = await response.json()
        let caption = `
Server ${data.motd.clean}

Ip : ${data.ip}
Port : ${data.port}
Players : ${data.players.online} / ${data.players.max}
Version : ${data.version}
Online : ${data.online ? '✅' : '❎'}
Map : ${data.map}
Game Mode : ${data.gamemode}
ServerId : ${data.serverid}
`.trim()
        m.reply(caption)
    } else {
        let response = await fetch(`https://api.mcsrvstat.us/2/${ip}`)
        let data = await response.json()
        let caption = `
Server ${data.motd.clean}

Ip : ${data.ip}
Port : ${data.port}
Players : ${data.players.online} / ${data.players.max}
Version : ${data.version}
Online : ${data.online ? '✅' : '❎'}
Map : ${data.map}
Game Mode : ${data.gamemode}
ServerId : ${data.serverid}
`.trim()
        m.reply(caption)
    }
}
handler.help = ['mcserver']
handler.tags = ['internet']
handler.command = /^((mc|minecraft)server)$/i

export default handler