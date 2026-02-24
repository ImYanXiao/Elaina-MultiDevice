import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh\n${usedPrefix + command} main`
    m.reply('Executing...')
    let o
    try {
        o = await exec('type ' + text)
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
    }
}

handler.help = ['getfile'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(getfile|gf)$/i

handler.rowner = true

export default handler