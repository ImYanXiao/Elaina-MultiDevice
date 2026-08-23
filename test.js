import fs from 'fs'
import path, { dirname } from 'path'
import assert from 'assert'
import { spawn } from 'child_process'
import syntaxError from 'syntax-error'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf8'))

let folders = ['.', ...Object.keys(packageJson.directories)]
let files = []
for (let folder of folders)
    for (let file of fs.readdirSync(folder).filter(v => v.endsWith('.js')))
        files.push(path.resolve(path.join(folder, file)))
for (let file of files) {
    if (file == __filename) continue
    console.error('Checking', file)
    const error = syntaxError(fs.readFileSync(file, 'utf8'), file, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
    })
    if (error) assert.ok(error.length < 1, file + '\n\n' + error)
    assert.ok(file)
    console.log('Done', file)
}