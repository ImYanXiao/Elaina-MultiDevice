import CharacterAI from "node_characterai"
import axios from "axios"
import { translate } from "bing-translate-api"
import moment from 'moment-timezone'
import fs from 'fs'

let characterAI = new CharacterAI()
let token = "dee346ef3fb7bc55c667ff9a2a5c6ee2a05fcd47"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let id = m.sender
    let user = global.db.data.users[id]
    let name = user.registered ? user.name : await conn.getName(id)
    let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))
    if (!conn.cai) conn.cai = {}
    switch (command) {
        case 'cai-id':
            text = text.split('|')
            m.reply(`Berhasil ${conn.cai[id].external_id ? "mengganti" : "menyetel"} ${text[0]} menjadi lawan bicaramu, Sekarang kamu dapat menggunakan command *${usedPrefix}cai*`)
            conn.cai[id].name = text[0]
            conn.cai[id].external_id = text[1]
            conn.cai[id].thumbnail = text[2]
            break
        case 'cai':
            if (!text) return m.reply(`Masukan text yang ingin kamu tanyakan \n\nContoh: \n${usedPrefix + command} hallo`)
            if (!(id in conn.cai)) return m.reply(`Silahkan cari character yang ingin kamu chat terlebih dahulu \n\nContoh: \n${usedPrefix}cai-search Elaina`)
            if (!characterAI?.isAuthenticated()) {
                await characterAI.authenticateWithToken(token)
            }
            try {
                let chat = await characterAI.createOrContinueChat(conn.cai[id].external_id)
                let response = await chat.sendAndAwaitResponse(await textTranslated(text, "en"), true)
                await conn.adReply(m.chat, await textTranslated(response.text, "id"), conn.cai[id].name, "", conn.cai[id].thumbnail, "", m, false, false, { smlcap: false })
            } catch (error) {
                console.error(error)
                m.reply('Terjadi kesalahan saat menghubungi Character AI. Silakan coba lagi nanti.')
            }
            break
        case 'cai-search':
            if (!text) return m.reply(`Masukan nama character! \n\nContoh: \n${usedPrefix + command} Elaina`)
            try {
                await global.loading(m, conn)
                if (!characterAI?.isAuthenticated()) {
                    await characterAI.authenticateWithToken(token)
                }
                let { characters } = await characterAI.searchCharacters(text)
                let chara = characters.slice(0, 20)
                let list = chara.map((v, i) => {
                    return [`${usedPrefix}cai-id ${v.participant__name}|${v.external_id}|https://characterai.io/i/200/static/avatars/${v.avatar_file_name}`, (i + 1).toString(), `${v.title} ( ${v.participant__name} ) \nScore : ${v.search_score} \n${v.greeting.length > 50 ? `${v.greeting.slice(0, 50)}..` : v.greeting}`]
                })
                await conn.textList(m.chat, `Terdapat *${chara.length} Result* \nSilahkan pilih Character yang ingin kamu Gunakan`, false, list, m, {
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: false,
                            mediaType: 1,
                            title: `Halo ${name}, ${wish()}`,
                            body: global.config.watermark,
                            thumbnail: (await conn.getFile("https://pomf2.lain.la/f/6j6qab0a.jpg")).data,
                            renderLargerThumbnail: true,
                            mediaUrl: hwaifu.getRandom(),
                            sourceUrl: global.config.website
                        }
                    }
                })
                if (!(id in conn.cai)) {
                    conn.cai[id] = {
                        name: false,
                        external_id: false,
                        thumbnail: false,
                    }
                }
            } catch (error) {
                console.error(error)
                m.reply('Terjadi kesalahan saat mencari karakter. Silakan coba lagi nanti.')
            } finally {
                await global.loading(m, conn, true)
            }
            break
        default:
    }
}
handler.help = ["cai", "cai-search"]
handler.tags = ["premium", "ai"]
handler.command = /^(cai|characterai|cai-search|characterai-search|cai-id)$/i
handler.premium = true
export default handler

let isNumber = x => typeof x === 'number' && !isNaN(x)

let textTranslated = async (text, to) => {
    let translatedText = await translate(text, null, to)
    return translatedText.translation
}

function wish() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    if (time >= 0 && time < 4) {
        return 'Selamat Malam'
    }
    if (time >= 4 && time < 11) {
        return 'Selamat Pagi'
    }
    if (time >= 11 && time < 15) {
        return 'Selamat Siang'
    }
    if (time >= 15 && time < 18) {
        return 'Selamat Sore'
    }
    return 'Selamat Malam'
}