import { readdirSync, rmSync, statSync, existsSync } from 'fs'

let handler = async (m, { conn }) => {
    const directories = ['./tmp', './.chache']
    const filesToDelete = ['core']

    directories.forEach(dir => {
        if (existsSync(dir)) {
            readdirSync(dir).forEach(file => {
                let filePath = `${dir}/${file}`
                rmSync(filePath, { force: true, recursive: true })
            })
        }
    })

    filesToDelete.forEach(file => {
        if (existsSync(file) && statSync(file).isFile()) {
            rmSync(file, { force: true })
        }
    })

    let pesan = `Folder \`\`\`tmp\`\`\`, \`\`\`.chache\`\`\` dan file \`\`\`core\`\`\` telah dibersihkan!`
    await m.reply(pesan)
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(c(lear)?tmp)$/i
handler.mods = true

export default handler