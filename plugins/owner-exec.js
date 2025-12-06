import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'
import { exec } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

let handler = async (m, _2) => {
  let { conn, usedPrefix, noPrefix, args, groupMetadata } = _2

  const chatId = global.decodeChat
    ? global.decodeChat(m, conn)
    : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat)

  let _return
  let _syntax = ''
  let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix
  let old = m.exp * 1

  try {
    if (m.isGroup && !m.metadata) {
      try {
        m.metadata = await conn.groupMetadata(chatId)
      } catch (e) {
        m.metadata = null
      }
    }

    let i = 15
    let f = { exports: {} }

    const reply = (text) => conn.sendMessage(chatId, { text: String(text) }, { quoted: m })
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    let execFunction = new (async () => {}).constructor(
      'print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args',
      'groupMetadata', 'module', 'exports', 'argument', 'reply', 'delay',
      'msgKey',
      _text
    )

    // Menambahkan dukungan untuk mengeksekusi perintah curl atau perintah shell lainnya
    _return = await execFunction.call(conn,
      (...args) => {
        if (--i < 1) return
        console.log(...args)
        return conn.sendMessage(chatId, { text: format(...args) }, { quoted: m })
      },
      m, handler, require, conn, CustomArray, process, args, groupMetadata,
      f, f.exports, [conn, _2], reply, delay,
      m.key // Removed lidToJid
    )

    // Mengeksekusi perintah shell menggunakan child_process.exec (misalnya, curl)
    if (usedPrefix === "=>") {
      exec(noPrefix, (error, stdout, stderr) => {
        if (error) {
          reply(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reply(`stderr: ${stderr}`);
          return;
        }
        // Kirim hasil perintah curl atau lainnya
        reply(stdout);
      });
    }

  } catch (e) {
    let err = syntaxerror(_text, 'Execution Function', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      sourceType: 'module'
    })
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.sendMessage(chatId, { text: _syntax + format(_return) }, { quoted: m })
    m.exp = old
  }
}

handler.help = ['>', '=>']
handler.tags = ['owner']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i
handler.mods = true
export default handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}