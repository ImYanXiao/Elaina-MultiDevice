// Update by Xnuvers007

let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('Hmmm...ngecheat?')
    return
  }
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()#^]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/#/g, 'Math.sqrt')
    .replace(/\^/g, '**')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  let format = text
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/Math\.sqrt/g, '√')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')
    .replace(/\\/g, '^')
  try {
    let result = eval(val)
    if (!isNaN(result)) {
      if (text.includes('√')) {
        let number = text.match(/√(\d+)/)[1]
        m.reply(`√${number} = ${Math.sqrt(number)}`)
      } else {
        m.reply(`*${format}* = ${result}`)
      }
    } else {
      throw result
    }
  } catch (e) {
    if (e === undefined) throw 'Isinya?'
    throw 'Format salah, hanya 0-9 dan Simbol -, +, *, /, ×, ÷, π, e, (, ), ^, √ yang disupport'
  }
}
handler.help = ['calc <expression>']
handler.tags = ['tools']
handler.command = /^(calc(ulat(e|or))?|kalk(ulator)?)$/i
handler.exp = 5

export default handler
