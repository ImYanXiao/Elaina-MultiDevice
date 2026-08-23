import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'
import { resolvePnJid } from '../../lib/resolvejid.js'

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
        m.metadata = await conn.groupMetadataPn(chatId)
      } catch (e) {
        m.metadata = null
      }
    }

    let i = 15
    let f = { exports: {} }

    const reply = (text) => conn.sendMessage(chatId, { text: String(text) }, { quoted: m })
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

                                                    
    let exec = new (async () => {}).constructor(
      'print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args',
      'groupMetadata', 'module', 'exports', 'argument', 'reply', 'delay',
      'lidToJid', 'msgKey',
      _text
    )

    _return = await exec.call(conn,
      (...args) => {
        if (--i < 1) return
        console.log(...args)
        return conn.sendMessage(chatId, { text: format(...args) }, { quoted: m })
      },
      m, handler, require, conn, CustomArray, process, args, groupMetadata,
      f, f.exports, [conn, _2], reply, delay,
      jid => resolvePnJid(conn, jid), m.key
    )

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
