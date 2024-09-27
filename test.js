import fs from 'fs';
import path, { dirname } from 'path';
import assert from 'assert';
import syntaxError from 'syntax-error';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(__dirname);
const folders = ['.', ...Object.keys(require(path.join(__dirname, './package.json')).directories)];
const files = [];

folders.forEach(folder => {
    try {
        const jsFiles = fs.readdirSync(folder).filter(v => v.endsWith('.js')).map(file => path.resolve(folder, file));
        files.push(...jsFiles);
    } catch (err) {
        console.error(`Error reading folder ${folder}:`, err);
    }
});

files.forEach(file => {
    if (file !== __filename) {
        console.error('Checking', file);
        const error = syntaxError(fs.readFileSync(file, 'utf8'), file, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        });
        assert.ifError(error);
        console.log('Done ☑️', file);
    }
});
