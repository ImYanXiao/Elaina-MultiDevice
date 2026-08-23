import { novita } from "../../lib/scrape.js"
const Apikey = "ea2e5ad5-cc85-42ba-9ee2-b5bfc53ab4c1"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        conn.txt2img = conn.txt2img || {}
        const customModel = conn.txt2img?.[m.sender]
        switch (command) {
            case "txt2img":
                if (!text) return m.reply(`Masukan prompt! \n\nContoh: \n${usedPrefix + command} 1girl, in a bed, staring at me`)
                await global.loading(m, conn)
                const result = await novita.txt2img(Apikey, text, "(worst quality:1.4) , poorly drawn hands, poorly drawn feet, poorly drawn face, extra limbs, disfigured, deformed, blurry, bad anatomy, blurred, (not blushing:1.4)",
                    customModel?.model_name || "meinahentai_v4_70340.safetensors",
                    customModel?.sampler_name || null,
                    customModel?.guidance_scale || null,
                    customModel?.image_num || null,
                    customModel?.clip_skip || null,
                    customModel?.seed || null,
                    customModel?.loras || null
                )
                let list = result.map((v, i) => {
                    return [`${usedPrefix}txt2img-download ${v.image_url}`, (i + 1).toString(), (i + 1).toString()]
                })
                await conn.textList(m.chat, `Terdapat *${result.length} Foto* \nSilahkan pilih Foto mana saja yang ingin Kamu lihat`, result[0].image_url, list, m, { noList: true })
                break
            case "txt2img-download":
                await global.loading(m, conn)
                await conn.sendFile(m.chat, text, "", "", m)
                break
            case "set-txt2img":
                const model = setTxt.map(v => {
                    return `*•* ${v}`
                }).join("\n")
                if (!text) return m.reply(`List Set model txt2img : \n\n${model} \n\nContoh Penggunaan: \n${usedPrefix + command} ${setTxt[0]}|meinahentai_v4_70340.safetensors`)
                text = text.split("|")
                m.reply("Done")
                conn.txt2img[m.sender] = conn.txt2img[m.sender] || {}
                conn.txt2img[m.sender][text[0]] = text[1]
                break
            default:
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["txt2img", "set-txt2img"]
handler.tags = ["ai"]
handler.command = /^((set-)?txt2img(-download)?)$/i
handler.premium = true
export default handler

let setTxt = [
    "model_name",
    "sampler_name",
    "guidance_scale",
    "steps",
    "image_num",
    "clip_skip",
    "seed",
    "loras"
]