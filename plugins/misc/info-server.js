import axios from "axios"
import os from "os"

let handler = async (m) => {
    try {
        await global.loading(m, conn)
        const response = await axios.get("http://ip-api.com/json/")
        const serverInfo = response.data
        let serverMessage = `•  S E R V E R\n\n`

        const osInfo = os.platform()

        const totalRAM = Math.floor(os.totalmem() / (1024 * 1024))
        const freeRAM = Math.floor(os.freemem() / (1024 * 1024))

        const uptime = os.uptime()
        const uptimeFormatted = formatUptime(uptime)

        const processor = os.cpus()[0].model

        serverMessage += `OS: *${osInfo}*\n`
        serverMessage += `Ram: *${freeRAM} MB / ${totalRAM} MB*\n`
        serverMessage += `Negara: *${serverInfo.country}*\n`
        serverMessage += `Kode Negara: *${serverInfo.countryCode}*\n`
        serverMessage += `Wilayah: *${serverInfo.region}*\n`
        serverMessage += `Nama Wilayah: *${serverInfo.regionName}*\n`
        serverMessage += `Kota: *${serverInfo.city}*\n`
        serverMessage += `Zip: *${serverInfo.zip}*\n`
        serverMessage += `Lat: *${serverInfo.lat}*\n`
        serverMessage += `Lon: *${serverInfo.lon}*\n`
        serverMessage += `Zona Waktu: *${serverInfo.timezone}*\n`
        serverMessage += `Isp: *${serverInfo.isp}*\n`
        serverMessage += `Org: *${serverInfo.org}*\n`
        serverMessage += `As: *${serverInfo.as}*\n`
        serverMessage += `Pencarian: *HIDDEN*\n`
        serverMessage += `Waktu Aktif: *${uptimeFormatted.trim()}*\n`
        serverMessage += `Prosesor: *${processor}*`

        await m.reply(serverMessage)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["server"]
handler.tahs = ["info"]
handler.command = /^(server)$/i

export default handler

function formatUptime(uptime) {
    let seconds = Math.floor(uptime % 60)
    let minutes = Math.floor((uptime / 60) % 60)
    let hours = Math.floor((uptime / (60 * 60)) % 24)
    let days = Math.floor(uptime / (60 * 60 * 24))

    let formattedUptime = ""
    if (days > 0) formattedUptime += `${days} days `
    if (hours > 0) formattedUptime += `${hours} hours `
    if (minutes > 0) formattedUptime += `${minutes} minutes `
    if (seconds > 0) formattedUptime += `${seconds} seconds`

    return formattedUptime
}