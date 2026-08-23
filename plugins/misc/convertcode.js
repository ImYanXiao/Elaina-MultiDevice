const handler = async (m, { command, text, quoted }) => {
  const input = text || quoted?.text
  if (!input) throw 'Kirim atau reply kode JS'

  let code = input

  const isBuiltin = (word) => [
    'isNaN', 'isFinite', 'parseFloat', 'parseInt', 'eval', 'decodeURI',
    'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'require',
    'module', 'exports', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
    'console', 'Math', 'Date', 'String', 'Number', 'Boolean', 'Array', 'Object', 'fetch'
  ].includes(word)

  const toSnakeCase = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()
  const toCamelCase = (str) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())

                
  if (command === 'tocjs') {
    code = code
      .replace(/^import\s+(\w+)\s+from\s+['"](.+?)['"];?/gm, `const $1 = require('$2');`)
      .replace(/^export\s+default\s+/gm, 'module.exports = ')
      .replace(/^export\s+const\s+(\w+)\s+=/gm, 'exports.$1 =')

                
  } else if (command === 'toesm') {
    code = code
      .replace(/^const\s+(\w+)\s*=\s*require\(['"](.+?)['"]\);?/gm, `import $1 from '$2';`)
      .replace(/^module\.exports\s*=\s*/gm, 'export default ')
      .replace(/^exports\.(\w+)\s*=\s*/gm, 'export const $1 = ')
  
                                              
  } else if (command === 'tocase') {
    const commandRegex = /handler\.command\s*=\s*\[?['"`](\w+)['"`]?\]?;?/i
    const match = code.match(commandRegex)
    const commandName = match ? match[1] : 'unknown'

    const bodyMatch = code.match(/let\s+handler\s*=\s*async\s*\(([^)]*)\)\s*=>\s*\{([\s\S]*?)\}\n/m)
    const args = bodyMatch?.[1] || 'm, { conn, text }'
    const body = bodyMatch?.[2] || code

    code =
`const fetch = require('node-fetch');

module.exports = async function (${args}, command) {
  switch (command) {
    case '${commandName}':
${body.split('\n').map(l => '      ' + l).join('\n')}
      break;
  }
};`
  }

                                         
  let identifiers = new Set()
  code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (_, word) => {
    if (!isBuiltin(word) && word.length > 2) identifiers.add(word)
  })

  const renameMap = {}
  for (let name of identifiers) {
    renameMap[name] = command === 'toesm' ? toSnakeCase(name)
                        : command === 'tocjs' ? toCamelCase(name)
                        : name
  }

  for (const [from, to] of Object.entries(renameMap)) {
    if (from !== to) {
      const reg = new RegExp(`\\b${from}\\b`, 'g')
      code = code.replace(reg, to)
    }
  }

  m.reply(`🧠 *Hasil \`${command}\`:*\n\`\`\`js\n${code.trim()}\n\`\`\``)
}

handler.command = ['toesm', 'tocjs', 'tocase']
handler.login = true;
handler.group = true;
export default handler
