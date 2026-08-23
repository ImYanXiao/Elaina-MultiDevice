import path, { join, dirname, basename } from 'path'
import fs from 'fs'

let handler = async (m, { conn, __dirname, args, usedPrefix, command }) => {
    let info = `${usedPrefix + command} <old name> | <new name>

• example:
➞ ${usedPrefix + command} inv | rpg-inv
➞ ${usedPrefix + command} exp/profile | exp/profil (kalau plugin-nya ada di subfolder)

• Note:
Harap tidak memakai kata .js diakhir kalimat
harap tidak menggunakan spasi diantar nama file, seperti "rpg- inv"`
    if (!args[0]) return m.reply(info)
    if (args[1] !== "|") return m.reply(`• example:\n➞ ${usedPrefix + command} inv | rpg-inv`)
    if (!args[2]) return m.reply(`• example:\n➞ ${usedPrefix + command} inv | rpg-inv`)

    let from = args[0]
    let to = args[2]

    let ar = Object.keys(global.plugins || {})
    let ar1 = ar.map(v => v.replace(/\.js$/i, ''))

                                                                           
    let target = ar1.includes(from) ? from : null
    if (!target && !from.includes('/')) {
        let matches = ar1.filter(v => basename(v) === from)
        if (matches.length === 1) target = matches[0]
        else if (matches.length > 1) {
            return m.reply(`⚠️ Ada beberapa plugin bernama *${from}*, sebutkan lengkap sama foldernya:\n\n${matches.map(v => ' ' + v).join('\n')}`)
        }
    }
    if (!target) return m.reply(`*🗃️ NOT FOUND!*\n==================================\n\n${ar1.map(v => ' ' + v).join`\n`}`)

                                                                                        
    let destination = to.includes('/') ? to : [dirname(target).replace(/^\.$/, ''), to].filter(Boolean).join('/')

    const fromPath = join(__dirname, '../plugins/' + target + '.js')
    const toPath = join(__dirname, '../plugins/' + destination + '.js')

    try {
        fs.mkdirSync(dirname(toPath), { recursive: true })
        fs.renameSync(fromPath, toPath)
        conn.reply(m.chat, `Succes changes "plugins/${target}.js" to "plugins/${destination}.js"`, m)
    } catch (err) {
        console.error(err)
        m.reply('❌ Gagal mengganti nama/memindahkan file.')
    }
}
handler.help = ['renamefile']
handler.tags = ['owner']
handler.command = /^(r(ename(file)?|f))$/i
handler.mods = true
export default handler
