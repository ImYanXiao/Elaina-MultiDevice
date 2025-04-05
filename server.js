import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = global.app = express();

function connect(PORT) {
    app.get('/', (req, res) => {
        const indexPath = path.join(__dirname, 'views', 'index.html');
        res.sendFile(indexPath);
    });

    app.get('/nowa', async (req, res) => {
        const q = req.query.number;
        const regex = /x/g;

        if (!q) return res.status(400).json({ error: 'Input Parameter Number Parameter is required' });
        if (!q.match(regex)) return res.status(400).json({ error: 'Parameter Number must contain at least one letter "x"' });

        const random = q.match(regex).length;
        const total = Math.pow(10, random);
        const array = [];

        for (let i = 0; i < total; i++) {
            const list = [...i.toString().padStart(random, '0')];
            const result = q.replace(regex, () => list.shift()) + '@s.whatsapp.net';
            try {
                const v = await conn.onWhatsApp(result);
                const exists = v[0]?.exists;
                let info = exists ? await conn.fetchStatus(result).catch(_ => {}) : {};
                array.push({ jid: result, exists, ...info });
            } catch (error) {
                array.push({ jid: result, exists: false });
            }
        }
        res.json({ result: array });
    });

    app.get('/speedtest', (req, res) => {
        exec('speedtest', (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: `Speedtest failed: ${error.message}` });
            }
            res.status(200).send(`<h2>Speedtest Results</h2><pre>${stdout}</pre>`);
        });
    });

    app.get('/ping', (req, res) => {
        res.status(200).send('Ping successful');
    });

    app.get('/ping2', async (req, res) => {
        const pingResults = [];
        const url = 'https://mykingbee.blogspot.com/';

        for (let i = 0; i < 10; i++) {
            try {
                const response = await axios.get(url);
                pingResults.push(`Ping result ${i + 1}: ${response.data} ${response.status}<br />`);
            } catch (error) {
                pingResults.push(`Error pinging ${i + 1}: ${error.message}`);
            }
        }
        res.status(200).send(pingResults.join('<br /><br />'));
    });

    app.listen(PORT, () => {
        keepAlive();
        console.log('App listened on port', PORT);
    });
}

function keepAlive() {
    let url = 'https://github.com/imyanxiao';
    let url2 = 'https://github.com/xnuvers007';
    if (/(\/\/|\.)undefined\./.test(url)) return;
    setInterval(() => {
        fetch(url).catch(console.log);
    }, 30 * 1000);
    if (/(\/\/|\.)undefined\./.test(url2)) return;
    setInterval(() => {
        fetch(url2).catch(console.log);
    }, 30 * 1000);
}

function formatDate(n, locale = 'id') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' });
}

export default connect;
