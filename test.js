import fs from 'fs';
import path, { dirname } from 'path';
import assert from 'assert';
import syntaxError from 'syntax-error';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(__dirname);

let folders = ['.', ...Object.keys(require(path.join(__dirname, './package.json')).directories)];
let files = [];

for (let folder of folders) {
    try {
        for (let file of fs.readdirSync(folder).filter(v => v.endsWith('.js'))) {
            files.push(path.resolve(path.join(folder, file)));
        }
    } catch (err) {
        console.error(`Error reading folder ${folder}:`, err);
    }
}

for (let file of files) {
    if (file == __filename) continue;
    console.error('Checking', file);
    
    const error = syntaxError(fs.readFileSync(file, 'utf8'), file, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
    });
    
    assert.ifError(error);
    console.log('Done ☑️', file);
}
